"use client";

import { motion } from "framer-motion";
import { personalInfo, socialLinks, navItems } from "@/lib/data";
import { Github, Linkedin, Twitter, Mail, Heart, Terminal } from "lucide-react";
import { useStore } from "@/store";

export default function Footer() {
  const { toggleTerminal } = useStore();
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative overflow-hidden border-t border-cyan-500/10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] to-transparent" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="section-container relative z-10 py-16">
        {/* Top section */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>U</span>
              </div>
              <span
                className="gradient-text-cyan font-bold text-xl"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                UDAY
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              AI Engineer & MERN Stack building next-generation digital experiences.
              Let&apos;s create the future together.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: socialLinks.github },
                { icon: Linkedin, href: socialLinks.linkedin },
                { icon: Twitter, href: socialLinks.twitter },
                { icon: Mail, href: socialLinks.email },
              ].map(({ icon: Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -3 }}
                  data-cursor="hover"
                  className="w-9 h-9 glass-cyan rounded-lg flex items-center justify-center text-cyan-400 hover:text-white hover:bg-cyan-500/20 transition-all"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-mono text-sm uppercase tracking-wide">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollTo(item.href)}
                  data-cursor="hover"
                  className="text-slate-400 hover:text-cyan-400 transition-colors text-sm text-left font-mono"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status / Easter egg */}
          <div>
            <h4 className="text-white font-semibold mb-4 font-mono text-sm uppercase tracking-wide">
              System Status
            </h4>
            <div className="space-y-3">
              {[
                { label: "Portfolio", status: "ONLINE" },
                { label: "AI Features", status: "ACTIVE" },
                { label: "Open to Work", status: "YES" },
              ].map(({ label, status }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm font-mono">{label}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 text-xs font-mono">{status}</span>
                  </span>
                </div>
              ))}

              {/* Hidden terminal shortcut */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <button
                  onClick={toggleTerminal}
                  data-cursor="hover"
                  className="flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors text-xs font-mono"
                >
                  <Terminal size={12} />
                  Press ` for terminal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm font-mono">
            © {year} {personalInfo.fullName}. Crafted with{" "}
            <Heart size={12} className="inline text-red-400" />{" "}
            using React
          </p>
          <div className="flex items-center gap-4 text-slate-600 text-xs font-mono">
            <span>v3.0.0</span>
            <span>•</span>
            <span>Indore, India</span>
            <span>•</span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-cyan-400"
            >
              LIVE
            </motion.span>
          </div>
        </div>
      </div>
    </footer>
  );
}
