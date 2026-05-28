import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "@/lib/supabase";
import type { AnalyticsEventInsert } from "@/types/supabase";

// Allowed event categories — block arbitrary strings
const ALLOWED_CATEGORIES = new Set([
  "navigation", "interaction", "easter_egg", "achievement",
  "performance", "error",
]);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { session_id, event_name, event_category, properties, room } = body;

    if (
      !session_id ||
      !event_name ||
      !event_category ||
      !ALLOWED_CATEGORIES.has(event_category)
    ) {
      return NextResponse.json({ error: "Invalid event payload" }, { status: 400 });
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
    const userAgent = req.headers.get("user-agent") ?? null;
    const referrer = req.headers.get("referer") ?? null;

    const event: AnalyticsEventInsert = {
      session_id: String(session_id).slice(0, 64),
      event_name: String(event_name).slice(0, 120),
      event_category,
      properties: typeof properties === "object" && properties !== null ? properties : {},
      room: room ? String(room).slice(0, 60) : null,
      ip_address: ip,
      user_agent: userAgent?.slice(0, 512) ?? null,
      referrer: referrer?.slice(0, 512) ?? null,
    };

    // Fire and forget — don't await to keep response fast
    trackEvent(event).catch(() => {});

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
