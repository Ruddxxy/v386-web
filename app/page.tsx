"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OriginStory from "@/components/OriginStory";
import Projects from "@/components/Projects";
import ImpactMetrics from "@/components/ImpactMetrics";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import ChapterTransition from "@/components/ChapterTransition";
import { useSplash } from "@/components/SplashProvider";

function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Warm amber gradient — top-left */}
      <div className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(229,165,55,0.04)_0%,_transparent_70%)]" />
      {/* Cool cyan gradient — bottom-right */}
      <div className="absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(63,189,212,0.025)_0%,_transparent_70%)]" />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      {/* Noise texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.015] pointer-events-none">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

export default function Home() {
  const { splashComplete } = useSplash();

  if (!splashComplete) return null;

  return (
    <main className="relative">
      <BackgroundLayer />
      <Navbar />
      <Hero />
      <OriginStory />
      <ChapterTransition tint="amber" />
      <Projects />
      <ImpactMetrics />
      <ChapterTransition tint="cyan" />
      <Services />
      <Footer />
    </main>
  );
}
