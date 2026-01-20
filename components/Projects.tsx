"use client";

import { motion } from "framer-motion";
import { LogoGithub } from "@carbon/icons-react";

interface ProjectCardProps {
  title: string;
  tagline: string;
  techStack: string[];
  description: string;
  highlights: { label: string; text: string }[];
  github?: string;
  index: number;
}

function ProjectCard({ title, tagline, techStack, description, highlights, github, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      className="border-4 border-void bg-stark shadow-brutal h-full flex flex-col"
    >
      <div className="p-6 border-b-4 border-void bg-void/5 flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-2">{title}</h3>
          <p className="text-orange font-bold text-sm uppercase tracking-wider">{tagline}</p>
        </div>
        {github && (
          <motion.a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 border-4 border-void hover:bg-orange hover:border-orange transition-all duration-150 flex-shrink-0"
            aria-label={`View ${title} on GitHub`}
          >
            <LogoGithub size={20} />
          </motion.a>
        )}
      </div>

      <div className="p-6 flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 border-2 border-void text-xs font-bold uppercase">
              {tech}
            </span>
          ))}
        </div>
        <p className="text-void/70 font-serif leading-relaxed mb-6">{description}</p>

        <div className="space-y-3">
          {highlights.map((h) => (
            <div key={h.label} className="flex items-start gap-3">
              <span className="text-orange font-bold text-sm uppercase min-w-[110px] flex-shrink-0">{h.label}:</span>
              <span className="text-void/80 text-sm">{h.text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const projects = [
    {
      title: "FlashAudit Core",
      tagline: "Enterprise-Grade Secret Scanner",
      techStack: ["Rust", "Rayon", "Memmap2"],
      description: "A zero-copy security primitive built in Rust designed to replace slow regex scanners. It bypasses performance bottlenecks by using memory mapping and parallel execution.",
      highlights: [
        { label: "Performance", text: "Scans large monorepos an order of magnitude faster than Gitleaks." },
        { label: "Precision", text: "Ships with 66 vendor-specific validation rules to eliminate false positives." },
        { label: "Integration", text: "Emits SARIF 2.1.0 logs for native GitHub Advanced Security integration." },
      ],
      github: "https://github.com/Ruddxxy/Flash-Audit-Core",
    },
    {
      title: "BioStream ML",
      tagline: "Real-Time Surgical Telemetry Engine",
      techStack: ["Python", "Redis Streams", "Docker", "Isolation Forest"],
      description: "A fault-tolerant physiological anomaly detection pipeline for operating rooms. It processes real-time heart rate and SpO2 data without data loss.",
      highlights: [
        { label: "Throughput", text: "Handles ~3,000 events/second with sub-5ms latency." },
        { label: "Resilience", text: "Uses Redis Streams for idempotency, ensuring zero data loss." },
        { label: "Intelligence", text: "Applies Isolation Forest to detect clinical deterioration in real-time." },
      ],
      github: "https://github.com/Ruddxxy/Biostream-ML",
    },
    {
      title: "Proxy Server",
      tagline: "Native Windows Firewall Proxy",
      techStack: ["C (ANSI/Win32)", "Raw Sockets"],
      description: "A multi-threaded HTTP proxy written in pure C that acts as a miniature perimeter firewall. It inspects packets for SQL Injection and Path Traversal attacks.",
      highlights: [
        { label: "Defense", text: "Automatically bans IPs that exceed 50 requests in 15 seconds." },
        { label: "Core", text: "Handles concurrent connections using raw Win32 threads without external frameworks." },
      ],
      github: "https://github.com/Ruddxxy/mul-proxy-c",
    },
    {
      title: "CredGuard",
      tagline: "Identity Security Platform",
      techStack: ["Python", "Streamlit", "PostgreSQL", "Stripe"],
      description: "A fully monetized \"Personal SOC\" that monitors digital identities for credential leaks across the dark web and public repositories.",
      highlights: [
        { label: "Product", text: "Integrated Stripe billing, rate-limiting quotas, and audit-grade PDF reporting." },
        { label: "Analysis", text: "Computes a risk score (0-100) using anomaly detection on breach data." },
      ],
      github: "https://github.com/Ruddxxy/CredGuard",
    },
    {
      title: "Algo-Bot",
      tagline: "High-Frequency Trading Engine",
      techStack: ["Python", "Upstox API", "Pandas"],
      description: "An event-driven algorithmic trading bot for the Indian Equity Markets (NSE). Features automated execution pipeline and risk-management kill switches.",
      highlights: [
        { label: "Status", text: "Private Beta - Architecting for NSE markets." },
      ],
    },
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-stark border-t-4 border-void">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="inline-block border-4 border-void px-4 py-2 mb-6 shadow-brutal-sm bg-orange">
            <span className="text-sm uppercase tracking-widest font-bold text-void">
              Projects
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            The Arsenal<span className="text-orange">.</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              tagline={project.tagline}
              techStack={project.techStack}
              description={project.description}
              highlights={project.highlights}
              github={project.github}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
