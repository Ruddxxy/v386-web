"use client";

import { motion } from "framer-motion";
import AnimatedCounter from "./AnimatedCounter";

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

const METRICS: Metric[] = [
  { value: 847, suffix: "K+", label: "files scanned per second" },
  { value: 10, suffix: "x", label: "faster than existing tools" },
  { value: 5, suffix: "ms", label: "average latency" },
];

export default function ImpactMetrics() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <p className="font-mono text-text-muted text-xs uppercase tracking-widest mb-4 text-center">
          <span className="text-accent-amber">{"//"}</span> FlashAudit Performance Benchmarks
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
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
