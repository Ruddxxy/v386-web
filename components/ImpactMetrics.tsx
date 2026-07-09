"use client";

import Link from "next/link";
import AnimatedCounter from "./AnimatedCounter";
import SectionShell from "./SectionShell";
import SpecTable, { type SpecRow } from "./SpecTable";
import { Reveal } from "./motion";

/* Chapter 02 — evidence. The claim in the hero is proven here, first, as a
   left-aligned spec sheet. Numbers tabulate in Space Mono; the methodology row
   points at the reproducible benchmark page (cyan = verification). */
const rows: SpecRow[] = [
  {
    label: "peak throughput",
    value: <AnimatedCounter target={847} suffix="K" duration={1.6} />,
    note: "files scanned in 0.4s · FlashAudit, enterprise monorepo",
  },
  {
    label: "speedup delivered",
    value: <AnimatedCounter target={10} suffix="×" duration={1.6} />,
    note: "vs. Gitleaks 8.18 · same corpus, same rules",
  },
  {
    label: "minimum latency",
    value: <AnimatedCounter prefix="<" target={5} suffix="ms" duration={1.6} />,
    note: "p50 across hot paths · BioStream, ~3K events/s",
  },
];

export default function ImpactMetrics() {
  return (
    <SectionShell
      id="evidence"
      index="02"
      title="evidence"
      meta={["measured", "reproducible", "M1 Pro · 10 cores"]}
    >
      <Reveal>
        <h2 className="mb-10 max-w-[16ch] font-heading text-title-1 text-text-primary text-balance">
          If a number is on this page, it was measured.
        </h2>
      </Reveal>

      <SpecTable rows={rows} />

      {/* Methodology row — structural, points at the reproducible benchmarks */}
      <div className="data-row flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:justify-between md:gap-8">
        <span className="font-mono text-caption uppercase text-text-secondary">
          methodology
        </span>
        <span className="font-mono text-mono-body text-text-muted md:flex-1">
          hyperfine · N=10 warm runs · /usr/bin/time -l
        </span>
        <Link href="/benchmarks" className="link-mono link-mono-verify">
          reproduce → /benchmarks
        </Link>
      </div>
    </SectionShell>
  );
}
