"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";
import { personalInfo, education, hobbies } from "@/lib/data";
import { Target, Lightbulb, Rocket, Heart, GraduationCap, MapPin, Calendar } from "lucide-react";

const STATS = [
  { value: 2, suffix: "+", label: "Years Experience", icon: Calendar },
  { value: 25, suffix: "+", label: "Projects Built", icon: Rocket },
  { value: 5, suffix: "+", label: "Happy Clients", icon: Heart },
  { value: 20, suffix: "+", label: "GitHub Stars", icon: Target },
];

const TRAITS = [
  {
    icon: Target,
    label: "Mission-Driven",
    desc: "Every project has a purpose. I build for impact, not just code.",
    color: "#06b6d4",
  },
  {
    icon: Lightbulb,
    label: "Problem Solver",
    desc: "Complex problems are just undiscovered solutions waiting to be found.",
    color: "#8b5cf6",
  },
  {
    icon: Rocket,
    label: "Rapid Builder",
    desc: "From idea to production in record time without sacrificing quality.",
    color: "#10b981",
  },
  {
    icon: Heart,
    label: "Craft-Obsessed",
    desc: "The details matter. I obsess over performance, UX, and clean architecture.",
    color: "#ec4899",
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 aurora-bg opacity-65" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-600/8 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              01 / About
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold gradient-text mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            The Mind Behind
            <br />
            <span className="gradient-text-cyan">The Machine</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
            {personalInfo.mission}
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="glass-cyan rounded-2xl p-6 text-center hover:border-cyan-400/40 transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <Icon
                  size={24}
                  className="text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform"
                />
                <div
                  className="text-4xl font-bold gradient-text-cyan mb-1"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {isInView && (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      delay={i * 0.2}
                      suffix={stat.suffix}
                    />
                  )}
                </div>
                <div className="text-slate-400 text-sm font-mono">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Bio + profile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55 }}
          >
            {/* Floating profile card */}
            <div className="holographic-card rounded-3xl p-8 mb-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 flex gap-1">
                {["#f59e0b", "#10b981", "#06b6d4"].map((c) => (
                  <div
                    key={c}
                    className="w-3 h-3 rounded-full"
                    style={{ background: c }}
                  />
                ))}
              </div>

              <div className="flex items-start gap-6">
                {/* Professional Avatar */}
                <div className="w-20 h-20 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-cyan-500/30 group">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.fullName}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {personalInfo.fullName}
                  </h3>
                  <p className="text-cyan-400 font-mono text-sm mb-3">
                  AI Engineer & MERN Stack Developer
                  </p>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <MapPin size={14} />
                    {personalInfo.location}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm font-mono">
                      {personalInfo.availability}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              {personalInfo.bio}
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 italic border-l-2 border-cyan-500/50 pl-4">
              &ldquo;{personalInfo.philosophy}&rdquo;
            </p>

            {/* Education */}
            {education.map((edu) => (
              <div
                key={edu.id}
                className="glass rounded-2xl p-5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} className="text-cyan-400" />
                </div>
                <div>
                  <div className="text-white font-semibold">{edu.degree}</div>
                  <div className="text-cyan-400 text-sm font-mono">{edu.institution}</div>
                  <div className="text-slate-500 text-sm mt-1">
                    {edu.period} · {edu.grade}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right: Traits */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="space-y-4"
          >
            <h3
              className="text-2xl font-bold text-white mb-6"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              My Mindset
            </h3>
            {TRAITS.map((trait, i) => {
              const Icon = trait.icon;
              return (
                <motion.div
                  key={trait.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 8, scale: 1.01 }}
                  className="glass rounded-2xl p-5 flex items-start gap-4 cursor-default border border-transparent hover:border-cyan-500/20 transition-all duration-300"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${trait.color}15`, border: `1px solid ${trait.color}30` }}
                  >
                    <Icon size={22} style={{ color: trait.color }} />
                  </div>
                  <div>
                    <div className="text-white font-semibold mb-1">{trait.label}</div>
                    <div className="text-slate-400 text-sm leading-relaxed">{trait.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Hobbies & Storytelling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.55 }}
          className="mt-16 border-t border-white/5 pt-14"
        >
          <h3
            className="text-3xl font-bold text-center text-white mb-12"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            Behind the Code: <span className="gradient-text-cyan">Creative Universe</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hobbies.map((h, i) => (
              <motion.div
                key={h.name}
                whileHover={{ y: -8, scale: 1.03 }}
                className="glass rounded-2xl p-6 cursor-default relative overflow-hidden group border border-transparent hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300 origin-left">{h.icon}</div>
                <h4 className="text-white font-bold text-base mb-1 font-display" style={{ fontFamily: "Orbitron, sans-serif" }}>{h.name}</h4>
                <p className="text-slate-400 text-xs leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
