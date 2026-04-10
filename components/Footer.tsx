"use client";

import { motion } from "framer-motion";
import { GithubIcon, LinkedInIcon, EmailIcon, ShieldIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="bg-base-900/80 backdrop-blur-xl border-t border-accent-amber/10">
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        {/* Closing statement */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight text-text-primary mb-6"
        >
          Need something
          <br />
          <span className="text-gradient-amber">built right?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-text-secondary text-lg font-body mb-10 max-w-lg mx-auto"
        >
          I take on problems that are genuinely hard. If your system needs to be
          fast, secure, or unbreakable &mdash; that&apos;s where I do my best
          work.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <motion.a
            href="mailto:rudranarayanmohapatro@gmail.com"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-3 px-10 py-5 glass-card border-accent-amber/30 text-accent-amber font-mono uppercase tracking-wider text-sm hover:border-accent-amber hover:shadow-glow-amber transition-all duration-300"
          >
            <EmailIcon size={18} />
            rudranarayanmohapatro@gmail.com
          </motion.a>
        </motion.div>

        {/* Availability */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-3 h-3 bg-color-success rounded-full animate-pulse" />
          <span className="text-text-secondary text-sm uppercase tracking-wider font-mono">
            Taking on new projects
          </span>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-3 mb-16">
          <motion.a
            href="https://github.com/Ruddxxy"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 surface-outline rounded-lg text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
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
            className="p-3 surface-outline rounded-lg text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={20} />
          </motion.a>
          <motion.a
            href="https://tryhackme.com/p/Ruddyignite23"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 surface-outline rounded-lg text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
            aria-label="TryHackMe"
          >
            <ShieldIcon size={20} />
          </motion.a>
          <motion.a
            href="mailto:rudranarayanmohapatro@gmail.com"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 surface-outline rounded-lg text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
            aria-label="Email"
          >
            <EmailIcon size={20} />
          </motion.a>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-text-muted text-sm uppercase tracking-wider font-mono">
            &copy; 2026 Vector 384. All rights reserved.
          </span>
          <span className="text-text-muted text-sm font-mono">
            {"// no shortcuts, no compromises"}
          </span>
        </div>
      </div>
    </footer>
  );
}
