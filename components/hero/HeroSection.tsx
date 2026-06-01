"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  ChevronDown,
  ArrowRight,
  Zap,
  Activity,
  Cpu,
  Globe,
} from "lucide-react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });
const VoiceIntro = dynamic(() => import("./VoiceIntro"), { ssr: false });

import { useStore } from "@/store";

const TAGLINES = personalInfo.taglines;

// Shared helper — scrolls to a section id accounting for fixed navbar height
const scrollNavTo = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 72;
  window.scrollTo({ top, behavior: "smooth" });
};

export default function HeroSection() {
  const { isLoaded } = useStore();
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLElement>(null);

  // Spring-based mouse parallax using framer-motion
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 18 });

  // Derived parallax transforms for multiple depth layers
  const layer1X = useTransform(springX, (v) => v * 0.4);
  const layer1Y = useTransform(springY, (v) => v * 0.2);
  const layer2X = useTransform(springX, (v) => v * -0.6);
  const layer2Y = useTransform(springY, (v) => v * -0.35);
  const layer3X = useTransform(springX, (v) => v * 0.2);
  const layer3Y = useTransform(springY, (v) => v * 0.15);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    rawX.set(x);
    rawY.set(y);
  }, [rawX, rawY]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Typewriter effect
  useEffect(() => {
    const current = TAGLINES[taglineIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, displayText.length + 1));
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(current.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setTaglineIndex((i) => (i + 1) % TAGLINES.length);
          }
        }
      },
      isDeleting ? 55 : 95
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, taglineIndex]);

  const TECH_BADGES = [
    { label: "LLMs & Gen AI", color: "#06b6d4", icon: Globe },
    { label: "LangChain + OpenAI", color: "#a855f7", icon: Activity },
    { label: "React Three Fiber", color: "#10b981", icon: Cpu },
    { label: "AWS + Docker", color: "#f59e0b", icon: Globe },
    { label: "Python + FastAPI", color: "#3b82f6", icon: Zap },
  ];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-neural-bg"
    >
      {/* ── 3D Canvas Background ── */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* ── Radial Vignette ── */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(5,5,8,0.7) 80%, rgba(5,5,8,0.95) 100%)",
        }}
      />

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-1 bg-gradient-to-t from-[#050816] to-transparent pointer-events-none" />

      {/* ── Side fades ── */}
      <div className="absolute top-0 left-0 bottom-0 w-32 z-1 bg-gradient-to-r from-[#050816]/80 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-32 z-1 bg-gradient-to-l from-[#050816]/60 to-transparent pointer-events-none" />

      {/* ── Animated grid overlay (parallax layer 3) ── */}
      <motion.div
        style={{ x: layer3X, y: layer3Y }}
        className="absolute inset-0 z-1 opacity-15 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.12) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      {/* ── Main Content ── */}
      <div className="relative z-10 section-container w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* ── Left: Text ── */}
          <motion.div style={{ x: layer1X, y: layer1Y }}>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
              transition={{ delay: 0.1, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              className="inline-flex items-center gap-2.5 glass-cyan rounded-full px-5 py-2.5 mb-8 hero-badge-glow"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="font-mono text-xs text-cyan-300 tracking-widest uppercase">
                Available for Work
              </span>
              <Zap size={11} className="text-cyan-400" />
            </motion.div>

            {/* Main name — with letter stagger */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="text-5xl md:text-7xl lg:text-[7rem] font-black leading-none mb-2 hero-name"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                <span className="gradient-text-cyan text-glow-cyan inline-block">
                  {personalInfo.name.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                      transition={{
                        delay: 0.15 + i * 0.03,
                        duration: 0.35,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </motion.div>

            {/* Typewriter tagline */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-center gap-3 mb-7 h-10"
            >
              <span className="font-mono text-cyan-400/50 text-xl">{">"}</span>
              <span className="font-mono text-xl md:text-2xl text-slate-300 font-medium">
                {displayText}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                  className="text-cyan-400 ml-0.5"
                >
                  █
                </motion.span>
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mb-8"
            >
              {personalInfo.shortBio}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex gap-8 mb-10"
            >
              {[
                { value: `${personalInfo.yearsOfExperience}+`, label: "Years Exp" },
                { value: `${personalInfo.projectsCompleted}+`, label: "Projects" },
                { value: `${personalInfo.githubStars}+`, label: "GitHub Stars" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="cursor-default"
                >
                  <div
                    className="text-3xl font-bold gradient-text-cyan"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-0.5">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <motion.button
                onClick={() => scrollNavTo("projects")}
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="hover"
                className="magnetic-btn magnetic-btn-primary flex items-center gap-2 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.07, y: -2 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="hover"
                className="magnetic-btn magnetic-btn-outline flex items-center gap-2 group"
              >
                <Download
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5"
                />
                Download CV
              </motion.a>
            </motion.div>

            {/* AI Voice Intro */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mb-8"
            >
              <VoiceIntro />
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex gap-3"
            >
              {[
                { icon: Github, href: socialLinks.github, label: "GitHub" },
                { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
                { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
                { icon: Mail, href: socialLinks.email, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -4, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  data-cursor="hover"
                  title={label}
                  className="w-11 h-11 glass-cyan rounded-xl flex items-center justify-center text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-all duration-200 border border-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Floating HUD Cards (deep parallax layer 2) ── */}
          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col gap-5 items-end"
          >
            {TECH_BADGES.map(({ label, color, icon: BadgeIcon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 40 }}
                animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.45 }}
                whileHover={{ scale: 1.07, x: -12 }}
                className="glass rounded-2xl px-6 py-3.5 flex items-center gap-4 cursor-default border transition-all duration-300"
                style={{
                  borderColor: `${color}25`,
                  boxShadow: `0 0 0px ${color}00`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}60`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${color}20, 0 0 50px ${color}10`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${color}25`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0px ${color}00`;
                }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                >
                  <BadgeIcon size={14} style={{ color }} />
                </div>
                <span className="font-mono text-sm text-slate-300">{label}</span>
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                  className="w-1.5 h-1.5 rounded-full ml-auto flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
              </motion.div>
            ))}

            {/* Live status card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
              transition={{ delay: 0.8, duration: 0.45 }}
              className="glass glass-cyan rounded-2xl px-6 py-4 w-full max-w-[280px] border border-cyan-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-[10px] text-green-400 uppercase tracking-widest">
                  System Online
                </span>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "AI Models", value: "Groq + Gemini" },
                  { label: "Neural Link", value: "Active" },
                  { label: "Response", value: "<100ms" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-500">{label}</span>
                    <span className="text-cyan-400">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9 }}
          onClick={() => scrollNavTo("about")}
          data-cursor="hover"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyan-400/50 hover:text-cyan-400 transition-colors group"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="group-hover:text-cyan-400"
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
