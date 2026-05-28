"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";

// Film grain canvas overlay + cinematic vignette + optional letterbox
export default function CinematicOverlay() {
  const { isFilmGrain, isCinemaMode } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // GPU-efficient film grain via canvas
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
        const noise = Math.random() * 18;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = Math.random() * 30; // Very subtle alpha
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    };
    drawGrain();
    return () => cancelAnimationFrame(animId);
  }, [isFilmGrain]);

  return (
    <>
      {/* Film grain texture tiled over entire screen */}
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
              style={{ imageRendering: "pixelated", opacity: 0.35 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic vignette — always subtle */}
      <div
        className="fixed inset-0 z-[9979] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.5) 100%)",
        }}
      />

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
