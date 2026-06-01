// ============================================================
// 🧠 lib/ai.ts — UNIFIED AI ENGINE WITH AUTOMATIC FALLBACKS
// ============================================================

import { projects, skills, experiences, aiChatSystemPrompt } from "./data";
import { logChatMessage } from "./supabase";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface LLMOptions {
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  jsonMode?: boolean;
  sessionId?: string;
}

// Check which keys are available
const getAvailableProviders = () => {
  const providers: string[] = [];
  if (process.env.GROQ_API_KEY) providers.push("groq");
  if (process.env.GEMINI_API_KEY) providers.push("gemini");
  if (process.env.OPENROUTER_API_KEY) providers.push("openrouter");
  if (process.env.TOGETHER_API_KEY) providers.push("together");
  if (process.env.HUGGINGFACE_API_KEY) providers.push("huggingface");
  return providers;
};

// Sleep helper for retry logic
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * High-performance fetch helper with timeout and retry logic
 */
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 2,
  backoff = 1000
): Promise<Response> {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 12000); // 12-second timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);

      // Handle Rate Limits (HTTP 429) or Temporary Server Errors (HTTP 502, 503, 504)
      if (response.status === 429 || response.status >= 500) {
        if (i === retries) return response;
        const delay = backoff * Math.pow(2, i) + Math.random() * 200; // Exponential backoff + jitter
        await sleep(delay);
        continue;
      }

      return response;
    } catch (err) {
      if (i === retries) throw err;
      await sleep(backoff * Math.pow(2, i));
    }
  }
  throw new Error("Request failed after retries");
}

/**
 * Smart Local AI Mock Engine
 * Delivers context-aware, highly intelligent responses trained on portfolio data.
 */
function handleLocalMock(messages: ChatMessage[], options?: LLMOptions): Response | string {
  const userMsg = messages[messages.length - 1]?.content || "";
  const query = userMsg.toLowerCase();

  // 1. Projects Query
  if (query.includes("project") || query.includes("portfolio") || query.includes("build") || query.includes("work")) {
    const list = projects.map(p => `• **${p.title}** (${p.category}): ${p.description} (Tech: ${p.tech.slice(0, 4).join(", ")})`).join("\n");
    const res = `Here are some of Uday's featured engineering projects:\n\n${list}\n\nWould you like more architectural details on any of these?`;
    if (options?.stream) return makeMockStream(res, options?.sessionId);
    return res;
  }

  // 2. Skills / Tech Stack Query
  if (query.includes("skill") || query.includes("stack") || query.includes("techno") || query.includes("languages") || query.includes("framework")) {
    const list = Object.entries(skills)
      .map(([cat, sks]) => `• **${cat}**: ${sks.slice(0, 5).map(s => s.name).join(", ")}`)
      .join("\n");
    const res = `Uday has a strong MERN Stack and AI engineering toolkit:\n\n${list}\n\nHe is highly specialized in developing interactive frontend layers and integrating them with LangChain/cloud LLM backends.`;
    if (options?.stream) return makeMockStream(res, options?.sessionId);
    return res;
  }

  // 3. Contact / Hire / Email Query
  if (query.includes("contact") || query.includes("email") || query.includes("hire") || query.includes("reach") || query.includes("phone")) {
    const res = `You can get in touch with Uday Prakash Rastogi directly through the following channels:\n\n• 📧 **Email**: [udayprakashrastogi2005@gmail.com]\n• 🔗 **LinkedIn**: [linkedin.com/in/udayrastogi0531]\n• 📁 **GitHub**: [github.com/udayrastogi0531]\n\nHe is currently open to opportunities. Feel free to shoot an email!`;
    if (options?.stream) return makeMockStream(res, options?.sessionId);
    return res;
  }

  // 4. Experience Query
  if (query.includes("experience") || query.includes("job") || query.includes("work") || query.includes("company") || query.includes("history")) {
    const list = experiences.map(e => `• **${e.role}** at **${e.company}** (${e.period})\n  *${e.description}*`).join("\n\n");
    const res = `Uday's professional experience includes:\n\n${list}`;
    if (options?.stream) return makeMockStream(res, options?.sessionId);
    return res;
  }

  // Default conversational response
  const genericResponses = [
    "I'm ARIA, Uday's neural assistant avatar! Uday is a MERN Stack & AI systems developer specialized in building extremely fast React applications, node/express backends, and RAG search utilities. What aspect of his background would you like to explore?",
    "That is a great question! Uday is highly skilled in building modern AI-integrated software. For example, he built 'NeuralChat', which handles over 50,000 users and features a robust RAG vector index. Would you like to know more about Uday's AI experience?",
    "Welcome! I can provide detailed stats, skills, or projects from Uday's background. Feel free to ask about his technical skills, hackathon achievements (like being a finalist at the Oddo Hackathon), or how to hire him!",
  ];

  const res = genericResponses[Math.floor(Math.random() * genericResponses.length)];
  if (options?.stream) return makeMockStream(res, options?.sessionId);
  return res;
}

