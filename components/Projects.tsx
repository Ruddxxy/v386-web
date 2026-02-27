"use client";

import { motion } from "framer-motion";
import { GithubIcon } from "./icons";

type ProjectVariant = "open-source" | "standard" | "private";

interface Project {
  title: string;
  tagline: string;
  techStack: string[];
  description: string;
  highlights: { label: string; text: string }[];
  github?: string;
  benchmarks?: { label: string; value: string }[];
}

function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      className="surface-featured md:col-span-2 lg:col-span-2"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {/* Left: Info */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-2 py-1 text-xs font-mono uppercase tracking-wider bg-accent-amber/20 text-accent-amber rounded">
              Featured
            </span>
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-1.5 surface-outline rounded-lg text-text-secondary hover:text-accent-amber transition-colors duration-300"
                aria-label={`View ${project.title} on GitHub`}
              >
                <GithubIcon size={16} />
              </motion.a>
            )}
          </div>

          <h3 className="text-3xl font-heading font-bold tracking-tight mb-2 text-text-primary">
            {project.title}
          </h3>
          <p className="text-accent-amber font-mono text-sm uppercase tracking-wider mb-4">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 surface-outline rounded-full text-accent-cyan font-mono text-xs">
                {tech}
              </span>
            ))}
          </div>

          <p className="text-text-secondary font-body leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Right: Benchmarks */}
        <div className="p-8 border-t md:border-t-0 md:border-l border-accent-amber/10">
          <span className="text-sm uppercase tracking-widest font-mono text-accent-amber block mb-5">
            Benchmarks
          </span>
          <div className="space-y-0">
            {project.benchmarks?.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="surface-data-row py-4 flex justify-between items-center"
              >
                <span className="text-text-muted font-mono text-sm uppercase tracking-wider">
                  {b.label}
                </span>
                <span className="text-text-primary font-mono text-sm font-medium">
                  {b.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getVariant(project: Project): ProjectVariant {
  if (!project.github) return "private";
  return "open-source";
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const variant = getVariant(project);

  const cardClass =
    variant === "private"
      ? "surface-outline border-dashed"
      : variant === "open-source"
        ? "glass-card glass-glow-amber"
        : "glass-card";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -5 }}
      className={`${cardClass} h-full flex flex-col`}
    >
      <div className="p-6 border-b border-white/[0.06] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-heading font-bold tracking-tight text-text-primary">
              {project.title}
            </h3>
            {variant === "private" && (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-accent-cyan/30 text-accent-cyan rounded">
                Private Beta
              </span>
            )}
          </div>
          <p className="text-accent-amber font-mono text-sm uppercase tracking-wider">{project.tagline}</p>
        </div>
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 surface-outline rounded-lg text-text-secondary hover:text-accent-amber transition-colors duration-300 flex-shrink-0"
            aria-label={`View ${project.title} on GitHub`}
          >
            <GithubIcon size={20} />
          </motion.a>
        )}
      </div>

      <div className="p-6 flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 surface-outline rounded-full text-accent-cyan font-mono text-xs">
              {tech}
            </span>
          ))}
        </div>
        <p className="text-text-secondary font-body leading-relaxed mb-6">{project.description}</p>

        <div className="space-y-3">
          {project.highlights.map((h) => (
            <div key={h.label} className="flex items-start gap-3">
              <span className="text-accent-amber font-mono text-sm uppercase min-w-[110px] flex-shrink-0">{h.label}:</span>
              <span className="text-text-secondary text-sm">{h.text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featuredProject: Project = {
    title: "FlashAudit Core",
    tagline: "Enterprise-Grade Secret Scanner",
    techStack: ["Rust", "Rayon", "Memmap2"],
    description:
      "A zero-copy security primitive built in Rust designed to replace slow regex scanners. It bypasses performance bottlenecks by using memory mapping and parallel execution.",
    highlights: [],
    github: "https://github.com/Ruddxxy/Flash-Audit-Core",
    benchmarks: [
      { label: "Scan Speed", value: "847K files / 0.4s" },
      { label: "vs Gitleaks", value: "~10x faster" },
      { label: "Rules", value: "66 vendor-specific" },
      { label: "Output", value: "SARIF 2.1.0" },
    ],
  };

  const projects: Project[] = [
    {
      title: "BioStream ML",
      tagline: "Real-Time Surgical Telemetry Engine",
      techStack: ["Python", "Redis Streams", "Docker", "Isolation Forest"],
      description:
        "A fault-tolerant physiological anomaly detection pipeline for operating rooms. It processes real-time heart rate and SpO2 data without data loss.",
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
      description:
        "A multi-threaded HTTP proxy written in pure C that acts as a miniature perimeter firewall. It inspects packets for SQL Injection and Path Traversal attacks.",
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
      description:
        'A fully monetized "Personal SOC" that monitors digital identities for credential leaks across the dark web and public repositories.',
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
      description:
        "An event-driven algorithmic trading bot for the Indian Equity Markets (NSE). Features automated execution pipeline and risk-management kill switches.",
      highlights: [
        { label: "Status", text: "Private Beta - Architecting for NSE markets." },
      ],
    },
  ];

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header — code comment style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="font-mono text-text-muted text-sm mb-6 tracking-wider">
            {"// 001 — projects"}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-text-primary">
            The Arsenal<span className="text-accent-amber">.</span>
          </h2>
        </motion.div>

        {/* Featured Project */}
        <div className="mb-8">
          <FeaturedProjectCard project={featuredProject} />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
