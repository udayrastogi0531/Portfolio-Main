"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { experiences } from "@/lib/data";
import { MapPin, Calendar, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section id="experience" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 aurora-bg opacity-50" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/6 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              02 / Experience
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="gradient-text-cyan">Career</span>
            <br />
            <span className="text-white">Journey</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Building production systems and leading teams across AI, SaaS, and e-commerce.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent transform md:-translate-x-1/2" />

          {experiences.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const isExpanded = expanded === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className={`relative flex items-start mb-8 ${
                  isLeft ? "md:flex-row-reverse" : "md:flex-row"
                } flex-row`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full border-2 border-[#050816] transform -translate-x-1/2 z-10 flex-shrink-0"
                  style={{
                    background: exp.color,
                    boxShadow: `0 0 0 3px ${exp.color}40, 0 0 15px ${exp.color}60`,
                    top: "24px",
                  }}
                />

                {/* Card */}
                <div
                  className={`w-full md:w-[calc(50%-32px)] ml-16 md:ml-0 ${
                    isLeft ? "md:mr-8" : "md:ml-8"
                  }`}
                >
                  <motion.div
                    layout
                    className="glass rounded-2xl overflow-hidden border border-transparent hover:border-cyan-500/20 transition-all duration-300 cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : exp.id)}
                    whileHover={{ scale: 1.01 }}
                    style={{
                      boxShadow: isExpanded
                        ? `0 0 30px ${exp.color}20, 0 20px 60px rgba(0,0,0,0.4)`
                        : undefined,
                    }}
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          {/* Type badge */}
                          <span
                            className="font-mono text-xs px-2 py-1 rounded-md mb-3 inline-block"
                            style={{
                              background: `${exp.color}15`,
                              color: exp.color,
                              border: `1px solid ${exp.color}30`,
                            }}
                          >
                            {exp.type}
                          </span>

                          <h3 className="text-lg font-bold text-white mb-1">
                            {exp.role}
                          </h3>
                          <div
                            className="font-semibold text-lg mb-2"
                            style={{ color: exp.color }}
                          >
                            {exp.company}
                          </div>

                          <div className="flex flex-wrap gap-3 text-slate-400 text-sm">
                            <span className="flex items-center gap-1">
                              <Calendar size={12} />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={12} />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <button
                          className="text-slate-400 hover:text-cyan-400 transition-colors mt-1 flex-shrink-0"
                          aria-label="Toggle details"
                        >
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="px-6 pb-6 border-t border-white/5"
                      >
                        <div className="pt-4 space-y-4">
                          {/* Achievements */}
                          <div>
                            <h4 className="text-sm font-semibold text-cyan-400 mb-3 font-mono uppercase tracking-wide">
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, j) => (
                                <motion.li
                                  key={j}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: j * 0.05 }}
                                  className="flex items-start gap-2 text-sm text-slate-300"
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                    style={{ background: exp.color }}
                                  />
                                  {achievement}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Tech stack */}
                          <div>
                            <h4 className="text-sm font-semibold text-cyan-400 mb-3 font-mono uppercase tracking-wide">
                              Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((tech) => (
                                <span
                                  key={tech}
                                  className="font-mono text-xs px-3 py-1 rounded-full"
                                  style={{
                                    background: `${exp.color}10`,
                                    color: exp.color,
                                    border: `1px solid ${exp.color}25`,
                                  }}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
