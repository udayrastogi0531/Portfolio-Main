// ============================================================
// 📂 lib/supabase.ts — Reusable DB Utility Layer
// ============================================================
// All database operations go through this file.
// Route handlers import from here — never call Supabase directly.
// ============================================================

import { createAnonServerClient } from "@/utils/supabase/server";
import type {
  ContactInsert,
  RecruiterInteractionInsert,
  AIChatLogInsert,
  AnalyticsEventInsert,
} from "@/types/supabase";

// ── Helper: safe client or null ──────────────────────────────

function getClient() {
  return createAnonServerClient() as any;
}

// ── Validation helpers ────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(data: unknown): {
  valid: boolean;
  error?: string;
  parsed?: ContactInsert;
} {
  if (typeof data !== "object" || data === null) {
    return { valid: false, error: "Invalid payload" };
  }
  const { name, email, subject, message } = data as Record<string, unknown>;
  if (!name || typeof name !== "string" || name.trim().length < 2) {
    return { valid: false, error: "Name must be at least 2 characters" };
  }
  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return { valid: false, error: "Invalid email address" };
  }
  if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
    return { valid: false, error: "Subject must be at least 3 characters" };
  }
  if (!message || typeof message !== "string" || message.trim().length < 10) {
    return { valid: false, error: "Message must be at least 10 characters" };
  }
  return {
    valid: true,
    parsed: {
      name: name.trim().slice(0, 120),
      email: email.trim().toLowerCase().slice(0, 254),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
    },
  };
}

// ── CONTACTS ──────────────────────────────────────────────────

/**
 * Saves a contact form submission to Supabase.
 * Returns { success, id? } — never throws.
 */
export async function saveContact(
  payload: ContactInsert,
  meta?: { ip?: string; userAgent?: string }
): Promise<{ success: boolean; id?: string; error?: string }> {
  const client = getClient();
  if (!client) {
    console.warn("[Supabase] Client unavailable — contact not persisted");
    return { success: false, error: "Database unavailable" };
  }

  try {
    const { data, error } = await client
      .from("contacts")
      .insert({
        ...payload,
        ip_address: meta?.ip ?? null,
        user_agent: meta?.userAgent?.slice(0, 512) ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[Supabase] contacts insert error:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[Supabase] saveContact unexpected:", err);
    return { success: false, error: "Unexpected error" };
  }
}

// ── RECRUITER INTERACTIONS ────────────────────────────────────

/**
 * Logs a recruiter interaction (view, download, click, etc.)
 */
export async function logRecruiterInteraction(
  payload: RecruiterInteractionInsert
): Promise<{ success: boolean }> {
  const client = getClient();
  if (!client) return { success: false };

  try {
    const { error } = await client
      .from("recruiter_interactions")
      .insert(payload);
    if (error) {
      console.error("[Supabase] recruiter_interactions insert:", error.message);
    }
    return { success: !error };
  } catch {
    return { success: false };
  }
}

// ── AI CHAT LOGS ─────────────────────────────────────────────

/**
 * Persists a chat message exchange (user + assistant pair).
 * Designed to be fire-and-forget — does not block the response.
 */
export async function logChatMessage(
  payload: AIChatLogInsert
): Promise<void> {
  const client = getClient();
  if (!client) return;

  try {
    const { error } = await client.from("ai_chat_logs").insert(payload);
    if (error) {
      console.error("[Supabase] ai_chat_logs insert:", error.message);
    }
  } catch {
    // silently ignore — logging should never break the response
  }
}

// ── ANALYTICS EVENTS ─────────────────────────────────────────

/**
 * Persists an analytics event.
 * Batching is not needed for this portfolio scale — single inserts are fine.
 */
export async function trackEvent(
  payload: AnalyticsEventInsert
): Promise<void> {
  const client = getClient();
  if (!client) return;

  try {
    const { error } = await client.from("analytics_events").insert(payload);
    if (error) {
      console.error("[Supabase] analytics_events insert:", error.message);
    }
  } catch {
    // silently ignore
  }
}

// ── NEWSLETTER SUBSCRIBERS ───────────────────────────────────

/**
 * Saves a newsletter email registration to Supabase newsletter_subscribers.
 * Handles duplicate emails gracefully.
 */
export async function subscribeToNewsletter(
  email: string
): Promise<{ success: boolean; alreadySubscribed?: boolean; error?: string }> {
  const client = getClient();
  if (!client) {
    return { success: false, error: "Database unavailable" };
  }

  const cleanEmail = email.trim().toLowerCase();
  if (!EMAIL_RE.test(cleanEmail)) {
    return { success: false, error: "Invalid email address" };
  }

  try {
    const { error } = await client
      .from("newsletter_subscribers")
      .insert({ email: cleanEmail });

    if (error) {
      if (error.code === "23505") {
        return { success: true, alreadySubscribed: true };
      }
      console.error("[Supabase] newsletter insert error:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.error("[Supabase] subscribeToNewsletter unexpected:", err);
    return { success: false, error: "Unexpected error" };
  }
}

// ── ADMIN READS (server-only, never called from client) ───────

/**
 * Get recent contact submissions (for an admin view in the future).
 * Requires service role key or RLS policy allowing reads.
 */
export async function getRecentContacts(limit = 20) {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from("contacts")
    .select("id, name, email, subject, status, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("[Supabase] getRecentContacts:", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Get analytics event counts grouped by event_name.
 */
export async function getEventCounts() {
  const client = getClient();
  if (!client) return [];

  const { data, error } = await client
    .from("analytics_events")
    .select("event_name")
    .order("created_at", { ascending: false })
    .limit(1000);

  if (error) {
    console.error("[Supabase] getEventCounts:", error.message);
    return [];
  }

  // Client-side aggregation
  const counts: Record<string, number> = {};
  (data ?? []).forEach((row: any) => {
    if (row && typeof row.event_name === "string") {
      const event_name = row.event_name;
      counts[event_name] = (counts[event_name] ?? 0) + 1;
    }
  });
  return Object.entries(counts).map(([name, count]) => ({ name, count }));
}
