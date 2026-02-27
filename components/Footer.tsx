"use client";

import { GithubIcon, LinkedInIcon, EmailIcon, ShieldIcon } from "./icons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-base-900/80 backdrop-blur-xl border-t border-accent-amber/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <div className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Vector 384"
                width={160}
                height={50}
                className="h-10 w-auto mix-blend-screen"
              />
            </div>
            <p className="text-text-secondary text-lg max-w-md font-body leading-relaxed">
              Clean code. Fast delivery. From concept to deploy, I ship without drama.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-text-secondary text-sm uppercase tracking-wider font-mono">
                Available for High-Impact Contracts
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent-amber font-mono text-sm uppercase tracking-widest mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-text-secondary hover:text-accent-amber transition-colors duration-150 font-mono uppercase text-sm tracking-wider"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-text-secondary hover:text-accent-amber transition-colors duration-150 font-mono uppercase text-sm tracking-wider"
                >
                  Arsenal
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-text-secondary hover:text-accent-amber transition-colors duration-150 font-mono uppercase text-sm tracking-wider"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-text-secondary hover:text-accent-amber transition-colors duration-150 font-mono uppercase text-sm tracking-wider"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent-amber font-mono text-sm uppercase tracking-widest mb-6">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://github.com/Ruddxxy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 surface-outline rounded-lg text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="https://linkedin.com/in/rudra2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 surface-outline rounded-lg text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={20} />
              </a>
              <a
                href="https://tryhackme.com/p/Ruddyignite23"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 surface-outline rounded-lg text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
                aria-label="TryHackMe"
              >
                <ShieldIcon size={20} />
              </a>
              <a
                href="mailto:rudra@vector384.com"
                className="p-3 surface-outline rounded-lg text-text-secondary hover:text-accent-amber hover:border-accent-amber/30 transition-all duration-300"
                aria-label="Email"
              >
                <EmailIcon size={20} />
              </a>
            </div>
            <a
              href="mailto:rudra@vector384.com"
              className="text-text-secondary hover:text-accent-amber transition-colors duration-150 text-sm font-mono"
            >
              rudra@vector384.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-text-muted text-sm uppercase tracking-wider font-mono">
            &copy; 2026 Vector 384. All rights reserved.
          </span>
          <span className="text-text-muted text-sm font-mono">
            {"// compiled without warnings"}
          </span>
        </div>
      </div>
    </footer>
  );
}