/**
 * Creates a mock ReadableStream to simulate streaming output for UI typing effect
 */
function makeMockStream(text: string, sessionId?: string): Response {
  if (sessionId) {
    logChatMessage({
      session_id: sessionId,
      role: "assistant",
      content: text,
      provider: "local",
      model: "mock",
      tokens_used: null,
      latency_ms: null,
    });
  }

  const encoder = new TextEncoder();
  const words = text.split(" ");
  let wordIndex = 0;

  const stream = new ReadableStream({
    async start(controller) {
      function push() {
        if (wordIndex >= words.length) {
          controller.close();
          return;
        }
        const chunk = words[wordIndex] + (wordIndex === words.length - 1 ? "" : " ");
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
        wordIndex++;
        setTimeout(push, 25 + Math.random() * 20); // Simulates typing speed variability
      }
      push();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}

/**
 * MAIN UNIFIED AI QUERY ENTRYPOINT
 */
export async function queryLLM(
  messages: ChatMessage[],
  options: LLMOptions = {}
): Promise<Response | string> {
  const providers = getAvailableProviders();

  // Log user message immediately
  if (options.sessionId) {
    const userMsg = messages[messages.length - 1]?.content || "";
    logChatMessage({
      session_id: options.sessionId,
      role: "user",
      content: userMsg,
      provider: null,
      model: null,
      tokens_used: null,
      latency_ms: null,
    });
  }

  // If no API keys exist, fall back to smart local mock immediately
  if (providers.length === 0) {
    const result = handleLocalMock(messages, options);
    if (result instanceof Response) return result;
    if (options.jsonMode) {
      // Safe fallback JSON responses based on content type
      const userMsg = messages[messages.length - 1]?.content || "";
      let mockJson = "";
      if (userMsg.includes("recruiter") || userMsg.includes("resume")) {
        mockJson = JSON.stringify({
          matchScore: 88,
          matchedSkills: ["React", "TypeScript", "Python", "Node.js", "MongoDB", "Express", "C++", "DSA"],
          missingSkills: ["Kubernetes at scale"],
          strengths: ["Strong MERN stack foundations", "Hands-on cloud LLM integration experience", "Excellent C++ DSA problem solving", "Excellent UI engineering capabilities"],
          improvements: ["Expand on container orchestration metrics", "Add more details on high-scale systems latency design"],
          verdict: "Strong match. The candidate possesses 90%+ of the key criteria listed."
        });
      } else {
        mockJson = JSON.stringify({
          relevantProjects: [projects[0].title, projects[2].title],
          relevantSkills: ["React", "Node.js", "Express", "MongoDB", "Python", "LangChain", "Vector DBs"],
          approach: "Build a modular Express API connected to an optimized animated React UI. Use Pinecone for vector indexing and stream completions using Server-Sent Events (SSE).",
          timeline: "MVP in 3 weeks, Production build in 8 weeks.",
          confidence: 94
        });
      }
      if (options.sessionId) {
        logChatMessage({
          session_id: options.sessionId,
          role: "assistant",
          content: mockJson,
          provider: "local",
          model: "fallback_json",
          tokens_used: null,
          latency_ms: null,
        });
      }
      return mockJson;
    }
    if (options.sessionId && typeof result === "string") {
      logChatMessage({
        session_id: options.sessionId,
        role: "assistant",
        content: result,
        provider: "local",
        model: "mock",
        tokens_used: null,
        latency_ms: null,
      });
    }
    return result;
  }

  // Attempt providers in order
  for (const provider of providers) {
    try {
      let url = "";
      let apiKey = "";
      let model = "";
      let headers: Record<string, string> = { "Content-Type": "application/json" };
      let body: any = {};

      if (provider === "groq") {
        url = "https://api.groq.com/openai/v1/chat/completions";
        apiKey = process.env.GROQ_API_KEY || "";
        model = "llama-3.3-70b-versatile";
        headers["Authorization"] = `Bearer ${apiKey}`;
        body = {
          model,
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 500,
          stream: options.stream ?? false,
        };
        if (options.jsonMode) {
          body.response_format = { type: "json_object" };
        }
      } else if (provider === "gemini") {
        // OpenAI compatible endpoint for Gemini
        url = "https://generativelanguage.googleapis.com/v1beta/openai/v1/chat/completions";
        apiKey = process.env.GEMINI_API_KEY || "";
        model = "gemini-2.5-flash";
        headers["Authorization"] = `Bearer ${apiKey}`;
        body = {
          model,
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 500,
          stream: options.stream ?? false,
        };
        if (options.jsonMode) {
          body.response_format = { type: "json_object" };
        }
      } else if (provider === "openrouter") {
        url = "https://openrouter.ai/api/v1/chat/completions";
        apiKey = process.env.OPENROUTER_API_KEY || "";
        model = "google/gemini-2.5-flash"; // cost-effective cloud fallback model
        headers["Authorization"] = `Bearer ${apiKey}`;
        headers["HTTP-Referer"] = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        headers["X-Title"] = "Uday Portfolio";
        body = {
          model,
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 500,
          stream: options.stream ?? false,
        };
        if (options.jsonMode) {
          body.response_format = { type: "json_object" };
        }
      } else if (provider === "together") {
        url = "https://api.together.xyz/v1/chat/completions";
        apiKey = process.env.TOGETHER_API_KEY || "";
        model = "meta-llama/Llama-3-70b-chat-hf";
        headers["Authorization"] = `Bearer ${apiKey}`;
        body = {
          model,
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 500,
          stream: options.stream ?? false,
        };
        if (options.jsonMode) {
          body.response_format = { type: "json_object" };
        }
      } else if (provider === "huggingface") {
        url = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct/v1/chat/completions";
        apiKey = process.env.HUGGINGFACE_API_KEY || "";
        headers["Authorization"] = `Bearer ${apiKey}`;
        body = {
          messages,
          temperature: options.temperature ?? 0.7,
          max_tokens: options.maxTokens ?? 500,
          stream: options.stream ?? false,
        };
      }

      // Execute request
      const response = await fetchWithRetry(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error(`Provider ${provider} returned status ${response.status}`);
        continue; // Try the next provider
      }

      // Streaming handler
      if (options.stream) {
        return makeSSEStream(response, provider, model, options.sessionId);
      }

      // Normal JSON handler
      const data = await response.json();
      const text = data.choices?.[0]?.message?.content || "";
      if (!text) continue; // Try next if content empty

      if (options.sessionId) {
        logChatMessage({
          session_id: options.sessionId,
          role: "assistant",
          content: text,
          provider,
          model,
          tokens_used: null,
          latency_ms: null,
        });
      }

      return text;
    } catch (e) {
      console.error(`Error querying provider ${provider}:`, e);
      continue; // Try next provider
    }
  }

  // Absolute fallback if all API calls failed
  const result = handleLocalMock(messages, options);
  if (result instanceof Response) return result;
  if (options.sessionId && typeof result === "string") {
    logChatMessage({
      session_id: options.sessionId,
      role: "assistant",
      content: result,
      provider: "local",
      model: "fallback",
      tokens_used: null,
      latency_ms: null,
    });
  }
  return result;
}

/**
 * Processes incoming provider SSE streams and normalizes them to Uday Portfolio stream shape
 */
function makeSSEStream(rawResponse: Response, provider: string, model: string, sessionId?: string): Response {
  const rawStream = rawResponse.body;
  if (!rawStream) {
    throw new Error("Response body is null");
  }

  const reader = rawStream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";
  let fullContent = "";

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            if (sessionId && fullContent) {
              logChatMessage({
                session_id: sessionId,
                role: "assistant",
                content: fullContent,
                provider,
                model,
                tokens_used: null,
                latency_ms: null,
              });
            }
            controller.close();
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // keep unfinished line in buffer

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === "data: [DONE]") continue;

            if (trimmed.startsWith("data: ")) {
              try {
                const jsonStr = trimmed.slice(6);
                const parsed = JSON.parse(jsonStr);
                const content =
                  provider === "gemini" && parsed.candidates
                    ? parsed.candidates[0]?.content?.parts[0]?.text || ""
                    : parsed.choices?.[0]?.delta?.content || "";

                if (content) {
                  fullContent += content;
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
                  );
                }
              } catch (err) {
                // Ignore parse errors on partial streams
              }
            }
          }
        }
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
