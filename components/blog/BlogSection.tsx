"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { blogs } from "@/lib/data";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { formatDate } from "@/lib/utils";

const BLOG_CATEGORIES = ["All", "AI/ML", "Frontend", "Architecture"];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? blogs : blogs.filter((b) => b.category === filter);

  return (
    <section id="blog" className="py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="section-header"
        >
          <div className="inline-flex items-center gap-2 glass-cyan rounded-full px-4 py-2 mb-6">
            <span className="font-mono text-xs text-cyan-400 tracking-wider uppercase">
              06 / Blog
            </span>
          </div>
          <h2
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="gradient-text-cyan">Neural</span>{" "}
            <span className="text-white">Writings</span>
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Deep dives into AI systems, architecture patterns, and the future of software.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl font-mono text-sm transition-all ${
                filter === cat
                  ? "bg-cyan-500/20 border border-cyan-400/50 text-cyan-300"
                  : "glass border border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Blog cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((blog, i) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass rounded-2xl overflow-hidden border border-transparent hover:border-cyan-500/20 transition-all duration-300 group cursor-pointer"
              data-cursor="hover"
            >
              {/* Color stripe */}
              <div
                className="h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${blog.color}, transparent)` }}
              />

              <div className="p-7">
                {/* Category + read time */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="font-mono text-xs px-3 py-1 rounded-full"
                    style={{ background: `${blog.color}15`, color: blog.color, border: `1px solid ${blog.color}25` }}
                  >
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
                    <Clock size={12} />
                    {blog.readTime} read
                  </div>
                </div>

                <h3 className="text-white font-bold text-xl mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                  {blog.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-5">{blog.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {blog.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono bg-white/5 text-slate-500 px-2 py-0.5 rounded border border-white/5">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono">
                    <Calendar size={12} />
                    {formatDate(blog.date)}
                  </div>
                  <span className="flex items-center gap-1.5 text-sm font-medium group-hover:text-cyan-400 transition-colors text-slate-400">
                    Read More
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href={`https://dev.to/udaykumar`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="magnetic-btn magnetic-btn-outline inline-flex items-center gap-2"
            data-cursor="hover"
          >
            <BookOpen size={16} />
            View All Articles on Dev.to
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
