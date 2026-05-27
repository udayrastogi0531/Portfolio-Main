"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Send, Loader2, ArrowRight, Zap } from "lucide-react";

interface Recommendation {
  relevantProjects: string[];
  relevantSkills: string[];
  approach: string;
  timeline: string;
  confidence: number;
}

export default function AIProjectRecommender() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = async () => {
    if (!idea.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/project-recommender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      // Mock result
      setResult({
        relevantProjects: ["NeuralChat — AI conversation platform", "CodeSentinel — AI code review"],
        relevantSkills: ["LangChain", "OpenAI API", "Next.js", "FastAPI", "Vector Databases"],
        approach: "I'd architect this with a RAG pipeline for knowledge retrieval, streaming responses via WebSockets, and a Next.js frontend with real-time updates.",
        timeline: "MVP in 3-4 weeks, production-ready in 2-3 months",
        confidence: 92,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={ref} className="glass rounded-3xl p-8 border border-purple-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
          <Lightbulb size={20} className="text-purple-400" />
        </div>
        <div>
          <h3 className="text-white font-bold">AI Project Recommender</h3>
          <p className="text-slate-400 text-sm">Describe your startup idea — see how Uday can help</p>
        </div>
      </div>

      {!result ? (
        <div className="space-y-4">
          <div className="relative">
            <textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="Describe your startup idea...&#10;&#10;Example: An AI-powered customer support platform that learns from past tickets and automatically resolves 80% of queries..."
              className="input-field h-36 resize-none pr-4"
              id="idea-input"
            />
          </div>
          <motion.button
            onClick={getRecommendations}
            disabled={!idea.trim() || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white transition-all disabled:opacity-40"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #8b5cf6)",
              boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)",
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                AI is thinking...
              </>
            ) : (
              <>
                <Zap size={16} />
                Get Recommendations
              </>
            )}
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Confidence */}
          <div className="flex items-center gap-4 glass-purple rounded-xl p-4">
            <div className="text-3xl font-bold text-purple-400" style={{ fontFamily: "Orbitron, sans-serif" }}>
              {result.confidence}%
            </div>
            <div>
              <div className="text-white font-semibold">Alignment Score</div>
              <div className="text-slate-400 text-sm">How well I can tackle this</div>
            </div>
          </div>

          {/* Approach */}
          <div>
            <h4 className="text-purple-400 text-sm font-mono uppercase tracking-wide mb-2">My Approach</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{result.approach}</p>
          </div>

          {/* Relevant projects */}
          <div>
            <h4 className="text-purple-400 text-sm font-mono uppercase tracking-wide mb-2">Similar Work I've Done</h4>
            <div className="space-y-2">
              {result.relevantProjects.map((p, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                  <ArrowRight size={14} className="text-purple-400 mt-0.5 flex-shrink-0" />
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Relevant skills */}
          <div>
            <h4 className="text-purple-400 text-sm font-mono uppercase tracking-wide mb-2">Skills I'd Apply</h4>
            <div className="flex flex-wrap gap-2">
              {result.relevantSkills.map((s) => (
                <span key={s} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Zap size={14} className="text-purple-400" />
            <span>Estimated timeline: <span className="text-white font-medium">{result.timeline}</span></span>
          </div>

          <button
            onClick={() => { setResult(null); setIdea(""); }}
            className="text-sm text-slate-400 hover:text-purple-400 transition-colors font-mono"
          >
            ← Try another idea
          </button>
        </motion.div>
      )}
    </div>
  );
}
