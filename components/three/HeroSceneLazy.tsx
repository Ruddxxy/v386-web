"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * Static SVG fallback for the R3F scene.
 *
 * Used while the Three.js bundle loads, when SSR is in effect, when
 * prefers-reduced-motion is requested, and on low-power devices.
 * Mirrors the wireframe icosahedron + particle field aesthetic with
 * pure SVG so the section never feels empty.
 */
function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        viewBox="-100 -100 200 200"
        className="w-[420px] h-[420px] opacity-60"
        aria-hidden="true"
      >
        {/* Wireframe icosahedron silhouette (hexagon approximation) */}
        <polygon
          points="0,-50 43,-25 43,25 0,50 -43,25 -43,-25"
          fill="none"
          stroke="#E5A537"
          strokeWidth="0.6"
          strokeOpacity="0.3"
        />
        <polygon
          points="0,-35 30,-17 30,17 0,35 -30,17 -30,-17"
          fill="none"
          stroke="#E5A537"
          strokeWidth="0.5"
          strokeOpacity="0.18"
        />
        <line
          x1="0"
          y1="-50"
          x2="0"
          y2="50"
          stroke="#E5A537"
          strokeWidth="0.4"
          strokeOpacity="0.15"
        />
        <line
          x1="-43"
          y1="-25"
          x2="43"
          y2="25"
          stroke="#E5A537"
          strokeWidth="0.4"
          strokeOpacity="0.15"
        />
        <line
          x1="43"
          y1="-25"
          x2="-43"
          y2="25"
          stroke="#E5A537"
          strokeWidth="0.4"
          strokeOpacity="0.15"
        />
        {/* Scattered particles */}
        {Array.from({ length: 50 }).map((_, i) => {
          const angle = (i * 137.5 * Math.PI) / 180;
          const r = 20 + (i % 5) * 14;
          const cx = Math.cos(angle) * r;
          const cy = Math.sin(angle) * r;
          const isAmber = i % 3 !== 0;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={isAmber ? 0.8 : 0.6}
              fill={isAmber ? "#E5A537" : "#3FBDD4"}
              opacity={0.5}
            />
          );
        })}
      </svg>
    </div>
  );
}

const HeroSceneDynamic = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

/**
 * Decides whether to render the full R3F scene or the static fallback.
 *
 * Render rules:
 *   - SSR / pre-mount: static fallback
 *   - prefers-reduced-motion: static fallback (no Canvas mounted)
 *   - hardwareConcurrency < 4: static fallback (low-power device)
 *   - Otherwise: dynamic R3F scene
 */
export default function HeroSceneLazy() {
  const [shouldRender3D, setShouldRender3D] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const cores = navigator.hardwareConcurrency ?? 4;
    if (cores < 4) return;

    setShouldRender3D(true);
  }, []);

  if (!shouldRender3D) {
    return <StaticFallback />;
  }

  return <HeroSceneDynamic />;
}
