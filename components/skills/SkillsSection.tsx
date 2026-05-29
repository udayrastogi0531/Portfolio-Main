"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Categories ────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "dsa",
    icon: "🧠",
    label: "Programming & DSA",
    accent: "#f59e0b",
    skills: [
      "C++", "DSA", "Problem Solving", "Python",
      "Dynamic Programming", "Graph Algorithms",
      "Data Structures", "Competitive Programming",
    ],
  },
  {
    id: "genai",
    icon: "🤖",
    label: "Gen AI & Agentic AI",
    accent: "#10b981",
    skills: [
      "LangChain", "LangGraph", "RAG", "Hugging Face",
      "Ollama", "Pinecone", "FAISS", "Vector Databases",
      "Groq API", "OpenAI APIs", "OpenRouter",
      "Google AI Studio", "Agentic AI",
    ],
  },
  {
    id: "frontend",
    icon: "⚛️",
    label: "Frontend",
    accent: "#8b5cf6",
    skills: [
      "React", "TypeScript", "HTML5", "CSS3",
      "JavaScript", "Next.js", "Framer Motion", "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    icon: "🌐",
    label: "Backend & MERN",
    accent: "#06b6d4",
    skills: [
      "Node.js", "MongoDB", "REST APIs", "Firebase",
      "Express.js", "PostgreSQL", "Supabase",
    ],
  },
  {
    id: "devops",
    icon: "🚀",
    label: "DevOps & Deployment",
    accent: "#ec4899",
    skills: [
      "Git", "GitHub", "Vercel", "Railway",
      "Netlify", "Streamlit", "Resend API", "Docker (basics)",
    ],
  },
  {
    id: "core",
    icon: "🖥️",
    label: "Core CS",
    accent: "#a78bfa",
    skills: [
      "DBMS", "Computer Networks", "Operating Systems",
      "Compiler Design", "Software Engineering",
      "ADA / Algorithms", "Project Management",
    ],
  },
] as const;

type CategoryId = (typeof CATEGORIES)[number]["id"];

// ── Skill proficiency map ─────────────────────────────────────
const PROFICIENCY: Record<string, number> = {
  "C++": 95, "DSA": 94, "Problem Solving": 95, "Python": 88,
  "Dynamic Programming": 90, "Graph Algorithms": 88,
  "Data Structures": 94, "Competitive Programming": 86,
  "LangChain": 95, "LangGraph": 90, "RAG": 95, "Hugging Face": 85,
  "Ollama": 88, "Pinecone": 90, "FAISS": 88, "Vector Databases": 90,
  "Groq API": 95, "OpenAI APIs": 94, "OpenRouter": 92,
  "Google AI Studio": 90, "Agentic AI": 92,
  "React": 95, "TypeScript": 92, "HTML5": 97, "CSS3": 93,
  "JavaScript": 95, "Next.js": 94, "Framer Motion": 88, "Tailwind CSS": 93,
  "Node.js": 90, "MongoDB": 92, "REST APIs": 95, "Firebase": 85,
  "Express.js": 90, "PostgreSQL": 82, "Supabase": 88,
  "Git": 96, "GitHub": 96, "Vercel": 95, "Railway": 88,
  "Netlify": 90, "Streamlit": 85, "Resend API": 90, "Docker (basics)": 72,
  "DBMS": 92, "Computer Networks": 88, "Operating Systems": 90,
  "Compiler Design": 85, "Software Engineering": 92,
  "ADA / Algorithms": 90, "Project Management": 88,
};

const getTag = (lvl: number) =>
  lvl >= 92 ? "Expert" : lvl >= 82 ? "Advanced" : "Proficient";

