"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Terminal, Zap, LineChart, Code2, Coffee, GitCommit, Settings, Layers } from "lucide-react";

export default function ProductivityDashboard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [lines, setLines] = useState(142640);
  const [coffee, setCoffee] = useState(1280);

  // Animate numbers climbing slightly for dynamic HUD feel
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setLines((prev) => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.95) setCoffee((prev) => prev + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="dashboard" className="py-20 relative w-full h-full flex flex-col justify-center" ref={ref}>
      <div className="section-container">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-2 mb-4">
            <LineChart size={12} className="text-purple-400" />
            <span className="font-mono text-xs text-purple-400 tracking-wider uppercase">07 / Telemetry</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ fontFamily: "Orbitron, sans-serif" }}>
            Neural <span className="gradient-text-purple">Performance</span> Dashboard
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Live developer metrics, telemetry stats, and engineering setup details synced directly from Uday's local kernel.
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch font-sans">
          
          {/* Left panel: Telemetry stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass rounded-3xl p-6 border border-purple-500/10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Code2 className="text-purple-400" size={18} />
                <h3 className="text-white font-bold font-mono uppercase text-sm tracking-wider">Telemetry Core Metrics</h3>
              </div>
              <span className="text-[10px] font-mono text-purple-400 animate-pulse bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded">
                KERNEL FEED: LIVE
              </span>
            </div>

            {/* Diagnostic stats row */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Lines written */}
              <div className="glass-purple border border-purple-500/10 rounded-2xl p-4 flex flex-col justify-center">
                <span className="text-xs text-slate-400 font-mono mb-1">LINES OF CODE</span>
                <span className="text-3xl font-black text-white leading-none tracking-wide" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {lines.toLocaleString()}
                </span>
                <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="bg-purple-500 h-full shadow-[0_0_8px_#8b5cf6]"
                    animate={{ width: ["30%", "75%", "60%"] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Coffee processed */}
              <div className="glass-purple border border-purple-500/10 rounded-2xl p-4 flex flex-col justify-center">
                <span className="text-xs text-slate-400 font-mono mb-1">COFFEE PROCESSED</span>
                <span className="text-3xl font-black text-white leading-none tracking-wide flex items-center gap-2" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  {coffee} <Coffee size={20} className="text-purple-400" />
                </span>
                <div className="w-full bg-white/5 h-1 rounded-full mt-3 overflow-hidden">
                  <motion.div
                    className="bg-purple-500 h-full shadow-[0_0_8px_#8b5cf6]"
                    animate={{ width: ["20%", "45%", "35%"] }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />
                </div>
              </div>
            </div>

            {/* Coding activity chart visualization */}
            <div className="glass border border-white/5 rounded-2xl p-5 mb-6 relative overflow-hidden flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-slate-400">DAILY SYSTEM FOCUS LEVEL</span>
                <span className="text-xs font-mono text-cyan-400">PEAK: 94%</span>
              </div>
              <div className="h-28 flex items-end gap-1.5 justify-between">
                {[45, 67, 89, 54, 32, 78, 92, 85, 43, 62, 74, 94, 88, 59, 71, 90].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-full rounded-t bg-gradient-to-t from-purple-500/30 to-purple-400 shadow-[0_0_5px_rgba(139,92,246,0.3)]"
                    animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.7}%`] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, repeatType: "reverse" }}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between font-mono text-[9px] text-slate-500 mt-2">
                <span>00:00 (IDLE)</span>
                <span>12:00 (PEAK)</span>
                <span>24:00 (DEBUG)</span>
              </div>
            </div>

            {/* Coding Streak & Keystrokes */}
            <div className="flex items-center gap-4 bg-white/[0.01] border border-white/5 rounded-2xl p-4">
              <div className="flex items-center gap-2.5">
                <Zap className="text-yellow-400 animate-pulse" size={16} />
                <div>
                  <div className="text-white font-bold font-mono text-xs leading-none mb-1">124 DAYS</div>
                  <div className="text-[9px] text-slate-500 font-mono uppercase">STREAK INLINE</div>
                </div>
              </div>
              <div className="w-px h-6 bg-slate-800" />
              <div className="flex items-center gap-2.5">
                <GitCommit className="text-purple-400" size={16} />
                <div>
                  <div className="text-white font-bold font-mono text-xs leading-none mb-1">1.1M STROKES</div>
                  <div className="text-[9px] text-slate-500 font-mono uppercase">INPUT TELEMETRY</div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right panel: Dev Setup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass rounded-3xl p-6 border border-purple-500/10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Settings className="text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} size={18} />
                <h3 className="text-white font-bold font-mono uppercase text-sm tracking-wider">Active Dev Environment</h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-400 animate-pulse bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                SYSTEM: WSL2_UBUNTU
              </span>
            </div>

            {/* Specifications grids */}
            <div className="space-y-3.5 flex-1">
              {[
                { label: "OS Node", value: "Ubuntu 24.04 LTS (WSL 2 on Windows)", icon: Terminal, color: "text-orange-400 bg-orange-500/5 border-orange-500/20" },
                { label: "Neural Code Editor", value: "VS Code (Custom Synthwave Cyberpunk Theme)", icon: Code2, color: "text-blue-400 bg-blue-500/5 border-blue-500/20" },
                { label: "Compute GPU Node", value: "Nvidia RTX 4090 (24GB VRAM local embeddings)", icon: Cpu, color: "text-green-400 bg-green-500/5 border-green-500/20" },
                { label: "Memory Buffer", value: "64GB DDR5 G.Skill Ripjaws Core", icon: Layers, color: "text-purple-400 bg-purple-500/5 border-purple-500/20" },
                { label: "Audio Synthesizer", value: "ElevenLabs API Spoken introduction node", icon: Zap, color: "text-cyan-400 bg-cyan-500/5 border-cyan-500/20" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3 border border-white/5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon size={16} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-mono tracking-wider uppercase mb-0.5">{item.label}</div>
                      <div className="text-slate-300 font-semibold text-xs md:text-sm">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cloud connection signals */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-2.5 flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <div>
                  <div className="text-[8px] text-slate-500 font-mono uppercase">Database Node</div>
                  <div className="text-white font-bold font-mono text-[10px]">SUPABASE OK</div>
                </div>
              </div>
              <div className="border border-cyan-500/20 bg-cyan-500/5 rounded-xl p-2.5 flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <div>
                  <div className="text-[8px] text-slate-500 font-mono uppercase">Mail Service</div>
                  <div className="text-white font-bold font-mono text-[10px]">RESEND ACTIVE</div>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
