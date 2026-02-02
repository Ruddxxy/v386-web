import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
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
  openGraph: {
    title: "VECTOR 384 | Rudra Mahapatro",
    description:
      "I architect survival-grade systems. Systems Engineer specializing in Rust/C++, Offensive Security, and High-Frequency Infrastructure.",
    type: "website",
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
    <html lang="en">
      <body className="bg-stark text-void font-serif antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
