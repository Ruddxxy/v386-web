"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GithubIcon } from "./icons";
import AnimatedCounter from "./AnimatedCounter";

export default function CaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const problemOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.2],
    [0, 1]
  );
  const problemY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);

  const approachOpacity = useTransform(
    scrollYProgress,
    [0.2, 0.35],
    [0, 1]
  );
  const approachY = useTransform(scrollYProgress, [0.2, 0.35], [30, 0]);

  const resultOpacity = useTransform(
    scrollYProgress,
    [0.35, 0.5],
    [0, 1]
  );
  const resultY = useTransform(scrollYProgress, [0.35, 0.5], [30, 0]);

  return (
    <div ref={sectionRef} className="relative mb-16">
      <div className="surface-featured overflow-hidden">
        {/* Header */}
        <div className="p-8 border-b border-accent-amber/10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 text-xs font-mono uppercase tracking-wider bg-accent-amber/20 text-accent-amber rounded">
              Case Study
            </span>
            <motion.a
              href="https://github.com/Ruddxxy/Flash-Audit-Core"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-1.5 surface-outline rounded-lg text-text-secondary hover:text-accent-amber transition-colors duration-300"
              aria-label="View FlashAudit Core on GitHub"
            >
              <GithubIcon size={16} />
            </motion.a>
          </div>
          <h3 className="text-3xl md:text-4xl font-heading font-bold tracking-tight text-text-primary mb-2">
            FlashAudit Core
          </h3>
          <p className="text-accent-amber font-mono text-sm uppercase tracking-wider">
            Enterprise-Grade Secret Scanner
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {["Rust", "Rayon", "Memmap2"].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 surface-outline rounded-full text-accent-cyan font-mono text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Three-phase narrative */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]">
          {/* Problem */}
          <motion.div
            style={{ opacity: problemOpacity, y: problemY }}
            className="p-8"
          >
            <h4 className="font-mono text-sm uppercase tracking-widest text-color-danger/80 mb-4">
              Problem
            </h4>
            <p className="text-text-secondary font-body leading-relaxed">
              Enterprise repos leak secrets daily. Existing regex-based scanners
              like Gitleaks choke on large monorepos &mdash; taking minutes to
              scan what should take seconds.
            </p>
          </motion.div>

          {/* Approach */}
          <motion.div
            style={{ opacity: approachOpacity, y: approachY }}
            className="p-8"
          >
            <h4 className="font-mono text-sm uppercase tracking-widest text-accent-cyan mb-4">
              Approach
            </h4>
            <p className="text-text-secondary font-body leading-relaxed">
              Zero-copy architecture in Rust. Memory-mapped file I/O via
              memmap2. Parallel execution across all cores with Rayon. 66
              vendor-specific regex rules compiled once at startup.
            </p>
          </motion.div>

          {/* Result */}
          <motion.div
            style={{ opacity: resultOpacity, y: resultY }}
            className="p-8"
          >
            <h4 className="font-mono text-sm uppercase tracking-widest text-accent-amber mb-4">
              Result
            </h4>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-heading font-bold text-text-primary">
                  <AnimatedCounter target={847} suffix="K" />
                </div>
                <span className="text-text-muted font-mono text-xs uppercase">
                  files scanned in 0.4s
                </span>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-accent-amber">
                  <AnimatedCounter target={10} suffix="x" />
                </div>
                <span className="text-text-muted font-mono text-xs uppercase">
                  faster than Gitleaks
                </span>
              </div>
              <div>
                <div className="text-3xl font-heading font-bold text-text-primary">
                  SARIF 2.1.0
                </div>
                <span className="text-text-muted font-mono text-xs uppercase">
                  compliant output
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
