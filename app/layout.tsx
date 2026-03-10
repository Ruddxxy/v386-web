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
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const viewport: Viewport = {
  themeColor: "#0E1018",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vector384.com"),
  title: {
    default: "VECTOR 384 | Rudra Mahapatro — Systems Engineer",
    template: "%s | VECTOR 384",
  },
  description:
    "I architect survival-grade systems. Systems Engineer (Rust/C++) specializing in Offensive Security, High-Frequency Infrastructure, and zero-copy architecture. Founder of Vector 384.",
  keywords: [
    "Systems Engineer",
    "Rust Developer",
    "C++ Developer",
    "Python Developer",
    "Offensive Security",
    "Algorithmic Trading",
    "High-Frequency Infrastructure",
    "Zero-Copy Architecture",
    "Security Scanner",
  ],
  authors: [{ name: "Rudra Mahapatro", url: "https://vector384.com" }],
  creator: "Rudra Mahapatro",
  alternates: {
    canonical: "https://vector384.com",
  },
  openGraph: {
    title: "VECTOR 384 | Rudra Mahapatro — Systems Engineer",
    description:
      "I architect survival-grade systems. Systems Engineer specializing in Rust/C++, Offensive Security, and High-Frequency Infrastructure.",
    url: "https://vector384.com",
    siteName: "VECTOR 384",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VECTOR 384 | Rudra Mahapatro — Systems Engineer",
    description:
      "I architect survival-grade systems. Systems Engineer specializing in Rust/C++, Offensive Security, and High-Frequency Infrastructure.",
    creator: "@your_handle",
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rudra Mahapatro",
              url: "https://vector384.com",
              jobTitle: "Systems Engineer",
              description:
                "Systems Engineer specializing in Rust/C++, Offensive Security, and High-Frequency Infrastructure. Founder of Vector 384.",
              knowsAbout: [
                "Rust",
                "C++",
                "Python",
                "Offensive Security",
                "High-Frequency Trading",
                "Systems Architecture",
              ],
              sameAs: [
                "https://github.com/Ruddxxy",
                "https://linkedin.com/in/rudra2",
                "https://tryhackme.com/p/Ruddyignite23",
              ],
            }),
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
