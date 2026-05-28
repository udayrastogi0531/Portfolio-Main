"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { Search, X, CornerDownLeft, Sparkles, Cpu, FolderGit2, Briefcase, Compass, Loader2 } from "lucide-react";

interface SearchResult {
  title: string;
  type: "project" | "skill" | "experience" | "section";
  description: string;
  link: string;
  relevance: number;
}

const typeIconMap = {
  project: FolderGit2,
  skill: Cpu,
  experience: Briefcase,
  section: Compass,
};

const typeColorMap = {
  project: "text-purple-400 border-purple-500/20 bg-purple-500/5",
  skill: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
  experience: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  section: "text-amber-400 border-amber-500/20 bg-amber-500/5",
};

export default function AICommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen } = useStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      } else if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }
  }, [isCommandPaletteOpen]);

  // Search logic (debounced)
  useEffect(() => {
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error("Command palette search failed:", err);
      } finally {
        setIsLoading(false);
      }
    }, 400); // 400ms debounce

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [query]);

  // Keyboard navigation inside results
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelectResult(results[activeIndex]);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    setIsCommandPaletteOpen(false);

    // Smooth scroll to section if anchor link
    if (result.link.startsWith("#")) {
      const id = result.link.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <>
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
            onClick={() => setIsCommandPaletteOpen(false)}
          />

          {/* Search Box Panel */}
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[110] w-[92%] max-w-2xl bg-[#0a0a0f]/90 border border-cyan-500/25 rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)] flex flex-col"
          >
            {/* Input Header block */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
              <Search className="text-cyan-400 flex-shrink-0 animate-pulse" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type query to semantically scan portfolio..."
                className="flex-1 bg-transparent text-white border-none outline-none text-base placeholder-slate-500 font-sans"
                autoComplete="off"
                spellCheck={false}
              />
              <div className="flex items-center gap-2">
                <span className="hidden sm:block font-mono text-[10px] text-slate-500 border border-slate-700/60 rounded px-1.5 py-0.5 uppercase tracking-wide">
                  ESC to close
                </span>
                <button
                  onClick={() => setIsCommandPaletteOpen(false)}
                  className="text-slate-400 hover:text-white p-1 hover:bg-white/5 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Results Display block */}
            <div className="flex-1 overflow-y-auto max-h-[350px] p-2 space-y-1 font-sans">
              {isLoading ? (
                <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500">
                  <Loader2 className="text-cyan-400 animate-spin" size={22} />
                  <span className="font-mono text-xs tracking-wider uppercase text-cyan-400/70">
                    Running Semantic Core...
                  </span>
                </div>
              ) : results.length > 0 ? (
                results.map((res, i) => {
                  const Icon = typeIconMap[res.type] || Compass;
                  const isActive = i === activeIndex;
                  return (
                    <div
                      key={i}
                      onClick={() => handleSelectResult(res)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex items-start gap-4 p-3.5 rounded-xl cursor-pointer transition-all duration-150 border
                        ${
                          isActive
                            ? "bg-white/[0.04] border-cyan-500/30 shadow-[inset_0_0_15px_rgba(6,182,212,0.05)]"
                            : "bg-transparent border-transparent hover:bg-white/[0.01]"
                        }
                      `}
                    >
                      {/* Left icon wrapper */}
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border ${typeColorMap[res.type]}`}>
                        <Icon size={16} />
                      </div>

                      {/* Content column */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between mb-1 gap-2">
                          <h4 className={`font-semibold text-sm truncate ${isActive ? "text-cyan-300" : "text-white"}`}>
                            {res.title}
                          </h4>
                          <span className="text-[10px] text-cyan-400/80 font-mono tracking-wider">
                            {res.relevance}% MATCH
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-1">
                          {res.description}
                        </p>
                      </div>

                      {/* Right Enter icon indicator */}
                      {isActive && (
                        <div className="flex items-center gap-1 text-[10px] text-cyan-400/70 font-mono bg-cyan-500/10 border border-cyan-500/20 rounded px-1.5 py-0.5 flex-shrink-0">
                          <span>ENTER</span>
                          <CornerDownLeft size={10} />
                        </div>
                      )}
                    </div>
                  );
                })
              ) : query.trim() ? (
                <div className="py-12 flex flex-col items-center justify-center text-slate-500">
                  <Sparkles className="text-slate-600 mb-2" size={24} />
                  <p className="text-sm">No semantic alignment found for &quot;{query}&quot;</p>
                  <p className="text-xs text-slate-600 mt-1">Try querying skills like &quot;React&quot; or terms like &quot;AI work&quot;.</p>
                </div>
              ) : (
                /* Static placeholder prompt when query is empty */
                <div className="py-8 px-4">
                  <div className="flex items-center gap-2 mb-3 px-3">
                    <Sparkles className="text-cyan-400/60" size={14} />
                    <span className="font-mono text-xs text-slate-500 tracking-wider uppercase">
                      Recommended Queries
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-mono">
                    {[
                      { text: "Show me frontend apps", query: "frontend apps" },
                      { text: "Has he integrated LLMs?", query: "LLM integration" },
                      { text: "Where is he based?", query: "location" },
                      { text: "How to hire Uday", query: "hire Uday" },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(item.query)}
                        className="text-left p-3 rounded-lg bg-white/[0.02] border border-white/5 text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/5 hover:border-cyan-500/25 transition-all"
                      >
                        ❯ {item.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Console bar */}
            <div className="flex items-center justify-between px-5 py-2.5 bg-black/40 border-t border-white/5 font-mono text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <Compass size={11} className="text-cyan-400" />
                <span>ACTIVE INTERFACE CONSOLE</span>
              </span>
              <span className="hidden sm:block">USE ↑↓ TO NAVIGATE results</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
