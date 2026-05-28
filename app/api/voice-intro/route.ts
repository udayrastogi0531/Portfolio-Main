import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "ElevenLabs API key missing", fallback: true },
        { status: 200 }
      );
    }

    const { text } = await req.json();
    const introText = text || "Hi, I'm Uday's neural voice avatar. Welcome to my next-generation cinematic portfolio. Explore my full-stack projects, interactive AI tools, and creative experiences. Let's build the future together.";

    const voiceId = "21m00Tcm4TlvDq8ikWAM"; // Rachel voice (very clear and clean)
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: introText,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      console.error(`ElevenLabs API returned status ${response.status}`);
      return NextResponse.json(
        { error: "ElevenLabs TTS failed", fallback: true },
        { status: 200 }
      );
    }

    const audioStream = response.body;
    if (!audioStream) {
      return NextResponse.json(
        { error: "Failed to generate audio stream", fallback: true },
        { status: 200 }
      );
    }

    return new Response(audioStream, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Voice Intro API route error:", error);
    return NextResponse.json(
      { error: "Voice synthesis error", fallback: true },
      { status: 200 }
    );
  }
}
