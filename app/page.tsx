"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import dynamic from "next/dynamic";

// ── Critical path — loaded immediately ───────────────────────
import Loader from "@/components/loaders/Loader";
import FloatingNav from "@/components/navigation/FloatingNav";
import HeroSection from "@/components/hero/HeroSection";
import Footer from "@/components/footer/Footer";
import ScrollObserver from "@/components/navigation/ScrollObserver";

// ── Content sections — lazy loaded ───────────────────────────
const AboutSection      = dynamic(() => import("@/components/about/AboutSection"),           { ssr: false });
const ExperienceSection = dynamic(() => import("@/components/experience/ExperienceSection"), { ssr: false });
const SkillsSection     = dynamic(() => import("@/components/skills/SkillsSection"),         { ssr: false });
const TechStackSection  = dynamic(() => import("@/components/skills/TechStackSection"),      { ssr: false });
const ProjectsSection   = dynamic(() => import("@/components/projects/ProjectsSection"),     { ssr: false });
const ProblemSolvingDashboard = dynamic(() => import("@/components/skills/ProblemSolvingDashboard"), { ssr: false });
const AIFeaturesSection = dynamic(() => import("@/components/ai-features/AIFeaturesSection"),{ ssr: false });
const GitHubSection     = dynamic(() => import("@/components/extras/GitHubSection"),         { ssr: false });
// const BlogSection       = dynamic(() => import("@/components/blog/BlogSection"),             { ssr: false });
const ExtrasSection     = dynamic(() => import("@/components/extras/ExtrasSection"),         { ssr: false });
const ServicesSection   = dynamic(() => import("@/components/extras/ServicesSection"),        { ssr: false });
const NewsletterSection = dynamic(() => import("@/components/extras/NewsletterSection"),     { ssr: false });
const ContactSection    = dynamic(() => import("@/components/contact/ContactSection"),       { ssr: false });

// ── Floating UI overlays ──────────────────────────────────────
const AIChatAssistant    = dynamic(() => import("@/components/ai-features/AIChatAssistant"),  { ssr: false });
const AITerminal         = dynamic(() => import("@/components/ai-features/AITerminal"),        { ssr: false });
const AICommandPalette   = dynamic(() => import("@/components/ai-features/AICommandPalette"), { ssr: false });
const MatrixRain         = dynamic(() => import("@/components/extras/MatrixRain"),             { ssr: false });
const KonamiEasterEgg    = dynamic(() => import("@/components/extras/KonamiEasterEgg"),        { ssr: false });
const AchievementSystem  = dynamic(() => import("@/components/extras/AchievementSystem"),      { ssr: false });
const RecruiterMode      = dynamic(() => import("@/components/extras/RecruiterMode"),          { ssr: false });
const CinematicOverlay   = dynamic(() => import("@/components/extras/CinematicOverlay"),       { ssr: false });
const CustomCursor       = dynamic(() => import("@/components/cursor/CustomCursor"),           { ssr: false });
const FloatingHUD        = dynamic(() => import("@/components/extras/FloatingHUD"),            { ssr: false });

export default function Home() {
  const { isLoaded, unlockAchievement, isChatOpen, isCommandPaletteOpen, isTerminalOpen } = useStore();

  useEffect(() => { if (isCommandPaletteOpen) unlockAchievement("palette_open"); }, [isCommandPaletteOpen, unlockAchievement]);
  useEffect(() => { if (isChatOpen)           unlockAchievement("chat_used");    }, [isChatOpen, unlockAchievement]);
  useEffect(() => { if (isTerminalOpen)       unlockAchievement("terminal_open");}, [isTerminalOpen, unlockAchievement]);

  return (
    // ── Root: natural vertical scroll ──────────────────────────
    <div
      className="relative w-full min-h-screen"
      style={{ background: "linear-gradient(180deg, #050816 0%, #07101f 40%, #050816 70%, #07101f 100%)" }}
    >
      {/* ── Always-visible overlays (fixed, z-top) ── */}
      <CustomCursor />
      <CinematicOverlay />
      <MatrixRain />
      <AITerminal />
      <AICommandPalette />
      <KonamiEasterEgg />
      <AchievementSystem />

      {/* ── Loader blocks UI until ready ── */}
      <Loader />

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full"
          >
            {/* ── Fixed top nav ── */}
            <FloatingNav />

            {/* ── Fixed floating panels ── */}
            <AIChatAssistant />
            <RecruiterMode />
            <FloatingHUD />

            {/* ── Scroll-tracked content ── */}
            <ScrollObserver>
              {/* ── Sections stack vertically — native scroll ── */}
              <main className="w-full">

                {/* Hero */}
                <section id="hero" className="w-full">
                  <HeroSection />
                </section>

                {/* About */}
                <section id="about" className="w-full">
                  <AboutSection />
                </section>

                {/* Experience */}
                <section id="experience" className="w-full">
                  <ExperienceSection />
                </section>

                {/* Skills */}
                <section id="skills" className="w-full">
                  <SkillsSection />
                  <TechStackSection />
                </section>

                {/* Problem Solving Dashboard */}
                <section id="problem-solving" className="w-full">
                  <ProblemSolvingDashboard />
                </section>

                {/* Projects */}
                <section id="projects" className="w-full">
                  <ProjectsSection />
                </section>

                {/* AI Features */}
                <section id="ai-features" className="w-full">
                  <AIFeaturesSection />
                </section>

                {/* GitHub */}
                <section id="github" className="w-full">
                  <GitHubSection />
                </section>

                {/* Extras: Services + Blog + Newsletter */}
                <section id="extras" className="w-full">
                  <ExtrasSection />
                  <ServicesSection />
                  {/* <BlogSection /> */}
                  <NewsletterSection />
                </section>

                {/* Contact + Footer */}
                <section id="contact" className="w-full">
                  <ContactSection />
                  <Footer />
                </section>

              </main>
            </ScrollObserver>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
