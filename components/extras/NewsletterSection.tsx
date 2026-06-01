"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { Mail, Loader2, CheckCircle, ShieldAlert, Sparkles, Send } from "lucide-react";
import toast from "react-hot-toast";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Uplink registration failed.");
      }

      setStatus("success");
      toast.success("Uplink synchronized successfully! 🚀");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Uplink synchronization failed.");
      toast.error(err.message || "Failed to establish synchronization link.");
    }
  };

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden">
      {/* Background radial glow matching the aurora theme */}
      <div className="absolute inset-0 aurora-bg opacity-30 pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Holographic frame wrapper */}
          <div
            className="relative glass rounded-3xl p-8 md:p-12 border overflow-hidden"
            style={{
              borderColor: "rgba(6,182,212,0.15)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px rgba(6,182,212,0.03)",
            }}
          >
            {/* Holographic border brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-xl" />

            <div className="grid md:grid-cols-5 gap-8 items-center">
              {/* Left: Headline & Stat details */}
              <div className="md:col-span-3 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-cyan text-[10px] font-mono tracking-widest text-cyan-400 uppercase">
                  <Sparkles size={10} className="animate-spin-slow" />
                  Neural AI Channel
                </div>

                <h2
                  className="text-3xl md:text-4xl font-extrabold text-white leading-tight"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  🚀 AI Engineering <span className="gradient-text-cyan">Newsletter</span>
                </h2>

                <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                  Building the Future with Gen AI & Agentic Systems. Get practical insights on LangChain, LangGraph, RAG architectures, vector databases, AI agents, MERN AI applications, and real-world engineering workflows.
                </p>

                {/* Animated counter pill */}
                <div className="pt-2">
                  <span
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono border"
                    style={{
                      background: "rgba(6,182,212,0.06)",
                      borderColor: "rgba(6,182,212,0.2)",
                      color: "#e2e8f0",
                    }}
                  >
                    🚀
                    <span>
                      Join{" "}
                      <span className="text-cyan-400 font-bold">
                        {isInView ? <CountUp start={0} end={100} duration={2.5} /> : "100"}
                        +
                      </span>{" "}
                      developers and AI enthusiasts
                    </span>
                  </span>
                </div>
              </div>

              {/* Right: Registration Form / States */}
              <div className="md:col-span-2">
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    // Success state
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6 space-y-3"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                        className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400 flex items-center justify-center mx-auto"
                      >
                        <CheckCircle size={24} className="text-cyan-400" />
                      </motion.div>
                      <h4
                        className="text-lg font-bold text-cyan-300"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                      >
                        Welcome to the Neural AI Network 🚀
                      </h4>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        Secure connection completed. Sync coordinates transmitted to your inbox.
                      </p>
                    </motion.div>
                  ) : (
                    // Idle/Loading/Error forms
                    <motion.form
                      key="form"
                      onSubmit={handleSubscribe}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <label htmlFor="newsletter-email" className="block text-[10px] font-mono tracking-wider text-slate-500 uppercase">
                          Transmission Endpoint (Email)
                        </label>
                        <div className="relative rounded-xl overflow-hidden border border-white/10 focus-within:border-cyan-500/50 transition-colors">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                            <Mail size={16} />
                          </div>
                          <input
                            id="newsletter-email"
                            type="email"
                            required
                            disabled={status === "loading"}
                            placeholder="agent@agency.ai"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#050816]/80 text-slate-200 text-sm pl-11 pr-4 py-3.5 outline-none placeholder:text-slate-600 focus:bg-[#07101f]/90 transition-all font-mono"
                          />
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="flex gap-2 p-3 rounded-lg bg-rose-500/5 border border-rose-500/20 text-rose-400 text-xs">
                          <ShieldAlert size={14} className="flex-shrink-0 mt-0.5" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <motion.button
                        type="submit"
                        disabled={status === "loading"}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        data-cursor="hover"
                        className="w-full magnetic-btn magnetic-btn-primary flex items-center justify-center gap-2 py-3.5 rounded-xl font-mono text-sm tracking-wider uppercase font-semibold disabled:opacity-50"
                      >
                        {status === "loading" ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            Establishing Sync...
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            Synchronize Node
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
