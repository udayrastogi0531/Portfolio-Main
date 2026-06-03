"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";

// Film grain canvas overlay (optional letterbox is preserved)
export default function CinematicOverlay() {
  const { isFilmGrain, isCinemaMode } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // GPU-efficient film grain via canvas (tuned to be extremely subtle)
  useEffect(() => {
    if (!isFilmGrain) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 256;
    canvas.height = 256;

    let animId: number;
    const drawGrain = () => {
      const imageData = ctx.createImageData(256, 256);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 10; // Reduce noise amplitude
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = Math.random() * 12; // DRASICALLY reduce alpha opacity for microscopic subtlety
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    };
    drawGrain();
    return () => cancelAnimationFrame(animId);
  }, [isFilmGrain]);

  return (
    <>
      {/* Film grain texture tiled over entire screen — tuned to 3% opacity */}
      <AnimatePresence>
        {isFilmGrain && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9980] pointer-events-none"
            style={{ mixBlendMode: "overlay" }}
          >
            <canvas
              ref={canvasRef}
              className="w-full h-full"
              style={{ imageRendering: "pixelated", opacity: 0.03 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic vignette has been removed to eliminate over-dark overlays per user request */}

      {/* Letterbox bars for cinema mode */}
      <AnimatePresence>
        {isCinemaMode && (
          <>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "6vh" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 left-0 right-0 z-[9985] pointer-events-none bg-black"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "6vh" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-0 left-0 right-0 z-[9985] pointer-events-none bg-black"
            />
          </>
        )}
      </AnimatePresence>
    </>
  );
}
