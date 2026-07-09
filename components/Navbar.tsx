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

/* Color-only hover, static amber underline for the active section — no tracking
   animation (it reflows) and no indicator dot. */
function NavLink({ href, children, active }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`relative px-3 py-2 font-mono text-caption uppercase transition-colors duration-200 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:transition-colors after:duration-200 ${
        active
          ? "text-accent-amber after:bg-accent-amber"
          : "text-text-secondary after:bg-transparent hover:text-accent-amber"
      }`}
    >
      {children}
    </a>
  );
}

const NAV = [
  { id: "evidence", label: "Evidence", href: "#evidence" },
  { id: "projects", label: "Record", href: "#projects" },
  { id: "origin", label: "Origin", href: "#origin" },
  { id: "services", label: "Engagement", href: "#services" },
  { id: "writing", label: "Writing", href: "/writing" },
];

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
    const sections = ["evidence", "projects", "origin", "services"];
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
      <nav className="fixed left-0 right-0 top-0 z-50">
        <div
          className={`transition-colors duration-200 ${
            scrolled
              ? "border-b border-hairline bg-base-950/95"
              : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3 md:px-10">
            <a
              href="#"
              className="transition-opacity duration-150 hover:opacity-80"
            >
              <Image
                src="/logo.png"
                alt="Vector 384"
                width={36}
                height={36}
                priority
                className="h-9 w-9 mix-blend-screen"
              />
            </a>

            <div className="hidden items-center gap-1 md:flex">
              {NAV.map((item) => (
                <NavLink
                  key={item.id}
                  href={item.href}
                  active={activeSection === item.id}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="surface-inset p-2 transition-colors duration-150 hover:border-accent-amber/40 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="h-5 w-5 text-text-secondary"
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
                className="overflow-hidden md:hidden"
              >
                <div className="surface-panel mx-4 mb-4 flex flex-col">
                  {NAV.map((item) => (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`data-row px-4 py-3 font-mono text-caption uppercase transition-colors duration-150 ${
                        item.id === activeSection
                          ? "border-l-2 border-accent-amber text-accent-amber"
                          : "text-text-secondary hover:text-accent-amber"
                      }`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
}
