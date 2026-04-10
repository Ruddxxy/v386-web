"use client";

import { motion } from "framer-motion";
import { GithubIcon, EmailIcon } from "./icons";
import ChapterLabel from "./ChapterLabel";
import MasonryGrid from "./MasonryGrid";
import ParallaxShapes from "./ParallaxShapes";

const PROJECTS_PARALLAX_SHAPES = [
  // Top-right cyan square
  {
    type: "square" as const,
    className:
      "top-[8%] right-[6%] w-4 h-4 border border-accent-cyan/25 rotate-12",
    speed: -0.5,
  },
  // Mid-left amber dot
  {
    type: "dot" as const,
    className: "top-[35%] left-[4%] w-2 h-2 bg-accent-amber/30 rounded-full",
    speed: 0.4,
  },
  // Right side amber ring
  {
    type: "circle" as const,
    className:
      "top-[55%] right-[3%] w-8 h-8 border border-accent-amber/20 rounded-full",
    speed: -0.7,
  },
  // Bottom-left cyan diagonal line
  {
    type: "line" as const,
    className: "bottom-[20%] left-[8%] w-16 h-px bg-accent-cyan/20 rotate-45",
    speed: 0.3,
  },
  // Bottom-right tiny square
  {
    type: "square" as const,
    className: "bottom-[10%] right-[15%] w-2 h-2 border border-accent-amber/30",
    speed: -0.4,
  },
];

type ProjectCategory = "systems-security" | "fintech" | "fullstack";
type SurfaceType = "terminal" | "glass-cyan" | "glass-amber" | "outline";

interface Project {
  title: string;
  tagline: string;
  registryPrefix: string;
  problem: string;
  techStack: string[];
  description: string;
  highlights: { label: string; text: string }[];
  github?: string;
  category: ProjectCategory;
  surface: SurfaceType;
}

function getSurfaceClass(surface: SurfaceType): string {
  switch (surface) {
    case "terminal":
      return "surface-terminal";
    case "glass-cyan":
      return "glass-card border-accent-cyan/20";
    case "glass-amber":
      return "glass-card glass-glow-amber";
    case "outline":
      return "surface-outline";
  }
}

function getHoverClass(surface: SurfaceType): string {
  switch (surface) {
    case "terminal":
      return "hover:border-accent-amber/30 hover:shadow-[0_0_15px_rgba(229,165,55,0.06)]";
    case "glass-cyan":
      return "hover:border-accent-cyan/30 hover:shadow-[0_0_15px_rgba(63,189,212,0.06)]";
    case "glass-amber":
      return "hover:border-accent-amber/30 hover:shadow-[0_0_20px_rgba(229,165,55,0.08)]";
    case "outline":
      return "hover:border-white/[0.15] hover:shadow-[0_0_15px_rgba(255,255,255,0.03)]";
  }
}

