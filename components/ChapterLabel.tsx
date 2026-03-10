"use client";

import { motion } from "framer-motion";

interface ChapterLabelProps {
  number: string;
  title: string;
}

export default function ChapterLabel({ number, title }: ChapterLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="font-mono text-text-muted text-sm mb-6 tracking-wider"
    >
      <span className="text-accent-amber">//</span> {number} &mdash; {title}
    </motion.div>
  );
}
