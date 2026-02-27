"use client";

import { GithubIcon, LinkedInIcon, EmailIcon } from "./icons";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";

function TerminalLine({ command, delay }: { command: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center gap-2"
    >
      <span className="text-accent-amber font-mono text-sm">$</span>
      <span className="text-text-primary font-mono text-sm">{command}</span>
    </motion.div>
  );
}

function TerminalOutput({ lines, delay }: { lines: string[]; delay: number }) {
  return (
    <>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: delay + i * 0.15 }}
          className="text-text-secondary font-mono text-sm pl-4"
        >
          {line}
        </motion.div>
      ))}
    </>
  );
}

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section className="min-h-screen relative">
      <div className="relative min-h-screen flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-12">
          <div className="max-w-3xl">
            {/* Logo with magnetic tilt */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                style={{ rotateX, rotateY, perspective: 600 }}
                className="inline-block glass-card p-3 relative"
              >
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-xl bg-accent-amber/10 blur-xl -z-10"
                />
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src="/logo.png"
                    alt="Vector 384"
                    width={180}
                    height={60}
                    className="h-12 w-auto mix-blend-screen"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Bold Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight mb-2"
            >
              Systems &
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gradient-amber"
              >
                Security
              </motion.span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-8"
            >
              <span className="font-mono text-text-muted text-lg md:text-xl tracking-wide">
                {"// engineer"}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-text-secondary max-w-xl mb-10 leading-relaxed font-body"
            >
              Systems Engineer (Python/C++) | Offensive Security | High-Frequency Infrastructure
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 glass-card border-accent-amber/30 text-accent-amber font-mono uppercase tracking-wider text-sm hover:border-accent-amber hover:shadow-glow-amber transition-all duration-300"
              >
                View The Arsenal
              </motion.a>

              <motion.a
                href="mailto:rudra@vector384.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 surface-outline text-text-primary font-mono uppercase tracking-wider text-sm hover:border-white/[0.15] transition-all duration-300"
              >
                <EmailIcon size={18} />
                Hire Vector 384
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Terminal Panel — Desktop */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex flex-col justify-center w-[420px] px-8 py-12"
        >
          <div className="surface-terminal overflow-hidden">
            {/* Terminal header bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-xs text-text-muted ml-2">
                vector384@arch ~
              </span>
            </div>

            {/* Terminal body */}
            <div className="p-5 space-y-3 bg-scanlines min-h-[280px]">
              <TerminalLine command="flashaudit scan --repo enterprise-monorepo" delay={0.8} />
              <TerminalOutput
                lines={[
                  "Scanning 847,000 files...",
                  "Found 23 exposed secrets in 0.4s",
                  "SARIF report exported to ./audit.sarif",
                ]}
                delay={1.1}
              />

              <div className="h-3" />

              <TerminalLine command="uptime" delay={1.8} />
              <TerminalOutput
                lines={["3+ years | 160+ commits | Status: AVAILABLE"]}
                delay={2.1}
              />

              <div className="h-3" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="flex items-center gap-2"
              >
                <span className="text-accent-amber font-mono text-sm">$</span>
                <span className="w-2.5 h-5 bg-accent-amber animate-blink" />
              </motion.div>
            </div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
            className="mt-6 flex gap-3"
          >
            <motion.a
              href="https://github.com/Ruddxxy"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 surface-outline text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/rudra2"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 surface-outline text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={20} />
            </motion.a>
            <motion.a
              href="mailto:rudra@vector384.com"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 surface-outline text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
              aria-label="Email"
            >
              <EmailIcon size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile Terminal Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="lg:hidden surface-terminal rounded-none border-x-0"
      >
        <div className="px-6 py-4 font-mono text-sm flex items-center gap-2 overflow-x-auto">
          <span className="text-accent-amber flex-shrink-0">$</span>
          <span className="text-text-secondary whitespace-nowrap">
            flashaudit scan completed — 23 secrets found in 0.4s
          </span>
        </div>
      </motion.div>
    </section>
  );
}
