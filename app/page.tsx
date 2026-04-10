"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BackgroundLayer from "@/components/BackgroundLayer";
import CursorGlow from "@/components/CursorGlow";
import ChapterTransition from "@/components/ChapterTransition";
import { useSplash } from "@/components/SplashProvider";

// Below-the-fold sections — defer their JS until needed.
// ssr: true keeps SEO content in the initial HTML for crawlers.
const OriginStory = dynamic(() => import("@/components/OriginStory"));
const Projects = dynamic(() => import("@/components/Projects"));
const ImpactMetrics = dynamic(() => import("@/components/ImpactMetrics"));
const Services = dynamic(() => import("@/components/Services"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  const { splashComplete } = useSplash();

  if (!splashComplete) return null;

  return (
    <main className="relative">
      <BackgroundLayer />
      <CursorGlow />
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
