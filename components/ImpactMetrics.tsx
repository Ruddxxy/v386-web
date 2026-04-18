"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";

interface Metric {
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
  source: string;
}

const METRICS: Metric[] = [
  {
    value: 847,
    suffix: "K+",
    label: "peak throughput",
    sublabel: "files scanned in 0.4s",
    source: "FlashAudit Core · enterprise monorepo",
  },
  {
    value: 10,
    suffix: "x",
    label: "speedup delivered",
    sublabel: "vs. baseline tooling",
    source: "FlashAudit Core vs. Gitleaks 8.18",
  },
  {
    value: 5,
    suffix: "ms",
    label: "minimum latency",
    sublabel: "p50 across hot paths",
    source: "BioStream ML · 3K events/sec pipeline",
  },
];

export default function ImpactMetrics() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-text-muted text-xs uppercase tracking-widest mb-4 text-center">
          <span className="text-accent-amber">{"//"}</span> Engineering
          Capabilities
        </p>
        <div className="glass-card overflow-hidden">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-accent-amber/30 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12">
            {METRICS.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`text-center ${index < METRICS.length - 1 ? "md:border-r md:border-white/[0.06]" : ""}`}
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-text-primary mb-2">
                  {index === 2 && "<"}
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    duration={2}
                  />
                </div>
                <p className="font-mono text-sm text-text-muted uppercase tracking-widest">
                  {metric.label}
                </p>
                <p className="font-body text-xs text-text-muted/70 mt-2">
                  {metric.sublabel}
                </p>
                <p className="font-mono text-[10px] text-accent-amber/70 uppercase tracking-widest mt-3">
                  {metric.source}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link
            href="/benchmarks"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted hover:text-accent-amber transition-colors"
          >
            See the methodology →
          </Link>
        </div>
      </div>
    </section>
  );
}
