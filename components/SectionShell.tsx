"use client";

import type { ReactNode } from "react";
import { RuleDraw } from "./motion";

/**
 * The dossier grid. A 1200px frame with a permanent left margin rail (cols 1-2)
 * carrying the chapter index + section metadata, and content in cols 3-12.
 * The heavy-left / ragged-right asymmetry is the core anti-template move.
 * On mobile the rail collapses to a one-line header above the content.
 */
interface SectionShellProps {
  id?: string;
  index: string; // "02"
  title: string; // "evidence"
  meta?: string[]; // small metadata lines under the index
  children: ReactNode;
  className?: string;
  /** Content columns — prose sits in 8, wide tables/grids take the full 10. */
  wide?: boolean;
}

export default function SectionShell({
  id,
  index,
  title,
  meta,
  children,
  className = "",
  wide = false,
}: SectionShellProps) {
  return (
    <section id={id} className={`relative ${className}`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <RuleDraw />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 pt-16 pb-24 md:pt-24 md:pb-36">
          {/* Margin rail — chapter index + metadata */}
          <aside className="md:col-span-2 mb-8 md:mb-0">
            <div className="md:sticky md:top-28 flex flex-col gap-2">
              <span className="font-mono text-caption uppercase text-accent-amber">
                {index} / {title}
              </span>
              {meta?.map((line, i) => (
                <span
                  key={i}
                  className="font-mono text-caption uppercase text-text-muted"
                >
                  {line}
                </span>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className={wide ? "md:col-span-10" : "md:col-span-10"}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
