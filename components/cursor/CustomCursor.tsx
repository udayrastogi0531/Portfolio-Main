"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/store";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const { setCursorPosition } = useStore();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    // 1. Mobile viewports check
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (isMobile) return;

    let mouseX = 0;
    let mouseY = 0;
    
    // Smooth trailing spring coordinates (LERP values)
    let dotX = 0;
    let dotY = 0;
    let ringX = 0;
    let ringY = 0;
    
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setCursorPosition(mouseX, mouseY);
      
      // Global Magnetic Attraction Logic
      const magnetics = document.querySelectorAll(
        ".magnetic-btn, .social-icon, .nav-link, nav a, .project-card, .holographic-card"
      );
      
      magnetics.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Threshold: 1.5 times the size of the element
        const threshold = Math.max(rect.width, rect.height) * 1.5;
        
        if (dist < threshold) {
          const factor = (threshold - dist) / threshold;
          const strength = el.classList.contains("project-card") ? 8 : 22; // subtle for cards, more responsive for buttons
          
          (el as HTMLElement).style.transform = `translate3d(${dx * factor * (strength / 100)}px, ${dy * factor * (strength / 100)}px, 0)`;
          (el as HTMLElement).style.transition = "transform 0.1s ease-out";
        } else {
          if ((el as HTMLElement).style.transform !== "") {
            (el as HTMLElement).style.transform = "";
            (el as HTMLElement).style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
          }
        }
      });
    };

    // 2. Custom Cursor Interactive Labels detection
    const handleHoverIn = (e: MouseEvent) => {
      setIsHovered(true);
      const target = e.currentTarget as HTMLElement;
      
      // Check labels criteria
      if (
        target.classList.contains("project-card") || 
        target.closest("#projects") ||
        target.getAttribute("data-cursor") === "view"
      ) {
        setCursorText("VIEW");
      } else if (
        target.getAttribute("target") === "_blank" || 
        target.getAttribute("href")?.startsWith("http") ||
        target.classList.contains("social-icon") ||
        target.closest("footer") && target.tagName === "A"
      ) {
        setCursorText("OPEN");
      } else {
        setCursorText("CLICK");
      }
    };

    const handleHoverOut = () => {
      setIsHovered(false);
      setCursorText("");
    };

    const animateCursor = () => {
      // Fast, responsive center dot trailing
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      
      // Elastic spring-driven outer ring trailing
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animateCursor);
    };

    // Attach listeners
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animateCursor);

    // Bind event listeners to interactive elements
    let elements: Element[] = [];
    const attachHoverListeners = () => {
      const interactables = document.querySelectorAll(
        "a, button, [data-cursor='hover'], input, textarea, .project-card, .holographic-card"
      );
      interactables.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverIn as any);
        el.addEventListener("mouseleave", handleHoverOut as any);
        elements.push(el);
      });
    };
    attachHoverListeners();

    // Re-bind when dynamic DOM changes occur (e.g. filters)
    const observer = new MutationObserver(() => {
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn as any);
        el.removeEventListener("mouseleave", handleHoverOut as any);
      });
      elements = [];
      attachHoverListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", checkMobile);
      
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn as any);
        el.removeEventListener("mouseleave", handleHoverOut as any);
        (el as HTMLElement).style.transform = "";
      });
      observer.disconnect();
    };
  }, [isMobile, setCursorPosition]);

  if (isMobile) return null;

  return (
    <>
      {/* 1. Small glowing center dot */}
      <div 
        ref={dotRef} 
        className="cursor-dot hidden md:block" 
        style={{
          width: isHovered ? "4px" : "8px",
          height: isHovered ? "4px" : "8px",
          opacity: isHovered ? 0.3 : 1,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
          willChange: "transform",
        }}
      />

      {/* 2. Trailing ring with dynamically loaded text label */}
      <div 
        ref={ringRef} 
        className="cursor-ring hidden md:flex items-center justify-center font-mono font-black uppercase text-[8px] tracking-[0.25em] text-center" 
        style={{
          width: isHovered ? "76px" : "40px",
          height: isHovered ? "76px" : "40px",
          backgroundColor: isHovered ? "rgba(255, 255, 255, 1)" : "transparent",
          borderColor: isHovered ? "white" : "rgba(6, 182, 212, 0.6)",
          color: isHovered ? "black" : "transparent",
          mixBlendMode: "difference", // blend mode effect
          transition: "width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, color 0.2s ease",
          willChange: "transform",
          paddingLeft: "2px", // offsets tracking alignment
        }}
      >
        {cursorText}
      </div>
    </>
  );
}
