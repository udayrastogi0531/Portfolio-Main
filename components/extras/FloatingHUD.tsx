"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { Clock, Wifi, Activity, ChevronUp, ChevronDown } from "lucide-react";

interface ClockEntry {
  label: string;
  tz: string;
  flag: string;
}

const CLOCKS: ClockEntry[] = [
  { label: "IST",  tz: "Asia/Kolkata",        flag: "🇮🇳" },
  { label: "UTC",  tz: "UTC",                  flag: "🌐" },
  { label: "NYC",  tz: "America/New_York",     flag: "🇺🇸" },
  { label: "LON",  tz: "Europe/London",        flag: "🇬🇧" },
];

function formatTime(tz: string): string {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

const AI_STATUSES = [
  { label: "Groq API",    color: "#06b6d4", latency: "42ms"  },
  { label: "Gemini",      color: "#10b981", latency: "88ms"  },
  { label: "OpenRouter",  color: "#a855f7", latency: "120ms" },
];

export default function FloatingHUD() {
  const { isLoaded } = useStore();
  const [times, setTimes] = useState<Record<string, string>>({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [aiIndex, setAiIndex] = useState(0);

  // Update clocks every second
  useEffect(() => {
    const tick = () => {
      const t: Record<string, string> = {};
      CLOCKS.forEach((c) => { t[c.tz] = formatTime(c.tz); });
      setTimes(t);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  // Cycle AI status display
  useEffect(() => {
    const iv = setInterval(() => {
      setAiIndex((i) => (i + 1) % AI_STATUSES.length);
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  if (!isLoaded) return null;

  const ai = AI_STATUSES[aiIndex];
  const ist = times["Asia/Kolkata"] || "00:00";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="fixed bottom-36 md:bottom-16 right-6 z-40 hidden md:block"
    >
      <div
        className="glass rounded-2xl overflow-hidden border"
        style={{
          border: "1px solid rgba(6,182,212,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          minWidth: "160px",
        }}
      >
        {/* Collapsed header — always visible */}
        <button
          onClick={() => setIsExpanded((v) => !v)}
          className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-white/3 transition-colors"
          data-cursor="hover"
          aria-label="Toggle HUD"
        >
          <Clock size={11} className="text-cyan-400 flex-shrink-0" />
          <span className="font-mono text-[11px] text-cyan-300 font-bold flex-1 text-left">
            {ist}
          </span>
          <span className="font-mono text-[9px] text-slate-600">IST</span>
          {isExpanded ? (
            <ChevronDown size={10} className="text-slate-500" />
          ) : (
            <ChevronUp size={10} className="text-slate-500" />
          )}
        </button>

        {/* Expanded panel */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="border-t border-white/5" />

              {/* World clocks */}
              <div className="px-3 py-2 space-y-1">
                {CLOCKS.map((c) => (
                  <div key={c.tz} className="flex items-center gap-2">
                    <span className="text-[10px]">{c.flag}</span>
                    <span className="font-mono text-[10px] text-slate-500 w-8">{c.label}</span>
                    <span className="font-mono text-[11px] text-slate-300 ml-auto">
                      {times[c.tz] || "--:--"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/5 mx-2" />

              {/* AI status */}
              <div className="px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Wifi size={9} className="text-cyan-400" />
                  <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
                    AI Uplink
                  </span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={aiIndex}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: ai.color }}
                    />
                    <span className="font-mono text-[10px] text-slate-300 flex-1">{ai.label}</span>
                    <span className="font-mono text-[10px]" style={{ color: ai.color }}>
                      {ai.latency}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-t border-white/5 mx-2" />

              {/* System vitals */}
              <div className="px-3 py-2">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Activity size={9} className="text-purple-400" />
                  <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
                    Vitals
                  </span>
                </div>
                {[
                  { label: "FPS",    value: "60", color: "#10b981" },
                  { label: "VRAM",   value: "OK", color: "#06b6d4" },
                  { label: "WARP",   value: "ON", color: "#a855f7" },
                ].map((v) => (
                  <div key={v.label} className="flex items-center gap-2 mb-0.5">
                    <span className="font-mono text-[9px] text-slate-600 w-10">{v.label}</span>
                    <span className="font-mono text-[10px] font-bold" style={{ color: v.color }}>
                      {v.value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
