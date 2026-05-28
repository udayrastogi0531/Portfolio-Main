# 🚀 Production Deployment Guide — Uday Prakash Rastogi's Cinematic AI Portfolio

This document outlines the standard production-ready setup for your **Cinematic AI Portfolio**, custom-configured to run with high-performance edge APIs, Supabase real-time database tracking, ElevenLabs voice systems, and Resend transaction engines.

---

## 🗄️ Step 1: Initialize Supabase Database Schema

Your portfolio uses Supabase to persist logs, analytics, contact submissions, and recruiter interaction events securely behind Row Level Security (RLS) policies.

1. Create a free account at [Supabase](https://supabase.com).
2. Create a new project (e.g., `Uday Portfolio`).
3. Once the database is provisioned, go to the **SQL Editor** tab from the left sidebar.
4. Click **"New query"** and copy-paste the entire contents of [supabase/schema.sql](file:///d:/Portfolio%20Main/supabase/schema.sql).
5. Click **"Run"** (or press `Ctrl + Enter` / `Cmd + Enter`).
6. All 4 tables (`contacts`, `recruiter_interactions`, `ai_chat_logs`, `analytics_events`) along with custom types, automated triggers, performance indexes, and RLS insert policies are now configured!

---

## 🚀 Step 2: Deploy to Vercel (Recommended — 3 minutes)

Next.js is natively optimized for Vercel, leveraging high-speed serverless route handlers, dynamic edge streaming, and automatic production CDN assets.

### 1. Push Code to GitHub
Ensure you have created a private or public repository under your GitHub account:
```bash
git init
git add .
git commit -m "🚀 Ready for Production — Cinematic AI Portfolio"
git branch -M main
git remote add origin https://github.com/udayrastogi0531/portfolio.git
git push -u origin main
```

### 2. Import into Vercel
1. Go to your [Vercel Dashboard](https://vercel.com) and click **"Add New..."** → **"Project"**.
2. Connect your GitHub account and import the `portfolio` repository.
3. Keep the **Framework Preset** as **Next.js**.
4. Root directory should remain `./`.
5. Expand the **Environment Variables** panel.

---

## 🔑 Step 3: Configure Environment Variables

Paste your real live production keys into Vercel's environment variable panel. Ensure they match the keys configured in your `.env.local` file:

| Variable Name | Value | Purpose |
| :--- | :--- | :--- |
| **`GROQ_API_KEY`** | `gsk_your_groq_api_key_here` | Primary AI provider (Ultra-low latency Llama responses) |
| **`GEMINI_API_KEY`** | `AIzaSy_your_gemini_api_key_here` | Secondary AI provider fallback (Gemini-2.5-flash) |
| **`OPENROUTER_API_KEY`** | `sk-or-v1-your_openrouter_api_key_here` | Tertiary AI provider fallback (High-redundancy model routing) |
| **`NEXT_PUBLIC_SUPABASE_URL`** | `https://your_project_id.supabase.co` | Supabase API instance URL |
| **`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`** | `sb_publishable_your_key_here` | Client-safe anonymous publishable RLS key |
| **`RESEND_API_KEY`** | `re_your_resend_api_key_here` | Transactional email provider API key |
| **`EMAIL_TO`** | `udayprakashrastogi2005@gmail.com` | Inbox where contact form notifications are sent |
| **`HUGGINGFACE_API_KEY`** | `hf_your_huggingface_api_key_here` | Optional image/embedding model fallback key |
| **`ELEVENLABS_API_KEY`** | `sk_your_elevenlabs_api_key_here` | Voice generator API key for ARIA's voice greeting |
| **`NEXT_PUBLIC_SITE_URL`** | `https://uday.dev` *(Update with final domain)* | Canonical domain URL for sitemaps and SEO |
| **`NEXT_PUBLIC_GITHUB_USERNAME`** | `udayrastogi0531` | Username for pulling live repositories and stats |
| **`NEXT_PUBLIC_AI_MOCK_MODE`** | `false` | Disable Mock AI in production to use live APIs |
| **`NODE_ENV`** | `production` | Enables optimized React production hooks |

> [!IMPORTANT]
> Do NOT set `NEXT_PUBLIC_AI_MOCK_MODE=true` in production unless you explicitly want the mock assistant. Setting it to `false` engages the multi-model fallback stream logic.

6. Once all variables are added, click **"Deploy"**.
7. Vercel will build the project dynamically in under 20 seconds. Your portfolio is LIVE!

---

## 🌐 Step 4: Map Custom Domains

To secure the perfect professional landing page, attach your custom domain:

1. In Vercel, navigate to **Project Settings** → **Domains**.
2. Enter your domain:
   - Recommended: `uday.dev`, `udaylabs.dev`, `udayverse.dev`, or `heyuday.dev`.
3. Vercel will provide the DNS targets:
   - For an **A record**: Point `@` to `76.76.21.21`
   - For a **CNAME record**: Point `www` to `cname.vercel-dns.com`
4. Go to your domain registrar (GoDaddy, Namecheap, Google Domains) and update your DNS records.
5. Vercel will automatically provision a free Let's Encrypt SSL certificate within a few minutes.

---

## ⚡ Step 5: Verification & Launch Checklist

Once the production URL is live, perform this 1-minute verification:

- **AI Assistant**: Open the chat panel in the bottom-right. Type a message. Ensure it streams back the response with low latency.
- **AI Terminal**: Press `~` or click the terminal icon. Type `help`, `skills`, `projects`, and `matrix`. Ensure the visual outputs trigger.
- **Contact Form**: Navigate to the bottom and submit a message. Ensure the UI displays success and that you receive the copy email via Resend in `udayprakashrastogi2005@gmail.com`.
- **Supabase Integration**: In your Supabase Dashboard, open the **Table Editor** and verify that your contact submission, chat logs, and telemetry events are recorded in real-time.
- **Recruiter Mode**: Toggle recruiter mode and check if the dashboard highlights skills custom-mapped to Gen AI & Agentic AI, MERN Stack, C++ DSA, etc.

*Your World-Class Cinematic AI Portfolio is officially launched!* 🚀
