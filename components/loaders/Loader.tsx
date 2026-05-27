"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";

const BOOT_MESSAGES = [
  { text: "Initializing Neural Interface...", delay: 0 },
  { text: "Loading cognitive matrix...", delay: 400 },
  { text: "Establishing quantum link...", delay: 800 },
  { text: "Syncing AI modules [LangChain, OpenAI]...", delay: 1200 },
  { text: "Calibrating holographic systems...", delay: 1600 },
  { text: "Loading project database [25 entries]...", delay: 2000 },
  { text: "Injecting creativity protocols...", delay: 2400 },
  { text: "Running neural diagnostics... OK", delay: 2800 },
  { text: "Mounting experience timeline...", delay: 3200 },
  { text: "AI Core: ONLINE", delay: 3600 },
  { text: "Welcome to the future.", delay: 4000 },
];

export default function Loader() {
  const { setIsLoaded, setLoadingProgress } = useStore();
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);

  // Neural particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      opacity: number; size: number;
    }> = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        size: Math.random() * 2 + 0.5,
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${p.opacity})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1, i + 5).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Progress counter
  useEffect(() => {
    const duration = 4500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const raw = (elapsed / duration) * 100;
      const eased = Math.min(100, raw < 80 ? raw * 1.05 : 80 + (raw - 80) * 0.6);
      const val = Math.floor(eased);
      progressRef.current = val;
      setProgress(val);
      setLoadingProgress(val);

      if (val < 100) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setLoadingProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setIsLoaded(true), 800);
        }, 600);
      }
    };
    requestAnimationFrame(tick);
  }, [setIsLoaded, setLoadingProgress]);

  // Boot messages reveal
  useEffect(() => {
    BOOT_MESSAGES.forEach(({ text, delay }) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, text]);
      }, delay);
    });
  }, []);

  // Glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 150);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#050508] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Neural particles canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 opacity-30" />

          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="loader-scan-line" />
          </div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* Center HUD */}
          <div className="relative z-10 w-full max-w-2xl px-6">
            {/* Logo / Name */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-center mb-12"
            >
              <div
                className={`font-display text-5xl md:text-7xl font-bold mb-2 transition-all duration-100 ${
                  glitchActive ? "text-red-400 translate-x-1" : "gradient-text-cyan text-glow-cyan"
                }`}
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                UDAY
              </div>
              <div className="font-mono text-cyan-400/60 text-sm tracking-[0.4em] uppercase">
                Neural Interface v3.0 — Loading
              </div>
            </motion.div>

            {/* HUD Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative border border-cyan-500/20 rounded-lg p-6 glass"
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg" />

              {/* Progress percentage */}
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-mono text-cyan-400/70 text-xs uppercase tracking-widest">
                  System Boot Progress
                </span>
                <motion.span
                  key={progress}
                  className="font-display text-4xl font-bold gradient-text-cyan"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {progress}%
                </motion.span>
              </div>

              {/* Progress bar */}
              <div className="loader-progress-bar rounded-full mb-6">
                <motion.div
                  className="loader-progress-fill rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Boot messages terminal */}
              <div className="space-y-1 h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10 pointer-events-none" />
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-xs"
                  >
                    <span className="text-cyan-400/50 mr-2">[SYS]</span>
                    <span
                      className={
                        i === messages.length - 1
                          ? "text-cyan-300"
                          : "text-slate-500"
                      }
                    >
                      {msg}
                    </span>
                    {i === messages.length - 1 && (
                      <span className="ml-1 animate-pulse text-cyan-400">█</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Status indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex justify-center gap-6 mt-6"
            >
              {[
                { label: "AI Core", status: "ONLINE" },
                { label: "3D Engine", status: "READY" },
                { label: "Neural Net", status: "ACTIVE" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs text-slate-500">
                    {item.label}:{" "}
                    <span className="text-cyan-400">{item.status}</span>
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
