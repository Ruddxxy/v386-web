"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ChapterLabel from "./ChapterLabel";
import TechStack from "./TechStack";
import OriginBackground from "./OriginBackground";
import PretextObstacleText from "./pretext/PretextObstacleText";
import { ORIGIN_TEXTS } from "@/lib/pretext-registry";

interface NarrativeBlockProps {
  children: React.ReactNode;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  rangeStart: number;
  rangeEnd: number;
  borderColor?: string;
}

function NarrativeBlock({
  children,
  scrollYProgress,
  rangeStart,
  rangeEnd,
  borderColor = "border-white/[0.06]",
}: NarrativeBlockProps) {
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0, 1]);
  const y = useTransform(scrollYProgress, [rangeStart, rangeEnd], [40, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className={`border-l ${borderColor} pl-8 py-12`}
    >
      {children}
    </motion.div>
  );
}

export default function OriginStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const accentLineScale = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="origin"
      className="relative py-16 px-6 bg-base-900/50 backdrop-blur-sm"
    >
      {/* Animated grid background */}
      <OriginBackground scrollYProgress={scrollYProgress} />

      {/* Growing accent line */}
      <motion.div
        style={{ scaleY: accentLineScale, transformOrigin: "top" }}
        className="absolute left-6 md:left-12 lg:left-[calc(50%-24rem)] top-32 bottom-32 w-[2px] bg-gradient-to-b from-accent-amber via-accent-amber/50 to-transparent hidden md:block"
      />

      <div className="max-w-3xl mx-auto">
        <ChapterLabel number="02" title="origin" />

        {/* Opening pull quote */}
        <motion.h2
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight tracking-tight text-text-primary mb-8"
        >
          Most engineers build for the happy path.
          <br />
          <span className="text-gradient-amber">
            I build for the moment everything goes wrong.
          </span>
        </motion.h2>

        {/* Identity Card — compact inline version */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="surface-terminal overflow-hidden mb-12"
        >
          <div className="flex items-center gap-3 px-6 py-3 border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono text-xs text-text-muted ml-1">
              identity.conf
            </span>
          </div>
          <div className="px-6 py-6 flex flex-wrap gap-x-10 gap-y-4">
            <div className="flex items-center gap-3">
              <span className="text-text-muted font-mono uppercase text-xs tracking-wider">
                Name
              </span>
              <span className="font-body font-semibold text-text-primary text-lg">
                Rudra Mahapatro
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-muted font-mono uppercase text-xs tracking-wider">
                Handle
              </span>
              <span className="font-body font-semibold text-accent-amber text-lg">
                VECTOR384
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-text-muted font-mono uppercase text-xs tracking-wider">
                Status
              </span>
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2.5 h-2.5 bg-accent-amber rounded-full"
                />
                <span className="font-body font-semibold text-text-primary text-lg">
                  Available
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Narrative blocks — scroll-linked reveals */}
        <div className="space-y-0">
          {/* The Why */}
          <NarrativeBlock
            scrollYProgress={scrollYProgress}
            rangeStart={0.1}
            rangeEnd={0.25}
            borderColor="border-accent-amber/40"
          >
            <h3 className="font-mono text-accent-amber text-sm uppercase tracking-widest mb-4">
              The Why
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-text-secondary font-body">
              Production goes down. Everyone scrambles. Root cause? A hardcoded
              secret. A service that buckles at 2x load. I kept seeing it
              &mdash; teams shipping tools that passed demos but crumbled under
              real traffic. I decided I&apos;d rather build the tools that
              survive the 3 AM incident than the ones that cause it.
            </p>
          </NarrativeBlock>

          {/* The Path — text flows around TechStack on desktop */}
          <NarrativeBlock
            scrollYProgress={scrollYProgress}
            rangeStart={0.25}
            rangeEnd={0.45}
          >
            <h3 className="font-mono text-accent-amber text-sm uppercase tracking-widest mb-4">
              The Path
            </h3>
            <PretextObstacleText
              text={ORIGIN_TEXTS["origin:the-path"].text}
              registryKey="origin:the-path"
              fontKey="body-xl"
              lineHeight={32}
              obstacle={{
                top: 0,
                height: 280,
                width: 280,
                side: "right",
                gap: 24,
              }}
              obstacleContent={<TechStack />}
            />
          </NarrativeBlock>

          {/* The Mission */}
          <NarrativeBlock
            scrollYProgress={scrollYProgress}
            rangeStart={0.45}
            rangeEnd={0.6}
          >
            <h3 className="font-mono text-accent-amber text-sm uppercase tracking-widest mb-4">
              The Mission
            </h3>
            <p className="text-lg md:text-xl leading-relaxed text-text-secondary font-body">
              FlashAudit scans 847K files in under a second &mdash; Gitleaks
              takes minutes. My trading engine handles SEBI-compliant execution
              with a kill switch that works. My steganography tool hides
              encrypted payloads in images so well that steganalysis tools
              can&apos;t find them. I don&apos;t build proof-of-concepts. I
              build things that work under pressure, and I can prove it.
            </p>
          </NarrativeBlock>
        </div>

        {/* Bridge statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="pt-12 text-center"
        >
          <p className="text-2xl md:text-3xl font-heading font-semibold text-gradient-amber">
            Here&apos;s what that looks like in practice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
