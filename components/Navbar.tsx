"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="px-4 py-2 text-sm uppercase tracking-wider text-void font-bold border-4 border-transparent hover:border-void hover:bg-orange hover:text-void transition-all duration-150"
    >
      {children}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed z-50 top-0 left-0 right-0 transition-all duration-300"
    >
      <div
        className={`mx-auto transition-all duration-300 ${
          scrolled
            ? "mt-4 max-w-4xl bg-stark/95 backdrop-blur-sm border-4 border-void shadow-brutal mx-4 lg:mx-auto"
            : "max-w-7xl bg-stark border-b-4 border-void"
        }`}
      >
        <div className="px-6 py-3 flex items-center justify-between">
          <a href="#" className="hover:opacity-80 transition-opacity duration-150">
            <Image src="/logo.png" alt="Vector 384" width={140} height={45} className="h-10 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-2">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Arsenal</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <NavLink href="#services">Services</NavLink>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 border-4 border-void hover:bg-orange transition-colors duration-150"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="square"
                strokeLinejoin="miter"
                strokeWidth={3}
                d={mobileMenuOpen ? "M6 6L18 18M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t-4 border-void overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-2">
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  href="#about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm uppercase tracking-wider font-bold border-4 border-void hover:bg-orange"
                >
                  About
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm uppercase tracking-wider font-bold border-4 border-void hover:bg-orange"
                >
                  Arsenal
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  href="#skills"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm uppercase tracking-wider font-bold border-4 border-void hover:bg-orange"
                >
                  Skills
                </motion.a>
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm uppercase tracking-wider font-bold border-4 border-void hover:bg-orange"
                >
                  Services
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
