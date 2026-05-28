// ============================================================
// 📂 utils/supabase/server.ts
// Server-side Supabase client for App Router Route Handlers
// ============================================================
// NOTE: This uses the service-role key pattern for server-only
// operations. Cookie-based auth is scaffolded but optional for
// this portfolio (no user login required).
// ============================================================

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/supabase";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

/**
 * Creates a Supabase server client for use in:
 * - Route Handlers  (app/api/[...]/route.ts)
 * - Server Actions
 * - Server Components (if needed)
 *
 * Reads/writes cookies for session management.
 * For portfolio API routes (no auth), use createAnonServerClient() instead.
 */
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: any) {
        try {
          cookiesToSet.forEach(({ name, value, options }: any) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Ignore: setAll called from Server Component (read-only context)
        }
      },
    },
  });
}

/**
 * Lightweight server client for anonymous public inserts
 * (contact forms, analytics, AI logs).
 * Does NOT touch cookies — safe for edge-adjacent route handlers.
 */
export function createAnonServerClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }

  return createServerClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll: () => [],
      setAll: () => {},
    },
  });
}
