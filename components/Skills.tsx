"use client";

import { motion } from "framer-motion";

interface TerminalWindowProps {
  title: string;
  items: string[];
  index: number;
}

function TerminalWindow({ title, items, index }: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="border-4 border-void shadow-brutal bg-void"
    >
      {/* Terminal Header */}
      <div className="bg-orange px-4 py-3 border-b-4 border-void flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border-2 border-void bg-stark" />
          <div className="w-3 h-3 border-2 border-void bg-stark" />
          <div className="w-3 h-3 border-2 border-void bg-stark" />
        </div>
        <span className="font-mono text-sm font-bold text-void uppercase tracking-wider">
          {title}
        </span>
        <div className="w-16" />
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-stark">
        <div className="space-y-2">
          {items.map((item, itemIndex) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 }}
              viewport={{ once: true }}
              className="flex items-start gap-3"
            >
              <span className="text-orange font-bold">$</span>
              <span className="text-stark/90">{item}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="text-orange font-bold">$</span>
          <span className="w-3 h-5 bg-orange animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const categories = [
    {
      title: "SYSTEMS & LOW-LEVEL",
      items: ["Rust (Rayon, Actix)", "C/C++ (Win32 API)", "Go (Golang)", "Bash Scripting"],
    },
    {
      title: "OFFENSIVE SECURITY",
      items: ["Metasploit", "Burp Suite", "Wireshark", "Nmap", "Katana", "Malware Analysis"],
    },
    {
      title: "PRODUCT ENGINEERING",
      items: ["Next.js/React", "Python (FastAPI)", "PostgreSQL/Redis", "Docker/Terraform", "TensorFlow/RAG"],
    },
    {
      title: "AI & MACHINE LEARNING",
      items: ["LangChain", "OpenAI API", "Hugging Face", "Scikit-Learn", "Isolation Forest", "Pandas", "TensorFlow"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-stark border-t-4 border-void">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="inline-block border-4 border-void px-4 py-2 mb-6 shadow-brutal-sm bg-orange">
            <span className="text-sm uppercase tracking-widest font-bold text-void">
              Tech Stack
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Technical Command<span className="text-orange">.</span>
          </h2>
        </motion.div>

        {/* Terminal Windows Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <TerminalWindow
              key={category.title}
              title={category.title}
              items={category.items}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
