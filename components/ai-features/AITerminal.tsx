"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { terminalCommands } from "@/lib/data";
import { X, Terminal as TerminalIcon, Minimize2 } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system";
  content: string;
}

export default function AITerminal() {
  const { isTerminalOpen, toggleTerminal, toggleMatrixMode } = useStore();
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "welcome",
      type: "system",
      content: "UDAY OS v3.0 — Neural Interface Terminal\nType 'help' to see available commands.\n",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTerminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTerminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  // Keyboard shortcut to open terminal
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

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [
      {
        id: Date.now().toString(),
        type: "input",
        content: cmd,
      },
    ];

    if (trimmed === "clear") {
      setLines([
        { id: "cleared", type: "system", content: "Terminal cleared." },
      ]);
      return;
    }

    if (trimmed === "matrix") {
      toggleMatrixMode();
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        content: terminalCommands.matrix,
      });
      setLines((prev) => [...prev, ...newLines]);
      return;
    }

    if (trimmed === "resume") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        content: terminalCommands.resume,
      });
      setLines((prev) => [...prev, ...newLines]);
      setTimeout(() => {
        window.open("/resume.pdf", "_blank");
      }, 1000);
      return;
    }

    if (trimmed === "github") {
      newLines.push({
        id: (Date.now() + 1).toString(),
        type: "output",
        content: terminalCommands.github,
      });
      setLines((prev) => [...prev, ...newLines]);
      setTimeout(() => {
        window.open("https://github.com/udaykumar", "_blank");
      }, 500);
      return;
    }

    const response = terminalCommands[trimmed];
    newLines.push({
      id: (Date.now() + 1).toString(),
      type: "output",
      content: response || `Command not found: '${trimmed}'. Type 'help' for available commands.`,
    });

    setLines((prev) => [...prev, ...newLines]);
    setHistory((prev) => [cmd, ...prev].slice(0, 50));
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(newIndex);
      setInput(history[newIndex] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);
      setInput(newIndex === -1 ? "" : history[newIndex]);
    } else if (e.key === "Escape") {
      toggleTerminal();
    }
  };

  return (
    <AnimatePresence>
      {isTerminalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={toggleTerminal}
          />

          {/* Terminal window */}
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-[10%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-3xl terminal rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.3)]"
            style={{ maxHeight: "70vh" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#0a0f1a] border-b border-cyan-500/20">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <button
                    onClick={toggleTerminal}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center gap-2 text-cyan-400/70">
                  <TerminalIcon size={13} />
                  <span className="font-mono text-xs">uday@neural:~$</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-slate-600">Press ` to toggle</span>
                <button
                  onClick={toggleTerminal}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Terminal body */}
            <div
              className="overflow-y-auto p-5 font-mono text-sm scrollbar-hide"
              style={{ maxHeight: "calc(70vh - 80px)" }}
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line) => (
                <div key={line.id} className="mb-2">
                  {line.type === "input" && (
                    <div className="flex items-start gap-2">
                      <span className="text-cyan-400 flex-shrink-0">❯</span>
                      <span className="text-slate-200">{line.content}</span>
                    </div>
                  )}
                  {line.type === "output" && (
                    <pre className="text-slate-300 pl-4 whitespace-pre-wrap leading-relaxed">
                      {line.content}
                    </pre>
                  )}
                  {line.type === "system" && (
                    <pre className="text-cyan-400/70 whitespace-pre-wrap mb-4">
                      {line.content}
                    </pre>
                  )}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-cyan-400">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent text-slate-200 outline-none caret-cyan-400"
                  placeholder="Enter command..."
                  autoComplete="off"
                  spellCheck={false}
                  id="terminal-input"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
