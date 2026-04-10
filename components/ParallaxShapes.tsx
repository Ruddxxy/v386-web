"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxShape {
  type: "square" | "circle" | "line" | "dot";
  className: string;
  speed: number; // 0 = no parallax, 1 = full scroll, negative = opposite direction
  rotate?: number;
}

interface ParallaxShapesProps {
  shapes?: ParallaxShape[];
  className?: string;
}

const DEFAULT_SHAPES: ParallaxShape[] = [
  // Top-left amber square
  {
    type: "square",
    className:
      "top-[12%] left-[8%] w-3 h-3 border border-accent-amber/30 rotate-45",
    speed: -0.4,
  },
  // Right side cyan ring
  {
    type: "circle",
    className:
      "top-[28%] right-[12%] w-6 h-6 border border-accent-cyan/25 rounded-full",
    speed: 0.6,
  },
  // Mid-left tiny dot cluster (single dot)
  {
    type: "dot",
    className:
      "top-[45%] left-[18%] w-1.5 h-1.5 bg-accent-amber/40 rounded-full",
    speed: -0.3,
  },
  // Bottom-right line
  {
    type: "line",
    className: "bottom-[18%] right-[20%] w-12 h-px bg-accent-amber/25",
    speed: 0.5,
  },
  // Lower-left thin vertical line
  {
    type: "line",
    className: "bottom-[28%] left-[14%] w-px h-10 bg-accent-cyan/25",
    speed: -0.5,
  },
];

/**
 * Parallax accent shapes layered absolutely inside a section.
 *
 * Each shape moves at its own scroll speed via useTransform on the parent
 * section's scroll progress. Pure decorative — pointer-events-none.
 */
export default function ParallaxShapes({
  shapes = DEFAULT_SHAPES,
  className = "",
}: ParallaxShapesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {shapes.map((shape, i) => (
        <ParallaxShapeItem
          key={i}
          shape={shape}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function ParallaxShapeItem({
  shape,
  scrollYProgress,
}: {
  shape: ParallaxShape;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, shape.speed * 200]);
  return <motion.div style={{ y }} className={`absolute ${shape.className}`} />;
}
