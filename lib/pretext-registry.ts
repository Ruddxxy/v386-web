/**
 * Central text registry for Pretext preparation.
 * Single source of truth — components import text from here for rendering,
 * and PretextProvider imports it for measurement preparation.
 *
 * Font keys map to CSS variable + size combinations resolved at runtime.
 */

export type FontKey =
  | "body-lg"    // Sora 18px (text-lg)
  | "body-xl"    // Sora 20px (text-xl)
  | "body-2xl"   // Sora 24px (text-2xl)
  | "body-base"  // Sora 16px (default)
  | "body-sm"    // Sora 14px (text-sm)
  | "mono-sm"    // Space Mono 14px (text-sm)
  | "mono-xs";   // Space Mono 12px (text-xs)

export interface TextEntry {
  text: string;
  fontKey: FontKey;
}

// Font key → CSS variable + weight + size mapping
export const FONT_DESCRIPTORS: Record<FontKey, { variable: string; weight: string; size: string; style?: string }> = {
  "body-lg":   { variable: "--font-body", weight: "400", size: "18px" },
  "body-xl":   { variable: "--font-body", weight: "400", size: "20px" },
  "body-2xl":  { variable: "--font-body", weight: "400", size: "24px" },
  "body-base": { variable: "--font-body", weight: "400", size: "16px" },
  "body-sm":   { variable: "--font-body", weight: "400", size: "14px" },
  "mono-sm":   { variable: "--font-mono", weight: "400", size: "14px" },
  "mono-xs":   { variable: "--font-mono", weight: "400", size: "12px" },
};

// ─── Origin Story ────────────────────────────────────────────
export const ORIGIN_TEXTS = {
  "origin:the-why": {
    text: "Production goes down. Everyone scrambles. Root cause? A hardcoded secret. A service that buckles at 2x load. I kept seeing it \u2014 teams shipping tools that passed demos but crumbled under real traffic. I decided I\u2019d rather build the tools that survive the 3 AM incident than the ones that cause it.",
    fontKey: "body-xl" as FontKey,
  },
  "origin:the-path": {
    text: "Started with Python. Hit the ceiling fast \u2014 try scanning a million files when your runtime has a GIL. So I picked up C++, then Rust. Not from tutorials \u2014 from shipping real systems and debugging real failures. Offensive security taught me how things actually break. Algorithmic trading taught me that 50ms of latency is the difference between profit and loss. Every skill I picked up, I picked up because I needed it to solve a problem nothing else could.",
    fontKey: "body-xl" as FontKey,
  },
  "origin:the-mission": {
    text: "FlashAudit scans 847K files in under a second \u2014 Gitleaks takes minutes. My trading engine handles SEBI-compliant execution with a kill switch that works. My steganography tool hides encrypted payloads in images so well that steganalysis tools can\u2019t find them. I don\u2019t build proof-of-concepts. I build things that work under pressure, and I can prove it.",
    fontKey: "body-xl" as FontKey,
  },
} as const satisfies Record<string, TextEntry>;

// ─── Services ────────────────────────────────────────────────
export const SERVICE_TEXTS = {
  "service:systems-architecture:desc": {
    text: "Your Python service is slow? I\u2019ve rewritten hot paths in Rust that went from minutes to milliseconds. I built FlashAudit this way \u2014 zero-copy I/O, memory-mapped files, parallel execution. The result was 10x faster than Gitleaks on the same workload.",
    fontKey: "body-lg" as FontKey,
  },
  "service:security-instrumentation:desc": {
    text: "I built FlashAudit because existing secret scanners were too slow for enterprise repos. I can do the same for your pipeline \u2014 scanning that runs in CI, catches credentials before they ship, and doesn\u2019t slow down your deploys.",
    fontKey: "body-lg" as FontKey,
  },
  "service:mvp-development:desc": {
    text: "I\u2019ve shipped full-stack products end-to-end \u2014 trading platforms, SaaS tools, finance apps. Database to deploy, with auth, payments, and monitoring that works. I build for the engineer who inherits the codebase after me.",
    fontKey: "body-lg" as FontKey,
  },
  "service:philosophy-quote": {
    text: "I don\u2019t build software that works in demos. I build software that works at 3 AM when the on-call engineer is staring at a dashboard wondering what went wrong.",
    fontKey: "body-2xl" as FontKey,
  },
} as const satisfies Record<string, TextEntry>;

// ─── Service Deliverables ────────────────────────────────────
export const SERVICE_DELIVERABLES: Record<string, { items: string[]; fontKey: FontKey }> = {
  "service:systems-architecture:deliverables": {
    items: [
      "Profiling to find the real hot path",
      "Rust/C++ rewrite of the critical section",
      "Zero-copy and memory-mapped I/O where it counts",
      "Benchmarks proving the improvement",
    ],
    fontKey: "body-sm",
  },
  "service:security-instrumentation:deliverables": {
    items: [
      "CI/CD pipeline hardening",
      "Custom scanning rules for your codebase",
      "Pre-commit hooks that actually run fast",
      "Incident playbook for when something slips",
    ],
    fontKey: "body-sm",
  },
  "service:mvp-development:deliverables": {
    items: [
      "Full-stack build (Next.js / FastAPI / Flutter)",
      "Database with proper migrations and indexing",
      "CI/CD that deploys on merge",
      "Code clean enough to hand off",
    ],
    fontKey: "body-sm",
  },
};

