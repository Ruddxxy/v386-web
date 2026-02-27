"use client";

import { motion } from "framer-motion";

export default function About() {
  const focusAreas = [
    "Algorithmic Trading",
    "Offensive Security",
    "Low-Level Optimization",
    "Zero-Copy Systems",
    "CI/CD Hardening",
    "SaaS Security",
    "AI Integration",
  ];

  return (
    <section id="about" className="py-24 px-6 bg-base-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        {/* Gradient line divider at top */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent-amber/20 to-transparent mb-16" />

        {/* Section Header — pill (kept as first section) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-accent-amber" />
            <span className="text-sm uppercase tracking-widest font-mono text-text-secondary">
              About
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-text-primary">
            The Vector 384 Philosophy<span className="text-accent-amber">.</span>
          </h2>
        </motion.div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Narrative */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-l border-accent-amber/40 pl-8"
            >
              <p className="text-xl md:text-2xl leading-relaxed text-text-primary font-body">
                I am Rudra Mahapatro, a Systems Engineer and the founder of Vector 384.
                While most build for the &quot;happy path,&quot; I build for the war zone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-l border-white/[0.06] pl-8"
            >
              <p className="text-lg leading-relaxed text-text-secondary font-body">
                My work bridges the gap between offensive security research and
                production-grade infrastructure. Whether it&apos;s writing zero-copy
                parsers in Rust to shave milliseconds off a CI pipeline, or hand-crafting
                Windows-native firewalls in C to block SQL injection at the packet level,
                I focus on one thing: performance under pressure.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-l border-white/[0.06] pl-8"
            >
              <p className="text-lg leading-relaxed text-text-secondary font-body">
                Currently, I am architecting algorithmic trading engines for
                the NSE markets and deploying defensive security tools for SaaS clients.
              </p>
            </motion.div>
          </div>

          {/* Right: Identity & Focus Areas */}
          <div className="space-y-10">
            {/* Identity Card — surface-terminal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="surface-terminal overflow-hidden"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-xs text-text-muted ml-1">identity.conf</span>
              </div>

              <div className="p-6 space-y-0">
                <div className="surface-data-row py-3 flex justify-between items-center">
                  <span className="text-text-muted font-mono uppercase text-sm tracking-wider">Name</span>
                  <span className="font-body font-semibold text-lg text-text-primary">Rudra Mahapatro</span>
                </div>
                <div className="surface-data-row py-3 flex justify-between items-center">
                  <span className="text-text-muted font-mono uppercase text-sm tracking-wider">Role</span>
                  <span className="font-body font-semibold text-lg text-text-primary">Founder & Systems Engineer</span>
                </div>
                <div className="surface-data-row py-3 flex justify-between items-center">
                  <span className="text-text-muted font-mono uppercase text-sm tracking-wider">Handle</span>
                  <span className="font-body font-semibold text-lg text-accent-amber">VECTOR384</span>
                </div>
                <div className="py-3 flex justify-between items-center">
                  <span className="text-text-muted font-mono uppercase text-sm tracking-wider">Status</span>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-accent-amber rounded-full"
                    />
                    <span className="font-body font-semibold text-lg text-text-primary">Available</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Focus Areas — surface-outline pills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mb-6">
                <span className="text-accent-amber font-mono text-sm uppercase tracking-widest">
                  Focus Areas
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {focusAreas.map((area, index) => (
                  <motion.span
                    key={area}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 surface-outline rounded-full font-mono text-sm text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300 cursor-default"
                  >
                    {area}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
