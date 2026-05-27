"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import dynamic from "next/dynamic";

// Critical path components (eagerly loaded)
import Loader from "@/components/loaders/Loader";
import FloatingNav from "@/components/navigation/FloatingNav";
import HeroSection from "@/components/hero/HeroSection";
import Footer from "@/components/footer/Footer";

// Below-fold components (lazy loaded)
const AboutSection = dynamic(() => import("@/components/about/AboutSection"), { ssr: false });
const ExperienceSection = dynamic(() => import("@/components/experience/ExperienceSection"), { ssr: false });
const SkillsSection = dynamic(() => import("@/components/skills/SkillsSection"), { ssr: false });
const TechStackSection = dynamic(() => import("@/components/skills/TechStackSection"), { ssr: false });
const ProjectsSection = dynamic(() => import("@/components/projects/ProjectsSection"), { ssr: false });
const AIFeaturesSection = dynamic(() => import("@/components/ai-features/AIFeaturesSection"), { ssr: false });
const BlogSection = dynamic(() => import("@/components/blog/BlogSection"), { ssr: false });
const ExtrasSection = dynamic(() => import("@/components/extras/ExtrasSection"), { ssr: false });
const GitHubSection = dynamic(() => import("@/components/extras/GitHubSection"), { ssr: false });
const ServicesSection = dynamic(() => import("@/components/extras/ServicesSection"), { ssr: false });
const ContactSection = dynamic(() => import("@/components/contact/ContactSection"), { ssr: false });
const AIChatAssistant = dynamic(() => import("@/components/ai-features/AIChatAssistant"), { ssr: false });
const AITerminal = dynamic(() => import("@/components/ai-features/AITerminal"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/cursor/CustomCursor"), { ssr: false });
const MatrixRain = dynamic(() => import("@/components/extras/MatrixRain"), { ssr: false });

export default function Home() {
  const { isLoaded } = useStore();

  // Lenis smooth scroll
  useEffect(() => {
    if (!isLoaded) return;

    let lenis: any;
    const initLenis = async () => {
      try {
        const Lenis = (await import("lenis")).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch (e) {
        // Lenis not available, use native scroll
      }
    };

    initLenis();
    return () => lenis?.destroy?.();
  }, [isLoaded]);

  return (
    <main className="relative min-h-screen bg-[#050508] overflow-x-hidden">
      {/* Global overlays */}
      <CustomCursor />
      <MatrixRain />
      <Loader />
      <AITerminal />

      <AnimatePresence>
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Navigation */}
            <FloatingNav />

            {/* Page sections */}
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <SkillsSection />
            <TechStackSection />
            <ProjectsSection />
            <AIFeaturesSection />
            <BlogSection />
            <ExtrasSection />
            <GitHubSection />
            <ServicesSection />
            <ContactSection />
            <Footer />

            {/* Floating AI chat */}
            <AIChatAssistant />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
