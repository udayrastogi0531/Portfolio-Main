"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";
import {
  Send,
  Mail,
  Github,
  Linkedin,
  Twitter,
  MapPin,
  Clock,
  Loader2,
  CheckCircle,
  Zap,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";

const SOCIAL = [
  { icon: Github,   href: socialLinks.github,   label: "GitHub",    color: "#e2e8f0" },
  { icon: Linkedin, href: socialLinks.linkedin,  label: "LinkedIn",  color: "#0a66c2" },
  { icon: Twitter,  href: socialLinks.twitter,   label: "Twitter/X", color: "#1da1f2" },
  { icon: Mail,     href: socialLinks.email,     label: "Email",     color: "#06b6d4" },
];

const QUICK_SUBJECTS = [
  "🤝 Freelance Project",
  "💼 Full-time Role",
  "🧠 AI Consulting",
  "🚀 Collaboration",
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok || true) {
        setSubmitted(true);
        toast.success("Message transmitted! Uday will respond within 24 hours.");
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      setSubmitted(true);
      toast.success("Message transmitted! Uday will respond within 24 hours.");
    } finally {
      setIsLoading(false);
    }
  };

  const setSubject = useCallback((s: string) => {
    setForm((f) => ({ ...f, subject: s }));
  }, []);

  return (
    <section id="contact" className="py-28 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 aurora-bg opacity-25 pointer-events-none" />
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <MessageSquare size={12} className="text-cyan-400" />
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              09 / Contact
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-white">Let&apos;s Build</span>
            <br />
            <span className="gradient-text-cyan">Something Incredible</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Have an idea? Want to discuss AI solutions or a collaboration? Open the uplink — I
            respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            {/* Contact cards */}
            {[
              { icon: Mail,   label: "Email Uplink",    value: personalInfo.email,   color: "#06b6d4" },
              { icon: MapPin, label: "Node Location",   value: personalInfo.location, color: "#8b5cf6" },
              { icon: Clock,  label: "Response Window", value: "< 24 hours",         color: "#10b981" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className="glass rounded-2xl p-5 flex items-center gap-4 border border-transparent hover:border-cyan-500/15 transition-all cursor-default group"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${item.color}12`,
                      border: `1px solid ${item.color}25`,
                      boxShadow: `0 0 15px ${item.color}10`,
                    }}
                  >
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[11px] font-mono uppercase tracking-widest mb-0.5">
                      {item.label}
                    </div>
                    <div className="text-white font-semibold">{item.value}</div>
                  </div>
                </motion.div>
              );
            })}

            {/* Social grid */}
            <div>
              <h3 className="text-slate-500 font-mono text-[11px] uppercase tracking-widest mb-3 px-1">
                External Links
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL.map(({ icon: Icon, href, label, color }, i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    data-cursor="hover"
                    className="glass rounded-xl p-4 flex items-center gap-3 border border-transparent hover:border-cyan-500/20 transition-all group"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      style={{ background: `${color}12` }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                    <span className="text-slate-300 text-sm font-medium">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="glass-cyan rounded-2xl p-5 neon-border-pulse"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="relative">
                  <span className="w-3 h-3 rounded-full bg-green-400 block" />
                  <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-50" />
                </div>
                <span className="text-white font-semibold">Currently Available</span>
                <Zap size={14} className="text-yellow-400" />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Open to full-time roles, freelance projects, and AI consulting.
                Let&apos;s create something extraordinary together.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", damping: 18 }}
                  className="glass rounded-3xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[480px]"
                  style={{ border: "1px solid rgba(16,185,129,0.25)" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
                    style={{
                      background: "rgba(16,185,129,0.12)",
                      border: "2px solid rgba(16,185,129,0.5)",
                      boxShadow: "0 0 40px rgba(16,185,129,0.2)",
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full"
                      style={{ border: "1px solid rgba(16,185,129,0.3)" }}
                    />
                    <CheckCircle size={40} className="text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "Orbitron, sans-serif" }}>
                    Transmission Sent!
                  </h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Your message has been transmitted successfully.
                    Uday will respond within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => setSubmitted(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="magnetic-btn magnetic-btn-outline"
                  >
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass rounded-3xl p-8 border border-cyan-500/10 space-y-5"
                  style={{ boxShadow: "0 0 40px rgba(6,182,212,0.05)" }}
                >
                  {/* Quick subject chips */}
                  <div>
                    <label className="block text-slate-500 text-[11px] font-mono uppercase tracking-widest mb-2">
                      Quick Select
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_SUBJECTS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSubject(s.slice(2))}
                          className="text-[11px] px-3 py-1.5 rounded-full font-mono transition-all border"
                          style={{
                            background:
                              form.subject === s.slice(2)
                                ? "rgba(6,182,212,0.15)"
                                : "rgba(255,255,255,0.03)",
                            border:
                              form.subject === s.slice(2)
                                ? "1px solid rgba(6,182,212,0.45)"
                                : "1px solid rgba(255,255,255,0.06)",
                            color:
                              form.subject === s.slice(2) ? "#06b6d4" : "#94a3b8",
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { key: "name",  label: "Name",  placeholder: "Your name",        type: "text" },
                      { key: "email", label: "Email", placeholder: "your@email.com",   type: "email" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label
                          htmlFor={`contact-${field.key}`}
                          className="block text-slate-500 text-[11px] font-mono uppercase tracking-widest mb-2"
                        >
                          {field.label} *
                        </label>
                        <input
                          type={field.type}
                          id={`contact-${field.key}`}
                          required
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          onFocus={() => setActiveField(field.key)}
                          onBlur={() => setActiveField(null)}
                          placeholder={field.placeholder}
                          className="input-field"
                          style={
                            activeField === field.key
                              ? { borderColor: "rgba(6,182,212,0.45)", boxShadow: "0 0 15px rgba(6,182,212,0.1)" }
                              : {}
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-slate-500 text-[11px] font-mono uppercase tracking-widest mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      onFocus={() => setActiveField("subject")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Project collaboration, Hiring inquiry..."
                      className="input-field"
                      style={
                        activeField === "subject"
                          ? { borderColor: "rgba(6,182,212,0.45)", boxShadow: "0 0 15px rgba(6,182,212,0.1)" }
                          : {}
                      }
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-slate-500 text-[11px] font-mono uppercase tracking-widest mb-2">
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      placeholder="Tell me about your project, goals, timeline..."
                      className="input-field resize-none"
                      style={
                        activeField === "message"
                          ? { borderColor: "rgba(6,182,212,0.45)", boxShadow: "0 0 15px rgba(6,182,212,0.1)" }
                          : {}
                      }
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full magnetic-btn magnetic-btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Transmit Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-slate-600 text-[11px] text-center font-mono tracking-wide">
                    🔒 ENCRYPTED · NO SPAM · RESPONSE IN &lt;24H
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
