import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Try to send email via nodemailer if configured
    const emailFrom = process.env.EMAIL_FROM;
    const emailPass = process.env.EMAIL_APP_PASSWORD;
    const emailTo = process.env.EMAIL_TO;

    if (emailFrom && emailPass && emailTo) {
      try {
        const nodemailer = await import("nodemailer");
        const transporter = nodemailer.default.createTransport({
          service: "gmail",
          auth: { user: emailFrom, pass: emailPass },
        });

        await transporter.sendMail({
          from: emailFrom,
          to: emailTo,
          subject: `[Portfolio Contact] ${subject} — from ${name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0f1624; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid rgba(6,182,212,0.2);">
              <h2 style="color: #06b6d4; margin-bottom: 24px;">New Portfolio Contact</h2>
              <p><strong style="color: #94a3b8;">From:</strong> ${name} (${email})</p>
              <p><strong style="color: #94a3b8;">Subject:</strong> ${subject}</p>
              <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 8px; border-left: 3px solid #06b6d4;">
                <p style="white-space: pre-wrap;">${message}</p>
              </div>
              <p style="color: #475569; margin-top: 24px; font-size: 12px;">Sent from udaykumar.dev portfolio</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Email send failed:", emailError);
        // Don't fail the request if email fails
      }
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log("📧 New contact form submission:", { name, email, subject, message });
    }

    return NextResponse.json({ success: true, message: "Message received!" });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
