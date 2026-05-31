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
    
    // Smooth interpolated positions
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    
    // Scale interpolation variables
    let currentDotScale = 1;
    let targetDotScale = 1;
    let currentRingScale = 1;
    let targetRingScale = 1;

    let isHovering = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCursorPosition(mouseX, mouseY);
    };

    const animateLoop = () => {
      // Main dot: instant response for stable tactile feedback
      dotX = mouseX;
      dotY = mouseY;

      if (dotRef.current) {
        currentDotScale += (targetDotScale - currentDotScale) * 0.2;
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%) scale(${currentDotScale})`;
      }

      // Outer ring: smooth liquid easing
      const ringEase = isHovering ? 0.22 : 0.15;
      ringX += (mouseX - ringX) * ringEase;
      ringY += (mouseY - ringY) * ringEase;

      if (ringRef.current) {
        currentRingScale += (targetRingScale - currentRingScale) * 0.2;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${currentRingScale})`;
      }

      // Trail particles: cascading delayed movement
      if (trailsRef.current.length > 0) {
        trails[0].x += (mouseX - trails[0].x) * 0.3;
        trails[0].y += (mouseY - trails[0].y) * 0.3;
        for (let i = 1; i < TRAIL_COUNT; i++) {
          trails[i].x += (trails[i - 1].x - trails[i].x) * 0.35;
          trails[i].y += (trails[i - 1].y - trails[i].y) * 0.35;
        }
        trailsRef.current.forEach((el, i) => {
          if (!el) return;
          el.style.transform = `translate3d(${trails[i].x}px, ${trails[i].y}px, 0) translate(-50%, -50%)`;
          const progress = 1 - i / TRAIL_COUNT;
          const size = 4 * progress;
          el.style.width = `${size}px`;
          el.style.height = `${size}px`;
          el.style.opacity = `${progress * 0.4}`;
        });
      }

      rafId = requestAnimationFrame(animateLoop);
    };
    
    // Start animation loop
    rafId = requestAnimationFrame(animateLoop);

    // Hover effect handlers
    const handleHover = () => {
      isHovering = true;
      targetDotScale = 2;
      targetRingScale = 1.5;
      if (ringRef.current) {
        ringRef.current.classList.add("hover");
      }
      if (dotRef.current) {
        dotRef.current.style.mixBlendMode = "screen";
      }
    };

    const handleHoverOut = () => {
      isHovering = false;
      targetDotScale = 1;
      targetRingScale = 1;
      if (ringRef.current) {
        ringRef.current.classList.remove("hover");
      }
      if (dotRef.current) {
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

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    let elements = attachListeners();

    // Re-attach on DOM changes to ensure dynamic elements also trigger cursor scale
    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
      elements = attachListeners();
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
            boxShadow: "0 0 4px rgba(6,182,212,0.8)",
            transition: "opacity 0.1s ease",
            willChange: "transform",
          }}
        />
      ))}
    </>
  );
}
