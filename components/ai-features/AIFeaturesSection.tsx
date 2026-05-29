"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AIResumeAnalyzer from "./AIResumeAnalyzer";
import AIProjectRecommender from "./AIProjectRecommender";
import { Bot, Terminal, FileSearch, Lightbulb, Zap } from "lucide-react";
import { useStore } from "@/store";

const AI_FEATURES_INFO = [
  {
    icon: Bot,
    title: "ARIA Chat Assistant",
    desc: "Ask anything about Uday — projects, skills, availability. Trained on portfolio data.",
    color: "#8b5cf6",
    action: "Open Chat",
  },
  {
    icon: Terminal,
    title: "AI Terminal",
    desc: "Command-line interface with 10+ portfolio commands. Press ` to open.",
    color: "#06b6d4",
    action: "Open Terminal",
  },
  {
    icon: FileSearch,
    title: "Resume Analyzer",
    desc: "Paste a job description and instantly see Uday's match percentage.",
    color: "#10b981",
    action: "Scroll Below",
  },
  {
    icon: Lightbulb,
    title: "Project Recommender",
    desc: "Describe your startup idea — AI suggests how Uday can build it.",
    color: "#f59e0b",
    action: "Scroll Below",
  },
];

export default function AIFeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toggleChat, toggleTerminal } = useStore();

  return (
    <section id="ai-features" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 aurora-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-2 mb-6">
            <Zap size={12} className="text-purple-400" />
            <span className="font-mono text-xs text-purple-400 tracking-wider uppercase">
              05 / AI Lab
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-white">Intelligent</span>{" "}
            <span className="gradient-text-purple">Features</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            This portfolio isn&apos;t just a website — it&apos;s an AI-powered experience.
            Interact with real artificial intelligence built to help you learn about Uday.
          </p>
        </motion.div>

        {/* Feature overview cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {AI_FEATURES_INFO.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => {
                  if (feature.icon === Bot) toggleChat();
                  if (feature.icon === Terminal) toggleTerminal();
                }}
                className="glass rounded-2xl p-6 cursor-pointer border border-transparent hover:border-cyan-500/20 transition-all duration-300 group"
                data-cursor="hover"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}30` }}
                >
                  <Icon size={22} style={{ color: feature.color }} />
                </div>
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{feature.desc}</p>
                <span
                  className="font-mono text-xs font-medium"
                  style={{ color: feature.color }}
                >
                  {feature.action} →
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive AI tools */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <AIResumeAnalyzer />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <AIProjectRecommender />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
