"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { terminalCommands } from "@/lib/data";
import { X, Terminal as TerminalIcon, ChevronRight } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "error";
  content: string;
}

const AVAILABLE_COMMANDS = [
  "help", "about", "skills", "projects", "contact", "resume",
  "github", "linkedin", "experience", "matrix", "whoami", "clear", "pwd",
  "cinema", "grain", "recruiter", "achievements", "easter",
];

export default function AITerminal() {
  const {
    isTerminalOpen, toggleTerminal, toggleMatrixMode,
    toggleCinemaMode, toggleFilmGrain, toggleRecruiterMode,
    achievements,
  } = useStore();
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "welcome",
      type: "system",
      content: `
╔══════════════════════════════════════════════════════╗
║        UDAY PRAKASH RASTOGI — NEURAL CORE            ║
║         Cinematic AI Operating Environment           ║
╚══════════════════════════════════════════════════════╝

◉ Neural systems synchronized
◉ AI cognition layers initialized
◉ Quantum interface online
◉ Holographic environment rendered
◉ Agentic AI modules active
◉ Secure uplink established

Welcome back, Uday Prakash Rastogi.

Type 'help' to explore the neural command system.
`,  
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTerminalOpen) setTimeout(() => inputRef.current?.focus(), 100);
  }, [isTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "`" || (e.ctrlKey && e.key === "`")) {
        e.preventDefault();
        toggleTerminal();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [toggleTerminal]);

  // Tab completion suggestion
  useEffect(() => {
    if (!input.trim()) { setSuggestion(""); return; }
    const match = AVAILABLE_COMMANDS.find(
      (c) => c.startsWith(input.toLowerCase()) && c !== input.toLowerCase()
    );
    setSuggestion(match ? match.slice(input.length) : "");
  }, [input]);

  const processCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      { id: Date.now().toString(), type: "input", content: cmd },
    ];

    if (trimmed === "clear") {
      setLines([{ id: "cleared", type: "system", content: "Terminal cleared.\n" }]);
      return;
    }
    if (trimmed === "matrix") {
      toggleMatrixMode();
      newLines.push({ id: (Date.now() + 1).toString(), type: "output", content: terminalCommands.matrix });
    } else if (trimmed === "resume") {
      newLines.push({ id: (Date.now() + 1).toString(), type: "output", content: terminalCommands.resume });
      setTimeout(() => window.open("/resume.pdf", "_blank"), 1000);
    } else if (trimmed === "github") {
      newLines.push({ id: (Date.now() + 1).toString(), type: "output", content: terminalCommands.github });
      setTimeout(() => window.open("https://github.com/udayrastogi0531", "_blank"), 500);
    } else if (trimmed === "linkedin") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        content: "→ Opening LinkedIn profile...\nhttps://linkedin.com/in/udayrastogi0531",
      });
      setTimeout(() => window.open("https://linkedin.com/in/udayrastogi0531", "_blank"), 500);
    } else if (trimmed === "pwd") {
      newLines.push({ id: (Date.now() + 1).toString(), type: "output", content: "/home/uday/neural-portfolio" });
    } else if (trimmed === "whoami") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        content: "uday — Gen AI Engineer & Full Stack Developer\nUID=1000 GROUPS=developers,ai-labs,open-source",
      });
    } else if (trimmed === "cinema") {
      toggleCinemaMode();
      newLines.push({ id: (Date.now() + 1).toString(), type: "output",
        content: "CINEMA MODE TOGGLED — Letterbox bars activated. Press 'cinema' again to exit." });
    } else if (trimmed === "grain") {
      toggleFilmGrain();
      newLines.push({ id: (Date.now() + 1).toString(), type: "output",
        content: "FILM GRAIN TOGGLED — Cinematic grain overlay switched." });
    } else if (trimmed === "recruiter") {
      toggleRecruiterMode();
      newLines.push({ id: (Date.now() + 1).toString(), type: "output",
        content: "RECRUITER VIEW ACTIVATED — Professional summary panel opened." });
    } else if (trimmed === "achievements") {
      const unlocked = achievements.filter(a => a.unlocked);
      const locked = achievements.filter(a => !a.unlocked);
      newLines.push({ id: (Date.now() + 1).toString(), type: "output",
        content: `ACHIEVEMENTS [${unlocked.length}/${achievements.length} unlocked]\n\n` +
          unlocked.map(a => `  ${a.icon} ${a.title} — ${a.description}`).join("\n") +
          (locked.length ? `\n\n  Locked: ${locked.map(a => a.id).join(", ")}` : "") });
    } else if (trimmed === "easter") {
      newLines.push({ id: (Date.now() + 1).toString(), type: "output",
        content: "Hint: Try the classic cheat code... ↑↑↓↓←→←→BA" });
    } else {
      const response = terminalCommands[trimmed];
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: response ? "output" : "error",
        content: response || `bash: ${trimmed}: command not found\nType 'help' for available commands.`,
      });
    }

    setLines((prev) => [...prev, ...newLines]);
    setHistory((prev) => [cmd, ...prev].slice(0, 50));
    setHistoryIndex(-1);
  }, [toggleMatrixMode, toggleCinemaMode, toggleFilmGrain, toggleRecruiterMode, achievements]);


  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!input.trim()) return;
      processCommand(input);
      setInput("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(input + suggestion);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(idx);
      setInput(history[idx] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(historyIndex - 1, -1);
      setHistoryIndex(idx);
      setInput(idx === -1 ? "" : history[idx]);
    } else if (e.key === "Escape") {
      toggleTerminal();
    }
  };

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-md"
            onClick={toggleTerminal}
          />
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="fixed top-[8%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-3xl rounded-2xl overflow-hidden"
            style={{
              background: "rgba(6,10,20,0.97)",
              border: "1px solid rgba(6,182,212,0.2)",
              boxShadow:
                "0 0 80px rgba(6,182,212,0.15), 0 40px 100px rgba(0,0,0,0.7)",
              maxHeight: "72vh",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar — macOS style */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-black/30 select-none">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <button
                    onClick={toggleTerminal}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors group"
                    aria-label="Close terminal"
                  >
                    <X size={8} className="text-red-900 hidden group-hover:block mx-auto" />
                  </button>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70 cursor-default" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70 cursor-default" />
                </div>
                <div className="flex items-center gap-2 text-cyan-400/50">
                  <TerminalIcon size={12} />
                  <span className="font-mono text-[11px]">uday@Neural-Core — zsh — 80×24</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-slate-600 tracking-widest">
                ` to toggle
              </span>
            </div>

            {/* Terminal output */}
            <div
              className="overflow-y-auto p-5 font-mono text-sm scrollbar-hide cursor-text"
              style={{ maxHeight: "calc(72vh - 100px)", minHeight: "200px" }}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line) => (
                <motion.div
                  key={line.id}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="mb-1.5"
                >
                  {line.type === "input" && (
                    <div className="flex items-start gap-2 text-slate-200">
                      <span className="text-cyan-400 flex-shrink-0 font-bold">❯</span>
                      <span>{line.content}</span>
                    </div>
                  )}
                  {line.type === "output" && (
                    <pre className="text-slate-300 pl-5 whitespace-pre-wrap leading-relaxed text-[13px]">
                      {line.content}
                    </pre>
                  )}
                  {line.type === "system" && (
                    <pre className="text-cyan-400/60 whitespace-pre-wrap mb-3 text-[12px] border-l-2 border-cyan-500/20 pl-3">
                      {line.content}
                    </pre>
                  )}
                  {line.type === "error" && (
                    <pre className="text-red-400/80 pl-5 whitespace-pre-wrap text-[12px]">
                      {line.content}
                    </pre>
                  )}
                </motion.div>
              ))}

              {/* Input line with tab-completion ghost */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-cyan-400 font-bold flex-shrink-0">❯</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-slate-200 outline-none caret-cyan-400 relative z-10"
                    placeholder={lines.length <= 1 ? "type 'help'..." : ""}
                    autoComplete="off"
                    spellCheck={false}
                    id="terminal-input"
                    aria-label="Terminal input"
                  />
                  {/* Ghost suggestion */}
                  {suggestion && (
                    <span
                      className="absolute left-0 top-0 pointer-events-none text-slate-600 select-none"
                      aria-hidden="true"
                    >
                      {input}
                      <span className="text-slate-700">{suggestion}</span>
                    </span>
                  )}
                </div>
              </div>
              <div ref={bottomRef} />
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-5 py-2 border-t border-white/4 bg-black/20 font-mono text-[10px] text-slate-600">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400/40">NEURAL-OS 4.0</span>
                <span>·</span>
                <span>{lines.length - 1} outputs</span>
                <span>·</span>
                <span>{history.length} history</span>
              </div>
              <div className="flex items-center gap-2">
                {suggestion && (
                  <span className="text-cyan-400/40">TAB to complete: {input + suggestion}</span>
                )}
                <span className="text-slate-700">↑↓ history</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
