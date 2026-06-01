"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certifications, hackathons, testimonials } from "@/lib/data";
import { Award, Trophy, Star, Quote } from "lucide-react";

export default function ExtrasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      {/* Certifications */}
      <section className="py-20 relative overflow-hidden" ref={ref}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
              <Award size={12} className="text-cyan-400" />
              <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">Certifications</span>
            </div>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Verified <span className="gradient-text-cyan">Expertise</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="holographic-card rounded-2xl p-6 border border-transparent hover:border-cyan-500/20 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-2xl font-bold"
                  style={{ background: `${cert.color}20`, color: cert.color, border: `1px solid ${cert.color}30` }}
                >
                  <Award size={24} />
                </div>
                <h3 className="text-white font-bold text-sm mb-1 leading-tight">{cert.name}</h3>
                <p className="text-slate-400 text-xs mb-2 font-mono">{cert.issuer}</p>
                <div className="flex items-center justify-between mt-3">
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded"
                    style={{ background: `${cert.color}15`, color: cert.color }}
                  >
                    {cert.date}
                  </span>
                  {("url" in cert) && (cert as any).url && (
                    <a
                      href={(cert as any).url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono hover:underline font-bold transition-all"
                      style={{ color: cert.color }}
                    >
                      View Certificate →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hackathons */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 glass-purple rounded-full px-4 py-2 mb-6">
              <Trophy size={12} className="text-yellow-400" />
              <span className="font-mono text-xs text-yellow-400 tracking-wider uppercase">Hackathons</span>
            </div>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>
              Competition <span className="gradient-text-purple">Victories</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {hackathons.map((hack, i) => (
              <motion.div
                key={hack.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="achievement-badge flex-col items-start rounded-2xl"
                style={{ background: `${hack.color}08`, borderColor: `${hack.color}30` }}
              >
                <div className="text-3xl mb-3">{hack.position.split(" ")[0]}</div>
                <div className="text-white font-bold mb-1">{hack.name}</div>
                <div className="text-slate-400 text-sm mb-2">{hack.project}</div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span style={{ color: hack.color }} className="font-bold">{hack.prize}</span>
                  <span className="text-slate-500">{hack.participants} participants</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
              <Star size={12} className="text-yellow-400" />
              <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">Testimonials</span>
            </div>
            <h2 className="text-4xl font-bold text-white" style={{ fontFamily: "Orbitron, sans-serif" }}>
              What <span className="gradient-text-cyan">People Say</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-7 border border-transparent hover:border-cyan-500/20 transition-all"
              >
                <Quote size={32} className="text-cyan-400/30 mb-4" />
                <p className="text-slate-300 leading-relaxed mb-6 italic">&ldquo;{t.content}&rdquo;</p>

                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-slate-400 text-sm">{t.role}</div>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} size={12} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
