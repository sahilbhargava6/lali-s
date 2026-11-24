// Server-only: admin passcode check and signed session cookies for the Blog Studio.
// Never import this from a client component.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "lb_admin_session";
export const SESSION_MAX_AGE_SECONDS = 12 * 60 * 60; // 12 hours

function sha256(value: string) {
  return createHash("sha256").update(value).digest();
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSCODE);
}

/** Constant-time comparison so the passcode can't be guessed from response timing. */
export function passcodeMatches(input: string) {
  const expected = process.env.ADMIN_PASSCODE;
  if (!expected) return false;
  return timingSafeEqual(sha256(input), sha256(expected));
}

// The signing key includes the passcode, so changing ADMIN_PASSCODE logs out every existing session.
function signingKey() {
  const base = process.env.ADMIN_SESSION_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return `${base}:${process.env.ADMIN_PASSCODE ?? ""}`;
}

function sign(payload: string) {
  return createHmac("sha256", signingKey()).update(payload).digest("base64url");
}

export function createSessionToken() {
  const payload = `admin.${Date.now() + SESSION_MAX_AGE_SECONDS * 1000}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false;
  const lastDot = token.lastIndexOf(".");
  if (lastDot < 0) return false;
  const payload = token.slice(0, lastDot);
  const signature = Buffer.from(token.slice(lastDot + 1));
  const expected = Buffer.from(sign(payload));
  if (signature.length !== expected.length || !timingSafeEqual(signature, expected)) return false;
  const expiresAt = Number(payload.split(".")[1]);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}
