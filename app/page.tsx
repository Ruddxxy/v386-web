"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { MotionProvider } from "@/components/motion";

// Below-the-fold sections — defer their JS until needed.
// ssr: true keeps SEO content in the initial HTML for crawlers.
const ImpactMetrics = dynamic(() => import("@/components/ImpactMetrics"));
const Projects = dynamic(() => import("@/components/Projects"));
const OriginStory = dynamic(() => import("@/components/OriginStory"));
const Services = dynamic(() => import("@/components/Services"));
const Footer = dynamic(() => import("@/components/Footer"));

// Dossier IA: claim -> proof -> case files -> background -> terms.
// 01 identity (Hero) -> 02 evidence (ImpactMetrics) -> 03 the record (Projects)
// -> 04 origin (OriginStory) -> 05 engagement (Services) -> colophon (Footer).
// Section tops carry their own hairline rule; the old ChapterTransition
// dividers, gradient BackgroundLayer, and CursorGlow are retired.
export default function Home() {
  return (
    <MotionProvider>
      <main className="relative">
        <Navbar />
        <Hero />
        <ImpactMetrics />
        <Projects />
        <OriginStory />
        <Services />
        <Footer />
      </main>
    </MotionProvider>
  );
}
