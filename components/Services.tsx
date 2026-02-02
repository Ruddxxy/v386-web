"use client";

import { motion } from "framer-motion";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  index: number;
}

function ServiceCard({ number, title, description, deliverables, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative pt-16 h-full"
    >
      {/* Large Number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
        viewport={{ once: true }}
        className="absolute -top-4 left-6 text-8xl md:text-9xl font-bold text-orange leading-none select-none"
      >
        {number}
      </motion.div>

      {/* Card Content */}
      <div className="relative border-4 border-void bg-stark shadow-brutal h-full flex flex-col">
        <div className="p-8 flex-1">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">
            {title}
          </h3>
          <p className="text-void/70 text-lg leading-relaxed mb-8 font-serif">
            {description}
          </p>
        </div>

        {/* Deliverables */}
        <div className="border-t-4 border-void bg-void/5 p-6">
          <span className="text-sm uppercase tracking-widest font-bold text-orange block mb-4">
            Deliverables
          </span>
          <ul className="space-y-2">
            {deliverables.map((item, itemIndex) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-void/80"
              >
                <span className="text-orange font-bold mt-1">+</span>
                <span className="text-sm">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const services = [
    {
      number: "01",
      title: "Systems Architecture",
      description:
        "I rewrite slow Python/Node.js bottlenecks in Rust/C++. Expect 10x throughput improvements and lower cloud bills.",
      deliverables: [
        "Performance profiling",
        "Rust/C++ rewrites",
        "Memory optimization",
        "Throughput benchmarks",
      ],
    },
    {
      number: "02",
      title: "Security Instrumentation",
      description:
        "I audit CI/CD pipelines and inject automated security scanners (SAST/DAST) to prevent vulnerability shipping.",
      deliverables: [
        "CI/CD security audit",
        "SAST/DAST integration",
        "Secret scanning setup",
        "Hardening playbook",
      ],
    },
    {
      number: "03",
      title: "MVP Development",
      description:
        "From database schema to deployed SaaS. I build the full stack—secure by design, fast by default.",
      deliverables: [
        "Full-stack implementation",
        "Database architecture",
        "Deployment pipeline",
        "Security-first design",
      ],
    },
  ];

  return (
    <section id="services" className="py-24 px-6 bg-stark border-t-4 border-void">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="inline-block border-4 border-void px-4 py-2 mb-6 shadow-brutal-sm bg-orange">
            <span className="text-sm uppercase tracking-widest font-bold text-void">
              Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Capabilities<span className="text-orange">.</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              number={service.number}
              title={service.title}
              description={service.description}
              deliverables={service.deliverables}
              index={index}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.a
            href="mailto:rudranarayanmohapatro@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-void text-stark font-bold uppercase tracking-wider text-sm border-4 border-void shadow-hard-orange hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-150"
          >
            Start a Conversation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
