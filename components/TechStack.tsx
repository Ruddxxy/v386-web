"use client";

import { motion } from "framer-motion";

type ProficiencyLevel = "core" | "proficient" | "familiar";

interface TechItem {
  name: string;
  level: ProficiencyLevel;
}

const DOT_COLORS: Record<ProficiencyLevel, string> = {
  core: "bg-accent-amber",
  proficient: "bg-accent-cyan",
  familiar: "bg-text-muted",
};

const TECH_ITEMS: TechItem[] = [
  { name: "Rust", level: "core" },
  { name: "C/C++", level: "core" },
  { name: "Python", level: "core" },
  { name: "Go", level: "proficient" },
  { name: "Next.js/React", level: "core" },
  { name: "PostgreSQL", level: "proficient" },
  { name: "Docker", level: "proficient" },
  { name: "Metasploit", level: "core" },
  { name: "Burp Suite", level: "core" },
  { name: "LangChain", level: "proficient" },
  { name: "TensorFlow", level: "familiar" },
  { name: "Redis", level: "proficient" },
];

export default function TechStack() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
      className="mt-8"
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
          Technical Stack
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
            <span className="font-mono text-[10px] text-text-muted uppercase">
              Core
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan" />
            <span className="font-mono text-[10px] text-text-muted uppercase">
              Proficient
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
            <span className="font-mono text-[10px] text-text-muted uppercase">
              Familiar
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {TECH_ITEMS.map((item, index) => (
          <motion.span
            key={item.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 surface-outline rounded-full font-mono text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[item.level]}`}
            />
            {item.name}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