// ── SkillCard — takes `hasAnimated` flag to avoid re-animating on tab switch ──
function SkillCard({
  name,
  accent,
  index,
  isInView,
  hasAnimated,
  onAnimated,
}: {
  name: string;
  accent: string;
  index: number;
  isInView: boolean;
  hasAnimated: boolean;
  onAnimated: (name: string) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const lvl = PROFICIENCY[name] ?? 80;
  const tag = getTag(lvl);
  const shouldAnimate = isInView && !hasAnimated;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: hasAnimated ? 0 : 0.05 + index * 0.04, duration: 0.45, ease: [0.25, 1, 0.35, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-xl p-4 cursor-default overflow-hidden group"
      style={{
        background: hovered ? `${accent}0e` : "rgba(11,24,40,0.7)",
        border: `1px solid ${hovered ? accent + "50" : "rgba(30,45,61,0.7)"}`,
        boxShadow: hovered ? `0 0 20px ${accent}18, 0 8px 32px rgba(0,0,0,0.3)` : "none",
        transition: "all 0.25s ease",
      }}
    >
      {/* Shimmer on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{
            background: `linear-gradient(105deg, transparent 20%, ${accent}10 50%, transparent 80%)`,
          }}
        />
      )}

      {/* Glow dot top-right */}
      <div
        className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full transition-all duration-300"
        style={{
          background: accent,
          opacity: hovered ? 1 : 0.35,
          boxShadow: hovered ? `0 0 6px ${accent}` : "none",
        }}
      />

      {/* Skill name */}
      <div
        className="text-sm font-semibold mb-2.5 pr-4 leading-tight transition-colors duration-200"
        style={{ color: hovered ? accent : "#e2e8f0" }}
      >
        {name}
      </div>

      {/* Progress bar — only animates once */}
      <div
        className="h-[3px] rounded-full mb-2 overflow-hidden"
        style={{ background: "rgba(30,45,61,0.9)" }}
      >
        <motion.div
          className="h-full rounded-full relative"
          initial={{ width: hasAnimated ? `${lvl}%` : 0 }}
          animate={isInView ? { width: `${lvl}%` } : { width: 0 }}
          transition={
            shouldAnimate
              ? { delay: 0.1 + index * 0.04, duration: 0.8, ease: "easeOut" }
              : { duration: 0 }
          }
          onAnimationComplete={() => {
            if (shouldAnimate) onAnimated(name);
          }}
          style={{
            background: `linear-gradient(90deg, ${accent}bb, ${accent})`,
            boxShadow: hovered ? `0 0 5px ${accent}80` : "none",
          }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
            style={{ background: accent }}
          />
        </motion.div>
      </div>

      {/* Level + tag */}
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-mono uppercase tracking-wider"
          style={{ color: `${accent}90` }}
        >
          {tag}
        </span>
        <span
          className="text-[11px] font-mono font-bold"
          style={{ color: accent }}
        >
          {lvl}%
        </span>
      </div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────
export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState<CategoryId>("dsa");

  // Track which skills have already animated — so switching tabs doesn't reset bars
  const animatedSkills = useRef<Set<string>>(new Set());
  const handleAnimated = useCallback((name: string) => {
    animatedSkills.current.add(name);
  }, []);

  const activeCategory = CATEGORIES.find((c) => c.id === activeId)!;
  const handleTab = useCallback((id: CategoryId) => setActiveId(id), []);

  const totalSkills = CATEGORIES.reduce((a, c) => a + c.skills.length, 0);

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(245,158,11,0.05) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 55%)",
        }}
      />

      <div className="section-container relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-5">
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              03 / Skills
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-white">Neural </span>
            <span className="gradient-text-cyan">Skill Matrix</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-6">
            Full-stack expertise — from low-level algorithms to cloud-scale AI systems.
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { label: `${totalSkills} Technologies`, color: "#06b6d4" },
              { label: "6 Domains", color: "#8b5cf6" },
              { label: "Expert Level AI", color: "#10b981" },
              { label: "3+ Years", color: "#f59e0b" },
            ].map((s) => (
              <span
                key={s.label}
                className="text-xs font-mono px-3 py-1.5 rounded-full"
                style={{
                  color: s.color,
                  background: `${s.color}12`,
                  border: `1px solid ${s.color}25`,
                }}
              >
                {s.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Category Tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeId === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => handleTab(cat.id as CategoryId)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="relative px-4 py-2.5 rounded-xl font-mono text-sm transition-all duration-250 overflow-hidden"
                style={{
                  background: isActive ? `${cat.accent}16` : "rgba(11,24,40,0.8)",
                  border: `1px solid ${isActive ? cat.accent + "55" : "rgba(30,45,61,0.8)"}`,
                  color: isActive ? cat.accent : "#94a3b8",
                  boxShadow: isActive ? `0 0 20px ${cat.accent}20` : "none",
                }}
              >
                <span className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
                    style={{
                      background: `${cat.accent}18`,
                      color: `${cat.accent}cc`,
                      border: `1px solid ${cat.accent}20`,
                    }}
                  >
                    {cat.skills.length}
                  </span>
                </span>

                {/* Active underline */}
                {isActive && (
                  <motion.div
                    layoutId="skill-tab-underline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full"
                    style={{ background: cat.accent }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Category Panel Header ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId + "-header"}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-3 mb-6 px-1"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{
                background: `${activeCategory.accent}15`,
                border: `1px solid ${activeCategory.accent}30`,
              }}
            >
              {activeCategory.icon}
            </div>
            <div>
              <h3
                className="text-lg font-bold"
                style={{ color: activeCategory.accent, fontFamily: "Orbitron, sans-serif" }}
              >
                {activeCategory.label}
              </h3>
              <p className="text-slate-500 text-sm font-mono">
                {activeCategory.skills.length} skills · hover any card for details
              </p>
            </div>
            {/* Top accent bar */}
            <div
              className="ml-auto h-[2px] w-20 rounded-full opacity-50"
              style={{ background: `linear-gradient(90deg, transparent, ${activeCategory.accent})` }}
            />
          </motion.div>
        </AnimatePresence>

        {/* ── Skills Grid ── */}
        {/* NOTE: We DON'T use AnimatePresence key={activeId} here — that would remount
            the SkillCard components and re-trigger bar animations. Instead, we just
            animate the container opacity/y. The bars themselves track animation state
            via the persistent `animatedSkills` ref. */}
        <motion.div
          key={activeId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.35, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-12"
        >
          {activeCategory.skills.map((skill, i) => (
            <SkillCard
              key={skill}
              name={skill}
              accent={activeCategory.accent}
              index={i}
              isInView={isInView}
              hasAnimated={animatedSkills.current.has(skill)}
              onAnimated={handleAnimated}
            />
          ))}
        </motion.div>

        {/* ── Domain Summary Bars ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {CATEGORIES.map((cat) => {
            const avg = Math.round(
              cat.skills.reduce((a, s) => a + (PROFICIENCY[s] ?? 80), 0) / cat.skills.length
            );
            const isActive = activeId === cat.id;
            return (
              <motion.button
                key={cat.id}
                onClick={() => handleTab(cat.id as CategoryId)}
                whileHover={{ y: -4, scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative rounded-xl p-4 text-center overflow-hidden transition-all duration-250"
                style={{
                  background: isActive ? `${cat.accent}10` : "rgba(11,24,40,0.7)",
                  border: `1px solid ${isActive ? cat.accent + "45" : "rgba(30,45,61,0.6)"}`,
                  boxShadow: isActive ? `0 0 16px ${cat.accent}18` : "none",
                }}
              >
                <div className="text-xl mb-1">{cat.icon}</div>
                <div
                  className="text-2xl font-bold mb-0.5"
                  style={{ color: cat.accent, fontFamily: "Orbitron, sans-serif" }}
                >
                  {avg}%
                </div>
                <div className="text-slate-500 text-[10px] font-mono uppercase tracking-wider leading-tight">
                  {cat.label}
                </div>
                {/* Fill bar */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: avg / 100 } : { scaleX: 0 }}
                  style={{
                    background: cat.accent,
                    opacity: isActive ? 0.7 : 0.2,
                    transformOrigin: "left",
                  }}
                />
              </motion.button>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
