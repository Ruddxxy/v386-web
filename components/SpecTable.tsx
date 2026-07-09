"use client";

import type { ReactNode } from "react";

/**
 * A ruled spec sheet: label / value / note per row, left-aligned, big numbers in
 * Space Mono so they read as measured output rather than marketing. Used by the
 * Evidence section, case-study metric tables, and the benchmarks page.
 */
export interface SpecRow {
  label: string;
  value: ReactNode;
  note?: string;
  /** Tint the value — cyan flags a verification/reproducibility figure. */
  accent?: "amber" | "cyan";
}

const valueTint: Record<NonNullable<SpecRow["accent"]>, string> = {
  amber: "text-accent-amber",
  cyan: "text-accent-cyan",
};

export default function SpecTable({ rows }: { rows: SpecRow[] }) {
  return (
    <div className="w-full">
      {rows.map((row, i) => (
        <div
          key={i}
          className="data-row grid grid-cols-1 gap-1 py-5 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] md:items-baseline md:gap-8 md:py-6"
        >
          <span className="font-mono text-caption uppercase text-text-secondary">
            {row.label}
          </span>
          <span
            className={`font-mono text-spec-value tabular-nums ${
              row.accent ? valueTint[row.accent] : "text-text-primary"
            }`}
          >
            {row.value}
          </span>
          {row.note && (
            <span className="font-mono text-mono-body text-text-muted md:text-right">
              {row.note}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
