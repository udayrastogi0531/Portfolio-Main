"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { problemSolving } from "@/lib/data";
import {
  ExternalLink, Code2, Leaf, Layers, Trophy, Flame,
  Target, TrendingUp, Star, Zap, CheckCircle2, Circle
} from "lucide-react";

// ── Helpers ─────────────────────────────────────────────────────
const LEVEL_LABEL = ["", "Beginner", "Intermediate", "Advanced"] as const;
const LEVEL_COLOR = ["", "#06b6d4", "#8b5cf6", "#10b981"] as const;
const LEVEL_PCT   = [0, 40, 70, 95] as const;

const STAT_ICON_MAP: Record<string, React.ElementType> = {
  code: Code2, leaf: Leaf, layers: Layers, trophy: Trophy, flame: Flame,
};

// ── Animated counter ────────────────────────────────────────────
function Counter({ target, suffix, color, isInView }: {
  target: number; suffix: string; color: string; isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!isInView || hasRun.current) return;
    hasRun.current = true;
    const duration = 1400;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span style={{ color }}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

// ── Platform card ───────────────────────────────────────────────
function PlatformCard({
  platform, isInView, delay = 0,
}: {
  platform: "leetcode" | "gfg"; isInView: boolean; delay?: number;
}) {
  const lc = problemSolving.leetcode;
  const gfg = problemSolving.gfg;
  const isLC = platform === "leetcode";

  const config = isLC
    ? {
        name: "LeetCode",
        emoji: "🟡",
        accent: "#f59e0b",
        url: lc.profileUrl,
        rows: [
          { label: "Total Solved",     value: lc.totalSolved,    suffix: "+" },
          { label: "Easy",             value: lc.easy,           suffix: "", color: "#10b981" },
          { label: "Medium",           value: lc.medium,         suffix: "", color: "#f59e0b" },
          { label: "Hard",             value: lc.hard,           suffix: "", color: "#ef4444" },
          { label: "Contest Rating",   value: lc.contestRating,  suffix: "" },
          { label: "Global Rank",      value: lc.globalRank,     suffix: "", isText: true },
          { label: "Streak",           value: lc.streak,         suffix: "d" },
          { label: "Badges Earned",    value: lc.badgesEarned,   suffix: "" },
        ],
        barData: [
          { label: "Easy",   count: lc.easy,   total: lc.totalSolved, color: "#10b981" },
          { label: "Medium", count: lc.medium, total: lc.totalSolved, color: "#f59e0b" },
          { label: "Hard",   count: lc.hard,   total: lc.totalSolved, color: "#ef4444" },
        ],
      }
    : {
        name: "GeeksforGeeks",
        emoji: "🟢",
        accent: "#10b981",
        url: gfg.profileUrl,
        rows: [
          { label: "Total Solved",     value: gfg.totalSolved,    suffix: "+" },
          { label: "Coding Score",     value: gfg.codingScore,    suffix: "" },
          { label: "Institute Rank",   value: `#${gfg.instituteRank}`, suffix: "", isText: true },
          { label: "Monthly Score",    value: gfg.monthlyScore,   suffix: "" },
          { label: "Current Streak",   value: gfg.currentStreak,  suffix: "d" },
        ],
        barData: [] as { label: string; count: number; total: number; color: string }[],
      };

  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.25, 1, 0.35, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-6 flex flex-col gap-5 h-full"
      style={{
        background: hovered ? `${config.accent}08` : "rgba(11,24,40,0.8)",
        border: `1px solid ${hovered ? config.accent + "45" : "rgba(30,45,61,0.8)"}`,
        boxShadow: hovered ? `0 0 40px ${config.accent}15, 0 12px 40px rgba(0,0,0,0.35)` : "0 4px 20px rgba(0,0,0,0.25)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Glow accent top bar */}
      <motion.div
        className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
        style={{ background: config.accent, opacity: hovered ? 0.7 : 0.2 }}
        animate={{ opacity: hovered ? 0.7 : 0.2 }}
      />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${config.accent}15`, border: `1px solid ${config.accent}30` }}
          >
            {config.emoji}
          </div>
          <div>
            <div className="text-white font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
              {config.name}
            </div>
            <div className="text-slate-500 text-[11px] font-mono">@{isLC ? lc.username : gfg.username}</div>
          </div>
        </div>
        <a
          href={config.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono transition-all duration-200 hover:scale-105"
          style={{
            color: config.accent,
            background: `${config.accent}12`,
            border: `1px solid ${config.accent}25`,
          }}
        >
          <ExternalLink size={10} />
          Profile
        </a>
      </div>

      {/* Stats rows */}
      <div className="space-y-2.5">
        {config.rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <span className="text-slate-500 text-[12px] font-mono">{row.label}</span>
            <span
              className="font-bold text-sm"
              style={{ color: (row as { color?: string }).color ?? config.accent }}
            >
              {(row as { isText?: boolean }).isText
                ? String(row.value)
                : isInView
                  ? typeof row.value === "number"
                    ? `${row.value.toLocaleString()}${row.suffix ?? ""}`
                    : row.value
                  : "—"}
            </span>
          </div>
        ))}
      </div>

      {/* Difficulty bars (LeetCode only) */}
      {config.barData.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-white/5">
          <div className="text-[10px] font-mono text-slate-600 uppercase tracking-wider">Problem Distribution</div>
          {config.barData.map((b) => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="text-[11px] font-mono w-14 text-slate-400">{b.label}</span>
              <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(30,45,61,0.9)" }}>
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${(b.count / b.total) * 100}%` } : { width: 0 }}
                  transition={{ delay: delay + 0.4, duration: 0.9, ease: "easeOut" }}
                  style={{ background: b.color }}
                />
              </div>
              <span className="text-[11px] font-mono" style={{ color: b.color }}>{b.count}</span>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ── DSA topic row ────────────────────────────────────────────────
function TopicRow({
  name, level, problems, isInView, index,
}: {
  name: string; level: 1 | 2 | 3; problems: number; isInView: boolean; index: number;
}) {
  const color = LEVEL_COLOR[level];
  const label = LEVEL_LABEL[level];
  const pct   = LEVEL_PCT[level];
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.04 + index * 0.035, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200"
      style={{
        background: hovered ? `${color}08` : "transparent",
        border: `1px solid ${hovered ? color + "30" : "transparent"}`,
      }}
    >
      {/* Status dot */}
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />

      {/* Name */}
      <span className="text-slate-300 text-sm font-medium flex-1 min-w-0 truncate">{name}</span>

      {/* Problem count */}
      <span className="text-[11px] font-mono text-slate-600 flex-shrink-0">{problems}p</span>

      {/* Progress bar */}
      <div className="w-20 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(30,45,61,0.9)" }}>
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ delay: 0.1 + index * 0.03, duration: 0.7, ease: "easeOut" }}
          style={{ background: `linear-gradient(90deg, ${color}aa, ${color})` }}
        />
      </div>

      {/* Level badge */}
      <span
        className="text-[10px] font-mono px-2 py-0.5 rounded-full flex-shrink-0 w-24 text-center"
        style={{
          color,
          background: `${color}14`,
          border: `1px solid ${color}25`,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function ProblemSolvingDashboard() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="problem-solving"
      ref={ref}
      className="py-20 relative overflow-x-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 10% 40%, rgba(245,158,11,0.05) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 90% 60%, rgba(16,185,129,0.04) 0%, transparent 50%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section-container relative z-10">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-5">
            <Target size={12} className="text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              04 / Problem Solving
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-white">Problem Solving </span>
            <span className="gradient-text-cyan">Dashboard</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Building strong algorithmic foundations through consistent practice, data structures, and real-world problem solving.
          </p>
        </motion.div>

        {/* ── Stat cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {problemSolving.stats.map((stat, i) => {
            const Icon = STAT_ICON_MAP[stat.icon] ?? Code2;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20, scale: 0.92 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: [0.25, 1, 0.35, 1] }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="relative rounded-2xl p-5 flex flex-col items-center text-center gap-2 cursor-default group"
                style={{
                  background: "rgba(11,24,40,0.8)",
                  border: `1px solid rgba(30,45,61,0.8)`,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.border = `1px solid ${stat.color}45`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${stat.color}15, 0 12px 40px rgba(0,0,0,0.35)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.border = "1px solid rgba(30,45,61,0.8)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.25)";
                }}
              >
                {/* Glow dot */}
                <div
                  className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{ background: stat.color, boxShadow: `0 0 6px ${stat.color}` }}
                />

                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}
                >
                  <Icon size={18} style={{ color: stat.color }} />
                </div>

                {/* Value */}
                <div
                  className="text-2xl font-black leading-none"
                  style={{ fontFamily: "Orbitron, sans-serif", color: stat.color }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} color={stat.color} isInView={isInView} />
                </div>

                {/* Label */}
                <div className="text-[11px] font-mono text-slate-500 leading-tight">{stat.label}</div>

                {/* Bottom fill bar */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.7 }}
                  style={{ background: stat.color, opacity: 0.4, transformOrigin: "left" }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── Platform cards + DSA grid ── */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">

          {/* Platform cards — left 2 cols */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 lg:grid-cols-1 gap-5">
            <PlatformCard platform="leetcode" isInView={isInView} delay={0.12} />
            <PlatformCard platform="gfg"      isInView={isInView} delay={0.22} />
          </div>

          {/* DSA Mastery Grid — right 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="lg:col-span-3 rounded-2xl p-6"
            style={{
              background: "rgba(11,24,40,0.8)",
              border: "1px solid rgba(30,45,61,0.8)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.25)" }}>
                <Layers size={16} className="text-cyan-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm" style={{ fontFamily: "Orbitron, sans-serif" }}>DSA Mastery Grid</div>
                <div className="text-slate-500 text-[11px] font-mono">15 topics · hover to explore</div>
              </div>
              {/* Legend */}
              <div className="ml-auto flex items-center gap-3">
                {(["Beginner", "Intermediate", "Advanced"] as const).map((l, li) => (
                  <div key={l} className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: LEVEL_COLOR[li + 1] }} />
                    <span className="text-[10px] font-mono text-slate-600 hidden sm:block">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic rows */}
            <div className="space-y-0.5">
              {problemSolving.dsaTopics.map((topic, i) => (
                <TopicRow
                  key={topic.name}
                  name={topic.name}
                  level={topic.level as 1 | 2 | 3}
                  problems={topic.problems}
                  isInView={isInView}
                  index={i}
                />
              ))}
            </div>

            {/* Summary pills */}
            <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/5">
              {[
                { label: `${problemSolving.dsaTopics.filter(t => t.level === 3).length} Advanced`, color: "#10b981" },
                { label: `${problemSolving.dsaTopics.filter(t => t.level === 2).length} Intermediate`, color: "#8b5cf6" },
                { label: `${problemSolving.dsaTopics.reduce((a, t) => a + t.problems, 0)}+ Problems`, color: "#06b6d4" },
              ].map(p => (
                <span key={p.label} className="text-[11px] font-mono px-2.5 py-1 rounded-full"
                  style={{ color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}25` }}>
                  {p.label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Current Focus + Timeline ── */}
        <div className="grid md:grid-cols-5 gap-8">

          {/* Current Focus — 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="md:col-span-2 rounded-2xl p-6"
            style={{
              background: "rgba(11,24,40,0.8)",
              border: "1px solid rgba(30,45,61,0.8)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(236,72,153,0.12)", border: "1px solid rgba(236,72,153,0.25)" }}>
                <Zap size={14} className="text-pink-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm" style={{ fontFamily: "Orbitron, sans-serif" }}>Current Focus</div>
                <div className="text-slate-500 text-[11px] font-mono">Active study areas</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {problemSolving.currentFocus.map((item, i) => (
                <motion.span
                  key={item.tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.07, duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium cursor-default"
                  style={{
                    color: item.color,
                    background: `${item.color}12`,
                    border: `1px solid ${item.color}35`,
                    boxShadow: `0 0 12px ${item.color}10`,
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: item.color, boxShadow: `0 0 5px ${item.color}` }}
                  />
                  {item.tag}
                </motion.span>
              ))}
            </div>

            {/* Interview ready badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="mt-5 flex items-center gap-2.5 p-3.5 rounded-xl"
              style={{
                background: "rgba(16,185,129,0.06)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <CheckCircle2 size={16} className="text-green-400 flex-shrink-0" />
              <div>
                <div className="text-green-400 text-sm font-semibold">Interview Ready</div>
                <div className="text-slate-500 text-[11px] font-mono">320+ solved · consistent practice · CS fundamentals</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Timeline — 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="md:col-span-3 rounded-2xl p-6"
            style={{
              background: "rgba(11,24,40,0.8)",
              border: "1px solid rgba(30,45,61,0.8)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.25)" }}>
                <TrendingUp size={14} className="text-amber-400" />
              </div>
              <div>
                <div className="text-white font-bold text-sm" style={{ fontFamily: "Orbitron, sans-serif" }}>Coding Journey</div>
                <div className="text-slate-500 text-[11px] font-mono">Consistent growth over the years</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <motion.div
                className="absolute left-[19px] top-0 w-[2px] rounded-full"
                initial={{ height: 0 }}
                animate={isInView ? { height: "100%" } : { height: 0 }}
                transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
                style={{ background: "linear-gradient(180deg, #06b6d4, #8b5cf6, #10b981, #f59e0b)" }}
              />

              <div className="space-y-6 pl-12">
                {problemSolving.milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -16 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.45 + i * 0.12, duration: 0.45 }}
                    className="relative group"
                  >
                    {/* Dot */}
                    <div
                      className="absolute -left-[48px] top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all duration-200 group-hover:scale-110"
                      style={{
                        background: `${m.color}20`,
                        borderColor: m.color,
                        boxShadow: `0 0 10px ${m.color}40`,
                      }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                    </div>

                    {/* Year pill */}
                    <div
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold mb-1"
                      style={{ color: m.color, background: `${m.color}15`, border: `1px solid ${m.color}30` }}
                    >
                      {m.year}
                    </div>

                    {/* Title */}
                    <div className="text-white font-semibold text-sm mb-1 group-hover:text-cyan-300 transition-colors">
                      {m.title}
                    </div>

                    {/* Description */}
                    <p className="text-slate-500 text-[12px] leading-relaxed">
                      {m.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
