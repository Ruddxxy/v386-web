"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PretextBubble from "./pretext/PretextBubble";
import { SERVICE_TEXTS } from "@/lib/pretext-registry";
import { usePretextLayout } from "./pretext/usePretextLayout";
import SectionShell from "./SectionShell";
import { EASE, Reveal } from "./motion";

interface Service {
  number: string;
  title: string;
  registryKey: string;
  description: string;
  outcome: string;
  deliverables: string[];
}

function ServiceRow({
  service,
  isExpanded,
  onToggle,
}: {
  service: Service;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { height: pretextHeight, containerRef } = usePretextLayout({
    key: service.registryKey,
    lineHeight: 28,
  });

  const deliverableHeight = service.deliverables.length * 32 + 72;
  const expandedHeight = Math.max(pretextHeight + deliverableHeight + 32, 200);

  const contentId = `service-content-${service.number}`;
  const titleId = `service-title-${service.number}`;

  return (
    <div className="data-row">
      <button
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={contentId}
        className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber/50 focus-visible:ring-inset"
      >
        <div className="grid grid-cols-[3rem_1fr_1.5rem] items-baseline gap-4 py-7 md:grid-cols-[4rem_1fr_1.5rem] md:gap-8">
          <span className="font-mono text-caption uppercase text-accent-amber">
            {service.number}
          </span>
          <div>
            <h3
              id={titleId}
              className="font-heading text-title-2 text-text-primary"
            >
              {service.title}
            </h3>
            <p className="mt-1 font-mono text-mono-body text-accent-amber">
              {service.outcome}
            </p>
          </div>
          <span
            className="justify-self-end font-mono text-lg text-text-muted"
            aria-hidden
          >
            {isExpanded ? "−" : "+"}
          </span>
        </div>
      </button>

      {/* Expandable zone — Pretext-predicted height */}
      <motion.div
        id={contentId}
        role="region"
        aria-labelledby={titleId}
        initial={false}
        animate={{ height: isExpanded ? expandedHeight : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        style={{ overflow: "hidden" }}
      >
        <div className="grid grid-cols-1 gap-4 pb-8 md:grid-cols-[4rem_1fr] md:gap-8">
          <span className="hidden md:block" aria-hidden />
          <div ref={containerRef} className="max-w-[62ch]">
            <p className="font-body text-lg leading-relaxed text-text-secondary">
              {service.description}
            </p>
            <p className="mt-6 font-mono text-caption uppercase text-text-muted">
              deliverables
            </p>
            <ul className="mt-2">
              <AnimatePresence>
                {isExpanded &&
                  service.deliverables.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: i * 0.05,
                        ease: EASE,
                      }}
                      className="data-row py-2 font-body text-body text-text-secondary"
                    >
                      {item}
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const SERVICES: Service[] = [
  {
    number: "05.1",
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
  },
  {
    number: "05.2",
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
  },
  {
    number: "05.3",
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
  },
];

export default function Services() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <SectionShell
      id="services"
      index="05"
      title="engagement"
      meta={["3 offerings", "fixed scope", "handoff-ready"]}
    >
      <h2 className="mb-10 font-heading text-title-1 text-text-primary">
        Engagement<span className="text-accent-amber">.</span>
      </h2>

      {/* Ledger */}
      <div className="border-t border-hairline">
        {SERVICES.map((service, index) => (
          <ServiceRow
            key={service.number}
            service={service}
            isExpanded={expandedIndex === index}
            onToggle={() =>
              setExpandedIndex(expandedIndex === index ? null : index)
            }
          />
        ))}
      </div>

      {/* Philosophy — a ruled blockquote, pretext shrink-wrapped */}
      <Reveal className="mt-16 max-w-2xl">
        <PretextBubble
          text={SERVICE_TEXTS["service:philosophy-quote"].text}
          registryKey="service:philosophy-quote"
          fontKey="body-2xl"
          maxWidth={640}
          lineHeight={34}
          className="border-l-2 border-accent-amber pl-6"
        >
          <blockquote className="font-body text-lede italic text-text-secondary">
            {SERVICE_TEXTS["service:philosophy-quote"].text}
          </blockquote>
          <p className="mt-3 font-mono text-caption uppercase text-text-muted">
            — operating principle, v384
          </p>
        </PretextBubble>
      </Reveal>

      {/* CTA */}
      <Reveal className="mt-16">
        <a
          href="mailto:rudranarayanmohapatro@gmail.com"
          className="btn-solid inline-flex items-center px-6 py-3 text-caption uppercase"
        >
          Got a problem worth solving? Let&apos;s talk.
        </a>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <a
            href="https://ruddybuilds.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link-mono"
          >
            substack ↗
          </a>
          <a
            href="https://x.com/Ruddybuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="link-mono"
          >
            x / @ruddybuilds ↗
          </a>
        </div>
        <p className="mt-6 font-mono text-mono-body text-text-muted">
          {"// no shortcuts, no compromises"}
        </p>
      </Reveal>
    </SectionShell>
  );
}
