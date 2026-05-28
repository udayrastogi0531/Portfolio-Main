"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { navItems } from "@/lib/data";
import {
  Home, User, Briefcase, Cpu, Code, Bot, BookOpen, Mail, Terminal, Download, Search
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  user: User,
  briefcase: Briefcase,
  cpu: Cpu,
  code: Code,
  bot: Bot,
  book: BookOpen,
  mail: Mail,
};

export default function FloatingNav() {
  const [scrolled, setScrolled] = useState(false);
  const { toggleTerminal, toggleChat, setIsCommandPaletteOpen, activeSection } = useStore();

  // Real scroll detection for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      {/* Top navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-cyan-500/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="section-container flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollTo("#hero")}
            whileHover={{ scale: 1.05 }}
            data-cursor="hover"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
              <span
                className="text-white font-bold text-sm"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                U
              </span>
            </div>
            <span
              className="gradient-text-cyan font-bold text-lg hidden sm:block"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              UDAY
            </span>
          </motion.div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  data-cursor="hover"
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-cyan-300"
                      : "text-slate-400 hover:text-cyan-300 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-indicator"
                      className="absolute inset-0 rounded-lg"
                      style={{
                        background: "rgba(6,182,212,0.08)",
                        border: "1px solid rgba(6,182,212,0.3)",
                        boxShadow: "0 0 15px rgba(6,182,212,0.15)",
                      }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCommandPaletteOpen(true)}
              data-cursor="hover"
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass-cyan text-cyan-400 hover:text-cyan-300 transition-all duration-200 text-sm"
              title="Semantic Search (Ctrl+K)"
            >
              <Search size={14} />
              <span className="hidden sm:block font-mono text-xs">Cmd+K</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTerminal}
              data-cursor="hover"
              className="flex items-center gap-2 px-3 py-2 rounded-lg glass-cyan text-cyan-400 hover:text-cyan-300 transition-all duration-200 text-sm"
              title="Open Terminal (~)"
            >
              <Terminal size={14} />
              <span className="hidden sm:block font-mono text-xs">~/</span>
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="hover"
              className="magnetic-btn magnetic-btn-primary text-sm py-2 px-4 flex items-center gap-2"
            >
              <Download size={14} />
              <span className="hidden sm:block">Resume</span>
            </motion.a>
          </div>
        </div>
      </motion.nav>

      {/* Mobile bottom dock */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden floating-dock rounded-2xl px-4 py-3"
      >
        <div className="flex items-center gap-1">
          {navItems.slice(0, 6).map((item) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <motion.button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                className={`p-2.5 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-cyan-400 bg-cyan-400/15"
                    : "text-slate-500 hover:text-slate-300"
                }`}
                title={item.label}
              >
                <Icon size={18} />
              </motion.button>
            );
          })}
          <div className="w-px h-6 bg-slate-700 mx-1" />
          <motion.button
            onClick={toggleChat}
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="p-2.5 rounded-xl text-purple-400 hover:bg-purple-400/10 transition-all"
          >
            <Bot size={18} />
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
