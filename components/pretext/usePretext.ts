"use client";

import { useContext } from "react";
import { PretextContext } from "./PretextProvider";
import type { PreparedText, PreparedTextWithSegments } from "@chenglou/pretext";

export function usePretext(key: string): {
  ready: boolean;
  handle: PreparedText | null;
} {
  const ctx = useContext(PretextContext);
  return {
    ready: ctx.ready,
    handle: ctx.getHandle(key),
  };
}

export function usePretextSegments(key: string): {
  ready: boolean;
  handle: PreparedTextWithSegments | null;
} {
  const ctx = useContext(PretextContext);
  return {
    ready: ctx.ready,
    handle: ctx.getSegmentHandle(key),
  };
}
