import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vector384.com"),
  title: "V384",
  description:
    "I architect survival-grade systems. Systems Engineer (Python/C++) | Offensive Security | High-Frequency Infrastructure. Founder of Vector 384.",
  keywords: [
    "Systems Engineer",
    "Python Developer",
    "C++ Developer",
    "Offensive Security",
    "Algorithmic Trading",
    "High-Frequency Infrastructure",
  ],
  authors: [{ name: "Rudra Mahapatro" }],
  creator: "Rudra Mahapatro",
  openGraph: {
    title: "VECTOR 384 | Rudra Mahapatro",
    description:
      "I architect survival-grade systems. Systems Engineer specializing in Rust/C++, Offensive Security, and High-Frequency Infrastructure.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VECTOR 384 | Rudra Mahapatro",
    description:
      "I architect survival-grade systems. Systems Engineer specializing in Rust/C++, Offensive Security, and High-Frequency Infrastructure.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-base-950 text-text-primary font-body antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
