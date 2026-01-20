"use client";

import { LogoGithub, LogoLinkedin, Email } from "@carbon/icons-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="min-h-screen relative">
      {/* Asymmetric Grid Background */}
      <div className="absolute inset-0 asymmetric-grid opacity-10" />

      <div className="relative min-h-screen flex">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-24 pb-12">
          <div className="max-w-3xl">
            {/* Logo Integration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-block border-4 border-void shadow-brutal bg-stark p-2">
                <Image src="/logo.png" alt="Vector 384" width={180} height={60} className="h-12 w-auto" />
              </div>
            </motion.div>

            {/* Bold Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight mb-8"
            >
              Systems &
              <br />
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-orange"
              >
                Security
              </motion.span>
              <br />
              <span className="text-void/60">-</span>Engineer
              <br />
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl md:text-2xl text-void/70 max-w-xl mb-10 leading-relaxed font-serif"
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
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange text-void font-bold uppercase tracking-wider text-sm border-4 border-void shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-150"
              >
                View The Arsenal
              </motion.a>

              <motion.a
                href="mailto:rudra@vector384.com"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-stark text-void font-bold uppercase tracking-wider text-sm border-4 border-void shadow-brutal hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all duration-150"
              >
                <Email size={20} />
                Hire Vector 384
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Stats Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:flex flex-col justify-center w-80 bg-void text-stark border-l-4 border-void px-8 py-12"
        >
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="border-b-4 border-orange pb-6"
            >
              <span className="text-orange text-sm uppercase tracking-widest font-bold">
                Experience
              </span>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="text-5xl font-bold mt-2"
              >
                3+
              </motion.div>
              <div className="text-stark/60 text-sm uppercase tracking-wider mt-1">
                Years
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="border-b-4 border-stark/20 pb-6"
            >
              <span className="text-orange text-sm uppercase tracking-widest font-bold">
                Commits
              </span>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="text-5xl font-bold mt-2"
              >
                160+
              </motion.div>
              <div className="text-stark/60 text-sm uppercase tracking-wider mt-1">
                This Year
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="border-b-4 border-stark/20 pb-6"
            >
              <span className="text-orange text-sm uppercase tracking-widest font-bold">
                Top Language
              </span>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="text-5xl font-bold mt-2"
              >
                C++/Python
              </motion.div>
              <div className="text-stark/60 text-sm uppercase tracking-wider mt-1">
                Primary
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="pb-6"
            >
              <span className="text-orange text-sm uppercase tracking-widest font-bold">
                Status
              </span>
              <div className="flex items-center gap-3 mt-3">
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500"
                />
                <span className="text-lg font-bold uppercase">Available</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="pt-6 border-t-4 border-stark/20 flex gap-4"
            >
              <motion.a
                href="https://github.com/Ruddxxy"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 border-4 border-stark hover:border-orange hover:bg-orange hover:text-void transition-all duration-150"
              >
                <LogoGithub size={20} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/rudra2"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 border-4 border-stark hover:border-orange hover:bg-orange hover:text-void transition-all duration-150"
              >
                <LogoLinkedin size={20} />
              </motion.a>
              <motion.a
                href="mailto:rudra@vector384.com"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 border-4 border-stark hover:border-orange hover:bg-orange hover:text-void transition-all duration-150"
              >
                <Email size={20} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="lg:hidden bg-void text-stark border-t-4 border-void"
      >
        <div className="grid grid-cols-3 divide-x-4 divide-stark/20">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-orange">5+</div>
            <div className="text-xs uppercase tracking-wider text-stark/60 mt-1">Years</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-orange">450+</div>
            <div className="text-xs uppercase tracking-wider text-stark/60 mt-1">Commits</div>
          </div>
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-orange">Rust</div>
            <div className="text-xs uppercase tracking-wider text-stark/60 mt-1">Primary</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
