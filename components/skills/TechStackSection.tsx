"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { techStack } from "@/lib/data";

// Color rotation for tech badges
const COLORS = [
  "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b", "#ec4899",
  "#3b82f6", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b",
];

export default function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h3
            className="text-3xl font-bold text-white mb-3"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Full <span className="gradient-text-cyan">Tech Arsenal</span>
          </h3>
          <p className="text-slate-400">Technologies powering every project</p>
        </motion.div>

        {/* Scrolling marquee effect */}
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[#050508] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[#050508] to-transparent pointer-events-none" />

          {/* Row 1: left scroll */}
          <motion.div
            className="flex gap-4 mb-4 w-max"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...techStack, ...techStack].map((tech, i) => (
              <motion.div
                key={`${tech}-${i}`}
                whileHover={{ scale: 1.1, y: -3 }}
                onHoverStart={() => setHoveredTech(tech)}
                onHoverEnd={() => setHoveredTech(null)}
                className="flex-shrink-0 glass rounded-xl px-5 py-3 cursor-default border border-transparent transition-all"
                style={{
                  borderColor: hoveredTech === tech ? COLORS[i % COLORS.length] + "40" : "transparent",
                  boxShadow: hoveredTech === tech ? `0 0 20px ${COLORS[i % COLORS.length]}20` : "none",
                }}
              >
                <span
                  className="font-mono text-sm font-medium"
                  style={{ color: hoveredTech === tech ? COLORS[i % COLORS.length] : "#94a3b8" }}
                >
                  {tech}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Row 2: right scroll */}
          <motion.div
            className="flex gap-4 w-max"
            animate={{ x: [-1000, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          >
            {[...techStack.slice(5), ...techStack.slice(5)].map((tech, i) => (
              <motion.div
                key={`${tech}-r-${i}`}
                whileHover={{ scale: 1.1, y: -3 }}
                className="flex-shrink-0 glass-purple rounded-xl px-5 py-3 cursor-default"
              >
                <span className="font-mono text-sm text-slate-400">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
