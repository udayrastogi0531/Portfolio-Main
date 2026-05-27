"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Upload, Zap, CheckCircle, AlertCircle, Loader2, BarChart3 } from "lucide-react";

interface AnalysisResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  strengths: string[];
  improvements: string[];
  verdict: string;
}

export default function AIResumeAnalyzer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [jd, setJd] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeResume = async () => {
    if (!jd.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/resume-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jd }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      // Mock result for demo
      setResult({
        matchScore: 87,
        matchedSkills: ["Next.js", "React", "TypeScript", "Python", "Node.js", "AWS", "Docker"],
        missingSkills: ["Kubernetes at scale", "Rust"],
        strengths: [
          "Strong AI/ML background with LangChain expertise",
          "Production experience with similar tech stack",
          "Proven track record with high-scale systems",
        ],
        improvements: [
          "Consider adding Kubernetes orchestration experience",
          "Highlight specific metrics from similar domain",
        ],
        verdict: "Excellent match! Uday's profile strongly aligns with this role.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <div ref={ref} className="glass rounded-3xl p-8 border border-cyan-500/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
          <FileText size={20} className="text-cyan-400" />
        </div>
        <div>
          <h3 className="text-white font-bold">AI Resume Analyzer</h3>
          <p className="text-slate-400 text-sm">Paste a job description to see Uday&apos;s match score</p>
        </div>
      </div>

      {!result ? (
        <div className="space-y-4">
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            placeholder="Paste the job description here...&#10;&#10;Example: We're looking for a Senior Full Stack Engineer with experience in React, Node.js, Python, and cloud infrastructure..."
            className="input-field h-40 resize-none"
            id="jd-input"
          />
          <motion.button
            onClick={analyzeResume}
            disabled={!jd.trim() || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full magnetic-btn magnetic-btn-primary flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Zap size={16} />
                Analyze Match
              </>
            )}
          </motion.button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Match score */}
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(30,45,61,0.8)" strokeWidth="8" />
                <circle
                  cx="50" cy="50" r="40" fill="none"
                  stroke={getScoreColor(result.matchScore)}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.matchScore / 100)}`}
                  style={{ transition: "stroke-dashoffset 1.5s ease" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-bold text-xl" style={{ color: getScoreColor(result.matchScore), fontFamily: "Orbitron, sans-serif" }}>
                  {result.matchScore}%
                </span>
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-lg mb-1">Match Score</div>
              <p className="text-slate-400 text-sm">{result.verdict}</p>
            </div>
          </div>

          {/* Matched skills */}
          <div>
            <h4 className="text-green-400 text-sm font-mono uppercase tracking-wide mb-2 flex items-center gap-2">
              <CheckCircle size={14} /> Matched Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {result.matchedSkills.map((skill) => (
                <span key={skill} className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-mono">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Missing skills */}
          {result.missingSkills.length > 0 && (
            <div>
              <h4 className="text-amber-400 text-sm font-mono uppercase tracking-wide mb-2 flex items-center gap-2">
                <AlertCircle size={14} /> Gaps to Bridge
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.missingSkills.map((skill) => (
                  <span key={skill} className="text-xs px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Strengths */}
          <div>
            <h4 className="text-cyan-400 text-sm font-mono uppercase tracking-wide mb-2">Strengths</h4>
            <ul className="space-y-1.5">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => { setResult(null); setJd(""); }}
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors font-mono"
          >
            ← Analyze another JD
          </button>
        </motion.div>
      )}
    </div>
  );
}