function CategoryMarker({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-50px" }}
      className="py-8"
    >
      <span className="font-mono text-accent-amber text-sm uppercase tracking-widest">
        {label}
      </span>
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
  style,
}: {
  project: Project;
  index: number;
  style?: React.CSSProperties;
}) {
  const surfaceClass = getSurfaceClass(project.surface);
  const hoverClass = getHoverClass(project.surface);
  const isPrivate = !project.github;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className={`${surfaceClass} ${hoverClass} flex flex-col transition-all duration-300`}
      style={style}
    >
      <div className="p-6 border-b border-white/[0.06] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-2xl font-heading font-bold tracking-tight text-text-primary">
              {project.title}
            </h3>
            {isPrivate && (
              <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border border-accent-cyan/30 text-accent-cyan rounded">
                Private Beta
              </span>
            )}
          </div>
          <p className="text-accent-amber font-mono text-sm uppercase tracking-wider">
            {project.tagline}
          </p>
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
        <p className="text-sm font-mono text-color-danger/70 mb-4 italic">
          Problem: {project.problem}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 surface-outline rounded-full text-accent-cyan font-mono text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
        <p className="text-text-secondary font-body leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="space-y-3">
          {project.highlights.map((h, hIndex) => (
            <div
              key={`${h.label}-${hIndex}`}
              className="flex items-start gap-3"
            >
              <span className="text-accent-amber font-mono text-sm uppercase min-w-[90px] flex-shrink-0">
                {h.label}:
              </span>
              <span className="text-text-secondary text-sm">{h.text}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const systemsSecurityProjects: Project[] = [
  {
    title: "Proxy Server",
    tagline: "Native Windows Firewall Proxy",
    registryPrefix: "project:proxy-server",
    problem:
      "No lightweight, native Windows solution for inspecting HTTP traffic at the packet level.",
    techStack: ["C (ANSI/Win32)", "Raw Sockets"],
    description:
      "A multi-threaded HTTP proxy written in pure C — no frameworks, no dependencies. Inspects every packet for SQL injection and path traversal patterns, then auto-bans offending IPs. Built on raw Win32 threads because the problem didn't need abstractions, it needed speed.",
    highlights: [
      {
        label: "Rate Limit",
        text: "Auto-bans IPs exceeding 50 requests in 15 seconds.",
      },
      {
        label: "Footprint",
        text: "Zero external frameworks — pure Win32 threads and raw sockets.",
      },
    ],
    github: "https://github.com/Ruddxxy/mul-proxy-c",
    category: "systems-security",
    surface: "terminal",
  },
  {
    title: "CredGuard",
    tagline: "Identity Security Platform",
    registryPrefix: "project:credguard",
    problem:
      "Individuals have no visibility into credential leaks across the dark web.",
    techStack: ["Python", "Streamlit", "PostgreSQL", "Stripe"],
    description:
      "A monetized personal SOC that monitors digital identities for credential leaks across dark web dumps and public repos. Integrated Stripe for billing from day one — this isn't a demo, it's a product with paying users and audit-grade PDF reporting.",
    highlights: [
      {
        label: "Monetization",
        text: "Stripe billing, rate-limiting, and audit-grade PDF reporting.",
      },
      {
        label: "Detection",
        text: "Risk score (0-100) via anomaly detection on breach data.",
      },
    ],
    github: "https://github.com/Ruddxxy/CredGuard",
    category: "systems-security",
    surface: "glass-cyan",
  },
  {
    title: "DataCenter Manager",
    tagline: "Concurrent Resource Orchestrator",
    registryPrefix: "project:datacenter-manager",
    problem:
      "Simulating data center operations with real concurrency primitives — not toy examples, actual thread-safe resource management.",
    techStack: ["C++20", "CMake", "Pthreads"],
    description:
      "Multi-threaded data center simulation built on raw Pthreads. Mutex-locked resource pools, condition variable signaling, and a custom thread pool. The kind of systems programming that doesn't show up in tutorials but runs under every cloud provider.",
    highlights: [
      {
        label: "Concurrency",
        text: "Pthreads with mutex-locked pools and condition variable signaling.",
      },
      {
        label: "Architecture",
        text: "Custom thread pool with work-stealing scheduler.",
      },
    ],
    category: "systems-security",
    surface: "terminal",
  },
  {
    title: "StegoVault",
    tagline: "Steganographic Encryption Tool",
    registryPrefix: "project:stegovault",
    problem:
      "Standard encryption is visible — encrypted files announce themselves. Sometimes you need data that doesn't look like data.",
    techStack: ["Python", "Flask", "AES-256", "LSB Steganography"],
    description:
      "Hides AES-256 encrypted payloads inside ordinary images using LSB steganography. The output passes visual inspection and steganalysis tools. Built for scenarios where the existence of the data itself is sensitive — not just its contents.",
    highlights: [
      {
        label: "Evasion",
        text: "Output survives steganalysis detection tools.",
      },
      {
        label: "Encryption",
        text: "AES-256 payload encryption before steganographic embedding.",
      },
    ],
    category: "systems-security",
    surface: "glass-cyan",
  },
];

const fintechProjects: Project[] = [
  {
    title: "NSE Trading Engine",
    tagline: "SEBI-Compliant Algorithmic Trading",
    registryPrefix: "project:nse-trading",
    problem:
      "Indian equity markets need sub-second execution with regulatory compliance — most retail tools can't do both.",
    techStack: ["Electron", "React 19", "FastAPI", "Angel One API"],
    description:
      "Full-stack trading platform for NSE markets with a desktop-native Electron frontend and FastAPI backend. SEBI-compliant order execution, real-time P&L tracking, and a kill switch that actually works. This is the system that superseded Algo-Bot — same problem, production-grade solution.",
    highlights: [
      {
        label: "Compliance",
        text: "SEBI-compliant execution with automated circuit breakers.",
      },
      {
        label: "Latency",
        text: "Sub-second order placement via Angel One SmartAPI.",
      },
    ],
    category: "fintech",
    surface: "glass-amber",
  },
  {
    title: "GlassVault",
    tagline: "Encrypted Personal Finance",
    registryPrefix: "project:glassvault",
    problem:
      "Finance apps store your most sensitive data in plaintext databases with cloud-first architectures you can't audit.",
    techStack: ["Flutter/Dart", "SQLCipher", "Riverpod", "CRDT Sync"],
    description:
      "A personal finance tracker where every byte is encrypted at rest with SQLCipher. CRDT-based sync means your data stays consistent across devices without a central server seeing it. Built in Flutter because finance apps should run everywhere.",
    highlights: [
      {
        label: "Security",
        text: "SQLCipher AES-256 encryption — data encrypted at rest, always.",
      },
      {
        label: "Sync",
        text: "CRDT-based conflict resolution for offline-first multi-device sync.",
      },
    ],
    category: "fintech",
    surface: "glass-amber",
  },
  {
    title: "Algo-Bot",
    tagline: "Early Trading Architecture",
    registryPrefix: "project:algo-bot",
    problem:
      "Manual trading in Indian equity markets cannot compete with algorithmic speed.",
    techStack: ["Python", "Upstox API", "Pandas"],
    description:
      "The first iteration of my trading engine — event-driven execution for NSE with automated risk-management kill switches. Taught me what retail APIs can and can't do, and directly led to the NSE Trading Engine rewrite with proper infrastructure.",
    highlights: [
      {
        label: "Evolution",
        text: "Superseded by NSE Trading Engine — lessons from this built that.",
      },
      {
        label: "Risk Mgmt",
        text: "Automated kill switches for position limits and drawdown.",
      },
    ],
    category: "fintech",
    surface: "glass-amber",
  },
];

const fullstackProjects: Project[] = [
  {
    title: "BioStream ML",
    tagline: "Real-Time Surgical Telemetry Engine",
    registryPrefix: "project:biostream-ml",
    problem:
      "Operating rooms lack real-time anomaly detection for patient vitals — clinicians catch deterioration by eye, minutes too late.",
    techStack: ["Python", "Redis Streams", "Docker", "Isolation Forest"],
    description:
      "A fault-tolerant pipeline that processes heart rate and SpO2 data in real time, flagging clinical deterioration before a human would notice. Redis Streams for exactly-once delivery, Isolation Forest for anomaly detection. Zero data loss by design.",
    highlights: [
      {
        label: "Throughput",
        text: "~3,000 events/second with sub-5ms latency.",
      },
      {
        label: "Reliability",
        text: "Zero data loss via Redis Streams idempotency.",
      },
      {
        label: "Detection",
        text: "Real-time clinical deterioration flagging with Isolation Forest.",
      },
    ],
    github: "https://github.com/Ruddxxy/Biostream-ML",
    category: "fullstack",
    surface: "outline",
  },
  {
    title: "Staleness Scanner",
    tagline: "Dependency Freshness Monitor",
    registryPrefix: "project:staleness-scanner",
    problem:
      "Engineering teams lose track of outdated dependencies until a CVE forces a fire drill.",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "arq"],
    description:
      "A full-stack tool that scans repos on a schedule, scores dependency freshness, and flags staleness before it becomes a security incident. Background workers via arq, PostgreSQL for persistence, Redis for caching. Built so engineering leads can see the health of every repo at a glance.",
    highlights: [
      {
        label: "Pipeline",
        text: "Background scanning via arq workers with Redis-backed queue.",
      },
      {
        label: "Visibility",
        text: "Per-repo freshness scores with historical trend tracking.",
      },
    ],
    category: "fullstack",
    surface: "outline",
  },
  {
    title: "Warp P2P",
    tagline: "Peer-to-Peer File Transfer",
    registryPrefix: "project:warp-p2p",
    problem:
      "Sending large files still requires uploading to a server first — slow, wasteful, and a privacy concern.",
    techStack: ["TypeScript", "WebRTC", "Node.js"],
    description:
      "Direct browser-to-browser file transfer using WebRTC data channels. No upload, no server in the middle, no file size limits. The connection is peer-to-peer — your file goes from your machine to theirs, and nobody else sees it.",
    highlights: [
      {
        label: "Transfer",
        text: "Direct P2P via WebRTC — no intermediate server storage.",
      },
      {
        label: "Privacy",
        text: "Files never touch a third-party server.",
      },
    ],
    github: "https://github.com/Ruddxxy/warp-p2p",
    category: "fullstack",
    surface: "outline",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-16 px-6 relative">
      <ParallaxShapes shapes={PROJECTS_PARALLAX_SHAPES} />
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header — split entry: label drops in from top, heading rises from bottom */}
        <div className="mb-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ChapterLabel number="03" title="the arsenal" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-text-primary"
          >
            The Arsenal<span className="text-accent-amber">.</span>
          </motion.h2>
        </div>

        {/* Mid-section CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.a
            href="mailto:rudranarayanmohapatro@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-3 surface-outline text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 font-mono text-sm uppercase tracking-wider transition-all duration-300"
          >
            <EmailIcon size={16} />
            Like what you see? Let&apos;s talk.
          </motion.a>
        </motion.div>

        {/* Systems & Security */}
        <CategoryMarker label="// systems & security" />
        <MasonryGrid
          items={systemsSecurityProjects.map((project, index) => ({
            key: project.title,
            registryKeys: {
              problem: `${project.registryPrefix}:problem`,
              description: `${project.registryPrefix}:desc`,
            },
            highlightCount: project.highlights.length,
            techStackCount: project.techStack.length,
            render: (style: React.CSSProperties) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                style={style}
              />
            ),
          }))}
        />

        {/* Fintech & Trading */}
        <CategoryMarker label="// fintech & trading" />
        <MasonryGrid
          items={fintechProjects.map((project, index) => ({
            key: project.title,
            registryKeys: {
              problem: `${project.registryPrefix}:problem`,
              description: `${project.registryPrefix}:desc`,
            },
            highlightCount: project.highlights.length,
            techStackCount: project.techStack.length,
            render: (style: React.CSSProperties) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                style={style}
              />
            ),
          }))}
        />

        {/* Full-Stack Products */}
        <CategoryMarker label="// full-stack products" />
        <MasonryGrid
          items={fullstackProjects.map((project, index) => ({
            key: project.title,
            registryKeys: {
              problem: `${project.registryPrefix}:problem`,
              description: `${project.registryPrefix}:desc`,
            },
            highlightCount: project.highlights.length,
            techStackCount: project.techStack.length,
            render: (style: React.CSSProperties) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                style={style}
              />
            ),
          }))}
        />
      </div>
    </section>
  );
}
