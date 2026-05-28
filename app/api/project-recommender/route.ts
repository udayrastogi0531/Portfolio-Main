import { NextRequest, NextResponse } from "next/server";
import { projects, skills } from "@/lib/data";
import { queryLLM } from "@/lib/ai";

export const runtime = "edge";

const MY_SKILLS = Object.values(skills).flat().map((s) => s.name);
const MY_PROJECTS = projects.map((p) => p.title);

export async function POST(req: NextRequest) {
  try {
    const { idea } = await req.json();

    if (!idea || typeof idea !== "string") {
      return NextResponse.json({ error: "Missing or invalid idea string" }, { status: 400 });
    }

    const systemPrompt = `You are Uday Prakash Rastogi, a seasoned Gen AI Engineer & Full Stack Developer. 
A prospective client wants to hire you for their startup idea.

UDAY'S EXPERTISE:
- Featured Projects: ${MY_PROJECTS.join(", ")}
- Primary Skills: ${MY_SKILLS.join(", ")}

YOUR TASK:
Analyze the startup idea, provide an engineering roadmap, and show how Uday's background aligns perfectly.
Return EXACTLY a JSON object with these keys:
- relevantProjects: string[] (select 2 featured projects from Uday's profile that are most relevant)
- relevantSkills: string[] (select 5-6 technical skills Uday possesses to construct this system)
- approach: string (detailed 2-3 sentence architectural blueprint showing how you will build this)
- timeline: string (realistic milestone estimate, e.g., 'MVP in 4 weeks, Production in 3 months')
- confidence: integer between 0 and 100 (Uday's alignment and confidence score for implementation)

Return ONLY valid JSON. Absolutely no other text or explanation.`;

    const response = await queryLLM(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user" as const, content: `Startup Idea:\n\n${idea}` },
      ],
      {
        temperature: 0.5,
        jsonMode: true,
      }
    );

    let parsedResult;
    try {
      const responseStr = typeof response === "string" ? response : await response.text();
      const cleanJson = responseStr.replace(/```json|```/gi, "").trim();
      parsedResult = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Failed to parse LLM JSON response for project recommender:", parseError);
      parsedResult = {
        relevantProjects: [projects[0].title, projects[1].title],
        relevantSkills: ["Next.js", "Python", "FastAPI", "MongoDB", "LangChain"],
        approach: "Design a Next.js frontend with full reactive dashboard state. Spin up a serverless FastAPI layer to run async AI orchestration workflows with database indexing.",
        timeline: "MVP in 3 weeks, Production build in 10 weeks.",
        confidence: 90,
      };
    }

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("Project Recommender API route error:", error);
    return NextResponse.json({ error: "Recommendation failed" }, { status: 500 });
  }
}
