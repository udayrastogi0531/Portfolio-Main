"use client";

import { useEffect, useRef } from "react";

interface UseMagneticOptions {
  strength?: number;
}

export function useMagnetic(strength = 40) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.max(rect.width, rect.height);

      if (distance < maxDistance) {
        const factor = (maxDistance - distance) / maxDistance;
        el.style.transform = `translate(${x * factor * (strength / 100)}px, ${y * factor * (strength / 100)}px)`;
      } else {
        el.style.transform = "";
      }
    };

    const handleMouseLeave = () => {
      el.style.transform = "";
      el.style.transition = "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
    };

    const handleMouseEnter = () => {
      el.style.transition = "transform 0.1s ease-out";
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [strength]);

  return ref;
}
