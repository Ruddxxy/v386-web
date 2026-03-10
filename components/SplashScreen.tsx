"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSplash } from "./SplashProvider";

/* ------------------------------------------------------------------ */
/*  SVG geometry — approximation of logo.png on a 500×500 viewBox     */
/* ------------------------------------------------------------------ */

const H_LINES = [
  { y: 140, x1: 75, x2: 425 },
  { y: 250, x1: 75, x2: 425 },
  { y: 360, x1: 75, x2: 425 },
];

const V_LINES = [
  { x: 75, y1: 70, y2: 430 },
  { x: 162, y1: 70, y2: 430 },
  { x: 250, y1: 70, y2: 430 },
  { x: 338, y1: 70, y2: 430 },
  { x: 425, y1: 70, y2: 430 },
];

// Grid intersection nodes (3 rows × 5 cols)
const GRID_NODES: [number, number][] = [];
for (const y of [140, 250, 360]) {
  for (const x of [75, 162, 250, 338, 425]) {
    GRID_NODES.push([x, y]);
  }
}

// Endpoint nodes at top/bottom of each vertical line
const ENDPOINT_NODES: [number, number][] = [
  [75, 70],
  [162, 70],
  [250, 70],
  [338, 70],
  [425, 70],
  [75, 430],
  [162, 430],
  [250, 430],
  [338, 430],
  [425, 430],
];

const ALL_NODES = [...GRID_NODES, ...ENDPOINT_NODES];

// Corner arrows (shaft + two arrowhead barbs as a single path)
const ARROWS = [
  // Top-left — pointing ↘ (inward)
  "M 25 65 L 65 105 M 65 105 L 46 100 M 65 105 L 60 86",
  // Top-right — pointing ↙ (inward)
  "M 475 65 L 435 105 M 435 105 L 454 100 M 435 105 L 440 86",
  // Bottom-left — pointing ↙ (outward)
  "M 65 395 L 25 435 M 25 435 L 44 430 M 25 435 L 30 416",
  // Bottom-right — pointing ↗ (outward)
  "M 435 435 L 475 395 M 475 395 L 456 400 M 475 395 L 470 414",
];

/* ------------------------------------------------------------------ */
/*  Animation timing                                                   */
/* ------------------------------------------------------------------ */

const PHASE = {
  hLines: { delay: 0, duration: 0.6, stagger: 0.1 },
  vLines: { delay: 0.4, duration: 0.5, stagger: 0.08 },
  arrows: { delay: 0.8, duration: 0.4, stagger: 0.08 },
  nodes: { delay: 1.1, duration: 0.3, stagger: 0.02 },
  text: { delay: 1.6, duration: 0.4 },
  tagline: { delay: 2.0, duration: 0.5 },
  glow: { delay: 2.4, duration: 0.3 },
  exit: 3.0,
};

const STROKE_COLOR = "#E2E6EE";
const STROKE_WIDTH = 6;
const NODE_RADIUS = 14;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SplashScreen() {
  const { splashComplete, setSplashComplete } = useSplash();
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    // Respect reduced-motion preference — skip splash entirely
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSplashComplete(true);
      return;
    }

    // Trigger exit after the animation sequence completes
    timerRef.current = setTimeout(() => {
      setSplashComplete(true);
    }, PHASE.exit * 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [setSplashComplete]);

  return (
    <AnimatePresence>
      {!splashComplete && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[9999] bg-base-950 flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeIn" }}
        >
          <svg
            viewBox="0 0 500 500"
            className="w-48 h-48 md:w-64 md:h-64"
            aria-label="Vector 384 logo forming"
            role="img"
          >
            <defs>
              <filter
                id="splash-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="30" />
              </filter>
            </defs>

            {/* Phase 6: Amber glow pulse (behind everything) */}
            <motion.rect
              x={50}
              y={50}
              width={400}
              height={400}
              rx={20}
              fill="#E5A537"
              filter="url(#splash-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.18, 0] }}
              transition={{
                duration: PHASE.glow.duration,
                delay: PHASE.glow.delay,
                ease: "easeInOut",
              }}
            />

            {/* Phase 1: Horizontal lines draw left→right */}
            {H_LINES.map((line, i) => (
              <motion.line
                key={`h-${i}`}
                x1={line.x1}
                y1={line.y}
                x2={line.x2}
                y2={line.y}
                stroke={STROKE_COLOR}
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: PHASE.hLines.duration,
                  delay: PHASE.hLines.delay + i * PHASE.hLines.stagger,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Phase 2: Vertical lines draw top→bottom */}
            {V_LINES.map((line, i) => (
              <motion.line
                key={`v-${i}`}
                x1={line.x}
                y1={line.y1}
                x2={line.x}
                y2={line.y2}
                stroke={STROKE_COLOR}
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: PHASE.vLines.duration,
                  delay: PHASE.vLines.delay + i * PHASE.vLines.stagger,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Phase 3: Corner arrows stroke-in */}
            {ARROWS.map((d, i) => (
              <motion.path
                key={`arrow-${i}`}
                d={d}
                stroke={STROKE_COLOR}
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: PHASE.arrows.duration,
                  delay: PHASE.arrows.delay + i * PHASE.arrows.stagger,
                  ease: "easeOut",
                }}
              />
            ))}

            {/* Phase 4: Nodes scale from 0→1 */}
            {ALL_NODES.map(([cx, cy], i) => (
              <motion.circle
                key={`node-${i}`}
                cx={cx}
                cy={cy}
                r={NODE_RADIUS}
                fill={STROKE_COLOR}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: PHASE.nodes.duration,
                  delay: PHASE.nodes.delay + i * PHASE.nodes.stagger,
                  ease: "backOut",
                }}
                style={{ transformOrigin: `${cx}px ${cy}px` }}
              />
            ))}

            {/* Phase 5: "384" text fades in + slight scale */}
            <motion.rect
              x={155}
              y={220}
              width={190}
              height={80}
              fill="#0E1018"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: PHASE.text.duration,
                delay: PHASE.text.delay,
                ease: "easeOut",
              }}
            />
            <motion.text
              x={250}
              y={265}
              textAnchor="middle"
              dominantBaseline="central"
              fill={STROKE_COLOR}
              fontSize={72}
              fontWeight={700}
              fontFamily="var(--font-heading), sans-serif"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: PHASE.text.duration,
                delay: PHASE.text.delay,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "250px 265px" }}
            >
              384
            </motion.text>

            {/* Phase 5b: Tagline below "384" */}
            <motion.text
              x={250}
              y={330}
              textAnchor="middle"
              dominantBaseline="central"
              fill="#E5A537"
              fontSize={16}
              fontWeight={400}
              fontFamily="var(--font-mono), monospace"
              letterSpacing="0.15em"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: PHASE.tagline.duration,
                delay: PHASE.tagline.delay,
                ease: "easeOut",
              }}
            >
              I build for the war zone.
            </motion.text>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
