"use client";

import {
  createContext,
  useEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import {
  prepare,
  prepareWithSegments,
  type PreparedText,
  type PreparedTextWithSegments,
} from "@chenglou/pretext";
import {
  getAllTextEntries,
  FONT_DESCRIPTORS,
  type FontKey,
} from "@/lib/pretext-registry";

interface PretextContextValue {
  ready: boolean;
  getHandle(key: string): PreparedText | null;
  getSegmentHandle(key: string): PreparedTextWithSegments | null;
}

export const PretextContext = createContext<PretextContextValue>({
  ready: false,
  getHandle: () => null,
  getSegmentHandle: () => null,
});

// Keys that need segment-level data (for line-by-line rendering, bubbles, obstacles)
const SEGMENT_KEYS = new Set([
  "origin:the-path",
  "service:philosophy-quote",
]);

function resolveFontString(fontKey: FontKey): string | null {
  const descriptor = FONT_DESCRIPTORS[fontKey];
  if (!descriptor) return null;

  // Read the resolved font-family from the CSS variable
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  const fontFamily = computedStyle.getPropertyValue(descriptor.variable).trim();

  if (!fontFamily) return null;

  const style = descriptor.style ? `${descriptor.style} ` : "";
  return `${style}${descriptor.weight} ${descriptor.size} ${fontFamily}`;
}

export function PretextProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const handlesRef = useRef<Map<string, PreparedText>>(new Map());
  const segmentHandlesRef = useRef<Map<string, PreparedTextWithSegments>>(new Map());

  useEffect(() => {
    // Wait for fonts to load before measuring
    document.fonts.ready.then(() => {
      const entries = getAllTextEntries();
      const fontStringCache = new Map<FontKey, string>();

      for (const [key, entry] of Object.entries(entries)) {
        let fontString = fontStringCache.get(entry.fontKey);
        if (!fontString) {
          const resolved = resolveFontString(entry.fontKey);
          if (!resolved) continue;
          fontString = resolved;
          fontStringCache.set(entry.fontKey, fontString);
        }

        if (SEGMENT_KEYS.has(key)) {
          const handle = prepareWithSegments(entry.text, fontString);
          segmentHandlesRef.current.set(key, handle);
          handlesRef.current.set(key, handle);
        } else {
          const handle = prepare(entry.text, fontString);
          handlesRef.current.set(key, handle);
        }
      }

      setReady(true);
    });
  }, []);

  const getHandle = (key: string): PreparedText | null => {
    return handlesRef.current.get(key) ?? null;
  };

  const getSegmentHandle = (key: string): PreparedTextWithSegments | null => {
    return segmentHandlesRef.current.get(key) ?? null;
  };

  return (
    <PretextContext.Provider value={{ ready, getHandle, getSegmentHandle }}>
      {children}
    </PretextContext.Provider>
  );
}
