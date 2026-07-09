"use client";

import type { ReactNode } from "react";

/**
 * A framed, captioned technical exhibit. The dossier treats real artefacts —
 * a terminal run, reproduction commands, the stack inventory — as numbered
 * figures rather than decorative panels. `caption` reads like a plate label:
 *   "fig. 01 — flashaudit run · M1 Pro, 10 cores"
 */
interface EvidenceFigureProps {
  caption: string;
  children: ReactNode;
  className?: string;
  /** Caption below the body (plate-style) instead of a header bar. */
  captionBelow?: boolean;
  contentClassName?: string;
}

export default function EvidenceFigure({
  caption,
  children,
  className = "",
  captionBelow = false,
  contentClassName = "p-5",
}: EvidenceFigureProps) {
  const label = (
    <figcaption
      className={`px-4 py-2 font-mono text-caption uppercase text-text-muted ${
        captionBelow ? "border-t border-hairline" : "border-b border-hairline"
      }`}
    >
      {caption}
    </figcaption>
  );

  return (
    <figure className={`surface-figure overflow-hidden ${className}`}>
      {!captionBelow && label}
      <div className={contentClassName}>{children}</div>
      {captionBelow && label}
    </figure>
  );
}
