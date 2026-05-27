"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Star, GitFork, Users, Code2, TrendingUp } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/data";
import Image from "next/image";

const GITHUB_STATS = [
  { label: "Repositories", value: "45+", icon: Code2, color: "#06b6d4" },
  { label: "GitHub Stars", value: `${personalInfo.githubStars}+`, icon: Star, color: "#f59e0b" },
  { label: "Followers", value: "200+", icon: Users, color: "#8b5cf6" },
  { label: "Contributions", value: "1,200+", icon: TrendingUp, color: "#10b981" },
];

export default function GitHubSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "udaykumar";

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-white/10">
            <Github size={12} className="text-white" />
            <span className="font-mono text-xs text-slate-400 tracking-wider uppercase">
              GitHub Analytics
            </span>
          </div>
          <h2
            className="text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Open Source <span className="gradient-text-cyan">Footprint</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {GITHUB_STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass rounded-2xl p-5 text-center border border-transparent hover:border-cyan-500/20 transition-all"
              >
                <Icon size={24} className="mx-auto mb-3" style={{ color: stat.color }} />
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: stat.color, fontFamily: "Orbitron, sans-serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm font-mono">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* GitHub contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <p className="text-slate-400 text-sm font-mono mb-4">Contribution Activity</p>
          <img
            src={`https://ghchart.rshah.org/06b6d4/${username}`}
            alt="GitHub contribution chart"
            className="w-full max-w-3xl mx-auto rounded-lg"
            style={{ filter: "opacity(0.9)" }}
          />
          <div className="mt-4">
            <motion.a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 magnetic-btn magnetic-btn-outline text-sm"
              data-cursor="hover"
            >
              <Github size={16} />
              @{username} on GitHub
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
