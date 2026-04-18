import type { Metadata, Viewport } from "next";
import { Syne, Sora, Space_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SplashProvider } from "@/components/SplashProvider";
import SplashScreen from "@/components/SplashScreen";
import SmoothScroller from "@/components/SmoothScroller";
import { PretextProvider } from "@/components/pretext/PretextProvider";
import { PROJECTS } from "@/lib/projects";
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
    "Systems engineer specializing in Rust, C++, and offensive security. I build production tooling that handles enterprise scale: zero-copy I/O, memory-mapped files, parallel execution. Available for systems architecture, security instrumentation, and full-stack development.",
  // Google ignores `keywords`; Bing still weighs a short list.
  // Keep to the terms worth ranking for — not a dump of every surface word.
  keywords: [
    "Rudra Mahapatro",
    "VECTOR 384",
    "systems engineer",
    "Rust developer",
    "C++ developer",
    "offensive security engineer",
  ],
  authors: [{ name: "Rudra Mahapatro", url: "https://vector384.com" }],
  creator: "Rudra Mahapatro",
  alternates: {
    canonical: "https://vector384.com",
  },
  openGraph: {
    title: "Rudra Mahapatro | Systems Engineer — Rust, C++, Security",
    description:
      "Systems engineer shipping production Rust, C++, and security tooling. Zero-copy architecture, memory-mapped I/O, and parallel execution for systems that don't break under enterprise scale.",
    url: "https://vector384.com",
    siteName: "VECTOR 384",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rudra Mahapatro | Systems Engineer — Rust, C++, Security",
    description:
      "Systems engineer shipping production Rust, C++, and security tooling. Zero-copy architecture, memory-mapped I/O, and parallel execution for systems that don't break under enterprise scale.",
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
  verification: {
    // Replace these placeholders with real tokens after registering the site:
    //   https://search.google.com/search-console
    //   https://www.bing.com/webmasters
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
    other: {
      "msvalidate.01": "REPLACE_WITH_BING_WEBMASTER_TOKEN",
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
      "Systems engineer specializing in Rust, C++, and offensive security. I build production tooling that handles enterprise scale.",
    email: "mailto:rudranarayanmohapatro@gmail.com",
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

// Derived from the canonical catalog in lib/projects.ts so the schema
// and the rendered grid can never disagree.
const jsonLdItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Rudra Mahapatro",
  numberOfItems: PROJECTS.length,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  itemListElement: PROJECTS.map((project, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": project.schemaType,
      name: project.title,
      description: project.description,
      url: `https://vector384.com/projects/${project.slug}`,
      author: { "@type": "Person", name: "Rudra Mahapatro" },
      ...(project.programmingLanguage && {
        programmingLanguage: project.programmingLanguage,
      }),
      ...(project.operatingSystem && {
        operatingSystem: project.operatingSystem,
      }),
      ...(project.github && { codeRepository: project.github }),
    },
  })),
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
      </head>
      {/* suppressHydrationWarning: Grammarly and similar browser extensions inject
          data-new-gr-c-s-check-loaded / data-gr-ext-installed onto <body> before
          React hydrates. Scoped to <body> only — does NOT silence child mismatches. */}
      <body
        className="bg-base-950 text-text-primary font-body antialiased overflow-x-hidden"
        suppressHydrationWarning
      >
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
          <SmoothScroller>
            <PretextProvider>{children}</PretextProvider>
          </SmoothScroller>
        </SplashProvider>
        <Analytics />
      </body>
    </html>
  );
}
