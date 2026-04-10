"use client";

import { useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { layout, type PreparedText } from "@chenglou/pretext";
import { PretextContext } from "./pretext/PretextProvider";

interface MasonryItem {
  key: string;
  registryKeys: {
    problem: string;
    description: string;
  };
  highlightCount: number;
  techStackCount: number;
  render: (style: React.CSSProperties) => ReactNode;
}

interface MasonryGridProps {
  items: MasonryItem[];
  columns?: number;
  gap?: number;
}

// Fixed heights for known card elements (in px)
const HEADER_HEIGHT = 80;        // p-6 + title + tagline
const BODY_PADDING = 48;         // p-6 top + bottom
const PROBLEM_PADDING = 16;      // mb-4
const TECH_ROW_HEIGHT = 32;      // badge height + gap
const TECH_BADGE_AVG_WIDTH = 90; // average badge width including padding + gap
const HIGHLIGHT_ROW_HEIGHT = 28; // per highlight row
const HIGHLIGHT_GAP = 12;        // space-y-3

function predictCardHeight(
  ctx: { getHandle: (key: string) => PreparedText | null },
  registryKeys: { problem: string; description: string },
  highlightCount: number,
  techStackCount: number,
  columnWidth: number,
): number {
  const contentWidth = columnWidth - 48; // p-6 = 24px each side

  let textHeight = 0;

  // Problem text height
  const problemHandle = ctx.getHandle(registryKeys.problem);
  if (problemHandle) {
    const problemResult = layout(problemHandle, contentWidth, 20);
    textHeight += problemResult.height + PROBLEM_PADDING;
  } else {
    textHeight += 40 + PROBLEM_PADDING;
  }

  // Tech stack rows
  const techRows = Math.max(1, Math.ceil((techStackCount * TECH_BADGE_AVG_WIDTH) / contentWidth));
  textHeight += techRows * TECH_ROW_HEIGHT + 16;

  // Description text height
  const descHandle = ctx.getHandle(registryKeys.description);
  if (descHandle) {
    const descResult = layout(descHandle, contentWidth, 24);
    textHeight += descResult.height + 24; // mb-6
  } else {
    textHeight += 72 + 24;
  }

  // Highlights
  textHeight += highlightCount * HIGHLIGHT_ROW_HEIGHT + (highlightCount - 1) * HIGHLIGHT_GAP;

  return HEADER_HEIGHT + BODY_PADDING + textHeight;
}

export default function MasonryGrid({
  items,
  columns = 2,
  gap = 32,
}: MasonryGridProps) {
  const ctx = useContext(PretextContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<
    { top: number; left: number; width: number; height: number }[]
  >([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function compute() {
      const containerWidth = el!.getBoundingClientRect().width;
      const mobile = containerWidth < 640;
      setIsMobile(mobile);

      if (mobile) {
        setPositions([]);
        setContainerHeight(0);
        return;
      }

      const actualColumns = Math.min(columns, items.length);
      const columnWidth = (containerWidth - gap * (actualColumns - 1)) / actualColumns;
      const columnHeights = new Array(actualColumns).fill(0);
      const newPositions: typeof positions = [];

      for (const item of items) {
        // Find shortest column
        const colIndex = columnHeights.indexOf(Math.min(...columnHeights));
        const height = ctx.ready
          ? predictCardHeight(ctx, item.registryKeys, item.highlightCount, item.techStackCount, columnWidth)
          : 350;

        newPositions.push({
          top: columnHeights[colIndex],
          left: colIndex * (columnWidth + gap),
          width: columnWidth,
          height,
        });

        columnHeights[colIndex] += height + gap;
      }

      setPositions(newPositions);
      setContainerHeight(Math.max(...columnHeights) - gap);
    }

    compute();

    const observer = new ResizeObserver(() => compute());
    observer.observe(el);
    return () => observer.disconnect();
  }, [ctx.ready, items, columns, gap, ctx]);

  // Mobile: standard stacked layout
  if (isMobile || positions.length === 0) {
    return (
      <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {items.map((item) =>
          item.render({ position: "relative" as const })
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: containerHeight }}
    >
      {items.map((item, index) => {
        const pos = positions[index];
        if (!pos) return null;

        return item.render({
          position: "absolute" as const,
          top: pos.top,
          left: pos.left,
          width: pos.width,
        });
      })}
    </div>
  );
}
