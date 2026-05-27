"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/lib/data";

const CATEGORIES = Object.keys(skills);
const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#06b6d4",
  Backend: "#8b5cf6",
  "AI/ML": "#10b981",
  Cloud: "#f59e0b",
  Database: "#ec4899",
  DevOps: "#3b82f6",
};

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("AI/ML");

  const activeSkills = skills[activeCategory as keyof typeof skills] || [];
  const color = CATEGORY_COLORS[activeCategory] || "#06b6d4";

  return (
    <section id="skills" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              03 / Skills
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-white">Neural</span>{" "}
            <span className="gradient-text-cyan">Skill Matrix</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Technologies I wield to build production-grade AI systems and digital experiences.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => {
            const catColor = CATEGORY_COLORS[cat] || "#06b6d4";
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="hover"
                className="px-5 py-2.5 rounded-xl font-mono text-sm transition-all duration-300"
                style={{
                  background: isActive ? `${catColor}20` : "rgba(15,22,36,0.6)",
                  border: `1px solid ${isActive ? catColor : "rgba(30,45,61,0.8)"}`,
                  color: isActive ? catColor : "#94a3b8",
                  boxShadow: isActive ? `0 0 20px ${catColor}30` : "none",
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {activeSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass rounded-2xl p-5 group cursor-default border border-transparent transition-all duration-300"
              style={{
                ["--hover-color" as string]: color,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${color}30`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${color}10, 0 10px 40px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "transparent";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Skill name and level */}
              <div className="flex justify-between items-start mb-3">
                <span className="text-white font-semibold">{skill.name}</span>
                <span
                  className="font-mono text-xs font-bold"
                  style={{ color }}
                >
                  {skill.level}%
                </span>
              </div>

              {/* Skill bar */}
              <div className="skill-bar rounded-full">
                <motion.div
                  className="skill-bar-fill rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 1.2, ease: "easeOut" }}
                  style={{
                    background: `linear-gradient(90deg, ${color}, ${color}cc)`,
                  }}
                />
              </div>

              {/* Proficiency label */}
              <div className="mt-2 text-xs text-slate-500 font-mono">
                {skill.level >= 90
                  ? "Expert"
                  : skill.level >= 80
                  ? "Advanced"
                  : skill.level >= 70
                  ? "Proficient"
                  : "Intermediate"}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom: All categories summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
        >
          {CATEGORIES.map((cat) => {
            const catSkills = skills[cat as keyof typeof skills];
            const avgLevel = Math.round(
              catSkills.reduce((acc, s) => acc + s.level, 0) / catSkills.length
            );
            const catColor = CATEGORY_COLORS[cat] || "#06b6d4";
            return (
              <motion.div
                key={cat}
                whileHover={{ scale: 1.05, y: -3 }}
                onClick={() => setActiveCategory(cat)}
                className="glass rounded-xl p-4 text-center cursor-pointer border border-transparent hover:border-cyan-500/20 transition-all duration-200"
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: catColor, fontFamily: "Orbitron, sans-serif" }}
                >
                  {avgLevel}%
                </div>
                <div className="text-slate-400 text-xs font-mono">{cat}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
