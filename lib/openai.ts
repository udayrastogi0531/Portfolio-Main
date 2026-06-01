import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const isMockMode = process.env.NEXT_PUBLIC_AI_MOCK_MODE === "true" || !process.env.OPENAI_API_KEY;

export const mockResponses = [
  "I'm ARIA, Uday's AI assistant! I'd be happy to tell you about his projects, skills, or how to get in touch. What would you like to know?",
  "Uday is a MERN Stack & AI Engineer currently studying B.Tech CSE at Oriental Institute of Science and Technology. He has completed C++ Programming and Frontend Development internships at CodSoft and TechnoHacks, and is a Google Campus Ambassador!",
  "Uday has built amazing projects like NeuralChat (50K users), QuantumStore ($2M+ GMV), CodeSentinel (500+ developers), and AlgoMaster (100+ C++ animations). Which project interests you?",
  "You can reach Uday at [udayprakashrastogi2005@gmail.com] or connect on LinkedIn. He typically responds within 24 hours and is currently open to new opportunities!",
  "Uday's tech stack includes React, Node.js, Express, MongoDB, TypeScript, C++, Python, LangChain, OpenAI APIs, Pinecone/FAISS, and Supabase. He's especially strong in MERN stack and AI/ML integrations.",
];

export function getMockResponse(): string {
  return mockResponses[Math.floor(Math.random() * mockResponses.length)];
}
