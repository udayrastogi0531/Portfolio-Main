import { NextRequest, NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/supabase";

// Rate limiting: simple in-memory map
const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_MAX_REQUESTS = 5;

function getRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = RATE_LIMIT_MAP.get(ip);

  if (!entry || entry.resetAt < now) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true, remaining: RATE_MAX_REQUESTS - 1 };
  }

  if (entry.count >= RATE_MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_MAX_REQUESTS - entry.count };
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, remaining } = getRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many registrations. Please try again in a minute." },
      {
        status: 429,
        headers: {
          "Retry-After": "60",
          "X-RateLimit-Remaining": "0",
        },
      }
    );
  }

  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    // ── 1. Save to Supabase ───────────────────────────────────────
    const { success, alreadySubscribed, error } = await subscribeToNewsletter(email);

    if (!success) {
      console.warn("[Newsletter API] Supabase insert failed — proceeding with email only:", error);
    }

    // If already subscribed, return success gracefully (prevents duplicate logs but acts positive)
    if (success && alreadySubscribed) {
      return NextResponse.json(
        {
          success: true,
          message: "Welcome back! You are already part of the Neural AI Network 🚀",
        },
        {
          headers: { "X-RateLimit-Remaining": String(remaining) },
        }
      );
    }

    // ── 2. Send Confirmation Email via Resend ───────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Uday's Neural Network <onboarding@resend.dev>",
            to: email.trim().toLowerCase(),
            subject: "Welcome to the Neural AI Network 🚀",
            html: buildNewsletterWelcomeHTML(email),
          }),
        });

        if (!emailRes.ok) {
          const errBody = await emailRes.text();
          console.error(`[Newsletter API] Resend failed with status ${emailRes.status}:`, errBody);
        }
      } catch (err) {
        console.error("[Newsletter API] Resend email failed:", err);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Welcome to the Neural AI Network 🚀",
      },
      {
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch (err) {
    console.error("[Newsletter API] Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected server error." }, { status: 500 });
  }
}

// ── Welcome Email HTML template ────────────────────────────────
function buildNewsletterWelcomeHTML(email: string) {
  return `
    <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;
                background:#050816;color:#e2e8f0;padding:40px 32px;
                border-radius:16px;border:1px solid rgba(6,182,212,0.2);
                box-shadow: 0 10px 40px rgba(6,182,212,0.08)">
      
      <div style="text-align:center;margin-bottom:32px">
        <h1 style="color:#06b6d4;font-size:28px;font-family:'Orbitron',sans-serif;margin:0 0 8px 0;letter-spacing:0.05em">
          NEURAL AI NETWORK
        </h1>
        <p style="color:#64748b;font-size:12px;text-transform:uppercase;letter-spacing:0.2em;margin:0">
          Telemetry Uplink Confirmed
        </p>
      </div>

      <div style="background:rgba(255,255,255,0.02);padding:24px;border-radius:12px;
                  border:1px solid rgba(255,255,255,0.04);margin-bottom:32px">
        <p style="margin-top:0;line-height:1.7;color:#cbd5e1;font-size:15px">
          Welcome, Agent. Your secure connection to the <strong>Neural AI Network</strong> has been successfully established.
        </p>
        <p style="line-height:1.7;color:#cbd5e1;font-size:15px">
          You are now synchronized to receive elite developer telemetry, high-level AI updates, and engineering briefings directly from Uday Prakash Rastogi's neural pipeline.
        </p>
      </div>

      <h3 style="color:#a855f7;font-size:14px;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:16px">
        🛰️ Upcoming Sync Transmission Topics:
      </h3>
      <ul style="padding-left:20px;color:#cbd5e1;line-height:1.8;font-size:14px;margin-bottom:32px">
        <li style="margin-bottom:8px">🧠 <strong>Generative AI & Agentic Core</strong>: Cutting-edge LLM structures, LangChain patterns, and agent routing algorithms.</li>
        <li style="margin-bottom:8px">⚡ <strong>Advanced RAG Systems</strong>: Pinecone, FAISS vector index mechanics, and semantic query matching optimizations.</li>
        <li style="margin-bottom:8px">🚀 <strong>DevOps & Full Stack Scaling</strong>: Cloud architecture guides, Vercel edge deployment guides, and containerization.</li>
        <li style="margin-bottom:8px">💻 <strong>Portfolio Coding Highlights</strong>: Exclusive sneak peeks into futuristic WebGL features and developer updates.</li>
      </ul>

      <div style="border-t:1px solid rgba(255,255,255,0.08);padding-top:24px;text-align:center">
        <p style="color:#475569;font-size:11px;margin:0 0 4px 0">
          Uplink Destination: ${email}
        </p>
        <p style="color:#475569;font-size:11px;margin:0">
          Crafted with 🌌 by Uday Prakash Rastogi · Hyderabad, India
        </p>
      </div>
    </div>
  `;
}
