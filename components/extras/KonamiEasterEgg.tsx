"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import toast from "react-hot-toast";

// Konami Code sequence
const KONAMI = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export default function KonamiEasterEgg() {
  const {
    setIsKonamiActive,
    isKonamiActive,
    toggleMatrixMode,
    unlockAchievement,
    isLoaded,
  } = useStore();
  const sequenceRef = useRef<string[]>([]);

  useEffect(() => {
    if (!isLoaded) return;

    const handleKey = (e: KeyboardEvent) => {
      sequenceRef.current = [...sequenceRef.current, e.key].slice(-KONAMI.length);
      if (sequenceRef.current.join(",") === KONAMI.join(",")) {
        // Konami activated!
        setIsKonamiActive(true);
        toggleMatrixMode();
        unlockAchievement("konami");

        toast.custom(
          () => (
            <div className="flex items-center gap-3 glass-cyan rounded-2xl px-5 py-4 border border-cyan-400/40 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
              <span className="text-2xl">🎮</span>
              <div>
                <div className="text-cyan-300 font-bold text-sm" style={{ fontFamily: "Orbitron, sans-serif" }}>
                  CHEAT CODE ACTIVATED
                </div>
                <div className="text-slate-400 text-xs">You found the Konami sequence. Welcome to the matrix.</div>
              </div>
            </div>
          ),
          { duration: 5000, position: "top-center" }
        );

        // Auto-deactivate matrix after 8s
        setTimeout(() => {
          setIsKonamiActive(false);
          toggleMatrixMode();
        }, 8000);

        sequenceRef.current = [];
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isLoaded, setIsKonamiActive, toggleMatrixMode, unlockAchievement]);

  return (
    <AnimatePresence>
      {isKonamiActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9990] pointer-events-none"
        >
          {/* Chromatic aberration pulse */}
          <motion.div
            animate={{
              x: [0, -4, 4, -2, 2, 0],
              opacity: [0, 0.6, 0, 0.4, 0],
            }}
            transition={{ duration: 0.5, repeat: 3 }}
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(255,0,128,0.08), transparent, rgba(0,255,255,0.08))",
              mixBlendMode: "screen",
            }}
          />

          {/* KONAMI watermark */}
          <motion.div
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: [0, 0.6, 0] }}
            transition={{ duration: 2, delay: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div
              className="text-cyan-400 font-black text-[8vw] tracking-[0.5em] select-none"
              style={{
                fontFamily: "Orbitron, sans-serif",
                textShadow: "0 0 40px rgba(6,182,212,0.8)",
              }}
            >
              ↑↑↓↓←→←→BA
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
