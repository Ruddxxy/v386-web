"use client";

import { motion, useTransform, useReducedMotion, MotionValue } from "framer-motion";

interface Props {
  scrollYProgress: MotionValue<number>;
}

interface GridCell {
  x: number;
  y: string;
  activateAt: number;
  size: number;
}

interface TraceLine {
  y: string;
  activateAt: number;
}

const GRID_CELLS: GridCell[] = [
  { x: 5, y: "6%", activateAt: 0.08, size: 48 },
  { x: 82, y: "9%", activateAt: 0.12, size: 52 },
  { x: 28, y: "14%", activateAt: 0.14, size: 44 },
  { x: 92, y: "18%", activateAt: 0.18, size: 56 },
  { x: 12, y: "22%", activateAt: 0.2, size: 50 },
  { x: 68, y: "26%", activateAt: 0.22, size: 46 },
  { x: 45, y: "30%", activateAt: 0.26, size: 58 },
  { x: 88, y: "34%", activateAt: 0.3, size: 42 },
  { x: 8, y: "38%", activateAt: 0.32, size: 54 },
  { x: 55, y: "42%", activateAt: 0.36, size: 48 },
  { x: 78, y: "46%", activateAt: 0.38, size: 52 },
  { x: 22, y: "50%", activateAt: 0.42, size: 46 },
  { x: 95, y: "54%", activateAt: 0.44, size: 50 },
  { x: 38, y: "58%", activateAt: 0.48, size: 56 },
  { x: 72, y: "62%", activateAt: 0.5, size: 44 },
  { x: 10, y: "66%", activateAt: 0.54, size: 52 },
  { x: 85, y: "72%", activateAt: 0.58, size: 48 },
  { x: 50, y: "78%", activateAt: 0.62, size: 54 },
  { x: 18, y: "84%", activateAt: 0.66, size: 46 },
  { x: 65, y: "90%", activateAt: 0.7, size: 50 },
];

const TRACE_LINES: TraceLine[] = [
  { y: "25%", activateAt: 0.2 },
  { y: "55%", activateAt: 0.4 },
  { y: "80%", activateAt: 0.6 },
];

function OriginCell({
  cell,
  index,
  scrollYProgress,
  reducedMotion,
}: {
  cell: GridCell;
  index: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const cellOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, cell.activateAt - 0.05), cell.activateAt + 0.1],
    [0, 0.12]
  );

  if (reducedMotion) {
    return (
      <rect
        x={`${cell.x}%`}
        y={cell.y}
        width={cell.size}
        height={cell.size}
        rx={2}
        fill="#E5A537"
        opacity={0.06}
      />
    );
  }

  return (
    <motion.rect
      x={`${cell.x}%`}
      y={cell.y}
      width={cell.size}
      height={cell.size}
      rx={2}
      fill="#E5A537"
      filter="url(#cell-glow)"
      style={{ opacity: cellOpacity }}
      animate={{ opacity: [0, 0.15, 0] }}
      transition={{
        duration: 4 + index * 0.3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2,
      }}
    />
  );
}

function TraceLine({
  line,
  scrollYProgress,
  reducedMotion,
}: {
  line: TraceLine;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const lineOpacity = useTransform(
    scrollYProgress,
    [Math.max(0, line.activateAt - 0.05), line.activateAt + 0.1],
    [0, 0.08]
  );

  if (reducedMotion) {
    return (
      <line
        x1="0"
        y1={line.y}
        x2="100%"
        y2={line.y}
        stroke="#E5A537"
        strokeWidth={1}
        strokeDasharray="8 16"
        opacity={0.04}
      />
    );
  }

  return (
    <motion.line
      x1="0"
      y1={line.y}
      x2="100%"
      y2={line.y}
      stroke="#E5A537"
      strokeWidth={1}
      strokeDasharray="8 16"
      style={{ opacity: lineOpacity }}
      animate={{ strokeDashoffset: [0, -24] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export default function OriginBackground({ scrollYProgress }: Props) {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="cell-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {TRACE_LINES.map((line, i) => (
          <TraceLine
            key={`trace-${i}`}
            line={line}
            scrollYProgress={scrollYProgress}
            reducedMotion={reducedMotion}
          />
        ))}

        {GRID_CELLS.map((cell, i) => (
          <OriginCell
            key={`cell-${i}`}
            cell={cell}
            index={i}
            scrollYProgress={scrollYProgress}
            reducedMotion={reducedMotion}
          />
        ))}
      </svg>
    </div>
  );
}
