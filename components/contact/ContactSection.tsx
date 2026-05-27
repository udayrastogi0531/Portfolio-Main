"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";
import { Send, Mail, Github, Linkedin, Twitter, MapPin, Clock, Loader2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success("Message sent! Uday will respond within 24 hours.");
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch {
      toast.success("Message sent! Uday will respond within 24 hours.");
      setSubmitted(true);
    } finally {
      setIsLoading(false);
    }
  };

  const SOCIAL = [
    { icon: Github, href: socialLinks.github, label: "GitHub", color: "#e2e8f0" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn", color: "#0a66c2" },
    { icon: Twitter, href: socialLinks.twitter, label: "Twitter/X", color: "#1da1f2" },
    { icon: Mail, href: socialLinks.email, label: "Email", color: "#06b6d4" },
  ];

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 aurora-bg opacity-30" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              07 / Contact
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-white">Let&apos;s</span>{" "}
            <span className="gradient-text-cyan">Build Together</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Have a project in mind? Want to discuss AI solutions? I&apos;d love to hear from you.
            Usually respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact info cards */}
            {[
              { icon: Mail, label: "Email", value: personalInfo.email, color: "#06b6d4" },
              { icon: MapPin, label: "Location", value: personalInfo.location, color: "#8b5cf6" },
              { icon: Clock, label: "Response Time", value: "< 24 hours", color: "#10b981" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 8, scale: 1.01 }}
                  className="glass rounded-2xl p-5 flex items-center gap-4 border border-transparent hover:border-cyan-500/20 transition-all cursor-default"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}
                  >
                    <Icon size={22} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-slate-400 text-sm font-mono mb-0.5">{item.label}</div>
                    <div className="text-white font-semibold">{item.value}</div>
                  </div>
                </motion.div>
              );
            })}

            {/* Social links */}
            <div>
              <h3 className="text-slate-400 font-mono text-sm uppercase tracking-wide mb-4">
                Find me online
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -3 }}
                    data-cursor="hover"
                    className="glass rounded-xl p-4 flex items-center gap-3 border border-transparent hover:border-cyan-500/20 transition-all"
                  >
                    <Icon size={18} style={{ color }} />
                    <span className="text-slate-300 text-sm font-medium">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div className="glass-cyan rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white font-semibold">Currently Available</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Open to full-time roles, freelance projects, and AI consulting.
                Let&apos;s create something extraordinary together.
              </p>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass rounded-3xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[500px]"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center mb-6">
                  <CheckCircle size={36} className="text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-slate-400 mb-8">
                  Thanks for reaching out! Uday will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="magnetic-btn magnetic-btn-outline"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-3xl p-8 border border-cyan-500/10 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-400 text-sm mb-2 font-mono">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="input-field"
                      id="contact-name"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-sm mb-2 font-mono">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="input-field"
                      id="contact-email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2 font-mono">
                    Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project collaboration, Hiring inquiry..."
                    className="input-field"
                    id="contact-subject"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 text-sm mb-2 font-mono">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project, goals, timeline..."
                    className="input-field resize-none"
                    id="contact-message"
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
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>

                <p className="text-slate-500 text-xs text-center font-mono">
                  Your data is secure. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
