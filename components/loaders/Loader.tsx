"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";

export default function Loader() {
  const { setIsLoaded, setLoadingProgress } = useStore();
  const [progress, setProgress] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Start with pure black screen. Show logo at 300ms.
    const logoTimer = setTimeout(() => setShowLogo(true), 300);

    // 2. Show text at 800ms.
    const textTimer = setTimeout(() => setShowText(true), 800);

    // 3. Show loading bar at 1000ms and animate progress (0 -> 100%)
    const barTimer = setTimeout(() => {
      setShowBar(true);
      const startTime = performance.now();
      const duration = 800; // Progress takes exactly 800ms to load

      const updateProgress = (now: number) => {
        const elapsed = now - startTime;
        const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
        setProgress(pct);
        setLoadingProgress(pct);

        if (pct < 100) {
          requestAnimationFrame(updateProgress);
        } else {
          // 4. Progress reaches 100%. Wait 150ms and start loader fade-out transition.
          setTimeout(() => {
            setIsVisible(false);
            // 5. Reveal hero section once fade-out completes (300ms duration)
            setTimeout(() => {
              setIsLoaded(true);
            }, 300);
          }, 150);
        }
      };
      requestAnimationFrame(updateProgress);
    }, 1000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(barTimer);
    };
  }, [setIsLoaded, setLoadingProgress]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col items-center justify-center overflow-hidden"
          aria-label="Loading portfolio..."
          role="progressbar"
          aria-valuenow={progress}
        >
          {/* Subtle purple + cyan radial glow background */}
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
                className="absolute w-[450px] h-[450px] pointer-events-none rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, rgba(168,85,247,0.04) 55%, transparent 75%)",
                  filter: "blur(60px)",
                  zIndex: 0,
                }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-10 flex flex-col items-center max-w-md w-full px-8">
            {/* Logo with scale animation (0.8 -> 1) */}
            <div className="h-20 mb-8 flex items-center justify-center">
              <AnimatePresence>
                {showLogo && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                  >
                    {/* Glowing outer shadow filter */}
                    <div 
                      className="absolute inset-0 blur-xl opacity-35 bg-cyan-400 rounded-full scale-90 pointer-events-none"
                      style={{ filter: "drop-shadow(0 0 15px rgba(6, 182, 212, 0.8))" }}
                    />
                    <svg className="w-16 h-16 relative" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="loader-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00f5ff" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <polygon 
                        points="50,10 85,30 85,70 50,90 15,70 15,30" 
                        stroke="url(#loader-logo-grad)" 
                        strokeWidth="2.5" 
                        fill="rgba(6, 182, 212, 0.03)" 
                      />
                      <path 
                        d="M35,35 V55 C35,63.28 41.72,70 50,70 C58.28,70 65,63.28 65,55 V35" 
                        stroke="url(#loader-logo-grad)" 
                        strokeWidth="4.5" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Display names and title */}
            <div className="text-center h-24 flex flex-col items-center justify-start mb-6">
              <AnimatePresence>
                {showText && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-center"
                  >
                    <h1
                      className="text-white text-lg md:text-xl font-bold tracking-[0.25em] mb-2.5 uppercase"
                      style={{ fontFamily: "var(--font-orbitron), sans-serif" }}
                    >
                      UDAY PRAKASH RASTOGI
                    </h1>
                    <p
                      className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-[0.15em] uppercase opacity-75"
                      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                    >
                      AI Engineer • Agentic AI Developer
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Loading Progress Bar & Percentage */}
            <div className="w-full h-10 flex flex-col items-center justify-end">
              <AnimatePresence>
                {showBar && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full flex flex-col items-center"
                  >
                    {/* Progress track */}
                    <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mb-3 relative">
                      <div 
                        className="h-full bg-gradient-to-r from-[#00f5ff] to-[#a855f7] rounded-full transition-all duration-75 ease-out"
                        style={{ 
                          width: `${progress}%`,
                          boxShadow: "0 0 8px rgba(0, 245, 255, 0.6)",
                        }}
                      />
                    </div>
                    {/* Percentage indicator */}
                    <span 
                      className="font-mono text-white/40 text-[10px] tracking-widest"
                      style={{ fontFamily: "var(--font-jetbrains), monospace" }}
                    >
                      {progress}%
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
