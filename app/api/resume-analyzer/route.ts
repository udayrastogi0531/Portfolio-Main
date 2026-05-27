import { NextRequest, NextResponse } from "next/server";
import { skills, projects } from "@/lib/data";

const MY_SKILLS = Object.values(skills).flat().map((s) => s.name);
const MY_PROJECTS = projects.map((p) => p.title);

export async function POST(req: NextRequest) {
  try {
    const { jobDescription } = await req.json();

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey === "sk-your-openai-api-key-here") {
      // Mock analysis
      const jdLower = jobDescription.toLowerCase();
      const matchedSkills = MY_SKILLS.filter((skill) =>
        jdLower.includes(skill.toLowerCase())
      );
      const matchScore = Math.min(
        95,
        Math.round(40 + (matchedSkills.length / MY_SKILLS.length) * 60 + Math.random() * 10)
      );
      const missingSkills = matchScore < 70 ? ["Rust", "Go"] : matchScore < 85 ? ["Kubernetes at scale"] : [];

      return NextResponse.json({
        matchScore,
        matchedSkills: matchedSkills.length > 0 ? matchedSkills.slice(0, 7) : ["React", "Node.js", "TypeScript"],
        missingSkills,
        strengths: [
          "Strong AI/ML background with production LLM experience",
          "Proven track record with high-scale systems (50K+ users)",
          "Full-stack expertise across the entire tech stack",
        ],
        improvements: [
          "Highlight more domain-specific metrics",
          "Emphasize leadership and team collaboration",
        ],
        verdict: matchScore >= 80
          ? "Excellent match! Uday's profile strongly aligns with this role."
          : matchScore >= 60
          ? "Good match! Uday meets most requirements with minor gaps."
          : "Partial match. Uday has transferable skills for this role.",
      });
    }

    const prompt = `You are an expert technical recruiter. Analyze this job description and compare it to this candidate profile.

CANDIDATE: Uday Kumar — Full Stack & AI Engineer
Skills: ${MY_SKILLS.join(", ")}
Projects: ${MY_PROJECTS.join(", ")}
Experience: 3+ years in Full Stack & AI development

JOB DESCRIPTION:
${jobDescription}

Return a JSON object with these exact keys:
- matchScore (number 0-100)
- matchedSkills (array of matching skills)
- missingSkills (array of skills the candidate lacks)
- strengths (array of 3 strengths)
- improvements (array of 2 suggestions)
- verdict (one sentence summary)

Return ONLY valid JSON, no explanation.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.3,
        response_format: { type: "json_object" },
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    const result = JSON.parse(content);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
