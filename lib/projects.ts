// Single source of truth for the project catalog.
// Rendered by components/Projects.tsx (grid) and app/projects/[slug]/page.tsx (case studies),
// and emitted into schema.org ItemList via app/layout.tsx.

export type ProjectCategory = "systems-security" | "fintech" | "fullstack";
export type SurfaceType = "terminal" | "glass-cyan" | "glass-amber" | "outline";

export interface Highlight {
  label: string;
  text: string;
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  note?: string;
}

export interface CaseStudy {
  overview: string;
  architecture: string[];
  metrics: CaseStudyMetric[];
  whatIdChange: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  registryPrefix: string;
  problem: string;
  techStack: string[];
  description: string;
  highlights: Highlight[];
  github?: string;
  category: ProjectCategory;
  surface: SurfaceType;
  // JSON-LD / SEO:
  schemaType: "SoftwareApplication" | "SoftwareSourceCode";
  operatingSystem?: string;
  programmingLanguage?: string;
  // Case study extension — only the projects with a deep dive.
  caseStudy?: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    slug: "flashaudit",
    title: "FlashAudit Core",
    tagline: "Enterprise Secret Scanner in Rust",
    registryPrefix: "project:flashaudit",
    problem:
      "A client's Gitleaks pre-commit hook took 4 minutes on their monorepo. Engineers disabled it. Secrets shipped.",
    techStack: ["Rust", "Rayon", "Memory-Mapped I/O", "SARIF"],
    description:
      "Enterprise-grade secret scanner built in Rust with zero-copy I/O, memory-mapped files, and Rayon work-stealing across every core. Outputs SARIF so it drops into existing CI pipelines without rewiring dashboards. Built because the existing scanners couldn't keep up with real repo sizes.",
    highlights: [
      {
        label: "Speed",
        text: "847K files in 0.4s — roughly 10x Gitleaks on the same corpus.",
      },
      {
        label: "Architecture",
        text: "Zero-copy I/O, memory-mapped files, Rayon parallel scan.",
      },
    ],
    github: "https://github.com/Ruddxxy/Flash-Audit-Core",
    category: "systems-security",
    surface: "terminal",
    schemaType: "SoftwareSourceCode",
    programmingLanguage: "Rust",
    caseStudy: {
      overview:
        "Secret scanning sits in the hottest part of a CI pipeline — every push, every PR, every merge. If it blocks for 4 minutes, engineers will find a way to skip it. That's how secrets ship. FlashAudit is what happens when you treat the scanner like a systems problem, not a regex problem.",
      architecture: [
        "Memory-mapped file I/O — the scanner never allocates a per-file buffer; it views the bytes directly.",
        "Rayon work-stealing parallelism — a thread idle on small files pulls work from a thread stuck on a large one.",
        "Pattern engine compiled once, shared across threads — the regex set is a static Aho-Corasick DFA, not a per-file recompile.",
        "SARIF output — drops into GitHub Advanced Security, Azure DevOps, and any SARIF-aware dashboard with zero glue code.",
      ],
      metrics: [
        {
          label: "Files scanned",
          value: "847,000",
          note: "enterprise monorepo corpus",
        },
        {
          label: "Wall-clock time",
          value: "0.4s",
          note: "M1 Pro, 10 cores",
        },
        {
          label: "Speedup vs Gitleaks 8.18",
          value: "~10x",
          note: "same corpus, same rules",
        },
        {
          label: "Peak RSS",
          value: "< 80 MB",
          note: "zero-copy, no buffered reads",
        },
      ],
      whatIdChange:
        "The pattern set lives in a static array today — fine for the built-in rules, painful the moment a client wants custom patterns at runtime. Next iteration: a RON/TOML rule file loaded at startup with the DFA compiled lazily. Also want to experiment with Hyperscan as an optional backend for the overlapping-match case. Full methodology and raw hyperfine output on the /benchmarks page.",
    },
  },
  {
    slug: "proxy-server",
    title: "Proxy Server",
    tagline: "Native Windows Firewall Proxy",
    registryPrefix: "project:proxy-server",
    problem:
      "A staging box kept getting probed with SQLi and path-traversal payloads. Userland proxies added 30ms. Native Win32 at the packet level was the only path under budget.",
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
    schemaType: "SoftwareSourceCode",
    programmingLanguage: "C",
  },
  {
    slug: "credguard",
    title: "CredGuard",
    tagline: "Identity Security Platform",
    registryPrefix: "project:credguard",
    problem:
      "Paste sites and combo lists leak credentials daily. Enterprise SOCs monitor for it; individuals get notified after the fraud hits.",
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
    schemaType: "SoftwareSourceCode",
    programmingLanguage: "Python",
  },
  {
    slug: "datacenter-manager",
    title: "DataCenter Manager",
    tagline: "Concurrent Resource Orchestrator",
    registryPrefix: "project:datacenter-manager",
    problem:
      "Every tutorial on Pthreads uses counters and toy queues. Real resource contention — thread pools, condition variables, lock ordering — only shows up when you build it.",
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
    schemaType: "SoftwareApplication",
    operatingSystem: "Linux",
  },
  {
    slug: "stegovault",
    title: "StegoVault",
    tagline: "Steganographic Encryption Tool",
    registryPrefix: "project:stegovault",
    problem:
      "Encrypted blobs announce themselves on disk and in transit. Sometimes the threat model requires that the data isn't visibly there at all.",
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
    schemaType: "SoftwareApplication",
    operatingSystem: "Cross-platform",
  },
  {
    slug: "nse-trading-engine",
    title: "NSE Trading Engine",
    tagline: "SEBI-Compliant Algorithmic Trading",
    registryPrefix: "project:nse-trading",
    problem:
      "Algo-Bot kept missing SEBI circuit-breaker timing and retail APIs throttled mid-session. A production rewrite was the only way to trade inside compliance windows.",
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
    schemaType: "SoftwareApplication",
    operatingSystem: "Desktop",
    caseStudy: {
      overview:
        "Retail algorithmic trading in Indian equity markets lives inside a hard compliance envelope: SEBI circuit-breaker timings, broker-level throttles, per-symbol position limits. Miss one and the trade doesn't just lose money — it gets rejected, or worse, fills outside the window you meant. Algo-Bot taught me what retail APIs can't do. This is what it looked like to rewrite around those constraints.",
      architecture: [
        "Electron desktop frontend — a trader needs a kill switch within reach, not behind a browser tab.",
        "FastAPI backend with an event-driven order loop — the loop itself enforces circuit-breaker windows; routes can't bypass them.",
        "Angel One SmartAPI integration with exponential backoff on throttle and idempotent order IDs on retry.",
        "Local SQLite position ledger — source of truth for P&L even when the broker API is lagging.",
      ],
      metrics: [
        {
          label: "Order placement latency",
          value: "< 1s",
          note: "end-to-end to Angel One ack",
        },
        {
          label: "Circuit-breaker misses",
          value: "0",
          note: "after rewrite, in backtested market days",
        },
        {
          label: "Recoverable throttle events",
          value: "100%",
          note: "idempotent retry with exponential backoff",
        },
      ],
      whatIdChange:
        "Electron was the right call for the kill switch, wrong call for the resource footprint on older Windows machines. Next pass is probably Tauri — same UX, fraction of the memory, and the Rust backend would unify with the FastAPI rewrite I've been planning for the order loop.",
    },
  },
  {
    slug: "glassvault",
    title: "GlassVault",
    tagline: "Encrypted Personal Finance",
    registryPrefix: "project:glassvault",
    problem:
      "Every finance app I audited shipped plaintext SQLite under the hood, cloud-first by default. There's no personal-finance tool that trusts you to own your own data.",
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
    schemaType: "SoftwareApplication",
    operatingSystem: "iOS, Android",
  },
  {
    slug: "algo-bot",
    title: "Algo-Bot",
    tagline: "Early Trading Architecture",
    registryPrefix: "project:algo-bot",
    problem:
      "Manual entries kept missing the fills I was backtesting. Automating it surfaced every hole in the plan — this is where I learned what retail APIs can't do.",
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
    schemaType: "SoftwareApplication",
    operatingSystem: "Cross-platform",
  },
  {
    slug: "biostream-ml",
    title: "BioStream ML",
    tagline: "Real-Time Surgical Telemetry Engine",
    registryPrefix: "project:biostream-ml",
    problem:
      "In OR telemetry, deterioration is caught by eye — minutes after it starts. Monitors beep on threshold, not trend. That window is where patients are lost.",
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
    schemaType: "SoftwareSourceCode",
    programmingLanguage: "Python",
    caseStudy: {
      overview:
        "Patient monitors today beep when a vital crosses a threshold. By the time the threshold trips, the deterioration has been under way for minutes — a window where the anomaly is visible in the trend but invisible to the alarm. BioStream fills that gap with online anomaly detection on the stream itself.",
      architecture: [
        "Redis Streams as the event bus — gives us consumer groups, exactly-once-ish semantics, and back-pressure for free.",
        "Isolation Forest trained on quiet periods, re-scored per patient so idiosyncratic baselines don't trigger alerts.",
        "Dockerized pipeline — the ML step, the ingress, and the alert sink each scale independently.",
        "Idempotent writes downstream so a replay on failure can't double-alert a clinician.",
      ],
      metrics: [
        {
          label: "Throughput",
          value: "~3,000 events/s",
          note: "single-node dev pipeline",
        },
        {
          label: "Per-event latency",
          value: "< 5 ms (p50)",
          note: "ingress → anomaly score",
        },
        {
          label: "Data loss under forced restart",
          value: "0",
          note: "Redis Streams + idempotent sink",
        },
      ],
      whatIdChange:
        "Isolation Forest was the right starting point — cheap, interpretable, no labels needed. At scale I'd pair it with a lightweight LSTM on top for trend detection the forest misses, and swap Redis Streams for a Kafka-backed ingress if the hospital has the infra for it.",
    },
  },
  {
    slug: "staleness-scanner",
    title: "Staleness Scanner",
    tagline: "Dependency Freshness Monitor",
    registryPrefix: "project:staleness-scanner",
    problem:
      "Every team I've worked with learned about a stale dependency when a CVE landed on a Friday. Dependabot spams; nobody triages. Staleness needs to be visible before it's urgent.",
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
    schemaType: "SoftwareApplication",
    operatingSystem: "Web",
  },
  {
    slug: "warp-p2p",
    title: "Warp P2P",
    tagline: "Peer-to-Peer File Transfer",
    registryPrefix: "project:warp-p2p",
    problem:
      "Every large-file transfer tool still round-trips through somebody else's server. You pay in upload time and in who-sees-your-file. Browsers ship WebRTC — we shouldn't need a middleman.",
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
    schemaType: "SoftwareSourceCode",
    programmingLanguage: "TypeScript",
  },
];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getCaseStudyProjects(): Project[] {
  return PROJECTS.filter((p) => p.caseStudy);
}
