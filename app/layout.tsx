import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VECTOR 384 | Rudra Mahapatro",
  description:
    "I architect survival-grade systems. Systems Engineer (Rust/C++) | Offensive Security | High-Frequency Infrastructure. Founder of Vector 384.",
  keywords: [
    "Systems Engineer",
    "Rust Developer",
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
      </body>
    </html>
  );
}
