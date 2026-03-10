"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ChapterTransitionProps {
  tint?: "amber" | "cyan" | "white";
}

export default function ChapterTransition({
  tint = "amber",
}: ChapterTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const circleScale = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);
  const circleOpacity = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0, 0.35, 0]);

  const via =
    tint === "amber"
      ? "via-accent-amber/40"
      : tint === "cyan"
        ? "via-accent-cyan/40"
        : "via-white/20";

  const circleColor =
    tint === "amber" ? "bg-accent-amber" : tint === "cyan" ? "bg-accent-cyan" : "bg-white";

  return (
    <div ref={ref} className="relative h-40 flex items-center justify-center overflow-hidden">
      {/* Gradient line */}
      <div
        className={`absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${via} to-transparent`}
      />

      {/* Decorative circle */}
      <motion.div
        style={{ scale: circleScale, opacity: circleOpacity }}
        className={`w-48 h-48 rounded-full ${circleColor} blur-xl`}
      />
    </div>
  );
}
