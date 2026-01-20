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
    <section id="about" className="py-24 px-6 bg-void text-stark border-t-4 border-void">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <div className="inline-block border-4 border-stark px-4 py-2 mb-6 bg-orange">
            <span className="text-sm uppercase tracking-widest font-bold text-void">
              About
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            The Vector 384 Philosophy<span className="text-orange">.</span>
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
              className="border-l-4 border-orange pl-8"
            >
              <p className="text-xl md:text-2xl leading-relaxed text-stark/90 font-serif">
                I am Rudra Mahapatro, a Systems Engineer and the founder of Vector 384.
                While most build for the &quot;happy path,&quot; I build for the war zone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-l-4 border-stark/30 pl-8"
            >
              <p className="text-lg leading-relaxed text-stark/70 font-serif">
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
              className="border-l-4 border-stark/30 pl-8"
            >
              <p className="text-lg leading-relaxed text-stark/70 font-serif">
                Currently, I am architecting algorithmic trading engines for
                the NSE markets and deploying defensive security tools for SaaS clients.
              </p>
            </motion.div>
          </div>

          {/* Right: Identity & Focus Areas */}
          <div className="space-y-10">
            {/* Identity Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="border-4 border-stark p-8 shadow-hard-orange"
            >
              <div className="mb-6">
                <span className="text-orange text-sm uppercase tracking-widest font-bold">
                  Identity
                </span>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stark/20 pb-3">
                  <span className="text-stark/60 uppercase text-sm tracking-wider">Name</span>
                  <span className="font-bold text-lg">Rudra Mahapatro</span>
                </div>
                <div className="flex justify-between items-center border-b border-stark/20 pb-3">
                  <span className="text-stark/60 uppercase text-sm tracking-wider">Role</span>
                  <span className="font-bold text-lg">Founder & Systems Engineer</span>
                </div>
                <div className="flex justify-between items-center border-b border-stark/20 pb-3">
                  <span className="text-stark/60 uppercase text-sm tracking-wider">Handle</span>
                  <span className="font-bold text-lg text-orange">VECTOR384</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stark/60 uppercase text-sm tracking-wider">Status</span>
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-2 h-2 bg-orange"
                    />
                    <span className="font-bold text-lg">Available</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Focus Areas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="mb-6">
                <span className="text-orange text-sm uppercase tracking-widest font-bold">
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
                    className="px-4 py-2 border-4 border-stark text-sm uppercase tracking-wider font-bold hover:bg-orange hover:border-orange hover:text-void transition-all duration-150 cursor-default"
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
