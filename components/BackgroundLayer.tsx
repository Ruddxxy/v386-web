"use client";

import { motion } from "framer-motion";

/**
 * Ambient background layer for the entire page.
 *
 * Three drifting radial gradients (amber, cyan, amber) on a fixed grid +
 * fractal noise base. Pure CSS/SVG/Framer Motion — no canvas, no WebGL.
 * Sits behind everything via -z-10. pointer-events-none so it never blocks
 * interaction.
 */
export default function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Warm amber gradient — top-left, drifts diagonally */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[65%] h-[65%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(229,165,55,0.05)_0%,_transparent_70%)]"
        animate={{
          x: [0, 40, 0, -20, 0],
          y: [0, -30, 0, 20, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cool cyan gradient — bottom-right, drifts opposite direction */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(63,189,212,0.03)_0%,_transparent_70%)]"
        animate={{
          x: [0, -30, 0, 20, 0],
          y: [0, 30, 0, -25, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Third subtle amber gradient — center, slow pulse */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(229,165,55,0.018)_0%,_transparent_70%)]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />

      {/* Noise texture for dithering */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015]">
        <filter id="bg-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#bg-noise)" />
      </svg>
    </div>
  );
}
