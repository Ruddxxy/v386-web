import type { Metadata, Viewport } from "next";
import { Syne, Sora, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SplashProvider } from "@/components/SplashProvider";
import SplashScreen from "@/components/SplashScreen";
import SmoothScroller from "@/components/SmoothScroller";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0E1018",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vector384.com"),
  title: {
    default: "Rudra Mahapatro | Systems Engineer — Rust, C++, Security",
    template: "%s | VECTOR 384",
  },
  description:
    "I build the tools that other engineers depend on. Systems engineer specializing in Rust, C++, and offensive security. FlashAudit scans 847K files/sec. Available for systems architecture, security instrumentation, and full-stack development.",
  keywords: [
    "Rudra Mahapatro",
    "VECTOR384",
    "Vector 384",
    "systems engineer",
    "Rust developer",
    "C++ developer",
    "Python developer",
    "offensive security engineer",
    "algorithmic trading developer",
    "secret scanner",
    "FlashAudit",
    "hire Rust developer",
    "freelance systems engineer",
    "security scanning CI/CD",
    "zero-copy architecture",
    "high-frequency trading infrastructure",
    "steganography tool",
    "SEBI compliant trading",
    "systems architecture consulting",
    "MVP development",
    "Rust security tools",
    "enterprise secret scanning",
    "memory-mapped I/O",
    "penetration testing",
    "WebRTC file transfer",
  ],
  authors: [{ name: "Rudra Mahapatro", url: "https://vector384.com" }],
  creator: "Rudra Mahapatro",
  alternates: {
    canonical: "https://vector384.com",
  },
  openGraph: {
    title: "Rudra Mahapatro | Systems Engineer — Rust, C++, Security",
    description:
      "I build the tools that other engineers depend on. Systems engineer shipping production Rust, C++, and security tooling. FlashAudit scans 847K files/sec — 10x faster than Gitleaks.",
    url: "https://vector384.com",
    siteName: "VECTOR 384",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudra Mahapatro | Systems Engineer — Rust, C++, Security",
    description:
      "I build the tools that other engineers depend on. Systems engineer shipping production Rust, C++, and security tooling. FlashAudit scans 847K files/sec — 10x faster than Gitleaks.",
    creator: "@RuddyBuilds",
    site: "@RuddyBuilds",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "VECTOR 384",
  alternateName: ["Vector 384", "VECTOR384", "V384"],
  url: "https://vector384.com",
  description:
    "Portfolio of Rudra Mahapatro — systems engineer specializing in Rust, C++, and offensive security.",
};

const jsonLdProfilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Rudra Mahapatro",
    alternateName: "VECTOR384",
    url: "https://vector384.com",
    jobTitle: "Systems Engineer",
    description:
      "I build the tools that other engineers depend on. Systems engineer specializing in Rust, C++, and offensive security.",
    email: "mailto:mahapatro16@gmail.com",
    knowsAbout: [
      "Rust",
      "C++",
      "C",
      "Python",
      "Go",
      "TypeScript",
      "Offensive Security",
      "Penetration Testing",
      "Algorithmic Trading",
      "High-Frequency Infrastructure",
      "Zero-Copy Architecture",
      "Memory-Mapped I/O",
      "Systems Architecture",
      "Secret Scanning",
      "Steganography",
      "WebRTC",
      "Next.js",
      "React",
      "FastAPI",
      "Docker",
      "PostgreSQL",
      "Redis",
    ],
    sameAs: [
      "https://github.com/Ruddxxy",
      "https://linkedin.com/in/rudra2",
      "https://tryhackme.com/p/Ruddyignite23",
      "https://x.com/RuddyBuilds",
    ],
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Systems Architecture",
          description:
            "Performance profiling and Rust/C++ rewrites for critical hot paths. Zero-copy I/O, memory-mapped files, parallel execution.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Security Instrumentation",
          description:
            "CI/CD pipeline hardening, custom secret scanning rules, pre-commit hooks, and incident playbooks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "MVP Development",
          description:
            "Full-stack product builds with Next.js, FastAPI, or Flutter — database to deploy with auth, payments, and monitoring.",
        },
      },
    ],
  },
};

const jsonLdItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Rudra Mahapatro",
  numberOfItems: 11,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "SoftwareSourceCode",
        name: "FlashAudit Core",
        description:
          "Enterprise-grade secret scanner in Rust. Scans 847K files in 0.4 seconds — 10x faster than Gitleaks.",
        programmingLanguage: "Rust",
        codeRepository: "https://github.com/Ruddxxy/Flash-Audit-Core",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Proxy Server",
        description:
          "Multi-threaded HTTP proxy in pure C with SQL injection detection and IP auto-banning.",
        programmingLanguage: "C",
        codeRepository: "https://github.com/Ruddxxy/mul-proxy-c",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "SoftwareSourceCode",
        name: "CredGuard",
        description:
          "Monetized identity security platform monitoring credential leaks across the dark web with Stripe billing and risk scoring.",
        programmingLanguage: "Python",
        codeRepository: "https://github.com/Ruddxxy/CredGuard",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "SoftwareApplication",
        name: "DataCenter Manager",
        description:
          "Multi-threaded data center simulation with Pthreads, mutex-locked resource pools, and condition variable signaling.",
        operatingSystem: "Linux",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "SoftwareApplication",
        name: "StegoVault",
        description:
          "Steganographic encryption tool hiding AES-256 payloads in images using LSB steganography that survives steganalysis detection.",
        operatingSystem: "Cross-platform",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "SoftwareApplication",
        name: "NSE Trading Engine",
        description:
          "SEBI-compliant algorithmic trading platform for NSE with sub-second execution and automated circuit breakers.",
        operatingSystem: "Desktop",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "SoftwareApplication",
        name: "GlassVault",
        description:
          "Encrypted personal finance tracker with SQLCipher AES-256 encryption and CRDT-based offline-first sync.",
        operatingSystem: "iOS, Android",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 8,
      item: {
        "@type": "SoftwareApplication",
        name: "Algo-Bot",
        description:
          "Event-driven algorithmic trading bot for Indian equity markets with automated risk-management kill switches.",
        operatingSystem: "Cross-platform",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 9,
      item: {
        "@type": "SoftwareSourceCode",
        name: "BioStream ML",
        description:
          "Fault-tolerant surgical telemetry pipeline processing 3,000 events/sec with sub-5ms latency and zero data loss.",
        programmingLanguage: "Python",
        codeRepository: "https://github.com/Ruddxxy/Biostream-ML",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 10,
      item: {
        "@type": "SoftwareApplication",
        name: "Staleness Scanner",
        description:
          "Dependency freshness monitor with background scanning, per-repo staleness scores, and historical trend tracking.",
        operatingSystem: "Web",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
    {
      "@type": "ListItem",
      position: 11,
      item: {
        "@type": "SoftwareSourceCode",
        name: "Warp P2P",
        description:
          "Direct browser-to-browser file transfer using WebRTC data channels — no server storage, no file size limits.",
        programmingLanguage: "TypeScript",
        codeRepository: "https://github.com/Ruddxxy/warp-p2p",
        author: { "@type": "Person", name: "Rudra Mahapatro" },
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${sora.variable} ${spaceMono.variable}`}
    >
      <body className="bg-base-950 text-text-primary font-body antialiased overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdWebSite),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdProfilePage),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLdItemList),
          }}
        />
        <SplashProvider>
          <SplashScreen />
          <SmoothScroller>{children}</SmoothScroller>
        </SplashProvider>
        <Analytics />
      </body>
    </html>
  );
}
