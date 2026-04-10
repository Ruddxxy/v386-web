"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChapterLabel from "./ChapterLabel";
import PretextBubble from "./pretext/PretextBubble";
import { SERVICE_TEXTS } from "@/lib/pretext-registry";
import { usePretextLayout } from "./pretext/usePretextLayout";

type SurfaceType = "terminal" | "glass-cyan" | "solid";

interface Service {
  number: string;
  title: string;
  registryKey: string;
  description: string;
  outcome: string;
  deliverables: string[];
  surface: SurfaceType;
}

function getSurfaceClass(surface: SurfaceType): string {
  switch (surface) {
    case "terminal":
      return "surface-terminal";
    case "glass-cyan":
      return "glass-card border-accent-cyan/20";
    case "solid":
      return "surface-solid";
  }
}

function getAccentLine(surface: SurfaceType): string {
  switch (surface) {
    case "terminal":
      return "bg-gradient-to-r from-accent-amber to-transparent";
    case "glass-cyan":
      return "bg-gradient-to-r from-accent-cyan to-transparent";
    case "solid":
      return "bg-gradient-to-r from-white/20 to-transparent";
  }
}

function getHoverGlow(surface: SurfaceType): string {
  switch (surface) {
    case "terminal":
    case "solid":
      return "group-hover:border-accent-amber/25 group-hover:shadow-[0_0_20px_rgba(229,165,55,0.08)]";
    case "glass-cyan":
      return "group-hover:border-accent-cyan/25 group-hover:shadow-[0_0_20px_rgba(63,189,212,0.08)]";
  }
}

function getChevronColor(surface: SurfaceType): string {
  switch (surface) {
    case "terminal":
    case "solid":
      return "text-accent-amber";
    case "glass-cyan":
      return "text-accent-cyan";
  }
}

