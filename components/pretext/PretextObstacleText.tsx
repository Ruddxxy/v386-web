"use client";

import { useContext, useEffect, useRef, useState } from "react";
import {
  prepareWithSegments,
  layoutNextLine,
  type PreparedTextWithSegments,
  type LayoutCursor,
} from "@chenglou/pretext";
import { PretextContext } from "./PretextProvider";
import { FONT_DESCRIPTORS, type FontKey } from "@/lib/pretext-registry";

interface Obstacle {
  top: number;
  height: number;
  width: number;
  side: "left" | "right";
  gap: number;
}

interface PretextObstacleTextProps {
  text: string;
  registryKey: string;
  fontKey: FontKey;
  lineHeight: number;
  obstacle: Obstacle;
  className?: string;
  obstacleContent: React.ReactNode;
}

interface ComputedLine {
  text: string;
  marginLeft: number;
  width: number;
  y: number;
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

function computeLines(
  prepared: PreparedTextWithSegments,
  containerWidth: number,
  lineHeight: number,
  obstacle: Obstacle,
): ComputedLine[] {
  const lines: ComputedLine[] = [];
  let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
  let y = 0;

  while (true) {
    const inObstacleRange = y >= obstacle.top && y < obstacle.top + obstacle.height;
    const availableWidth = inObstacleRange
      ? containerWidth - obstacle.width - obstacle.gap
      : containerWidth;

    const line = layoutNextLine(prepared, cursor, Math.max(availableWidth, 50));
    if (!line) break;

    const marginLeft =
      inObstacleRange && obstacle.side === "left"
        ? obstacle.width + obstacle.gap
        : 0;

    lines.push({
      text: line.text,
      marginLeft,
      width: availableWidth,
      y,
    });

    cursor = line.end;
    y += lineHeight;
  }

  return lines;
}

export default function PretextObstacleText({
  text,
  registryKey,
  fontKey,
  lineHeight,
  obstacle,
  className = "",
  obstacleContent,
}: PretextObstacleTextProps) {
  const ctx = useContext(PretextContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<ComputedLine[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function compute() {
      const width = el!.getBoundingClientRect().width;
      const desktop = width >= 768;
      setIsDesktop(desktop);

      if (!desktop) {
        setLines([]);
        return;
      }

      // Get or create the prepared handle
      let handle = ctx.getSegmentHandle(registryKey);
      if (!handle) {
        const fontString = resolveFontString(fontKey);
        if (!fontString) return;
        handle = prepareWithSegments(text, fontString);
      }

      const computed = computeLines(handle, width, lineHeight, obstacle);
      setLines(computed);
    }

    compute();

    const observer = new ResizeObserver(() => compute());
    observer.observe(el);
    return () => observer.disconnect();
  }, [ctx.ready, registryKey, text, fontKey, lineHeight, obstacle, ctx]);

  // Mobile fallback: standard text flow
  if (!isDesktop || lines.length === 0) {
    return (
      <div ref={containerRef} className={className}>
        <p className="text-lg md:text-xl leading-relaxed text-text-secondary font-body">
          {text}
        </p>
        {obstacleContent}
      </div>
    );
  }

  const totalHeight = lines.length * lineHeight;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: Math.max(totalHeight, obstacle.top + obstacle.height) }}
    >
      {/* Text lines */}
      {lines.map((line, i) => (
        <span
          key={i}
          className="absolute block text-text-secondary font-body text-lg md:text-xl leading-relaxed"
          style={{
            top: line.y,
            left: line.marginLeft,
            width: line.width,
          }}
        >
          {line.text}
        </span>
      ))}

      {/* Obstacle element */}
      <div
        className="absolute"
        style={{
          top: obstacle.top,
          [obstacle.side]: 0,
          width: obstacle.width,
        }}
      >
        {obstacleContent}
      </div>
    </div>
  );
}
