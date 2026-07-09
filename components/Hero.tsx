"use client";

import { GithubIcon, LinkedInIcon, EmailIcon } from "./icons";
import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "./motion";

/* A single line of terminal output, faded in on a compressed cadence. */
function TerminalLine({ command, delay }: { command: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, delay }}
      className="flex items-start gap-2"
    >
      <span className="font-mono text-mono-body text-accent-amber">$</span>
      <span className="font-mono text-mono-body text-text-primary">
        {command}
      </span>
    </motion.div>
  );
}

function TerminalOutput({ lines, delay }: { lines: string[]; delay: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: delay + i * 0.12 }}
          className="pl-4 font-mono text-mono-body text-text-secondary"
        >
          {line}
        </motion.div>
      ))}
    </>
  );
}

/* Chapter 01 — identity, composed as a document letterhead. */
export default function Hero() {
  return (
    <section
      id="identity"
      className="relative flex min-h-[92vh] items-start pt-32 md:pt-40"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-x-6 gap-y-14 px-6 md:grid-cols-12 md:px-10">
        {/* ---- Letterhead (cols 1-7) ---- */}
        <div className="md:col-span-7 lg:col-span-7">
          {/* File header block */}
          <div className="mb-10 flex flex-col gap-2 border-l-2 border-accent-amber pl-4">
            <span className="font-mono text-caption uppercase text-accent-amber">
              VECTOR384 / dossier
            </span>
            <Image
              src="/logo.png"
              alt="VECTOR 384 — Systems Engineering Portfolio"
              width={40}
              height={40}
              priority
              className="h-10 w-10 mix-blend-screen"
            />
            <span className="font-mono text-caption uppercase text-text-secondary">
              Rudra Mahapatro — Systems Engineer
            </span>
            <span className="font-mono text-caption uppercase text-text-muted">
              Rust · C++ · Offensive Security · Trading Systems
            </span>
            <span className="mt-1 flex items-center gap-2 font-mono text-caption uppercase text-text-secondary">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full bg-color-success"
                aria-hidden
              />
              Status: available
            </span>
          </div>

          {/* Annotation kicker */}
          <p className="mb-4 font-mono text-mono-body uppercase tracking-wider text-text-muted">
            {"// under pressure"}
          </p>

          {/* Display headline — static so it paints in the initial HTML and
              anchors LCP instantly (no JS-gated reveal on the largest element). */}
          <h1 className="font-heading text-display text-text-primary">
            <span className="block">I architect systems</span>
            <span className="block">
              that don&apos;t break
              <span className="text-accent-amber">.</span>
            </span>
          </h1>

          {/* Lede */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.5, ease: EASE }}
            className="mt-6 max-w-[52ch] font-body text-lede text-text-secondary"
          >
            Rust. C++. Zero-copy. I build the tools that other engineers depend
            on when it actually matters.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.62, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <a
              href="mailto:rudranarayanmohapatro@gmail.com"
              className="btn-solid inline-flex items-center gap-2 px-6 py-3 text-caption uppercase"
            >
              <EmailIcon size={15} />
              Start a project
            </a>
            <a href="#projects" className="link-mono">
              Read the record ↓
            </a>
          </motion.div>

          {/* Social row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.8 }}
            className="mt-10 flex items-center gap-5"
          >
            <a
              href="https://github.com/Ruddxxy"
              target="_blank"
              rel="noopener noreferrer"
              className="link-mono inline-flex items-center gap-1.5"
            >
              <GithubIcon size={14} /> github ↗
            </a>
            <a
              href="https://linkedin.com/in/rudra2"
              target="_blank"
              rel="noopener noreferrer"
              className="link-mono inline-flex items-center gap-1.5"
            >
              <LinkedInIcon size={14} /> linkedin ↗
            </a>
            <a
              href="mailto:rudranarayanmohapatro@gmail.com"
              className="link-mono inline-flex items-center gap-1.5"
            >
              <EmailIcon size={14} /> email
            </a>
          </motion.div>
        </div>

        {/* ---- Figure 01 (cols 9-12) ---- */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE }}
          className="md:col-span-5 md:col-start-8"
        >
          {/* fig. 01 — the real FlashAudit run */}
          <figure className="surface-figure overflow-hidden">
            <figcaption className="border-b border-hairline px-4 py-2 font-mono text-caption uppercase text-text-muted">
              fig. 01 — flashaudit run · M1 Pro, 10 cores
            </figcaption>
            <div className="min-h-[240px] space-y-3 p-5">
              <TerminalLine
                command="flashaudit scan --repo enterprise-monorepo"
                delay={0.7}
              />
              <TerminalOutput
                lines={[
                  "Scanning 847,000 files...",
                  "Found 23 exposed secrets in 0.4s",
                  "SARIF report exported to ./audit.sarif",
                ]}
                delay={1.0}
              />
              <div className="h-2" />
              <TerminalLine command="uptime" delay={1.5} />
              <TerminalOutput
                lines={["3+ years · 160+ commits · shipping since day one"]}
                delay={1.7}
              />
              <div className="flex items-center gap-2 pt-1">
                <span className="font-mono text-mono-body text-accent-amber">
                  $
                </span>
                <span className="inline-block h-4 w-2 animate-blink bg-accent-amber" />
              </div>
            </div>
          </figure>

          {/* Dossier ID photo */}
          <figure className="mt-6 flex items-end gap-4">
            <div className="surface-inset overflow-hidden">
              <Image
                src="/pfp.webp"
                alt="Rudra Mahapatro — Systems Engineer"
                width={132}
                height={160}
                priority
                className="h-40 w-[132px] object-cover grayscale"
              />
            </div>
            <figcaption className="pb-1 font-mono text-caption uppercase text-text-muted">
              subject:
              <br />
              r. mahapatro
            </figcaption>
          </figure>
        </motion.div>
      </div>
    </section>
  );
}