function ServiceCard({
  service,
  index,
  isExpanded,
  onToggle,
}: {
  service: Service;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const surfaceClass = getSurfaceClass(service.surface);
  const accentLine = getAccentLine(service.surface);
  const hoverGlow = getHoverGlow(service.surface);
  const chevronColor = getChevronColor(service.surface);

  const { height: pretextHeight, containerRef } = usePretextLayout({
    key: service.registryKey,
    lineHeight: 28,
  });

  // Estimate total expanded height: description + deliverables section
  const deliverableHeight = service.deliverables.length * 28 + 60;
  const expandedHeight = Math.max(pretextHeight + deliverableHeight + 48, 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="group relative pt-16"
    >
      {/* Large Number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        viewport={{ once: true }}
        className="absolute -top-4 left-6 text-8xl md:text-9xl font-heading font-bold text-accent-amber/10 group-hover:text-accent-amber/20 transition-colors duration-300 leading-none select-none"
      >
        {service.number}
      </motion.div>

      {/* Card */}
      <div
        className={`relative ${surfaceClass} ${hoverGlow} overflow-hidden flex flex-col transition-all duration-300`}
      >
        <div className={`h-[3px] ${accentLine}`} />

        {/* Collapsed zone — always visible */}
        <button
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`service-content-${service.number}`}
          className="w-full text-left p-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber/50 focus-visible:ring-inset"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 tracking-tight text-text-primary">
                {service.title}
              </h3>
              <div className="px-3 py-2 rounded-lg bg-accent-amber/5 border-l-2 border-accent-amber/40">
                <span className="text-accent-amber font-mono text-sm">
                  {service.outcome}
                </span>
              </div>
            </div>
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`${chevronColor} text-2xl flex-shrink-0 mt-2`}
            >
              &#9662;
            </motion.span>
          </div>
        </button>

        {/* Expandable zone — Pretext-predicted height */}
        <motion.div
          id={`service-content-${service.number}`}
          role="region"
          aria-labelledby={`service-title-${service.number}`}
          initial={false}
          animate={{ height: isExpanded ? expandedHeight : 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div ref={containerRef} className="px-8 pb-2">
            <p className="text-text-secondary text-lg leading-relaxed font-body">
              {service.description}
            </p>
          </div>

          <div className="border-t border-white/[0.06] p-6">
            <span className="text-sm uppercase tracking-widest font-mono text-accent-amber block mb-4">
              What you get
            </span>
            <ul className="space-y-2">
              <AnimatePresence>
                {isExpanded &&
                  service.deliverables.map((item, itemIndex) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: itemIndex * 0.05,
                      }}
                      className="flex items-start gap-3 text-text-secondary"
                    >
                      <span className="text-accent-amber mt-1 text-xs">
                        &#9670;
                      </span>
                      <span className="text-sm">{item}</span>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const services: Service[] = [
    {
      number: "01",
      title: "Systems Architecture",
      registryKey: "service:systems-architecture:desc",
      description:
        "Your Python service is slow? I've rewritten hot paths in Rust that went from minutes to milliseconds. I built FlashAudit this way — zero-copy I/O, memory-mapped files, parallel execution. The result was 10x faster than Gitleaks on the same workload.",
      outcome: "Your bottleneck, identified and eliminated",
      deliverables: [
        "Profiling to find the real hot path",
        "Rust/C++ rewrite of the critical section",
        "Zero-copy and memory-mapped I/O where it counts",
        "Benchmarks proving the improvement",
      ],
      surface: "terminal",
    },
    {
      number: "02",
      title: "Security Instrumentation",
      registryKey: "service:security-instrumentation:desc",
      description:
        "I built FlashAudit because existing secret scanners were too slow for enterprise repos. I can do the same for your pipeline — scanning that runs in CI, catches credentials before they ship, and doesn't slow down your deploys.",
      outcome: "Secrets caught before they leave your branch",
      deliverables: [
        "CI/CD pipeline hardening",
        "Custom scanning rules for your codebase",
        "Pre-commit hooks that actually run fast",
        "Incident playbook for when something slips",
      ],
      surface: "glass-cyan",
    },
    {
      number: "03",
      title: "MVP Development",
      registryKey: "service:mvp-development:desc",
      description:
        "I've shipped full-stack products end-to-end — trading platforms, SaaS tools, finance apps. Database to deploy, with auth, payments, and monitoring that works. I build for the engineer who inherits the codebase after me.",
      outcome: "A shipped product, not a prototype",
      deliverables: [
        "Full-stack build (Next.js / FastAPI / Flutter)",
        "Database with proper migrations and indexing",
        "CI/CD that deploys on merge",
        "Code clean enough to hand off",
      ],
      surface: "solid",
    },
  ];

  return (
    <section id="services" className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <ChapterLabel number="04" title="what I build for you" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-text-primary">
            What I Build For You<span className="text-accent-amber">.</span>
          </h2>
        </motion.div>

        {/* Services Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() =>
                setExpandedIndex(expandedIndex === index ? null : index)
              }
            />
          ))}
        </div>

        {/* Philosophy Quote — Pretext shrink-wrapped bubble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 max-w-3xl mx-auto text-center"
        >
          <PretextBubble
            text={SERVICE_TEXTS["service:philosophy-quote"].text}
            registryKey="service:philosophy-quote"
            fontKey="body-2xl"
            maxWidth={768}
            lineHeight={36}
            className="glass-card border-accent-amber/20 px-8 py-6"
          >
            <span className="text-6xl text-accent-amber/30 font-heading leading-none">
              &ldquo;
            </span>
            <p className="text-xl md:text-2xl italic text-text-secondary font-body leading-relaxed -mt-6">
              {SERVICE_TEXTS["service:philosophy-quote"].text}
            </p>
            <span className="text-6xl text-accent-amber/30 font-heading leading-none">
              &rdquo;
            </span>
          </PretextBubble>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.a
            href="mailto:rudranarayanmohapatro@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-3 px-12 py-5 glass-card border-accent-amber/30 text-accent-amber font-mono uppercase tracking-wider text-sm hover:border-accent-amber hover:shadow-glow-amber transition-all duration-300"
          >
            Got a problem worth solving? Let&apos;s talk.
          </motion.a>
          <p className="mt-6 font-mono text-text-muted text-sm">
            {"// no shortcuts, no compromises"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
