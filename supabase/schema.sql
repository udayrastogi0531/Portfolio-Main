-- ============================================================
-- 🗄️  Uday Prakash Rastogi — Cinematic AI Portfolio
--     Supabase Database Schema
-- ============================================================
-- Run this entire file in:
--   Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- ── Extensions ───────────────────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto";  -- for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";   -- for fuzzy text search

-- ── Custom Enum Types ─────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE contact_status    AS ENUM ('new', 'read', 'replied', 'archived');
  CREATE TYPE chat_role         AS ENUM ('user', 'assistant');
  CREATE TYPE event_category    AS ENUM ('navigation','interaction','easter_egg','achievement','performance','error');
  CREATE TYPE recruiter_action  AS ENUM ('view','download_resume','open_recruiter_mode','contact_click','email_click','linkedin_click');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ============================================================
-- TABLE 1: contacts
-- Stores all contact form submissions
-- ============================================================
CREATE TABLE IF NOT EXISTS contacts (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  email        TEXT        NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject      TEXT        NOT NULL CHECK (char_length(subject) BETWEEN 3 AND 200),
  message      TEXT        NOT NULL CHECK (char_length(message) BETWEEN 10 AND 5000),
  status       contact_status NOT NULL DEFAULT 'new',
  ip_address   INET,
  user_agent   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_contacts_email      ON contacts (email);
CREATE INDEX IF NOT EXISTS idx_contacts_status     ON contacts (status);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts (created_at DESC);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_contacts_updated_at ON contacts;
CREATE TRIGGER trg_contacts_updated_at
  BEFORE UPDATE ON contacts
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- RLS: public can INSERT only; no SELECT/UPDATE/DELETE without service role
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "contacts_insert_public" ON contacts;
CREATE POLICY "contacts_insert_public"
  ON contacts FOR INSERT TO anon
  WITH CHECK (true);

-- NOTE: To read contacts in an admin UI, create a separate admin role
-- and add: CREATE POLICY "contacts_read_admin" ON contacts FOR SELECT
--   USING (auth.role() = 'service_role');

-- ============================================================
-- TABLE 2: recruiter_interactions
-- Tracks recruiter engagement events
-- ============================================================
CREATE TABLE IF NOT EXISTS recruiter_interactions (
  id           UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   TEXT         NOT NULL,
  company_name TEXT,
  contact_name TEXT,
  contact_email TEXT,
  action       recruiter_action NOT NULL,
  metadata     JSONB        NOT NULL DEFAULT '{}',
  ip_address   INET,
  user_agent   TEXT,
  referrer     TEXT,
  created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_recruiter_session     ON recruiter_interactions (session_id);
CREATE INDEX IF NOT EXISTS idx_recruiter_action      ON recruiter_interactions (action);
CREATE INDEX IF NOT EXISTS idx_recruiter_created_at  ON recruiter_interactions (created_at DESC);

-- RLS: anonymous inserts only
ALTER TABLE recruiter_interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "recruiter_insert_public" ON recruiter_interactions;
CREATE POLICY "recruiter_insert_public"
  ON recruiter_interactions FOR INSERT TO anon
  WITH CHECK (true);

-- ============================================================
-- TABLE 3: ai_chat_logs
-- Stores AI chat exchange records
-- ============================================================
CREATE TABLE IF NOT EXISTS ai_chat_logs (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   TEXT        NOT NULL,
  role         chat_role   NOT NULL,
  content      TEXT        NOT NULL,
  provider     TEXT,
  model        TEXT,
  tokens_used  INTEGER     CHECK (tokens_used >= 0),
  latency_ms   INTEGER     CHECK (latency_ms >= 0),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ai_chat_session    ON ai_chat_logs (session_id);
CREATE INDEX IF NOT EXISTS idx_ai_chat_provider   ON ai_chat_logs (provider);
CREATE INDEX IF NOT EXISTS idx_ai_chat_created_at ON ai_chat_logs (created_at DESC);

-- RLS: anonymous inserts only
ALTER TABLE ai_chat_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_chat_insert_public" ON ai_chat_logs;
CREATE POLICY "ai_chat_insert_public"
  ON ai_chat_logs FOR INSERT TO anon
  WITH CHECK (true);

-- ============================================================
-- TABLE 4: analytics_events
-- General-purpose portfolio analytics
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id             UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id     TEXT           NOT NULL,
  event_name     TEXT           NOT NULL,
  event_category event_category NOT NULL,
  properties     JSONB          NOT NULL DEFAULT '{}',
  room           TEXT,
  ip_address     INET,
  user_agent     TEXT,
  referrer       TEXT,
  created_at     TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_analytics_session    ON analytics_events (session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_event_name ON analytics_events (event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_category   ON analytics_events (event_category);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events (created_at DESC);
-- GIN index for JSONB properties queries
CREATE INDEX IF NOT EXISTS idx_analytics_properties ON analytics_events USING GIN (properties);

-- RLS: anonymous inserts only
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "analytics_insert_public" ON analytics_events;
CREATE POLICY "analytics_insert_public"
  ON analytics_events FOR INSERT TO anon
  WITH CHECK (true);

-- ============================================================
-- USEFUL VIEWS (optional, for dashboard/monitoring)
-- ============================================================

-- Contact submission summary by day
CREATE OR REPLACE VIEW v_contacts_daily AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS submissions,
  COUNT(*) FILTER (WHERE status = 'new') AS unread
FROM contacts
GROUP BY 1
ORDER BY 1 DESC;

-- Top analytics events
CREATE OR REPLACE VIEW v_top_events AS
SELECT
  event_name,
  event_category,
  COUNT(*) AS occurrences,
  COUNT(DISTINCT session_id) AS unique_sessions
FROM analytics_events
GROUP BY 1, 2
ORDER BY 3 DESC;

-- AI provider usage
CREATE OR REPLACE VIEW v_ai_provider_stats AS
SELECT
  provider,
  model,
  COUNT(*) AS messages,
  AVG(tokens_used) AS avg_tokens,
  AVG(latency_ms) AS avg_latency_ms
FROM ai_chat_logs
WHERE provider IS NOT NULL
GROUP BY 1, 2
ORDER BY 3 DESC;

-- ============================================================
-- SAMPLE DATA (development only — remove in production)
-- ============================================================
-- Uncomment to seed test data:
--
-- INSERT INTO contacts (name, email, subject, message) VALUES
--   ('Alice Smith',   'alice@example.com',  'Freelance Project', 'Hi Uday! I have an AI project...'),
--   ('Bob Recruiter', 'bob@techcorp.com',   'Full-time Role',    'We are hiring senior engineers...');
--
-- INSERT INTO analytics_events (session_id, event_name, event_category) VALUES
--   ('test-session-1', 'page_view',    'navigation'),
--   ('test-session-1', 'konami_code',  'easter_egg'),
--   ('test-session-2', 'chat_opened',  'interaction');

-- ============================================================
-- TABLE 5: newsletter_subscribers
-- Stores newsletter registrations
-- ============================================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT        UNIQUE NOT NULL CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (email);

-- RLS: public can INSERT only; no SELECT/UPDATE/DELETE without service role
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "newsletter_insert_public" ON newsletter_subscribers;
CREATE POLICY "newsletter_insert_public"
  ON newsletter_subscribers FOR INSERT TO anon
  WITH CHECK (true);
