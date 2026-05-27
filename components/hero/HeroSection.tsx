"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";
import { Github, Linkedin, Twitter, Mail, Download, ChevronDown, ArrowRight, Zap } from "lucide-react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

const TAGLINES = personalInfo.taglines;

export default function HeroSection() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Typewriter effect
  useEffect(() => {
    const current = TAGLINES[taglineIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, displayText.length + 1));
        if (displayText.length === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(current.slice(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setTaglineIndex((i) => (i + 1) % TAGLINES.length);
        }
      }
    }, isDeleting ? 60 : 100);
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, taglineIndex]);

  // Mouse parallax
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden neural-bg"
    >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-transparent to-[#050508]" />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-[#050508]/60 via-transparent to-[#050508]/40" />

      {/* Animated grid lines */}
      <div
        className="absolute inset-0 z-1 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)`,
          transition: "transform 0.1s ease-out",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 section-container w-full pt-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Text content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-xs text-cyan-400 tracking-wider">
                AVAILABLE FOR WORK
              </span>
              <Zap size={12} className="text-cyan-400" />
            </motion.div>

            {/* Main name */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 5.3, duration: 0.8 }}
            >
              <h1
                className="text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-2"
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.1}px)`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                <span className="gradient-text-cyan text-glow-cyan">
                  {personalInfo.name}
                </span>
              </h1>
            </motion.div>

            {/* Typewriter tagline */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 5.4, duration: 0.7 }}
              className="flex items-center gap-3 mb-6 h-12"
            >
              <span className="font-mono text-cyan-400/60 text-lg">&gt;</span>
              <span className="font-mono text-xl md:text-2xl text-slate-300 font-medium">
                {displayText}
                <span className="text-cyan-400 animate-pulse ml-0.5">█</span>
              </span>
            </motion.div>

            {/* Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.5, duration: 0.7 }}
              className="text-slate-400 text-lg leading-relaxed max-w-xl mb-8"
            >
              {personalInfo.bio}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.6, duration: 0.7 }}
              className="flex gap-8 mb-10"
            >
              {[
                { value: `${personalInfo.yearsOfExperience}+`, label: "Years Exp" },
                { value: `${personalInfo.projectsCompleted}+`, label: "Projects" },
                { value: `${personalInfo.githubStars}+`, label: "GitHub Stars" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-3xl font-bold gradient-text-cyan"
                    style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-slate-500 text-sm font-mono">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.7, duration: 0.7 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <motion.button
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="hover"
                className="magnetic-btn magnetic-btn-primary flex items-center gap-2"
              >
                View My Work
                <ArrowRight size={16} />
              </motion.button>

              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor="hover"
                className="magnetic-btn magnetic-btn-outline flex items-center gap-2"
              >
                <Download size={16} />
                Download CV
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.8, duration: 0.7 }}
              className="flex gap-4"
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
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="hover"
                  title={label}
                  className="w-10 h-10 glass-cyan rounded-lg flex items-center justify-center text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-all duration-200"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating HUD cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 5.5, duration: 1 }}
            className="hidden lg:flex flex-col gap-4 items-end"
            style={{
              transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.3}px)`,
              transition: "transform 0.1s ease-out",
            }}
          >
            {/* Floating tech badges */}
            {[
              { label: "Next.js 15", delay: 0, color: "cyan" },
              { label: "LangChain + OpenAI", delay: 0.2, color: "purple" },
              { label: "React Three Fiber", delay: 0.4, color: "green" },
              { label: "AWS + Docker", delay: 0.6, color: "amber" },
              { label: "Python + FastAPI", delay: 0.8, color: "blue" },
            ].map(({ label, delay, color }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 5.8 + delay, duration: 0.6 }}
                whileHover={{ scale: 1.05, x: -8 }}
                className={`glass rounded-xl px-5 py-3 border flex items-center gap-3 cursor-default
                  ${color === "cyan" ? "border-cyan-500/30 hover:border-cyan-400/60" : ""}
                  ${color === "purple" ? "border-purple-500/30 hover:border-purple-400/60" : ""}
                  ${color === "green" ? "border-emerald-500/30 hover:border-emerald-400/60" : ""}
                  ${color === "amber" ? "border-amber-500/30 hover:border-amber-400/60" : ""}
                  ${color === "blue" ? "border-blue-500/30 hover:border-blue-400/60" : ""}
                `}
              >
                <div
                  className={`w-2 h-2 rounded-full animate-pulse
                    ${color === "cyan" ? "bg-cyan-400" : ""}
                    ${color === "purple" ? "bg-purple-400" : ""}
                    ${color === "green" ? "bg-emerald-400" : ""}
                    ${color === "amber" ? "bg-amber-400" : ""}
                    ${color === "blue" ? "bg-blue-400" : ""}
                  `}
                />
                <span className="font-mono text-sm text-slate-300">{label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6.2 }}
          onClick={scrollToAbout}
          data-cursor="hover"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cyan-400/60 hover:text-cyan-400 transition-colors"
        >
          <span className="font-mono text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
