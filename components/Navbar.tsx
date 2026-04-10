"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ScrollProgressBar from "@/components/ScrollProgressBar";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

function NavLink({ href, children, active }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`group relative px-4 py-2 font-mono text-sm uppercase transition-all duration-300 after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:bg-accent-amber after:transition-all after:duration-300 after:-translate-x-1/2 ${
        active
          ? "text-accent-amber tracking-widest after:w-full"
          : "text-text-secondary tracking-wider hover:text-accent-amber hover:tracking-widest after:w-0 hover:after:w-full"
      }`}
    >
      {/* Active indicator dot */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent-amber transition-all duration-300 ${
          active ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        aria-hidden="true"
      />
      {children}
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY < window.innerHeight * 0.5) {
        setActiveSection("");
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const sections = ["origin", "projects", "services"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed z-50 top-0 left-0 right-0 transition-all duration-300"
      >
        <div
          className={`transition-all duration-300 ${
            scrolled
              ? "glass-nav border-b border-white/[0.06]"
              : "bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-150"
            >
              <Image
                src="/logo.png"
                alt="Vector 384"
                width={140}
                height={45}
                className="h-10 w-auto mix-blend-screen"
              />
            </a>

            <div className="hidden md:flex items-center gap-2">
              <NavLink href="#origin" active={activeSection === "origin"}>
                Origin
              </NavLink>
              <NavLink href="#projects" active={activeSection === "projects"}>
                Arsenal
              </NavLink>
              <NavLink href="#services" active={activeSection === "services"}>
                Services
              </NavLink>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden glass-card p-2 rounded-lg hover:border-accent-amber/30 transition-colors duration-150"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d={
                    mobileMenuOpen
                      ? "M6 6L18 18M6 18L18 6"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
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
                className="md:hidden overflow-hidden"
              >
                <div className="glass-card-elevated mx-4 mb-4 flex flex-col p-4 gap-1">
                  {[
                    { id: "origin", label: "Origin" },
                    { id: "projects", label: "Arsenal" },
                    { id: "services", label: "Services" },
                  ].map((section, i) => (
                    <motion.a
                      key={section.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      href={`#${section.id}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 font-mono text-sm uppercase tracking-wider rounded-lg transition-all duration-150 ${
                        section.id === activeSection
                          ? "text-accent-amber bg-white/[0.03] border-l-2 border-accent-amber"
                          : "text-text-secondary hover:text-accent-amber hover:bg-white/[0.03]"
                      }`}
                    >
                      {section.label}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}
