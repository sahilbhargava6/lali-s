import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase URL or Anon Key is missing. Using fallback placeholders for build.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Turn low-level Supabase/network failures into a message an admin can act on.
// A browser reports a down or paused project only as "Failed to fetch" (Chrome),
// "NetworkError…" (Firefox) or "Load failed" (Safari).
export function describeSupabaseError(err: unknown, fallback = "Something went wrong."): string {
  if (!isSupabaseConfigured) {
    return "The blog database isn't configured for this site: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are missing from this deployment's environment variables.";
  }
  const message = err instanceof Error ? err.message : (err as { message?: string } | null)?.message ?? "";
  if (/failed to fetch|fetch failed|networkerror|load failed|network request failed/i.test(message)) {
    return "Can't reach the blog database. The Supabase project may be paused or down. Open the Supabase dashboard, restore the project, then try again.";
  }
  return message || fallback;
}
