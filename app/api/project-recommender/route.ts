import { NextRequest, NextResponse } from "next/server";
import { projects, skills } from "@/lib/data";

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "sk-your-openai-api-key-here") {
      // Smart mock based on keywords
      const ideaLower = idea.toLowerCase();
      const isAI = ideaLower.includes("ai") || ideaLower.includes("chatbot") || ideaLower.includes("ml") || ideaLower.includes("intelligence");
      const isEcommerce = ideaLower.includes("shop") || ideaLower.includes("store") || ideaLower.includes("commerce") || ideaLower.includes("sell");
      const isAnalytics = ideaLower.includes("analytics") || ideaLower.includes("dashboard") || ideaLower.includes("data");

      const relevantProjects = isAI
        ? ["NeuralChat — AI Platform (50K+ users)", "CodeSentinel — AI Code Review"]
        : isEcommerce
        ? ["QuantumStore — E-Commerce OS ($2M+ GMV)", "DataPulse — Real-time Analytics"]
        : isAnalytics
        ? ["DataPulse — Real-time Analytics (1M events/day)", "NeuralChat — Scalable Platform"]
        : ["NeuralChat — AI Platform", "QuantumStore — E-Commerce OS"];

      const relevantSkills = isAI
        ? ["LangChain", "OpenAI API", "FastAPI", "Next.js", "Vector Databases", "RAG Systems"]
        : isEcommerce
        ? ["Next.js", "Node.js", "MongoDB", "Stripe Integration", "Redis Cache", "Elasticsearch"]
        : isAnalytics
        ? ["Next.js", "Python", "WebSockets", "D3.js", "PostgreSQL", "Real-time Processing"]
        : ["Next.js", "Python", "Node.js", "AWS", "PostgreSQL", "Docker"];

      return NextResponse.json({
        relevantProjects,
        relevantSkills,
        approach: `I'd architect this with a ${isAI ? "RAG pipeline for AI capabilities" : isEcommerce ? "microservices backend with Redis caching" : "real-time data pipeline"}, ${isAI ? "streaming responses via WebSockets" : isEcommerce ? "Stripe for payments, and Redis for cart caching" : "WebSocket connections for live updates"}, and a Next.js 15 frontend with ${isAI ? "streaming UI components" : "server-side rendering for performance"}.`,
        timeline: "MVP in 3-4 weeks, production-ready in 2-3 months",
        confidence: isAI ? 95 : isEcommerce ? 90 : 85,
      });
    }

    const prompt = `You are Uday Kumar, a Full Stack & AI Engineer. A potential client has a startup idea.

MY EXPERTISE:
- Projects: ${projects.map((p) => p.title).join(", ")}
- Skills: ${Object.values(skills).flat().map((s) => s.name).join(", ")}

CLIENT'S IDEA:
${idea}

Respond as Uday would. Return JSON with:
- relevantProjects (array of 2 project names from my portfolio that are relevant)
- relevantSkills (array of 5-6 skills I'd apply)
- approach (string: how I'd build this, 2-3 sentences)
- timeline (string: realistic timeline)
- confidence (number 0-100: how well I can build this)

Return ONLY valid JSON.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 400,
        temperature: 0.5,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.choices?.[0]?.message?.content);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Recommendation failed" }, { status: 500 });
  }
}
