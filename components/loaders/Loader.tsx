"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";

interface LoaderStep {
  progress: number;
  text: string;
  detail: string;
}

const LOADER_STEPS: LoaderStep[] = [
  { progress: 2,  text: "Initializing Neural Core...",         detail: "SYS_BOOT v4.0" },
  { progress: 10, text: "Mapping Quantum Pathways...",          detail: "KERNEL_INIT" },
  { progress: 19, text: "Rendering Holographic Grid...",        detail: "GPU_SHADER_LOAD" },
  { progress: 31, text: "Activating AI Engine Cluster...",      detail: "GROQ+GEMINI_SYNC" },
  { progress: 46, text: "Synchronizing Neural Systems...",      detail: "LANGCHAIN_CONNECT" },
  { progress: 61, text: "Calibrating 3D Warp Engine...",        detail: "THREE.JS_COMPILE" },
  { progress: 74, text: "Booting ARIA Assistant Core...",       detail: "LLM_WARM_UP" },
  { progress: 88, text: "Streaming AI Modules Online...",        detail: "SSE_READY" },
  { progress: 100, text: "Neural Interface Activated.",          detail: "SYSTEM_READY" },
];

export default function Loader() {
  const { setIsLoaded, setLoadingProgress } = useStore();
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanPulse, setScanPulse] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);

  // ── Particle network background ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; vx: number; vy: number; opacity: number; size: number };
    const particles: Particle[] = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.45 + 0.1,
      size: Math.random() * 2.5 + 0.5,
    }));

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6,182,212,${p.opacity})`;
        ctx.fill();

        particles.slice(i + 1, i + 6).forEach((p2) => {
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6,182,212,${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ── Holographic scanline grid ─────────────────────────────────
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let offset = 0;
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cols = Math.ceil(canvas.width / 60);
      const rows = Math.ceil(canvas.height / 60);

      ctx.strokeStyle = "rgba(6,182,212,0.07)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= cols; x++) {
        ctx.beginPath();
        ctx.moveTo(x * 60, 0);
        ctx.lineTo(x * 60, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * 60);
        ctx.lineTo(canvas.width, y * 60);
        ctx.stroke();
      }

      // Moving scan line
      const scanY = (offset % canvas.height);
      const grad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(6,182,212,0.12)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, scanY - 60, canvas.width, 120);

      offset += 1.2;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ── Boot sequence ─────────────────────────────────────────────
  useEffect(() => {
    let step = 0;
    const run = () => {
      if (step >= LOADER_STEPS.length) {
        setProgress(100);
        setLoadingProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(() => setIsLoaded(true), 700);
        }, 600);
        return;
      }
      const s = LOADER_STEPS[step];
      setProgress(s.progress);
      setLoadingProgress(s.progress);
      setStepIndex(step);
      setMessages((prev) => [...prev, s.text]);
      step++;
      const delay = step === LOADER_STEPS.length ? 700 : 350 + Math.random() * 150;
      setTimeout(run, delay);
    };
    const t = setTimeout(run, 300);
    return () => clearTimeout(t);
  }, [setIsLoaded, setLoadingProgress]);

  // ── Glitch loop ───────────────────────────────────────────────
  useEffect(() => {
    const iv = setInterval(() => {
      setGlitchActive(true);
      setScanPulse(true);
      setTimeout(() => { setGlitchActive(false); setScanPulse(false); }, 110);
    }, 2200);
    return () => clearInterval(iv);
  }, []);

  const currentStep = LOADER_STEPS[stepIndex] || LOADER_STEPS[0];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] bg-[#050816] flex flex-col items-center justify-center overflow-hidden"
          aria-label="Loading portfolio..."
          role="progressbar"
          aria-valuenow={progress}
        >
          {/* Particle canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 opacity-20" />
          {/* Holographic grid */}
          <canvas ref={gridCanvasRef} className="absolute inset-0 opacity-100 pointer-events-none" />

          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)",
            }}
          />

          {/* Glitch flash overlay */}
          <AnimatePresence>
            {glitchActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.05 }}
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,0,128,0.04) 0%, rgba(0,255,255,0.06) 50%, rgba(255,0,128,0.04) 100%)",
                  mixBlendMode: "screen",
                }}
              />
            )}
          </AnimatePresence>

          {/* HUD Box */}
          <div className="relative z-20 w-full max-w-xl px-6">
            {/* Logo / Identity */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="text-center mb-10"
            >
              <div
                className={`font-display text-6xl md:text-7xl font-black mb-2 tracking-widest transition-all duration-75 ${
                  glitchActive
                    ? "text-red-400 [text-shadow:2px_0_rgba(255,0,128,0.8),-2px_0_rgba(0,255,255,0.8)]"
                    : "gradient-text-cyan text-glow-cyan"
                }`}
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                UDAY
              </div>
              <div className="font-mono text-cyan-400/40 text-[10px] tracking-[0.5em] uppercase">
                Neural Interface v4.0 — Diagnostic Boot
              </div>
            </motion.div>

            {/* Glowing HUD frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative glass rounded-2xl p-6 border border-cyan-500/20"
              style={{
                boxShadow: scanPulse
                  ? "0 0 60px rgba(6,182,212,0.2), 0 0 120px rgba(6,182,212,0.08)"
                  : "0 0 30px rgba(6,182,212,0.07)",
                transition: "box-shadow 0.1s ease",
              }}
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br-xl" />

              {/* Progress header */}
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-mono text-cyan-400/60 text-[10px] uppercase tracking-widest">
                  {currentStep.detail}
                </span>
                <motion.span
                  key={progress}
                  initial={{ scale: 1.3, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-display text-4xl font-black gradient-text-cyan text-glow-cyan"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {progress}%
                </motion.span>
              </div>

              {/* Neon progress bar */}
              <div className="h-[3px] rounded-full bg-white/5 border border-cyan-500/10 overflow-hidden mb-5">
                <motion.div
                  className="h-full rounded-full relative"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{
                    background: "linear-gradient(90deg, #06b6d4, #a855f7, #00f5ff)",
                    boxShadow: "0 0 12px rgba(6,182,212,0.8)",
                  }}
                >
                  <div
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white"
                    style={{ boxShadow: "0 0 8px #00f5ff, 0 0 16px #06b6d4" }}
                  />
                </motion.div>
              </div>

              {/* Terminal log panel */}
              <div className="h-40 overflow-hidden relative space-y-1">
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0f1a]/90 to-transparent z-10 pointer-events-none" />
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[11px] flex items-center gap-2 leading-relaxed"
                  >
                    <span className="text-cyan-400/35 flex-shrink-0">[CORE]</span>
                    <span
                      className={
                        i === messages.length - 1
                          ? "text-cyan-300 font-semibold"
                          : "text-slate-600"
                      }
                    >
                      {msg}
                    </span>
                    {i === messages.length - 1 && (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 0.7, repeat: Infinity }}
                        className="text-cyan-400 ml-0.5"
                      >
                        ▮
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Status badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center gap-5 mt-6"
            >
              {[
                { label: "AI Node",   status: "ONLINE",  color: "#06b6d4" },
                { label: "Render",    status: "GPU 3D",  color: "#8b5cf6" },
                { label: "Warp Net",  status: "READY",   color: "#10b981" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                  style={{
                    border: `1px solid ${item.color}25`,
                    background: `${item.color}08`,
                  }}
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-mono text-[10px]" style={{ color: item.color }}>
                    {item.label}:{" "}
                    <span className="font-bold">{item.status}</span>
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
