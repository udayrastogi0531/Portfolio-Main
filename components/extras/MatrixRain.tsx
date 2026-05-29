"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";

export default function MatrixRain() {
  const { isMatrixMode } = useStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isMatrixMode || !canvasRef.current) {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      return;
    }

    // Skip canvas animation on small screens — saves GPU
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*<>{}";
    const fontSize = 13;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const speeds: number[] = Array.from({ length: columns }, () => 0.4 + Math.random() * 0.8);
    const glowCols = new Set<number>(
      Array.from({ length: Math.floor(columns * 0.08) }, () =>
        Math.floor(Math.random() * columns)
      )
    );

    const draw = () => {
      // Fade trail
      ctx.fillStyle = "rgba(5,5,8,0.055)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * fontSize;

        // Lead character = bright white
        if (Math.floor(drops[i]) === Math.floor(drops[i])) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "transparent";
        }

        // Color variation: cyan base, occasional purple, glow columns get neon
        if (glowCols.has(i)) {
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#00f5ff";
          ctx.fillStyle = y / canvas.height < 0.15 ? "#ffffff" : "#00f5ff";
        } else if (i % 7 === 0) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = "#a855f7";
          ctx.fillStyle = "#a855f7";
        } else {
          ctx.shadowBlur = 3;
          ctx.shadowColor = "#06b6d4";
          ctx.fillStyle =
            y / canvas.height < 0.1 ? "#e0f7ff" : i % 3 === 0 ? "#00f5ff" : "#06b6d4";
        }

        ctx.fillText(text, i * fontSize, y);
        ctx.shadowBlur = 0;

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += speeds[i];
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isMatrixMode]);

  return (
    <AnimatePresence>
      {isMatrixMode && (
        <motion.canvas
          ref={canvasRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[45] pointer-events-none"
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  );
}
