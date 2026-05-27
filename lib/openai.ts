import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const isMockMode = process.env.NEXT_PUBLIC_AI_MOCK_MODE === "true" || !process.env.OPENAI_API_KEY;

export const mockResponses = [
  "I'm ARIA, Uday's AI assistant! I'd be happy to tell you about his projects, skills, or how to get in touch. What would you like to know?",
  "Uday is a Full Stack & AI Engineer with 3+ years of experience. He specializes in Next.js, Python, LangChain, and building production AI systems. Want to know more about his work?",
  "Uday has built amazing projects like NeuralChat (50K users), QuantumStore ($2M+ GMV), and CodeSentinel (500+ developers). Which project interests you?",
  "You can reach Uday at [udayprakashrastogi2005@gmail.com] or connect on LinkedIn. He typically responds within 24 hours and is currently open to new opportunities!",
  "Uday's tech stack includes Next.js, React, TypeScript, Python, FastAPI, LangChain, OpenAI, AWS, Docker, PostgreSQL, and MongoDB. He's especially strong in AI/ML integrations.",
];

export function getMockResponse(): string {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}
