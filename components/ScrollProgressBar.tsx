"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent-amber shadow-[0_0_8px_rgba(229,165,55,0.5),0_0_16px_rgba(229,165,55,0.2)] z-[60]"
    />
  );
}
