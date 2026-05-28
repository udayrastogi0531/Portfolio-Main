"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { Trophy } from "lucide-react";

// Global achievement notification system
export default function AchievementSystem() {
  const {
    pendingAchievement,
    clearPendingAchievement,
    unlockAchievement,
    isLoaded,
    activeSection,
    markRoomVisited,
  } = useStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const firstVisitDone = useRef(false);

  // Fire first_visit achievement
  useEffect(() => {
    if (isLoaded && !firstVisitDone.current) {
      firstVisitDone.current = true;
      setTimeout(() => unlockAchievement("first_visit"), 2000);
    }
  }, [isLoaded, unlockAchievement]);

  // Track rooms visited
  useEffect(() => {
    if (isLoaded && activeSection) {
      markRoomVisited(activeSection);
      if (activeSection === "contact") {
        unlockAchievement("contact_open");
      }
    }
  }, [activeSection, isLoaded, markRoomVisited, unlockAchievement]);

  // 2-minute deep dive achievement
  useEffect(() => {
    if (!isLoaded) return;
    const check = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      if (elapsed >= 120) {
        unlockAchievement("stay_2min");
        clearInterval(check);
      }
    }, 5000);
    return () => clearInterval(check);
  }, [isLoaded, unlockAchievement]);

  // Auto-dismiss after 4s
  useEffect(() => {
    if (pendingAchievement) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        clearPendingAchievement();
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [pendingAchievement, clearPendingAchievement]);

  return (
    <AnimatePresence>
      {pendingAchievement && (
        <motion.div
          initial={{ x: 120, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 120, opacity: 0, scale: 0.9 }}
          transition={{ type: "spring", damping: 18, stiffness: 260 }}
          className="fixed top-20 right-5 z-[9998] max-w-xs cursor-pointer"
          onClick={clearPendingAchievement}
        >
          <div
            className="glass rounded-2xl p-4 border"
            style={{
              border: "1px solid rgba(251,191,36,0.4)",
              boxShadow: "0 0 30px rgba(251,191,36,0.2), 0 20px 60px rgba(0,0,0,0.5)",
              background: "rgba(10,10,20,0.95)",
            }}
          >
            {/* Gold shimmer top bar */}
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
              className="absolute top-0 left-0 h-[2px] rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, #f59e0b, #fbbf24)" }}
            />

            <div className="flex items-start gap-3 pt-1">
              {/* Trophy icon with pulse */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 relative"
                style={{ background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                  className="absolute inset-0 rounded-xl"
                  style={{ border: "1px solid rgba(251,191,36,0.4)" }}
                />
                <span className="text-2xl">{pendingAchievement.icon}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <Trophy size={10} className="text-yellow-400" />
                  <span className="text-yellow-400 font-mono text-[10px] uppercase tracking-widest">
                    Achievement Unlocked
                  </span>
                </div>
                <div className="text-white font-bold text-sm leading-tight">
                  {pendingAchievement.title}
                </div>
                <div className="text-slate-400 text-xs mt-0.5 leading-relaxed">
                  {pendingAchievement.description}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
