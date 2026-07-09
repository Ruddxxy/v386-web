"use client";

import Link from "next/link";
import { Reveal } from "./motion";

const CONTACT: { label: string; href: string; external?: boolean }[] = [
  { label: "github ↗", href: "https://github.com/Ruddxxy", external: true },
  {
    label: "linkedin ↗",
    href: "https://linkedin.com/in/rudra2",
    external: true,
  },
  {
    label: "x / @ruddybuilds ↗",
    href: "https://x.com/Ruddybuilds",
    external: true,
  },
  {
    label: "substack ↗",
    href: "https://ruddybuilds.substack.com",
    external: true,
  },
  {
    label: "tryhackme ↗",
    href: "https://tryhackme.com/p/Ruddyignite23",
    external: true,
  },
  { label: "email", href: "mailto:rudranarayanmohapatro@gmail.com" },
];

const INDEX: { label: string; href: string }[] = [
  { label: "evidence", href: "#evidence" },
  { label: "the record", href: "#projects" },
  { label: "origin", href: "#origin" },
  { label: "engagement", href: "#services" },
  { label: "writing", href: "/writing" },
  { label: "benchmarks", href: "/benchmarks" },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline-strong bg-base-950">
      <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Closing statement */}
          <Reveal className="md:col-span-6">
            <h2 className="max-w-[16ch] font-heading text-title-1 text-text-primary">
              Need something built right
              <span className="text-accent-amber">?</span>
            </h2>
            <p className="mt-4 max-w-[46ch] font-body text-lede text-text-secondary">
              I take on problems that are genuinely hard. If your system needs
              to be fast, secure, or unbreakable — that&apos;s where I do my
              best work.
            </p>
            <a
              href="mailto:rudranarayanmohapatro@gmail.com"
              className="btn-solid mt-8 inline-flex items-center px-6 py-3 text-caption uppercase"
            >
              rudranarayanmohapatro@gmail.com
            </a>
            <div className="mt-8 flex flex-col gap-1">
              <span className="flex items-center gap-2 font-mono text-caption uppercase text-text-secondary">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full bg-color-success"
                  aria-hidden
                />
                taking on new projects
              </span>
              <span className="font-mono text-caption uppercase text-text-muted">
                based in India · working globally
              </span>
            </div>
          </Reveal>

          {/* Contact */}
          <div className="md:col-span-3">
            <span className="font-mono text-caption uppercase text-text-muted">
              contact
            </span>
            <ul className="mt-4 flex flex-col gap-3">
              {CONTACT.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="link-mono"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Index + colophon */}
          <div className="md:col-span-3">
            <span className="font-mono text-caption uppercase text-text-muted">
              index
            </span>
            <ul className="mt-4 flex flex-col gap-3">
              {INDEX.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="link-mono">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-[28ch] font-mono text-caption uppercase leading-relaxed text-text-muted">
              set in Syne, Sora &amp; Space Mono · built with Next.js ·
              benchmarks reproducible at /benchmarks
            </p>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-16 flex flex-col gap-3 border-t border-hairline pt-6 md:flex-row md:items-center md:justify-between">
          <span className="font-mono text-caption uppercase text-text-muted">
            © 2026 Vector 384
          </span>
          <span className="font-mono text-caption uppercase text-text-muted">
            {"// no shortcuts, no compromises"}
          </span>
        </div>
      </div>
    </footer>
  );
}
