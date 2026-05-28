import { NextRequest, NextResponse } from "next/server";
import { logRecruiterInteraction } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session_id, company_name, contact_name, contact_email, action, metadata } = body;

    if (!session_id || !action) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
    const userAgent = req.headers.get("user-agent");
    const referrer = req.headers.get("referer");

    // Fire and forget
    logRecruiterInteraction({
      session_id,
      company_name: company_name || null,
      contact_name: contact_name || null,
      contact_email: contact_email || null,
      action,
      metadata: metadata || {},
      ip_address: ip,
      user_agent: userAgent,
      referrer,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Recruiter API route error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
