"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { ExternalLink, Github, Users, TrendingUp, X, ArrowRight, Zap } from "lucide-react";

const CATEGORIES = ["All", "AI/ML", "Full Stack", "EdTech", "Web3"];

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filtered = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 neural-bg opacity-40" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-radial from-cyan-500/5 to-transparent blur-[80px] pointer-events-none" />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              04 / Projects
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="gradient-text-cyan">Cinematic</span>
            <br />
            <span className="text-white">Project Showcase</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Production-grade systems built for scale, beauty, and real-world impact.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="hover"
              className={`px-5 py-2.5 rounded-xl font-mono text-sm transition-all duration-300 ${
                filter === cat
                  ? "bg-cyan-500/20 border border-cyan-400/60 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  : "glass border border-transparent text-slate-400 hover:border-cyan-500/20 hover:text-slate-300"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="project-card glass group"
                onClick={() => setSelectedProject(project)}
                data-cursor="hover"
              >
                {/* Gradient header */}
                <div
                  className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}
                >
                  {/* Abstract pattern */}
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                    }}
                  />
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />

                  {/* Project initial */}
                  <div className="relative z-10 text-white text-5xl font-black opacity-30"
                    style={{ fontFamily: "Orbitron, sans-serif" }}>
                    {project.title.charAt(0)}
                  </div>

                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                      <Zap size={12} className="text-yellow-400" />
                      <span className="font-mono text-xs text-yellow-400">Featured</span>
                    </div>
                  )}

                  {/* Category */}
                  <div className="absolute bottom-3 left-3 font-mono text-xs text-white/60 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
                    {project.category}
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.entries(project.metrics)
                      .slice(0, 2)
                      .map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center gap-1 text-xs rounded-lg px-2 py-1"
                          style={{
                            background: `${project.color}10`,
                            border: `1px solid ${project.color}25`,
                            color: project.color,
                          }}
                        >
                          <TrendingUp size={10} />
                          <span className="font-mono font-bold">{value}</span>
                          <span className="text-slate-400 capitalize">{key}</span>
                        </div>
                      ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs bg-white/5 text-slate-400 rounded-md px-2 py-0.5 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="font-mono text-xs text-slate-500 px-2 py-0.5">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.05 }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}30`,
                        color: project.color,
                      }}
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg glass text-slate-400 hover:text-white text-sm border border-white/5 hover:border-white/20 transition-all"
                    >
                      <Github size={14} />
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                    >
                      Details
                      <ArrowRight size={14} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(5,5,8,0.9)" }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="glass rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto scrollbar-hide"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header gradient */}
              <div
                className={`h-48 bg-gradient-to-br ${selectedProject.gradient} rounded-t-3xl relative overflow-hidden flex items-center justify-center`}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X size={16} />
                </button>
                <h2
                  className="text-4xl font-black text-white/20"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {selectedProject.title.split(" ")[0]}
                </h2>
              </div>

              <div className="p-8">
                <h2 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h2>
                <p className="text-slate-400 leading-relaxed mb-6">{selectedProject.longDescription || selectedProject.description}</p>

                {/* All metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {Object.entries(selectedProject.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-xl p-3 text-center"
                      style={{ background: `${selectedProject.color}10`, border: `1px solid ${selectedProject.color}20` }}
                    >
                      <div className="font-bold text-lg" style={{ color: selectedProject.color, fontFamily: "Orbitron, sans-serif" }}>{value}</div>
                      <div className="text-slate-400 text-xs capitalize font-mono">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Architecture */}
                {selectedProject.architecture && (
                  <div className="mb-6">
                    <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wide mb-3">Architecture</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.architecture.map((layer, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="glass rounded-lg px-3 py-1.5 text-sm text-slate-300 border border-white/5">{layer}</span>
                          {i < selectedProject.architecture!.length - 1 && (
                            <ArrowRight size={14} className="text-slate-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Full tech stack */}
                <div className="mb-6">
                  <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wide mb-3">Full Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span key={tech} className="font-mono text-xs px-3 py-1.5 rounded-lg"
                        style={{ background: `${selectedProject.color}10`, color: selectedProject.color, border: `1px solid ${selectedProject.color}25` }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-1 magnetic-btn magnetic-btn-primary flex items-center justify-center gap-2 text-sm">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-1 magnetic-btn magnetic-btn-outline flex items-center justify-center gap-2 text-sm">
                    <Github size={14} /> View Code
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
