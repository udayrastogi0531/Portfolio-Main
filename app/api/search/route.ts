import { NextRequest, NextResponse } from "next/server";
import { projects, skills, experiences } from "@/lib/data";
import { queryLLM } from "@/lib/ai";

export const runtime = "edge";

const MY_SKILLS = Object.values(skills).flat().map((s) => s.name);

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing or invalid search query" }, { status: 400 });
    }

    const systemPrompt = `You are a semantic search engine trained on Uday Prakash Rastogi's portfolio.
Analyzes user search query and returns the most relevant matching items from Uday's profile.

PORTFOLIO CONTENT TO MATCH:
1. PROJECTS:
${projects.map(p => `   - Title: ${p.title}\n     Description: ${p.description}\n     Tech: ${p.tech.join(", ")}\n     Link: #projects`).join("\n")}
2. SKILLS:
   - Core Skills: ${MY_SKILLS.join(", ")}\n     Link: #skills
3. EXPERIENCE:
${experiences.map(e => `   - Role: ${e.role} at ${e.company}\n     Achievements: ${e.achievements.join("; ")}\n     Link: #experience`).join("\n")}

YOUR TASK:
Find items that matches the user's intent. Even if the keywords aren't exact (e.g. "frontend" matches Next.js and React; "SaaS" or "scale" matches TechNova AI or QuantumStore).
Return EXACTLY a JSON object containing a 'results' array. Each item in 'results' must have:
- title: string name of matching entity
- type: 'project' | 'skill' | 'experience' | 'section'
- description: a short 1-sentence description explaining why this fits the user's search
- link: string anchor link (e.g. '#projects' or '#skills' or '#experience' or '#about')
- relevance: integer score (0-100) reflecting semantic alignment

Return ONLY valid JSON. Absolutely no other text or explanation.`;

    const response = await queryLLM(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user" as const, content: `Search Query:\n\n${query}` },
      ],
      {
        temperature: 0.2,
        jsonMode: true,
      }
    );

    let parsedResult;
    try {
      const responseStr = typeof response === "string" ? response : await response.text();
      const cleanJson = responseStr.replace(/```json|```/gi, "").trim();
      parsedResult = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Failed to parse LLM search results:", parseError);
      
      // Smart static search fallback in case LLM parsing fails or is empty
      const queryLower = query.toLowerCase();
      const results = [];

      // Manual matching for robust fallback
      if (queryLower.includes("react") || queryLower.includes("next") || queryLower.includes("typescript") || queryLower.includes("frontend")) {
        results.push({
          title: "Frontend Stack (Next.js, React, TypeScript)",
          type: "skill",
          description: "Core technical tools Uday uses to architect fluid interfaces and custom visual loaders.",
          link: "#skills",
          relevance: 98,
        });
      }
      if (queryLower.includes("ai") || queryLower.includes("llm") || queryLower.includes("chat") || queryLower.includes("recommender") || queryLower.includes("vector")) {
        results.push({
          title: projects[0].title,
          type: "project",
          description: "Production-grade AI chat platform with multi-model support and RAG completion.",
          link: "#projects",
          relevance: 95,
        });
        results.push({
          title: projects[2].title,
          type: "project",
          description: "Fine-tuned LLM engine that review pull requests in real time via GitHub APIs.",
          link: "#projects",
          relevance: 90,
        });
      }
      if (queryLower.includes("experience") || queryLower.includes("work") || queryLower.includes("lead") || queryLower.includes("technova")) {
        results.push({
          title: "Senior Full Stack & AI Engineer @ TechNova AI",
          type: "experience",
          description: "Leads engineering on SaaS dashboards serving over 50,000 active users globally.",
          link: "#experience",
          relevance: 95,
        });
      }

      // Default safe matches if nothing matched
      if (results.length === 0) {
        results.push({
          title: "AI Lab & Agent Platform",
          type: "section",
          description: "Interactive workspace showcasing Uday's specialized custom AI tools.",
          link: "#ai-features",
          relevance: 85,
        });
        results.push({
          title: "Technical Engineering Skills",
          type: "section",
          description: "Uday's primary tech stack across Frontend, Backend, AI, Cloud, and Databases.",
          link: "#skills",
          relevance: 80,
        });
      }

      parsedResult = { results };
    }

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("Semantic Search API route error:", error);
    return NextResponse.json({ results: [] });
  }
}
