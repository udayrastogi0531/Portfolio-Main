"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import {
  ExternalLink,
  Github,
  TrendingUp,
  X,
  ArrowRight,
  Zap,
  Layers,
  Eye,
} from "lucide-react";

const CATEGORIES = ["All", "Gen AI", "MERN Stack", "Agentic AI", "Tools & Automation", "CPP & DSA"];

interface TiltState {
  rotateX: number;
  rotateY: number;
  glowX: number;
  glowY: number;
}

function ProjectCard({
  project,
  i,
  onClick,
}: {
  project: (typeof projects)[0];
  i: number;
  onClick: () => void;
}) {
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    glowX: 50,
    glowY: 50,
  });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 10;
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    setTilt({ rotateX, rotateY, glowX, glowY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, glowX: 50, glowY: 50 });
    setIsHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88, y: 20 }}
      transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor="hover"
      className="relative rounded-2xl overflow-hidden cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) ${
          isHovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)"
        }`,
        transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        background: "rgba(15,22,36,0.6)",
        border: `1px solid ${isHovered ? project.color + "40" : "rgba(30,45,61,0.8)"}`,
        boxShadow: isHovered
          ? `0 30px 80px rgba(0,0,0,0.6), 0 0 40px ${project.color}15, inset 0 1px 0 rgba(255,255,255,0.05)`
          : "0 4px 20px rgba(0,0,0,0.3)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Dynamic cursor glow on card surface */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 180px at ${tilt.glowX}% ${tilt.glowY}%, ${project.color}12 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Gradient header */}
      <div
        className={`h-52 bg-gradient-to-br ${project.gradient} relative overflow-hidden flex items-center justify-center`}
      >
        {/* Holographic grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Radial light blobs */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 40%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.1) 0%, transparent 40%)",
          }}
        />

        {/* Project initial letter — oversized watermark */}
        <div
          className="relative z-10 text-white font-black select-none pointer-events-none"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "clamp(4rem, 8vw, 7rem)",
            opacity: 0.18,
            lineHeight: 1,
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        >
          {project.title.charAt(0)}
        </div>

        {/* Featured badge */}
        {project.featured && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute top-3 right-3 flex items-center gap-1 bg-black/35 backdrop-blur-sm rounded-full px-3 py-1"
          >
            <Zap size={10} className="text-yellow-400" />
            <span className="font-mono text-[10px] text-yellow-400">Featured</span>
          </motion.div>
        )}

        {/* Category */}
        <div className="absolute bottom-3 left-3 font-mono text-[10px] text-white/60 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1">
          {project.category}
        </div>

        {/* View overlay on hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex items-center justify-center bg-black/20"
        >
          <div className="flex items-center gap-2 glass rounded-full px-4 py-2">
            <Eye size={14} className="text-white" />
            <span className="text-white text-xs font-mono">View Details</span>
          </div>
        </motion.div>
      </div>

      {/* Card body */}
      <div className="p-6">
        <h3
          className="text-lg font-bold text-white mb-2 transition-colors duration-200"
          style={{ color: isHovered ? project.color : "white" }}
        >
          {project.title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(project.metrics)
            .slice(0, 2)
            .map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-1 text-xs rounded-lg px-2.5 py-1.5 font-mono"
                style={{
                  background: `${project.color}12`,
                  border: `1px solid ${project.color}28`,
                  color: project.color,
                }}
              >
                <TrendingUp size={9} />
                <span className="font-bold">{value}</span>
                <span className="text-slate-500 capitalize">{key}</span>
              </div>
            ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] bg-white/4 text-slate-400 rounded-md px-2 py-0.5 border border-white/5"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="font-mono text-[10px] text-slate-600 px-1.5 py-0.5">
              +{project.tech.length - 4}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              background: `${project.color}15`,
              border: `1px solid ${project.color}30`,
              color: project.color,
            }}
          >
            <ExternalLink size={12} />
            Live Demo
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 flex items-center justify-center rounded-xl glass text-slate-400 hover:text-white border border-white/5 hover:border-white/20 transition-all"
          >
            <Github size={14} />
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 flex items-center justify-center rounded-xl glass text-slate-400 hover:text-cyan-400 border border-white/5 hover:border-cyan-500/30 transition-all"
          >
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 neural-bg opacity-30" />
      <div
        className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)",
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
            <Layers size={12} className="text-cyan-400" />
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
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="hover"
              className={`relative px-5 py-2.5 rounded-xl font-mono text-sm transition-all duration-300 ${
                filter === cat
                  ? "text-cyan-300 bg-cyan-500/15 border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
                  : "glass border border-transparent text-slate-400 hover:border-cyan-500/20 hover:text-slate-300"
              }`}
            >
              {cat}
              {filter === cat && (
                <motion.div
                  layoutId="project-filter-active"
                  className="absolute inset-0 rounded-xl bg-cyan-500/5"
                  transition={{ type: "spring", bounce: 0.2 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                i={i}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(5,5,8,0.92)" }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 22, stiffness: 280 }}
              className="glass rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto scrollbar-hide"
              style={{
                border: `1px solid ${selectedProject.color}30`,
                boxShadow: `0 0 60px ${selectedProject.color}15, 0 40px 100px rgba(0,0,0,0.6)`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal gradient header */}
              <div
                className={`h-52 bg-gradient-to-br ${selectedProject.gradient} rounded-t-3xl relative overflow-hidden flex items-center justify-center`}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                  }}
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X size={16} />
                </button>
                <h2
                  className="text-5xl font-black text-white/18 select-none"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {selectedProject.title.split(" ")[0]}
                </h2>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full flex-shrink-0"
                    style={{
                      background: `${selectedProject.color}15`,
                      color: selectedProject.color,
                      border: `1px solid ${selectedProject.color}30`,
                    }}
                  >
                    {selectedProject.category}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                {/* Metrics grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {Object.entries(selectedProject.metrics).map(([key, value]) => (
                    <div
                      key={key}
                      className="rounded-xl p-3 text-center"
                      style={{
                        background: `${selectedProject.color}10`,
                        border: `1px solid ${selectedProject.color}20`,
                      }}
                    >
                      <div
                        className="font-bold text-lg"
                        style={{
                          color: selectedProject.color,
                          fontFamily: "Orbitron, sans-serif",
                        }}
                      >
                        {value}
                      </div>
                      <div className="text-slate-400 text-xs capitalize font-mono">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Architecture */}
                {selectedProject.architecture && (
                  <div className="mb-6">
                    <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
                      Architecture Pipeline
                    </h4>
                    <div className="flex flex-wrap gap-2 items-center">
                      {selectedProject.architecture.map((layer, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="glass rounded-lg px-3 py-1.5 text-xs text-slate-300 border border-white/5">
                            {layer}
                          </span>
                          {i < selectedProject.architecture!.length - 1 && (
                            <ArrowRight size={12} className="text-slate-600" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Full tech stack */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
                    Full Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-3 py-1.5 rounded-lg"
                        style={{
                          background: `${selectedProject.color}10`,
                          color: selectedProject.color,
                          border: `1px solid ${selectedProject.color}25`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 magnetic-btn magnetic-btn-primary flex items-center justify-center gap-2 text-sm"
                  >
                    <ExternalLink size={14} /> Live Demo
                  </a>
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 magnetic-btn magnetic-btn-outline flex items-center justify-center gap-2 text-sm"
                  >
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
