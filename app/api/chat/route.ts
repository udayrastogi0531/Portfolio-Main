import { NextRequest, NextResponse } from "next/server";
import { queryLLM } from "@/lib/ai";
import { aiChatSystemPrompt } from "@/lib/data";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages, session_id } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
    }

    // Context-aware messages list with system prompt
    const fullMessages = [
      { role: "system" as const, content: aiChatSystemPrompt },
      ...messages.slice(-10), // Keep last 10 messages for context
    ];

    // Call LLM with streaming enabled
    const response = await queryLLM(fullMessages, {
      temperature: 0.7,
      stream: true,
      sessionId: session_id || undefined,
    });

    if (response instanceof Response) {
      return response; // Streaming SSE response
    }

    // Static text fallback
    return NextResponse.json({ content: response });
  } catch (error) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { content: "I'm having trouble thinking right now. Please try again!" },
      { status: 200 }
    );
  }
}
