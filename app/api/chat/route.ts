import { NextRequest, NextResponse } from "next/server";
import { aiChatSystemPrompt } from "@/lib/data";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    // Check for OpenAI key
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "sk-your-openai-api-key-here") {
      // Mock mode
      const mockResponses = [
        "I'm ARIA, Uday's AI assistant! 🤖 Uday is a Full Stack & AI Engineer with 3+ years of experience. He specializes in Next.js, Python, LangChain, and OpenAI APIs. What would you like to know about him?",
        "Uday has built amazing projects! His flagship work includes NeuralChat (50K users), QuantumStore ($2M+ GMV processed), and CodeSentinel used by 500+ developers. Want details on any of these?",
        "Uday's tech stack is impressive: Next.js, React, TypeScript, Python, FastAPI, LangChain, OpenAI API, AWS, Docker, PostgreSQL, MongoDB, and Redis. He's especially strong in AI/ML integrations.",
        "You can reach Uday at uday@example.com or connect on LinkedIn at linkedin.com/in/udaykumar. He typically responds within 24 hours and is currently open to new opportunities!",
        "Uday has won multiple hackathons including HackAI 2024 (1st place, $10,000 prize) and the OpenAI Hackathon (2nd place). He's a competitive developer who loves solving hard problems!",
      ];

      const userMsg = messages[messages.length - 1]?.content?.toLowerCase() || "";
      let response = mockResponses[Math.floor(Math.random() * mockResponses.length)];

      if (userMsg.includes("project")) response = mockResponses[1];
      else if (userMsg.includes("skill") || userMsg.includes("tech")) response = mockResponses[2];
      else if (userMsg.includes("contact") || userMsg.includes("hire") || userMsg.includes("email")) response = mockResponses[3];
      else if (userMsg.includes("hackathon") || userMsg.includes("award")) response = mockResponses[4];

      return NextResponse.json({ content: response });
    }

    // Real OpenAI call
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: aiChatSystemPrompt },
          ...messages.slice(-8), // Keep last 8 messages for context
        ],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "I apologize, I encountered an issue. Please try again!";

    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { content: "I'm having trouble right now. Please try again!" },
      { status: 200 }
    );
  }
}
