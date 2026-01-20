"use client";

import { LogoGithub, LogoLinkedin, Email, Security } from "@carbon/icons-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-void text-stark border-t-4 border-orange">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <div className="inline-block border-4 border-stark p-2 mb-6">
              <Image src="/logo.png" alt="Vector 384" width={160} height={50} className="h-10 w-auto" />
            </div>
            <p className="text-stark/60 text-lg max-w-md font-serif leading-relaxed">
              Clean code. Fast delivery. From concept to deploy, I ship without drama.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-stark/70 text-sm uppercase tracking-wider font-bold">
                Available for High-Impact Contracts
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold text-orange mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#about"
                  className="text-stark/70 hover:text-orange transition-colors duration-150 uppercase text-sm tracking-wider"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-stark/70 hover:text-orange transition-colors duration-150 uppercase text-sm tracking-wider"
                >
                  Arsenal
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-stark/70 hover:text-orange transition-colors duration-150 uppercase text-sm tracking-wider"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-stark/70 hover:text-orange transition-colors duration-150 uppercase text-sm tracking-wider"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm uppercase tracking-widest font-bold text-orange mb-6">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="https://github.com/Ruddxxy"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-4 border-stark/30 hover:border-orange hover:bg-orange hover:text-void transition-all duration-150"
              >
                <LogoGithub size={20} />
              </a>
              <a
                href="https://linkedin.com/in/rudra2"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-4 border-stark/30 hover:border-orange hover:bg-orange hover:text-void transition-all duration-150"
              >
                <LogoLinkedin size={20} />
              </a>
              <a
                href="https://tryhackme.com/p/Ruddyignite23"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border-4 border-stark/30 hover:border-orange hover:bg-orange hover:text-void transition-all duration-150"
              >
                <Security size={20} />
              </a>
              <a
                href="mailto:rudra@vector384.com"
                className="p-3 border-4 border-stark/30 hover:border-orange hover:bg-orange hover:text-void transition-all duration-150"
              >
                <Email size={20} />
              </a>
            </div>
            <a
              href="mailto:rudra@vector384.com"
              className="text-stark/70 hover:text-orange transition-colors duration-150 text-sm"
            >
              rudra@vector384.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t-4 border-stark/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-stark/40 text-sm uppercase tracking-wider">
            &copy; 2024 Vector 384. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange" />
            <span className="text-stark/40 text-sm uppercase tracking-wider">
              Built with precision
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
