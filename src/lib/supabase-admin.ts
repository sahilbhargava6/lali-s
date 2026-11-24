// Server-only Supabase client using the secret service-role key, which bypasses Row Level Security.
// Never import this from a client component, and never expose SUPABASE_SERVICE_ROLE_KEY with a NEXT_PUBLIC_ prefix.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "The server is missing SUPABASE_SERVICE_ROLE_KEY. Add the Supabase secret (service role) key to the environment variables, then restart or redeploy."
    );
  }
  adminClient ??= createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return adminClient;
}
