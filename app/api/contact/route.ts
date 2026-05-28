import { NextRequest, NextResponse } from "next/server";
import { saveContact, validateContactPayload } from "@/lib/supabase";

// Rate limiting: simple in-memory map (per deployment instance)
// For production scale, use Upstash Redis or Vercel KV
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
  // ── Rate limiting ──────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { allowed, remaining } = getRateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before trying again." },
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
    const body = await req.json();

    // ── Validation via utility layer ───────────────────────────
    const { valid, error: validationError, parsed } = validateContactPayload(body);
    if (!valid || !parsed) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const { name, email, subject, message } = parsed;
    const userAgent = req.headers.get("user-agent") ?? undefined;

    // ── 1. Supabase SDK — persist to database ──────────────────
    const { success: dbSuccess, id: submissionId } = await saveContact(
      { name, email, subject, message },
      { ip, userAgent }
    );

    if (!dbSuccess) {
      console.warn("[Contact] Supabase insert failed — proceeding with email only");
    }

    // ── 2. Resend email notification ───────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    const emailTo = process.env.EMAIL_TO || "uday@example.com";

    if (resendKey) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Cinematic Portfolio <onboarding@resend.dev>",
            to: emailTo,
            subject: `[Portfolio Contact] ${subject} — ${name}`,
            html: buildEmailHTML({ name, email, subject, message, submissionId }),
          }),
        });

        if (!emailRes.ok) {
          console.warn(`[Contact] Resend returned ${emailRes.status}`);
        }
      } catch (resendErr) {
        console.error("[Contact] Resend error:", resendErr);
      }
    } else {
      // ── 3. Nodemailer SMTP fallback ──────────────────────────
      const emailFrom = process.env.EMAIL_FROM;
      const emailPass = process.env.EMAIL_APP_PASSWORD;
      if (emailFrom && emailPass) {
        try {
          const nodemailer = await import("nodemailer");
          const transporter = nodemailer.default.createTransport({
            service: "gmail",
            auth: { user: emailFrom, pass: emailPass },
          });
          await transporter.sendMail({
            from: emailFrom,
            to: emailTo,
            subject: `[Portfolio Contact] ${subject} — ${name}`,
            html: buildEmailHTML({ name, email, subject, message }),
          });
        } catch (smtpErr) {
          console.error("[Contact] SMTP fallback error:", smtpErr);
        }
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[Contact] Submission saved:", { name, email, subject, id: submissionId });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message transmitted successfully! Uday will respond within 24 hours.",
        id: submissionId,
      },
      {
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    );
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}

// ── Email template ────────────────────────────────────────────
function buildEmailHTML(args: {
  name: string;
  email: string;
  subject: string;
  message: string;
  submissionId?: string;
}) {
  const { name, email, subject, message, submissionId } = args;
  return `
    <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;
                background:#0f1624;color:#e2e8f0;padding:32px;
                border-radius:12px;border:1px solid rgba(6,182,212,0.2)">
      <h2 style="color:#06b6d4;margin-bottom:24px;font-size:20px">
        ⚡ New Neural Contact Submission
      </h2>
      <table style="width:100%;border-collapse:collapse">
        <tr>
          <td style="padding:8px 0;color:#94a3b8;width:120px;vertical-align:top">Name</td>
          <td style="padding:8px 0;color:#f1f5f9;font-weight:600">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top">Email</td>
          <td style="padding:8px 0"><a href="mailto:${email}" style="color:#06b6d4">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#94a3b8;vertical-align:top">Subject</td>
          <td style="padding:8px 0;color:#f1f5f9">${subject}</td>
        </tr>
      </table>
      <div style="margin-top:24px;padding:20px;
                  background:rgba(255,255,255,0.03);
                  border-radius:8px;border-left:3px solid #06b6d4">
        <p style="white-space:pre-wrap;margin:0;line-height:1.7;color:#cbd5e1">${message}</p>
      </div>
      ${
        submissionId
          ? `<p style="color:#475569;margin-top:20px;font-size:11px;font-family:monospace">
               DB ID: ${submissionId} · Saved via Supabase
             </p>`
          : ""
      }
    </div>
  `;
}
