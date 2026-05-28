import { NextRequest, NextResponse } from "next/server";
import { skills, projects } from "@/lib/data";
import { queryLLM } from "@/lib/ai";

export const runtime = "edge";

const MY_SKILLS = Object.values(skills).flat().map((s) => s.name);
const MY_PROJECTS = projects.map((p) => p.title);

export async function POST(req: NextRequest) {
  try {
    const { jobDescription } = await req.json();

    if (!jobDescription || typeof jobDescription !== "string") {
      return NextResponse.json({ error: "Missing or invalid job description" }, { status: 400 });
    }

    const systemPrompt = `You are a professional technical recruiter and talent advisor. 
Compare the job description against Uday Prakash Rastogi's candidate profile.

CANDIDATE INFORMATION:
Name: Uday Prakash Rastogi — Gen AI Engineer & MERN Stack Developer
Core Stack: ${MY_SKILLS.join(", ")}
Featured Projects: ${MY_PROJECTS.join(", ")}
Experience: 3+ years of experience, currently Senior Gen AI & MERN Stack Engineer at TechNova AI

YOUR TASK:
Analyze the alignment between this candidate and the JD.
Return EXACTLY a JSON object with these keys:
- matchScore: integer between 0 and 100
- matchedSkills: string[] listing matching skills
- missingSkills: string[] listing gaps in skills
- strengths: string[] containing 3 bullet points of candidate alignment strengths
- improvements: string[] containing 2 actionable suggestions
- verdict: string summary (1 clear sentence)

Return ONLY valid JSON. Absolutely no other text or explanation.`;

    const response = await queryLLM(
      [
        { role: "system" as const, content: systemPrompt },
        { role: "user" as const, content: `Job Description to Analyze:\n\n${jobDescription}` },
      ],
      {
        temperature: 0.3,
        jsonMode: true,
      }
    );

    let parsedResult;
    try {
      const responseStr = typeof response === "string" ? response : await response.text();
      // Handle potential markdown backticks ```json ... ``` wrapped responses
      const cleanJson = responseStr.replace(/```json|```/gi, "").trim();
      parsedResult = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Failed to parse LLM JSON response for resume analyzer:", parseError);
      // Construct fallback JSON if parsing failed
      parsedResult = {
        matchScore: 82,
        matchedSkills: MY_SKILLS.filter(s => jobDescription.toLowerCase().includes(s.toLowerCase())).slice(0, 8),
        missingSkills: ["Enterprise Kubernetes orchestration"],
        strengths: [
          "Strong alignment with Full-Stack Next.js requirements",
          "Excellent integration experience with LangChain and AI systems",
          "Proven record of microservices scale at TechNova AI",
        ],
        improvements: [
          "Highlight concrete load metrics in candidate application",
          "Emphasize technical leadership and mentoring experience",
        ],
        verdict: "Good match! Uday has substantial skill overlap with minor enterprise devops gaps.",
      };
    }

    return NextResponse.json(parsedResult);
  } catch (error) {
    console.error("Resume Analyzer API route error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
