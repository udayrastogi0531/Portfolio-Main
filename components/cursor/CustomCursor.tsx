"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<HTMLElement | null>(null);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery-smooth trailing ring spring physics
  const ringX = useSpring(mouseX, { damping: 25, stiffness: 200, mass: 0.5 });
  const ringY = useSpring(mouseY, { damping: 25, stiffness: 200, mass: 0.5 });

  // Highly responsive dot spring physics
  const dotX = useSpring(mouseX, { damping: 35, stiffness: 450, mass: 0.1 });
  const dotY = useSpring(mouseY, { damping: 35, stiffness: 450, mass: 0.1 });

  // 1. Detect device eligibility (Desktop only - no touch, width > 768px)
  useEffect(() => {
    const checkEligibility = () => {
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      const isMobileSize = window.innerWidth <= 768;
      setIsDesktop(!isTouch && !isMobileSize);
    };

    checkEligibility();
    window.addEventListener("resize", checkEligibility);
    return () => window.removeEventListener("resize", checkEligibility);
  }, []);

  // 2. Manage cursor hide overrides styles on desktop
  useEffect(() => {
    if (!isDesktop) return;

    document.documentElement.classList.add("custom-cursor-active");

    const style = document.createElement("style");
    style.id = "custom-cursor-hide-rules";
    style.innerHTML = `
      .custom-cursor-active,
      .custom-cursor-active * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      const element = document.getElementById("custom-cursor-hide-rules");
      if (element) element.remove();
    };
  }, [isDesktop]);

  // 3. Setup event listeners
  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Dot follows the actual mouse
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);

        // Ring is pulled magnetically towards the center of the hovered element
        const pullFactor = 0.55; // Snug sticky feel
        const targetX = e.clientX + (centerX - e.clientX) * pullFactor;
        const targetY = e.clientY + (centerY - e.clientY) * pullFactor;

        ringX.set(targetX);
        ringY.set(targetY);

        // Compute haptic offset for the element itself (gentle drag towards mouse)
        const isProjectCard = magneticTarget.classList.contains("project-card");
        const maxOffset = isProjectCard ? 8 : 14;
        
        const dragX = Math.max(-maxOffset, Math.min(maxOffset, (e.clientX - centerX) * 0.12));
        const dragY = Math.max(-maxOffset, Math.min(maxOffset, (e.clientY - centerY) * 0.12));

        magneticTarget.style.transform = `translate3d(${dragX}px, ${dragY}px, 0)`;
        magneticTarget.style.transition = "transform 0.08s cubic-bezier(0.25, 1, 0.5, 1)";
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    // Global delegation for hover targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Search upwards for hoverable targets (buttons, anchors, navigation, project cards, and custom markers)
      const hoverable = target.closest(
        "button, a, .project-card, .nav-link, [role='button'], [data-magnetic]"
      ) as HTMLElement | null;

      if (hoverable) {
        setIsHovered(true);
        // Magnetic behavior is enabled for all key interactive types
        const shouldBeMagnetic = hoverable.matches(
          "button, a, .project-card, .nav-link, [data-magnetic]"
        );
        if (shouldBeMagnetic) {
          setMagneticTarget(hoverable);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverable = target.closest(
        "button, a, .project-card, .nav-link, [role='button'], [data-magnetic]"
      ) as HTMLElement | null;

      if (hoverable) {
        setIsHovered(false);
        if (magneticTarget === hoverable) {
          // Smoothly restore position to original state
          hoverable.style.transform = "";
          hoverable.style.transition = "transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)";
          setMagneticTarget(null);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isDesktop, isVisible, magneticTarget, mouseX, mouseY, ringX, ringY]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Outer Smooth Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 pointer-events-none z-[99999] rounded-full border border-cyan-400/40 mix-blend-screen transition-all duration-300 ease-out"
        animate={{
          width: isHovered ? 56 : 30,
          height: isHovered ? 56 : 30,
          backgroundColor: isHovered ? "rgba(6, 182, 212, 0.04)" : "rgba(6, 182, 212, 0)",
          borderColor: isHovered ? "rgba(0, 245, 255, 0.8)" : "rgba(6, 182, 212, 0.4)",
          boxShadow: isHovered 
            ? "0 0 16px rgba(0, 245, 255, 0.3), inset 0 0 10px rgba(0, 245, 255, 0.15)"
            : "0 0 0px rgba(0, 0, 0, 0)",
          scale: isClicked ? 0.85 : 1,
        }}
      />

      {/* Center Small Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="fixed top-0 left-0 pointer-events-none z-[100000] rounded-full bg-cyan-400 mix-blend-screen transition-all duration-200 ease-out"
        animate={{
          width: isHovered ? 12 : 8,
          height: isHovered ? 12 : 8,
          backgroundColor: isHovered ? "#00f5ff" : "#22d3ee",
          boxShadow: isHovered
            ? "0 0 12px #00f5ff, 0 0 24px rgba(0, 245, 255, 0.8)"
            : "0 0 6px rgba(6, 182, 212, 0.6)",
          scale: isClicked ? 0.8 : 1,
        }}
      />
    </>
  );
}
