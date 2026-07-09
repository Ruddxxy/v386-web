"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

interface MasonryItem {
  key: string;
  render: () => ReactNode;
}

interface MasonryGridProps {
  items: MasonryItem[];
  columns?: number;
  gap?: number;
}

interface Placement {
  top: number;
  left: number;
}

/**
 * Measure-and-pack masonry. Cards render at the computed column width, then we
 * measure their ACTUAL heights and pack each into the shortest column. No height
 * prediction — the cards contain no async content, so measured height is exact
 * and columns can never overlap.
 */
export default function MasonryGrid({
  items,
  columns = 2,
  gap = 32,
}: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dims, setDims] = useState({ colWidth: 0, cols: 1, isMobile: true });
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);

  // Pass 1 — column geometry from the container width.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      const mobile = w < 640;
      const cols = mobile ? 1 : Math.min(columns, items.length);
      const colWidth = mobile ? w : (w - gap * (cols - 1)) / cols;
      setDims({ colWidth, cols, isMobile: mobile });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [items.length, columns, gap]);

  // Pass 2 — measure real card heights and pack into the shortest column.
  useLayoutEffect(() => {
    if (dims.isMobile || dims.colWidth === 0) {
      setPlacements([]);
      setContainerHeight(0);
      return;
    }
    const colHeights = new Array(dims.cols).fill(0);
    const next: Placement[] = [];
    items.forEach((_, i) => {
      const node = itemRefs.current[i];
      const h = node ? node.getBoundingClientRect().height : 400;
      const col = colHeights.indexOf(Math.min(...colHeights));
      next.push({ top: colHeights[col], left: col * (dims.colWidth + gap) });
      colHeights[col] += h + gap;
    });
    setPlacements(next);
    setContainerHeight(Math.max(...colHeights) - gap);
  }, [dims, items, gap]);

  // Mobile: simple stacked grid.
  if (dims.isMobile) {
    return (
      <div ref={containerRef} className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.key}>{item.render()}</div>
        ))}
      </div>
    );
  }

  const positioned = placements.length === items.length;

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: positioned ? containerHeight : undefined }}
    >
      {items.map((item, i) => (
        <div
          key={item.key}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          style={{
            position: "absolute",
            top: positioned ? placements[i].top : 0,
            left: positioned ? placements[i].left : 0,
            width: dims.colWidth,
            visibility: positioned ? "visible" : "hidden",
          }}
        >
          {item.render()}
        </div>
      ))}
    </div>
  );
}
