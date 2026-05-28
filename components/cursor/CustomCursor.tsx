"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const { setCursorPosition } = useStore();

  useEffect(() => {
    const TRAIL_COUNT = 8;
    const trails: { x: number; y: number }[] = Array.from(
      { length: TRAIL_COUNT },
      () => ({ x: 0, y: 0 })
    );

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovering = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCursorPosition(mouseX, mouseY);

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateLoop = () => {
      // Smooth ring follow
      const ease = isHovering ? 0.18 : 0.1;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }

      // Trail animation — each segment lags behind the next
      if (trailsRef.current.length > 0) {
        trails[0].x += (mouseX - trails[0].x) * 0.25;
        trails[0].y += (mouseY - trails[0].y) * 0.25;
        for (let i = 1; i < TRAIL_COUNT; i++) {
          trails[i].x += (trails[i - 1].x - trails[i].x) * 0.3;
          trails[i].y += (trails[i - 1].y - trails[i].y) * 0.3;
        }
        trailsRef.current.forEach((el, i) => {
          if (!el) return;
          el.style.left = `${trails[i].x}px`;
          el.style.top = `${trails[i].y}px`;
          const progress = 1 - i / TRAIL_COUNT;
          const size = 4 * progress;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.opacity = `${progress * 0.5}`;
        });
      }

      rafId = requestAnimationFrame(animateLoop);
    };
    animateLoop();

    // Hover effect handlers
    const handleHover = () => {
      isHovering = true;
      if (ringRef.current) {
        ringRef.current.classList.add("hover");
        ringRef.current.style.transform = "translate(-50%, -50%) scale(1.5)";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(-50%, -50%) scale(2)";
        dotRef.current.style.mixBlendMode = "screen";
      }
    };
    const handleHoverOut = () => {
      isHovering = false;
      if (ringRef.current) {
        ringRef.current.classList.remove("hover");
        ringRef.current.style.transform = "translate(-50%, -50%) scale(1)";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        dotRef.current.style.mixBlendMode = "normal";
      }
    };

    const attachListeners = () => {
      const interactables = document.querySelectorAll(
        "a, button, [data-cursor='hover'], input, textarea"
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mouseleave", handleHoverOut);
      });
      return interactables;
    };

    document.addEventListener("mousemove", handleMouseMove);
    const elements = attachListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      observer.disconnect();
    };
  }, [setCursorPosition]);

  return (
    <>
      {/* Main dot */}
      <div ref={dotRef} className="cursor-dot hidden md:block" />

      {/* Outer ring */}
      <div ref={ringRef} className="cursor-ring hidden md:block" />

      {/* Motion trail particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el;
          }}
          className="fixed pointer-events-none z-[99997] rounded-full bg-cyan-400 hidden md:block"
          style={{
            width: "4px",
            height: "4px",
            transform: "translate(-50%, -50%)",
            boxShadow: "0 0 4px rgba(6,182,212,0.8)",
            transition: "opacity 0.1s ease",
          }}
        />
      ))}
    </>
  );
}
