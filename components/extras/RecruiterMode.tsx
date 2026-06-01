"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import {
  X,
  Download,
  Mail,
  Briefcase,
  CheckCircle,
  Zap,
  Star,
  TrendingUp,
  Users,
  Code2,
  ArrowRight,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

const STRENGTHS = [
  { label: "Agentic AI & Workflows", detail: "LangChain · LangGraph · LLM APIs · Auto-Agents", icon: Zap,        color: "#a855f7" },
  { label: "MERN Stack Systems",    detail: "React · TypeScript · Node.js · MongoDB · Express",  icon: Code2,      color: "#06b6d4" },
  { label: "C++ & DSA Mastery",      detail: "Elite Algorithmic Problem Solving · Strong CS Foundations", icon: Users,      color: "#f59e0b" },
  { label: "RAG & Vector DBs",       detail: "Pinecone · FAISS · Semantic Search · Data Pipelines", icon: TrendingUp, color: "#10b981" },
];

const IMPACT_METRICS = [
  { value: "50K+",  label: "Users Served",     color: "#06b6d4" },
  { value: "1M+",   label: "Daily API Calls",  color: "#a855f7" },
  { value: "70%",   label: "Review Time Cut",  color: "#10b981" },
  { value: "40%",   label: "Cost Reduction",   color: "#f59e0b" },
];

