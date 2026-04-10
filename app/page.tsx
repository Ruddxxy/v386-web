"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OriginStory from "@/components/OriginStory";
import Projects from "@/components/Projects";
import ImpactMetrics from "@/components/ImpactMetrics";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import ChapterTransition from "@/components/ChapterTransition";
import BackgroundLayer from "@/components/BackgroundLayer";
import CursorGlow from "@/components/CursorGlow";
import { useSplash } from "@/components/SplashProvider";

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
