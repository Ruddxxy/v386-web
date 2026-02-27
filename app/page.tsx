import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

function BackgroundLayer() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Warm amber gradient — top-left */}
      <div className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.05)_0%,_transparent_70%)]" />
      {/* Cool cyan gradient — bottom-right */}
      <div className="absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(6,182,212,0.03)_0%,_transparent_70%)]" />
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

function SectionDivider({ tint = "amber" }: { tint?: "amber" | "white" | "cyan" }) {
  const via =
    tint === "amber"
      ? "via-accent-amber/20"
      : tint === "cyan"
        ? "via-accent-cyan/20"
        : "via-white/10";

  return (
    <div className={`h-px bg-gradient-to-r from-transparent ${via} to-transparent`} />
  );
}

export default function Home() {
  return (
    <main className="relative">
      <BackgroundLayer />
      <Navbar />
      <Hero />
      <About />
      <SectionDivider tint="amber" />
      <Projects />
      <SectionDivider tint="white" />
      <Skills />
      <SectionDivider tint="cyan" />
      <Services />
      <Footer />
    </main>
  );
}
