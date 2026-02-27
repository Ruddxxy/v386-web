"use client";

import { motion } from "framer-motion";

type SurfaceType = "terminal" | "glass-cyan" | "solid";

interface Service {
  number: string;
  title: string;
  description: string;
  outcome: string;
  deliverables: string[];
  surface: SurfaceType;
}

function getSurfaceClass(surface: SurfaceType): string {
  switch (surface) {
    case "terminal":
      return "surface-terminal";
    case "glass-cyan":
      return "glass-card border-accent-cyan/20";
    case "solid":
      return "surface-solid";
  }
}

function getAccentLine(surface: SurfaceType): string {
  switch (surface) {
    case "terminal":
      return "bg-gradient-to-r from-accent-amber to-transparent";
    case "glass-cyan":
      return "bg-gradient-to-r from-accent-cyan to-transparent";
    case "solid":
      return "bg-gradient-to-r from-white/20 to-transparent";
  }
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const surfaceClass = getSurfaceClass(service.surface);
  const accentLine = getAccentLine(service.surface);

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
        className="absolute -top-4 left-6 text-8xl md:text-9xl font-heading font-bold text-accent-amber/10 leading-none select-none"
      >
        {service.number}
      </motion.div>

      {/* Card */}
      <div className={`relative ${surfaceClass} overflow-hidden h-full flex flex-col`}>
        <div className={`h-[2px] ${accentLine}`} />

        <div className="p-8 flex-1">
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 tracking-tight text-text-primary">
            {service.title}
          </h3>

          {/* Outcome — highlighted */}
          <div className="mb-4 px-3 py-2 rounded-lg bg-accent-amber/5 border-l-2 border-accent-amber/40">
            <span className="text-accent-amber font-mono text-sm">{service.outcome}</span>
          </div>

          <p className="text-text-secondary text-lg leading-relaxed font-body">
            {service.description}
          </p>
        </div>

        {/* Deliverables */}
        <div className="border-t border-white/[0.06] p-6">
          <span className="text-sm uppercase tracking-widest font-mono text-accent-amber block mb-4">
            What you get
          </span>
          <ul className="space-y-2">
            {service.deliverables.map((item, itemIndex) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + itemIndex * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 text-text-secondary"
              >
                <span className="text-accent-amber mt-1 text-xs">&#9670;</span>
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
  const services: Service[] = [
    {
      number: "01",
      title: "Systems Architecture",
      description:
        "I rewrite slow Python/Node.js bottlenecks in Rust/C++. Expect measurable throughput improvements and lower cloud bills.",
      outcome: "10x throughput, 60% lower infra costs",
      deliverables: [
        "Performance profiling",
        "Rust/C++ rewrites",
        "Memory optimization",
        "Throughput benchmarks",
      ],
      surface: "terminal",
    },
    {
      number: "02",
      title: "Security Instrumentation",
      description:
        "I audit CI/CD pipelines and inject automated security scanners (SAST/DAST) to prevent vulnerability shipping.",
      outcome: "Zero secrets in prod, automated compliance",
      deliverables: [
        "CI/CD security audit",
        "SAST/DAST integration",
        "Secret scanning setup",
        "Hardening playbook",
      ],
      surface: "glass-cyan",
    },
    {
      number: "03",
      title: "MVP Development",
      description:
        "From database schema to deployed SaaS. I build the full stack — secure by design, fast by default.",
      outcome: "Ship in weeks, not months",
      deliverables: [
        "Full-stack implementation",
        "Database architecture",
        "Deployment pipeline",
        "Security-first design",
      ],
      surface: "solid",
    },
  ];

  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header — dash-line style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-accent-amber" />
            <span className="text-sm uppercase tracking-widest font-mono text-text-secondary">
              Services
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-text-primary">
            Capabilities<span className="text-accent-amber">.</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.number} service={service} index={index} />
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
            href="mailto:rudra@vector384.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-3 px-12 py-5 surface-outline border-accent-amber/30 text-text-primary font-mono uppercase tracking-wider text-sm hover:border-accent-amber hover:shadow-glow-amber transition-all duration-300"
          >
            Start a Conversation
          </motion.a>
          <p className="mt-6 font-mono text-text-muted text-sm">
            {"// compiled without warnings"}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
