// ============================================================
// 📂 utils/supabase/client.ts
// Browser-side Supabase client (singleton for client components)
// ============================================================

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/supabase";

// Validate env vars at import time so we get a clear error message
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/**
 * Creates a Supabase browser client.
 * Safe to call multiple times — @supabase/ssr handles deduplication.
 * Use inside Client Components ("use client").
 */
export function createClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Fail gracefully in development; in production this surfaces clearly
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[Supabase] NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing.\n" +
        "Add them to .env.local to enable database features."
      );
    }
  }
  return createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
}

/** Convenience singleton for one-off client-side queries */
export const supabaseBrowser = createClient();
