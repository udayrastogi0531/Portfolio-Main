"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  Users,
  Code2,
  TrendingUp,
  GitCommit,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { socialLinks } from "@/lib/data";

const USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "udayrastogi0531";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  topics: string[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  Python:     "#3572a5",
  Go:         "#00add8",
  Rust:       "#dea584",
  CSS:        "#563d7c",
  HTML:       "#e34c26",
};

// Fallback static data for when API is unavailable
const FALLBACK_STATS = [
  { label: "Repositories", value: "45+",    icon: Code2,      color: "#06b6d4" },
  { label: "GitHub Stars",  value: "500+",   icon: Star,       color: "#f59e0b" },
  { label: "Followers",     value: "200+",   icon: Users,      color: "#8b5cf6" },
  { label: "Contributions", value: "1,200+", icon: TrendingUp, color: "#10b981" },
];

export default function GitHubSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch GitHub public stats (no auth needed)
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`, {
            headers: { Accept: "application/vnd.github.v3+json" },
            cache: "force-cache",
          }),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=stars&per_page=6`, {
            headers: { Accept: "application/vnd.github.v3+json" },
            cache: "force-cache",
          }),
        ]);
        if (userRes.ok) setStats(await userRes.json());
        if (reposRes.ok) setRepos(await reposRes.json());
      } catch {
        // silently fall back to static data
      } finally {
        setLoading(false);
      }
    };
    if (isInView) fetchData();
  }, [isInView]);

  const displayStats = stats
    ? [
        { label: "Repositories", value: `${stats.public_repos}+`, icon: Code2,      color: "#06b6d4" },
        { label: "Followers",    value: `${stats.followers}+`,     icon: Users,      color: "#8b5cf6" },
        { label: "Following",    value: `${stats.following}`,      icon: TrendingUp, color: "#10b981" },
        { label: "Gists",        value: `${stats.public_gists}`,   icon: GitCommit,  color: "#f59e0b" },
      ]
    : FALLBACK_STATS;

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, rgba(6,182,212,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-white/8">
            <Github size={12} className="text-white" />
            <span className="font-mono text-xs text-slate-400 tracking-wider uppercase">
              06 / GitHub Analytics
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "Orbitron, sans-serif" }}>
            Open Source{" "}
            <span className="gradient-text-cyan">Footprint</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Real-time metrics from GitHub — contributions, repos, and live project highlights.
          </p>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {displayStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="glass rounded-2xl p-5 text-center border border-transparent hover:border-cyan-500/15 transition-all relative overflow-hidden"
              >
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#0a0f1a]/50">
                    <Loader2 size={16} className="animate-spin text-cyan-400/40" />
                  </div>
                )}
                <motion.div
                  className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `${stat.color}12`, border: `1px solid ${stat.color}25` }}
                  whileHover={{ rotate: 8 }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </motion.div>
                <div className="text-3xl font-bold mb-1 tabular-nums"
                  style={{ color: stat.color, fontFamily: "Orbitron, sans-serif" }}>
                  {stat.value}
                </div>
                <div className="text-slate-400 text-xs font-mono">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Top Repos */}
        {repos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mb-10"
          >
            <h3 className="text-white font-bold font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <Star size={14} className="text-yellow-400" />
              Top Repositories
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.06 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  data-cursor="hover"
                  className="glass rounded-2xl p-5 border border-transparent hover:border-cyan-500/20 transition-all group block"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-white font-bold text-sm group-hover:text-cyan-300 transition-colors truncate flex-1">
                      {repo.name}
                    </span>
                    <ExternalLink size={12} className="text-slate-500 group-hover:text-cyan-400 flex-shrink-0 ml-2 mt-0.5 transition-colors" />
                  </div>
                  {repo.description && (
                    <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <div className="flex items-center gap-1.5">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: LANG_COLORS[repo.language] || "#94a3b8" }}
                        />
                        <span className="text-slate-500 text-[10px] font-mono">{repo.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 ml-auto">
                      <Star size={10} className="text-yellow-400" />
                      <span className="text-slate-400 text-[10px] font-mono">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={10} className="text-slate-500" />
                      <span className="text-slate-400 text-[10px] font-mono">{repo.forks_count}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="glass rounded-2xl p-6 border border-white/5"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-400 text-xs font-mono uppercase tracking-widest flex items-center gap-2">
              <GitCommit size={12} className="text-cyan-400" />
              Contribution Activity
            </span>
            <motion.a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              data-cursor="hover"
              className="flex items-center gap-1.5 font-mono text-[11px] text-cyan-400 hover:text-white transition-colors"
            >
              <Github size={12} />
              @{USERNAME}
              <ExternalLink size={9} />
            </motion.a>
          </div>
          <img
            src={`https://ghchart.rshah.org/06b6d4/${USERNAME}`}
            alt="GitHub contribution heatmap"
            className="w-full max-w-3xl mx-auto rounded-lg"
            style={{ filter: "opacity(0.85) saturate(1.2)" }}
            loading="lazy"
          />
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-slate-600 text-[10px] font-mono">Less</span>
            {["#1a2e1a", "#1e4d1e", "#2d7a2d", "#3ba83b", "#4bde4b"].map((c) => (
              <div key={c} className="w-3 h-3 rounded-sm" style={{ background: c }} />
            ))}
            <span className="text-slate-600 text-[10px] font-mono">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
