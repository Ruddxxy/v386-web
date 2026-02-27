"use client";

import { motion } from "framer-motion";

type ProficiencyLevel = "core" | "proficient" | "familiar";

interface SkillItem {
  name: string;
  level: ProficiencyLevel;
}

interface SkillCategory {
  title: string;
  subtitle: string;
  items: SkillItem[];
}

const DOT_COLORS: Record<ProficiencyLevel, string> = {
  core: "bg-accent-amber",
  proficient: "bg-accent-cyan",
  familiar: "bg-text-muted",
};

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="surface-solid overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-accent-amber" />
          <span className="font-mono text-accent-amber text-sm uppercase tracking-wider">
            {category.title}
          </span>
        </div>
        <p className="text-text-muted font-mono text-xs mb-5 pl-4">
          {category.subtitle}
        </p>

        <div className="flex flex-wrap gap-2">
          {category.items.map((item, itemIndex) => (
            <motion.span
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.04 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 surface-outline rounded-full font-mono text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[item.level]}`} />
              {item.name}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const categories: SkillCategory[] = [
    {
      title: "SYSTEMS & LOW-LEVEL",
      subtitle: "Zero-copy parsers, kernel-level networking",
      items: [
        { name: "Rust (Rayon, Actix)", level: "core" },
        { name: "C/C++ (Win32 API)", level: "core" },
        { name: "Go (Golang)", level: "proficient" },
        { name: "Bash Scripting", level: "proficient" },
      ],
    },
    {
      title: "OFFENSIVE SECURITY",
      subtitle: "Pen-testing, threat modeling, malware analysis",
      items: [
        { name: "Metasploit", level: "core" },
        { name: "Burp Suite", level: "core" },
        { name: "Wireshark", level: "proficient" },
        { name: "Nmap", level: "proficient" },
        { name: "Katana", level: "proficient" },
        { name: "Malware Analysis", level: "familiar" },
      ],
    },
    {
      title: "PRODUCT ENGINEERING",
      subtitle: "Full-stack SaaS, infra-as-code, databases",
      items: [
        { name: "Next.js/React", level: "core" },
        { name: "Python (FastAPI)", level: "core" },
        { name: "PostgreSQL/Redis", level: "proficient" },
        { name: "Docker/Terraform", level: "proficient" },
        { name: "TensorFlow/RAG", level: "familiar" },
      ],
    },
    {
      title: "AI & MACHINE LEARNING",
      subtitle: "LLM orchestration, anomaly detection, pipelines",
      items: [
        { name: "LangChain", level: "proficient" },
        { name: "OpenAI API", level: "proficient" },
        { name: "Hugging Face", level: "familiar" },
        { name: "Scikit-Learn", level: "proficient" },
        { name: "Isolation Forest", level: "core" },
        { name: "Pandas", level: "core" },
        { name: "TensorFlow", level: "familiar" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-base-900/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Section Header — terminal prompt style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <div className="font-mono text-text-muted text-sm mb-6 tracking-wider">
            <span className="text-accent-amber">$</span> cat /etc/skills.conf
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-text-primary">
            Technical Command<span className="text-accent-amber">.</span>
          </h2>

          {/* Proficiency Legend */}
          <div className="flex flex-wrap items-center gap-5 mt-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-amber" />
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Core</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-cyan" />
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Proficient</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-text-muted" />
              <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Familiar</span>
            </div>
          </div>
        </motion.div>

        {/* Skills Grid — 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
