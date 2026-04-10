"use client";

import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { layout, type LayoutResult } from "@chenglou/pretext";
import { PretextContext } from "./PretextProvider";

interface UsePretextLayoutOptions {
  key: string;
  lineHeight: number;
}

interface UsePretextLayoutResult {
  ready: boolean;
  height: number;
  lineCount: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export function usePretextLayout({
  key,
  lineHeight,
}: UsePretextLayoutOptions): UsePretextLayoutResult {
  const ctx = useContext(PretextContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<LayoutResult>({ lineCount: 0, height: 0 });
  const [measured, setMeasured] = useState(false);

  const compute = useCallback(() => {
    const handle = ctx.getHandle(key);
    const el = containerRef.current;
    if (!handle || !el) return;

    const width = el.getBoundingClientRect().width;
    if (width <= 0) return;

    const layoutResult = layout(handle, width, lineHeight);
    setResult(layoutResult);
    setMeasured(true);
  }, [ctx, key, lineHeight]);

  useEffect(() => {
    if (!ctx.ready) return;

    // Initial computation
    compute();

    // Recompute on resize
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      compute();
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [ctx.ready, compute]);

  return {
    ready: ctx.ready && measured,
    height: result.height,
    lineCount: result.lineCount,
    containerRef,
  };
}
