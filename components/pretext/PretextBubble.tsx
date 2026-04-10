"use client";

import { useContext, useEffect, useRef, useState } from "react";
import {
  prepareWithSegments,
  walkLineRanges,
  type PreparedTextWithSegments,
} from "@chenglou/pretext";
import { motion } from "framer-motion";
import { PretextContext } from "./PretextProvider";
import { FONT_DESCRIPTORS, type FontKey } from "@/lib/pretext-registry";

interface PretextBubbleProps {
  text: string;
  registryKey: string;
  fontKey: FontKey;
  maxWidth: number;
  lineHeight: number;
  className?: string;
  children: React.ReactNode;
}

function resolveFontString(fontKey: FontKey): string | null {
  const descriptor = FONT_DESCRIPTORS[fontKey];
  if (!descriptor) return null;

  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const fontFamily = computedStyle.getPropertyValue(descriptor.variable).trim();
  if (!fontFamily) return null;

  const style = descriptor.style ? `${descriptor.style} ` : "";
  return `${style}${descriptor.weight} ${descriptor.size} ${fontFamily}`;
}

function computeTightWidth(
  prepared: PreparedTextWithSegments,
  maxWidth: number
): number {
  // Count lines at max width
  let targetLineCount = 0;
  walkLineRanges(prepared, maxWidth, () => {
    targetLineCount++;
  });

  if (targetLineCount <= 1) {
    // Single line — find exact width
    let lineWidth = 0;
    walkLineRanges(prepared, maxWidth, (line) => {
      lineWidth = line.width;
    });
    return Math.ceil(lineWidth);
  }

  // Binary search for narrowest width preserving the same line count
  let lo = 1;
  let hi = Math.ceil(maxWidth);

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    let midLineCount = 0;
    walkLineRanges(prepared, mid, () => {
      midLineCount++;
    });

    if (midLineCount <= targetLineCount) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  return lo;
}

export default function PretextBubble({
  text,
  registryKey,
  fontKey,
  maxWidth,
  lineHeight,
  className = "",
  children,
}: PretextBubbleProps) {
  const ctx = useContext(PretextContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tightWidth, setTightWidth] = useState<number | null>(null);

  useEffect(() => {
    if (!ctx.ready) return;

    // Try to get the segment handle from the provider
    let handle = ctx.getSegmentHandle(registryKey);

    // If not available as segment handle, prepare it locally
    if (!handle) {
      const fontString = resolveFontString(fontKey);
      if (!fontString) return;
      handle = prepareWithSegments(text, fontString);
    }

    const el = containerRef.current;
    if (!el) return;

    const containerWidth = Math.min(el.parentElement?.getBoundingClientRect().width ?? maxWidth, maxWidth);
    const tight = computeTightWidth(handle, containerWidth);
    setTightWidth(tight);

    // Recompute on resize
    const observer = new ResizeObserver(() => {
      const parentWidth = el.parentElement?.getBoundingClientRect().width ?? maxWidth;
      const newMax = Math.min(parentWidth, maxWidth);
      const newTight = computeTightWidth(handle!, newMax);
      setTightWidth(newTight);
    });

    if (el.parentElement) {
      observer.observe(el.parentElement);
    }

    return () => observer.disconnect();
  }, [ctx.ready, registryKey, text, fontKey, maxWidth, lineHeight, ctx]);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{
        width: tightWidth ? `${tightWidth}px` : "fit-content",
        maxWidth: `${maxWidth}px`,
        margin: "0 auto",
      }}
      animate={tightWidth && !prefersReducedMotion ? { width: tightWidth } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
