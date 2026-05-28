"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store";
import { X, Send, Minimize2, Maximize2, ArrowDown, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  "What are your top projects?",
  "What's your tech stack?",
  "Are you available for hire?",
  "Tell me about your AI experience",
];

// Animated ARIA avatar orb
function ARIAOrb({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-10 h-10 flex-shrink-0">
      {/* Outer glow rings */}
      <motion.div
        animate={{ scale: isActive ? [1, 1.3, 1] : 1, opacity: isActive ? [0.3, 0.6, 0.3] : 0.2 }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 rounded-full"
        style={{ border: "1px solid rgba(168,85,247,0.5)", transform: "scale(1.4)" }}
      />
      <motion.div
        animate={{ scale: isActive ? [1, 1.15, 1] : 1, opacity: isActive ? [0.5, 0.8, 0.5] : 0.3 }}
        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
        className="absolute inset-0 rounded-full"
        style={{ border: "1px solid rgba(6,182,212,0.4)", transform: "scale(1.2)" }}
      />
      {/* Core orb */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
          boxShadow: isActive
            ? "0 0 20px rgba(168,85,247,0.6), 0 0 40px rgba(6,182,212,0.3)"
            : "0 0 10px rgba(168,85,247,0.3)",
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.4), transparent)",
          }}
        />
        <span className="relative z-10 text-white font-bold text-xs" style={{ fontFamily: "Orbitron, sans-serif" }}>
          AI
        </span>
      </div>
    </div>
  );
}

export default function AIChatAssistant() {
  const { isChatOpen, toggleChat } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm **ARIA** — Uday's AI assistant. I can answer questions about his skills, projects, and how to work together. What would you like to know? 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isChatOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isChatOpen, isMinimized]);

  const handleScroll = useCallback(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 80);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      const aiId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: aiId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
            session_id: typeof window !== "undefined" ? sessionStorage.getItem("__portfolio_session") : null,
          }),
        });

        if (!res.ok) throw new Error("API failed");

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) throw new Error("No stream");

        let full = "";
        let buf = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() || "";
          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("data: ")) {
              try {
                const data = JSON.parse(trimmed.slice(6));
                full += data.content || "";
                setMessages((prev) =>
                  prev.map((m) => (m.id === aiId ? { ...m, content: full } : m))
                );
              } catch {}
            }
          }
        }
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === aiId
              ? {
                  ...m,
                  content:
                    "I encountered a communication error with my core network. Please try again!",
                }
              : m
          )
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  return (
    <>
      {/* Floating orb button */}
      <AnimatePresence>
        {!isChatOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.4, type: "spring", damping: 15 }}
            onClick={toggleChat}
            data-cursor="hover"
            className="fixed bottom-24 md:bottom-8 right-6 z-50 group"
            aria-label="Open AI Chat"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                boxShadow: "0 0 30px rgba(124,58,237,0.5), 0 0 60px rgba(6,182,212,0.2)",
              }}
            >
              {/* Rotating inner ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-25"
                style={{
                  background: "conic-gradient(from 0deg, transparent, white, transparent)",
                }}
              />
              <span
                className="relative z-10 text-white font-black text-sm"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                AI
              </span>
            </div>
            {/* Online dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#050508]">
              <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", damping: 22, stiffness: 280 }}
            className="fixed bottom-24 md:bottom-8 right-6 z-50 w-[360px] md:w-[400px] glass rounded-3xl overflow-hidden flex flex-col"
            style={{
              border: "1px solid rgba(124,58,237,0.25)",
              boxShadow:
                "0 0 60px rgba(124,58,237,0.2), 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
              maxHeight: "600px",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 border-b border-white/5"
              style={{ background: "rgba(10,10,20,0.8)" }}
            >
              <div className="flex items-center gap-3">
                <ARIAOrb isActive={isLoading} />
                <div>
                  <div className="text-white font-bold text-sm">ARIA AI</div>
                  <div className="flex items-center gap-1.5">
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-green-400"
                    />
                    <span className="text-green-400 text-[10px] font-mono tracking-widest">
                      {isLoading ? "GENERATING..." : "NEURAL NETWORK ACTIVE"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-slate-400 hover:text-white p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
                >
                  {isMinimized ? <Maximize2 size={15} /> : <Minimize2 size={15} />}
                </button>
                <button
                  onClick={toggleChat}
                  className="text-slate-400 hover:text-white p-1.5 hover:bg-white/5 rounded-lg transition-colors"
                  aria-label="Close chat"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col flex-1"
                >
                  {/* Messages */}
                  <div
                    ref={messagesContainerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide min-h-[280px] max-h-[380px] relative"
                  >
                    {messages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 12, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                        className={`flex items-start gap-2 ${
                          msg.role === "user" ? "flex-row-reverse" : ""
                        }`}
                      >
                        {msg.role === "assistant" && (
                          <div className="flex-shrink-0 mt-0.5">
                            <ARIAOrb isActive={isLoading && msg.content === ""} />
                          </div>
                        )}
                        <div
                          className={
                            msg.role === "user" ? "chat-bubble-user" : "chat-bubble-ai"
                          }
                          style={
                            msg.role === "assistant"
                              ? {
                                  border: "1px solid rgba(124,58,237,0.2)",
                                  background: "rgba(15,22,36,0.9)",
                                }
                              : {}
                          }
                        >
                          {msg.content ? (
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {msg.content}
                            </p>
                          ) : (
                            <div className="flex items-center gap-1.5 py-1">
                              {[0, 1, 2].map((i) => (
                                <motion.span
                                  key={i}
                                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                                  transition={{
                                    duration: 0.9,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                  }}
                                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />

                    {showScrollBtn && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={scrollToBottom}
                        className="absolute bottom-4 right-4 p-2 rounded-full glass border border-cyan-500/20 text-cyan-400 hover:text-white transition-all"
                      >
                        <ArrowDown size={13} />
                      </motion.button>
                    )}
                  </div>

                  {/* Quick questions */}
                  {messages.length === 1 && (
                    <div className="px-4 pb-3 flex flex-wrap gap-1.5">
                      {QUICK_QUESTIONS.map((q) => (
                        <motion.button
                          key={q}
                          onClick={() => sendMessage(q)}
                          whileHover={{ scale: 1.04, y: -1 }}
                          whileTap={{ scale: 0.96 }}
                          className="text-[10px] px-3 py-1.5 rounded-full font-mono transition-all border"
                          style={{
                            background: "rgba(124,58,237,0.08)",
                            border: "1px solid rgba(124,58,237,0.2)",
                            color: "#a78bfa",
                          }}
                        >
                          <Sparkles size={8} className="inline mr-1" />
                          {q}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div
                    className="p-4 border-t border-white/5"
                    style={{ background: "rgba(10,10,20,0.5)" }}
                  >
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                        placeholder="Ask ARIA anything..."
                        id="chat-input"
                        className="flex-1 bg-white/5 border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                      />
                      <motion.button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isLoading}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-10 h-10 rounded-xl flex items-center justify-center disabled:opacity-30 transition-opacity"
                        style={{
                          background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                          boxShadow: "0 0 15px rgba(124,58,237,0.4)",
                        }}
                        aria-label="Send message"
                      >
                        <Send size={14} className="text-white" />
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-between mt-2 px-1">
                      <span className="text-[9px] text-slate-600 font-mono tracking-wider">
                        GROQ · GEMINI · OPENROUTER
                      </span>
                      {isLoading && (
                        <motion.span
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 0.8, repeat: Infinity }}
                          className="text-[9px] text-purple-400 font-mono"
                        >
                          ◉ STREAMING
                        </motion.span>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