// ─── Projects ────────────────────────────────────────────────
export const PROJECT_TEXTS: Record<string, TextEntry> = {
  // Systems & Security
  "project:proxy-server:problem": {
    text: "No lightweight, native Windows solution for inspecting HTTP traffic at the packet level.",
    fontKey: "mono-sm",
  },
  "project:proxy-server:desc": {
    text: "A multi-threaded HTTP proxy written in pure C \u2014 no frameworks, no dependencies. Inspects every packet for SQL injection and path traversal patterns, then auto-bans offending IPs. Built on raw Win32 threads because the problem didn\u2019t need abstractions, it needed speed.",
    fontKey: "body-base",
  },
  "project:credguard:problem": {
    text: "Individuals have no visibility into credential leaks across the dark web.",
    fontKey: "mono-sm",
  },
  "project:credguard:desc": {
    text: "A monetized personal SOC that monitors digital identities for credential leaks across dark web dumps and public repos. Integrated Stripe for billing from day one \u2014 this isn\u2019t a demo, it\u2019s a product with paying users and audit-grade PDF reporting.",
    fontKey: "body-base",
  },
  "project:datacenter-manager:problem": {
    text: "Simulating data center operations with real concurrency primitives \u2014 not toy examples, actual thread-safe resource management.",
    fontKey: "mono-sm",
  },
  "project:datacenter-manager:desc": {
    text: "Multi-threaded data center simulation built on raw Pthreads. Mutex-locked resource pools, condition variable signaling, and a custom thread pool. The kind of systems programming that doesn\u2019t show up in tutorials but runs under every cloud provider.",
    fontKey: "body-base",
  },
  "project:stegovault:problem": {
    text: "Standard encryption is visible \u2014 encrypted files announce themselves. Sometimes you need data that doesn\u2019t look like data.",
    fontKey: "mono-sm",
  },
  "project:stegovault:desc": {
    text: "Hides AES-256 encrypted payloads inside ordinary images using LSB steganography. The output passes visual inspection and steganalysis tools. Built for scenarios where the existence of the data itself is sensitive \u2014 not just its contents.",
    fontKey: "body-base",
  },
  // FinTech
  "project:nse-trading:problem": {
    text: "Indian equity markets need sub-second execution with regulatory compliance \u2014 most retail tools can\u2019t do both.",
    fontKey: "mono-sm",
  },
  "project:nse-trading:desc": {
    text: "Full-stack trading platform for NSE markets with a desktop-native Electron frontend and FastAPI backend. SEBI-compliant order execution, real-time P&L tracking, and a kill switch that actually works. This is the system that superseded Algo-Bot \u2014 same problem, production-grade solution.",
    fontKey: "body-base",
  },
  "project:glassvault:problem": {
    text: "Finance apps store your most sensitive data in plaintext databases with cloud-first architectures you can\u2019t audit.",
    fontKey: "mono-sm",
  },
  "project:glassvault:desc": {
    text: "A personal finance tracker where every byte is encrypted at rest with SQLCipher. CRDT-based sync means your data stays consistent across devices without a central server seeing it. Built in Flutter because finance apps should run everywhere.",
    fontKey: "body-base",
  },
  "project:algo-bot:problem": {
    text: "Manual trading in Indian equity markets cannot compete with algorithmic speed.",
    fontKey: "mono-sm",
  },
  "project:algo-bot:desc": {
    text: "The first iteration of my trading engine \u2014 event-driven execution for NSE with automated risk-management kill switches. Taught me what retail APIs can and can\u2019t do, and directly led to the NSE Trading Engine rewrite with proper infrastructure.",
    fontKey: "body-base",
  },
  // Full-Stack
  "project:biostream-ml:problem": {
    text: "Operating rooms lack real-time anomaly detection for patient vitals \u2014 clinicians catch deterioration by eye, minutes too late.",
    fontKey: "mono-sm",
  },
  "project:biostream-ml:desc": {
    text: "A fault-tolerant pipeline that processes heart rate and SpO2 data in real time, flagging clinical deterioration before a human would notice. Redis Streams for exactly-once delivery, Isolation Forest for anomaly detection. Zero data loss by design.",
    fontKey: "body-base",
  },
  "project:staleness-scanner:problem": {
    text: "Engineering teams lose track of outdated dependencies until a CVE forces a fire drill.",
    fontKey: "mono-sm",
  },
  "project:staleness-scanner:desc": {
    text: "A full-stack tool that scans repos on a schedule, scores dependency freshness, and flags staleness before it becomes a security incident. Background workers via arq, PostgreSQL for persistence, Redis for caching. Built so engineering leads can see the health of every repo at a glance.",
    fontKey: "body-base",
  },
  "project:warp-p2p:problem": {
    text: "Sending large files still requires uploading to a server first \u2014 slow, wasteful, and a privacy concern.",
    fontKey: "mono-sm",
  },
  "project:warp-p2p:desc": {
    text: "Direct browser-to-browser file transfer using WebRTC data channels. No upload, no server in the middle, no file size limits. The connection is peer-to-peer \u2014 your file goes from your machine to theirs, and nobody else sees it.",
    fontKey: "body-base",
  },
};

// Collect all entries for batch preparation
export function getAllTextEntries(): Record<string, TextEntry> {
  return {
    ...ORIGIN_TEXTS,
    ...SERVICE_TEXTS,
    ...PROJECT_TEXTS,
  };
}