export default function RecruiterMode() {
  const { isRecruiterMode, toggleRecruiterMode } = useStore();

  const logInteraction = async (action: string) => {
    try {
      const sessionId = sessionStorage.getItem("__portfolio_session") || "anonymous";
      await fetch("/api/recruiter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          action,
        }),
      });
    } catch {
      // ignore
    }
  };

  const handleToggle = () => {
    if (!isRecruiterMode) {
      logInteraction("open_recruiter_mode");
    }
    toggleRecruiterMode();
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", damping: 18 }}
        onClick={handleToggle}
        data-cursor="hover"
        className="fixed bottom-24 md:bottom-8 left-6 z-50 group"
        aria-label="Toggle recruiter view"
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all duration-300"
          style={{
            background: isRecruiterMode
              ? "linear-gradient(135deg, #10b981, #059669)"
              : "rgba(15,22,36,0.9)",
            border: isRecruiterMode
              ? "1px solid rgba(16,185,129,0.5)"
              : "1px solid rgba(30,45,61,0.8)",
            boxShadow: isRecruiterMode
              ? "0 0 20px rgba(16,185,129,0.3)"
              : "0 4px 20px rgba(0,0,0,0.4)",
            color: isRecruiterMode ? "#ffffff" : "#94a3b8",
          }}
        >
          <Briefcase size={12} />
          {isRecruiterMode ? "Exit Recruiter View" : "👔 Recruiter View"}
        </div>
      </motion.button>

      {/* Recruiter mode overlay */}
      <AnimatePresence>
        {isRecruiterMode && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] bg-black/75 backdrop-blur-md"
              onClick={toggleRecruiterMode}
            />

            {/* Panel */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 24, stiffness: 260 }}
              className="fixed inset-x-0 bottom-0 z-[310] max-h-[90vh] overflow-y-auto scrollbar-hide rounded-t-3xl"
              style={{
                background: "rgba(6,10,20,0.98)",
                border: "1px solid rgba(16,185,129,0.25)",
                boxShadow: "0 -20px 80px rgba(16,185,129,0.1), 0 -2px 0 rgba(16,185,129,0.3)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Green top bar */}
              <div className="h-1 w-full rounded-t-3xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400" />

              <div className="p-6 md:p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Briefcase size={14} className="text-emerald-400" />
                      <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-widest">
                        Recruiter Quick View
                      </span>
                    </div>
                    <h2
                      className="text-3xl font-black text-white"
                      style={{ fontFamily: "Orbitron, sans-serif" }}
                    >
                      {personalInfo.fullName}
                    </h2>
                    <p className="text-emerald-400 font-mono text-sm mt-1">
                      MERN Stack &amp; AI Engineer · Hyderabad, India
                    </p>
                  </div>
                  <button
                    onClick={toggleRecruiterMode}
                    className="p-2 rounded-xl glass text-slate-400 hover:text-white transition-colors"
                    aria-label="Close recruiter view"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Availability banner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-3 p-4 rounded-2xl mb-6"
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                >
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50" />
                  </div>
                  <div>
                    <span className="text-green-400 font-bold text-sm">Available Now</span>
                    <span className="text-slate-400 text-sm ml-2">
                      — Open to full-time roles and AI consulting
                    </span>
                  </div>
                  <Zap size={14} className="text-yellow-400 ml-auto flex-shrink-0" />
                </motion.div>

                {/* Elevator pitch */}
                <div className="glass rounded-2xl p-5 mb-6 border border-white/5">
                  <h3 className="text-white font-bold mb-2 text-sm uppercase font-mono tracking-wider">
                    Why Hire Uday?
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm">
                    I build <strong className="text-cyan-400">production-grade AI systems</strong> that run fast and perform reliably.
                    As a B.Tech CSE student and active developer, I bridge the gap between modern LLM capabilities and MERN stack engineering realities, building projects with robust architectures and elegant DSA logic.
                  </p>
                </div>

                {/* Impact metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {IMPACT_METRICS.map((m, i) => (
                    <motion.div
                      key={m.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + i * 0.07 }}
                      className="glass rounded-xl p-4 text-center"
                      style={{ border: `1px solid ${m.color}20` }}
                    >
                      <div
                        className="text-2xl font-black mb-0.5"
                        style={{ color: m.color, fontFamily: "Orbitron, sans-serif" }}
                      >
                        {m.value}
                      </div>
                      <div className="text-slate-500 text-[11px] font-mono">{m.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Core strengths */}
                <div className="grid sm:grid-cols-2 gap-3 mb-6">
                  {STRENGTHS.map(({ label, detail, icon: Icon, color }, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 + i * 0.07 }}
                      className="glass rounded-xl p-4 flex items-start gap-3 border border-transparent hover:border-cyan-500/10 transition-all"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${color}12`, border: `1px solid ${color}25` }}
                      >
                        <Icon size={16} style={{ color }} />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-sm">{label}</div>
                        <div className="text-slate-500 text-[11px] font-mono mt-0.5">{detail}</div>
                      </div>
                      <CheckCircle size={14} className="text-green-400 ml-auto flex-shrink-0 mt-0.5" />
                    </motion.div>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex flex-wrap gap-3">
                  <motion.a
                    href="/resume.pdf"
                    download
                    onClick={() => logInteraction("download_resume")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor="hover"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #06b6d4)",
                      color: "white",
                      boxShadow: "0 0 20px rgba(16,185,129,0.4)",
                    }}
                  >
                    <Download size={15} />
                    Download Resume
                  </motion.a>
                  <motion.a
                    href="mailto:udayprakashrastogi2005@gmail.com"
                    onClick={() => logInteraction("email_click")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor="hover"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm glass border border-cyan-500/25 text-cyan-300 hover:border-cyan-400/50 transition-all"
                  >
                    <Mail size={15} />
                    Email Uday Prakash Rastogi
                  </motion.a>
                  <motion.a
                    href="https://linkedin.com/in/udayrastogi0531"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => logInteraction("linkedin_click")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    data-cursor="hover"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm glass border border-blue-500/25 text-blue-300 hover:border-blue-400/50 transition-all"
                  >
                    <ArrowRight size={15} />
                    LinkedIn Profile
                  </motion.a>
                </div>

                {/* Bottom hint */}
                <p className="text-slate-600 text-[11px] font-mono text-center mt-6">
                  Explore the full portfolio above for projects, AI systems, and live demos.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
