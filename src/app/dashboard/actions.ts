"use server";

// Blog Studio server actions. Every write checks the signed admin session cookie first and then
// uses the server-only service-role client, so the public anon key never needs write access.
// Errors are returned (not thrown) because Next.js hides thrown error messages in production.

import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  isAdminConfigured,
  passcodeMatches,
  verifySessionToken,
} from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { describeSupabaseError } from "@/lib/supabase";

export type ActionResult<T = undefined> =
  | { ok: true; data?: T; notice?: string }
  | { ok: false; error: string; sessionExpired?: boolean };

export interface BlogInput {
  title: string;
  summary: string;
  content: string;
  image_url: string | null;
  author: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
}

const SESSION_EXPIRED: ActionResult<never> = {
  ok: false,
  error: "Your admin session has expired. Please log in again.",
  sessionExpired: true,
};

const BLOG_IMAGES_BUCKET = "blog-images";
const MAX_IMAGE_BYTES = 3 * 1024 * 1024;

async function isAdmin() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);
}

function failure(err: unknown, fallback: string): ActionResult<never> {
  return { ok: false, error: describeSupabaseError(err, fallback) };
}

// ---------------------------------------------------------------- auth

export async function login(passcode: string): Promise<ActionResult> {
  if (!isAdminConfigured()) {
    return { ok: false, error: "Admin login isn't set up: ADMIN_PASSCODE is missing from the server's environment variables." };
  }
  if (typeof passcode !== "string" || !passcodeMatches(passcode)) {
    // Slow down repeated guessing
    await new Promise((r) => setTimeout(r, 800));
    return { ok: false, error: "Incorrect passcode. Please verify and try again." };
  }
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return { ok: true };
}

export async function logout(): Promise<ActionResult> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return { ok: true };
}

export async function hasAdminSession(): Promise<boolean> {
  return isAdmin();
}

// ---------------------------------------------------------------- blog posts

function cleanText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function cleanBlogInput(input: BlogInput) {
  const blog = {
    title: cleanText(input.title, 300),
    summary: cleanText(input.summary, 1000),
    content: cleanText(input.content, 200_000),
    image_url: cleanText(input.image_url, 3_000_000) || null,
    author: cleanText(input.author, 120) || "Lali's Buildmart Admin",
  };
  const seo = {
    meta_title: cleanText(input.meta_title, 300) || null,
    meta_description: cleanText(input.meta_description, 500) || null,
    meta_keywords: cleanText(input.meta_keywords, 500) || null,
  };
  return { blog, seo };
}

// PostgREST reports an unknown column as PGRST204 (or Postgres 42703)
function isMissingColumnError(error: { code?: string; message?: string } | null) {
  return !!error && (error.code === "PGRST204" || error.code === "42703" || /column/i.test(error.message ?? ""));
}

export async function saveBlog(input: BlogInput, editingId: string | null): Promise<ActionResult> {
  if (!(await isAdmin())) return SESSION_EXPIRED;

  const { blog, seo } = cleanBlogInput(input);
  if (!blog.title || !blog.summary || !blog.content) {
    return { ok: false, error: "Please fill in the title, summary, and article content." };
  }

  try {
    const supabase = getSupabaseAdmin();
    const write = (row: Record<string, unknown>) =>
      editingId
        ? supabase.from("blogs").update(row).eq("id", editingId).select("id")
        : supabase.from("blogs").insert([row]).select("id");

    let { data, error } = await write({ ...blog, ...seo });
    let notice: string | undefined;

    // SEO columns not added to the table yet: save the article itself and tell the admin
    if (isMissingColumnError(error)) {
      ({ data, error } = await write(blog));
      notice =
        "Article saved, but the SEO fields were not stored because the database is missing the SEO columns. Run the setup SQL in the Supabase SQL Editor to enable them.";
    }

    if (error) throw error;
    if (editingId && (!data || data.length === 0)) {
      return { ok: false, error: "That article no longer exists. It may have been deleted." };
    }
    return { ok: true, notice };
  } catch (err) {
    return failure(err, "Failed to save blog post.");
  }
}

export async function deleteBlog(id: string): Promise<ActionResult> {
  if (!(await isAdmin())) return SESSION_EXPIRED;
  if (typeof id !== "string" || !id) return { ok: false, error: "Missing article id." };

  try {
    const { data, error } = await getSupabaseAdmin().from("blogs").delete().eq("id", id).select("id");
    if (error) throw error;
    if (!data || data.length === 0) return { ok: false, error: "That article was already deleted." };
    return { ok: true };
  } catch (err) {
    return failure(err, "Failed to delete post.");
  }
}

// ---------------------------------------------------------------- cover images

export async function uploadCoverImage(formData: FormData): Promise<ActionResult<{ url: string }>> {
  if (!(await isAdmin())) return SESSION_EXPIRED;

  const file = formData.get("file");
  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    return { ok: false, error: "Please upload a valid image file (PNG, JPG, WebP)." };
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: "That image is too large. Please use an image under 3 MB." };
  }

  try {
    const supabase = getSupabaseAdmin();
    const ext = file.type === "image/webp" ? "webp" : file.type === "image/png" ? "png" : "jpg";
    const fileName = `blog-${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
    const upload = () =>
      supabase.storage.from(BLOG_IMAGES_BUCKET).upload(fileName, file, { contentType: file.type, upsert: false });

    let { error } = await upload();
    // First upload on a fresh project: create the public bucket, then retry
    if (error && /bucket not found/i.test(error.message)) {
      const created = await supabase.storage.createBucket(BLOG_IMAGES_BUCKET, { public: true });
      if (created.error && !/already exists/i.test(created.error.message)) throw created.error;
      ({ error } = await upload());
    }
    if (error) throw error;

    const { data } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(fileName);
    return { ok: true, data: { url: data.publicUrl } };
  } catch (err) {
    return failure(err, "Failed to upload the image.");
  }
}
