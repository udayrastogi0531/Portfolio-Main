"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { services } from "@/lib/data";
import { Code2, Brain, Lightbulb, Server, ArrowRight, CheckCircle } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  code: Code2,
  brain: Brain,
  lightbulb: Lightbulb,
  server: Server,
};

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 relative overflow-hidden" ref={ref}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-radial from-purple-600/5 to-transparent blur-[80px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">Services</span>
          </div>
          <h2
            className="text-5xl font-bold mb-4"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-white">What I</span>{" "}
            <span className="gradient-text-cyan">Offer</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            From MVP to enterprise-grade systems. Let&apos;s build something remarkable.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass rounded-2xl p-7 flex flex-col border border-transparent hover:border-cyan-500/20 transition-all duration-300 cursor-default group"
                data-cursor="hover"
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 0 40px ${service.color}15, 0 20px 60px rgba(0,0,0,0.4)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
                >
                  <Icon size={26} style={{ color: service.color }} />
                </div>

                <h3 className="text-white font-bold text-lg mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{service.description}</p>

                <div className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle size={14} style={{ color: service.color, flexShrink: 0 }} />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <div
                    className="font-mono text-sm font-bold mb-3"
                    style={{ color: service.color }}
                  >
                    {service.price}
                  </div>
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: `${service.color}10`,
                      border: `1px solid ${service.color}30`,
                      color: service.color,
                    }}
                  >
                    Get Started
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
