// ============================================================
// 📂 types/supabase.ts — Full TypeScript Database Schema
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// ── Table Row Types ──────────────────────────────────────────

export interface ContactRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

export interface RecruiterInteractionRow {
  id: string;
  session_id: string;
  company_name: string | null;
  contact_name: string | null;
  contact_email: string | null;
  action: "view" | "download_resume" | "open_recruiter_mode" | "contact_click" | "email_click" | "linkedin_click";
  metadata: Json;
  ip_address: string | null;
  user_agent: string | null;
  referrer: string | null;
  created_at: string;
}

export interface AIChatLogRow {
  id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  provider: string | null;
  model: string | null;
  tokens_used: number | null;
  latency_ms: number | null;
  created_at: string;
}

export interface AnalyticsEventRow {
  id: string;
  session_id: string;
  event_name: string;
  event_category: "navigation" | "interaction" | "easter_egg" | "achievement" | "performance" | "error";
  properties: Json;
  room: string | null;
  ip_address: string | null;
  user_agent: string | null;
  referrer: string | null;
  created_at: string;
}

// ── Insert Types (omit auto-generated fields) ────────────────

export type ContactInsert = {
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: ContactRow["status"];
  ip_address?: string | null;
  user_agent?: string | null;
};


export type RecruiterInteractionInsert = Omit<RecruiterInteractionRow, "id" | "created_at">;

export type AIChatLogInsert = Omit<AIChatLogRow, "id" | "created_at">;

export type AnalyticsEventInsert = Omit<AnalyticsEventRow, "id" | "created_at">;

// ── Supabase Database Type Map ────────────────────────────────

export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: ContactRow;
        Insert: ContactInsert;
        Update: Partial<ContactInsert>;
        Relationships: [];
      };
      recruiter_interactions: {
        Row: RecruiterInteractionRow;
        Insert: RecruiterInteractionInsert;
        Update: Partial<RecruiterInteractionInsert>;
        Relationships: [];
      };
      ai_chat_logs: {
        Row: AIChatLogRow;
        Insert: AIChatLogInsert;
        Update: Partial<AIChatLogInsert>;
        Relationships: [];
      };
      analytics_events: {
        Row: AnalyticsEventRow;
        Insert: AnalyticsEventInsert;
        Update: Partial<AnalyticsEventInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      contact_status: "new" | "read" | "replied" | "archived";
      chat_role: "user" | "assistant";
      event_category: "navigation" | "interaction" | "easter_egg" | "achievement" | "performance" | "error";
      recruiter_action: "view" | "download_resume" | "open_recruiter_mode" | "contact_click" | "email_click" | "linkedin_click";
    };
  };
}
