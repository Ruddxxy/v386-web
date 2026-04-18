"use client";

import { useRef } from "react";
import { GithubIcon, LinkedInIcon, EmailIcon } from "./icons";
import Image from "next/image";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import ChapterLabel from "./ChapterLabel";
import ScrollIndicator from "./ScrollIndicator";
import ParallaxShapes from "./ParallaxShapes";
import HeroSceneLazy from "./three/HeroSceneLazy";

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
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-150, 150], [8, -8]);
  const rotateY = useTransform(mouseX, [-150, 150], [-8, 8]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

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
    <section ref={sectionRef} className="min-h-screen relative">
      {/* R3F particle field + wireframe — lazy loaded behind everything */}
      <div className="absolute inset-0 pointer-events-none">
        <HeroSceneLazy />
      </div>
      <ParallaxShapes />
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative min-h-screen flex"
      >
        {/* Atmospheric centered photo */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[480px] h-[480px] md:w-[550px] md:h-[550px]">
            <div
              className="absolute inset-0 z-10"
              style={{
                background:
                  "radial-gradient(circle, transparent 20%, #0E1018 70%)",
              }}
            />
            <Image
              src="/pfp.webp"
              alt="Rudra Mahapatro — Systems Engineer specializing in Rust and C++"
              width={550}
              height={550}
              priority
              className="w-full h-full object-cover grayscale opacity-60"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-12 z-10">
          <div className="max-w-3xl">
            <ChapterLabel number="01" title="identity" />

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
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-xl bg-accent-amber/10 blur-xl -z-10"
                />
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                >
                  <Image
                    src="/logo.png"
                    alt="VECTOR 384 — Systems Engineering Portfolio"
                    width={180}
                    height={60}
                    priority
                    className="h-12 w-auto mix-blend-screen"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Bold Typography — Storytelling headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight mb-2"
            >
              I architect systems
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-gradient-amber"
              >
                that don&apos;t break.
              </motion.span>
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mb-8"
            >
              <span className="font-mono text-text-muted text-lg md:text-xl tracking-wide">
                {"// under pressure"}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-text-secondary max-w-xl mb-10 leading-relaxed font-body"
            >
              Rust. C++. Zero-copy. I build the tools that other engineers
              depend on when it actually matters.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="mailto:rudranarayanmohapatro@gmail.com"
                whileTap={{ scale: 0.97 }}
                className="btn-amber inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-mono uppercase tracking-wider text-sm"
              >
                <EmailIcon size={18} />
                Start a project
              </motion.a>

              <motion.a
                href="#projects"
                whileTap={{ scale: 0.97 }}
                className="btn-outline inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-mono uppercase tracking-wider text-sm"
              >
                See Projects
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Terminal Panel — Desktop */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex flex-col justify-center w-[420px] px-8 py-12 z-10"
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
            <div className="p-6 space-y-4 bg-scanlines min-h-[280px]">
              <TerminalLine
                command="flashaudit scan --repo enterprise-monorepo"
                delay={0.8}
              />
              <TerminalOutput
                lines={[
                  "Scanning 847,000 files...",
                  "Found 23 exposed secrets in 0.4s",
                  "SARIF report exported to ./audit.sarif",
                ]}
                delay={1.1}
              />

              <div className="h-4" />

              <TerminalLine command="uptime" delay={1.8} />
              <TerminalOutput
                lines={["3+ years | 160+ commits | shipping since day one"]}
                delay={2.1}
              />

              <div className="h-4" />

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
              whileHover={{ y: -3, rotate: -4 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="social-icon-glow p-3 surface-outline text-text-secondary"
              aria-label="GitHub"
            >
              <GithubIcon size={20} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/rudra2"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3, rotate: -4 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="social-icon-glow p-3 surface-outline text-text-secondary"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={20} />
            </motion.a>
            <motion.a
              href="mailto:rudranarayanmohapatro@gmail.com"
              whileHover={{ y: -3, rotate: -4 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="social-icon-glow p-3 surface-outline text-text-secondary"
              aria-label="Email"
            >
              <EmailIcon size={20} />
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Mobile Terminal Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="lg:hidden surface-terminal rounded-none border-x-0"
      >
        <div className="flex items-center gap-3 px-4 py-2 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="font-mono text-[10px] text-text-muted ml-1">
            vector384@arch ~
          </span>
        </div>
        <div className="px-4 py-3 space-y-1.5 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-accent-amber">$</span>
            <span className="text-text-primary truncate">
              flashaudit scan --repo enterprise-monorepo
            </span>
          </div>
          <div className="text-text-secondary pl-4 truncate">
            847,000 files · 23 secrets · 0.4s
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-accent-amber">$</span>
            <span className="text-text-primary">uptime</span>
          </div>
          <div className="text-text-secondary pl-4 truncate">
            3+ years · 160+ commits · shipping since day one
          </div>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-accent-amber">$</span>
            <span className="w-2 h-3.5 bg-accent-amber animate-blink inline-block" />
          </div>
        </div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
