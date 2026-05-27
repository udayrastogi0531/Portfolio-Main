"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { setCursorPosition } = useStore();

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCursorPosition(mouseX, mouseY);

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX}px`;
        dotRef.current.style.top = `${mouseY}px`;
      }
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`;
        ringRef.current.style.top = `${ringY}px`;
      }
      requestAnimationFrame(animateRing);
    };
    animateRing();

    // Add hover effects
    const handleHover = () => {
      ringRef.current?.classList.add("hover");
      dotRef.current?.style.setProperty("transform", "translate(-50%, -50%) scale(1.5)");
    };
    const handleHoverOut = () => {
      ringRef.current?.classList.remove("hover");
      dotRef.current?.style.setProperty("transform", "translate(-50%, -50%) scale(1)");
    };

    const interactables = document.querySelectorAll("a, button, [data-cursor='hover']");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      interactables.forEach((el) => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, [setCursorPosition]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot hidden md:block" />
      <div ref={ringRef} className="cursor-ring hidden md:block" />
    </>
  );
}
