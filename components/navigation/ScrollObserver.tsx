"use client";

import { useEffect, useRef } from "react";
import { useStore } from "@/store";

// Sections mapped in order for the progress rail + active tracking
const SECTIONS = [
  { id: "hero",        label: "INTRO" },
  { id: "about",       label: "BIO" },
  { id: "experience",  label: "TIMELINE" },
  { id: "skills",      label: "SKILLS" },
  { id: "projects",    label: "PROJECTS" },
  { id: "ai-features", label: "AI LABS" },
  { id: "github",      label: "GITHUB" },
  { id: "contact",     label: "CONTACT" },
];

interface ScrollObserverProps {
  children: React.ReactNode;
}

/**
 * ScrollObserver — replaces CinematicContainer.
 *
 * NO wheel hijacking. NO scroll locking. NO forced section jumps.
 *
 * Uses IntersectionObserver to:
 *  - track the active section in the Zustand store
 *  - drive the progress rail dot indicator on the right side
 *  - unlock the "all_rooms" achievement when all sections are viewed
 *
 * Navigation (navbar clicks / progress rail clicks) uses
 * native scrollIntoView({ behavior: "smooth" }).
 */
export default function ScrollObserver({ children }: ScrollObserverProps) {
  const { setActiveSection, markRoomVisited } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const activeSectionRef = useRef("hero");

  // Observe each section as it enters the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            activeSectionRef.current = id;
            setActiveSection(id);
            markRoomVisited(id);
          }
        },
        { threshold: 0.15, rootMargin: "-80px 0px -20px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [setActiveSection, markRoomVisited]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ── Content ─────────────────────────────────────── */}
      {children}

      {/* ── Vertical progress rail (right side, desktop only) ── */}
      <ProgressRail />
    </div>
  );
}

// ── Passive progress rail — dots scroll to section on click ───
function ProgressRail() {
  const { activeSection } = useStore();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-1.5">
      {SECTIONS.map(({ id, label }) => {
        const isActive = activeSection === id;
        return (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            title={label}
            className={`transition-all duration-300 rounded-full ${
              isActive
                ? "w-1.5 h-6 bg-cyan-400 shadow-[0_0_8px_#06b6d4]"
                : "w-1 h-2.5 bg-slate-700 hover:bg-cyan-600/60"
            }`}
          />
        );
      })}
    </div>
  );
}
