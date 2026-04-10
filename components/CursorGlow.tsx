"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor-following amber glow.
 *
 * A 240px radial gradient that lerps toward the cursor on every animation
 * frame. Disabled on touch devices and when prefers-reduced-motion is set.
 * Mounted once near the top of the component tree. Behind everything via
 * pointer-events-none + z-0.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Skip on touch devices — no cursor to follow
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;

    // Skip when reduced motion is requested
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const el = glowRef.current;
    if (!el) return;

    // Target position (mouse) + current position (eased)
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { x: target.x, y: target.y };
    let visible = false;
    let rafId = 0;

    function onMove(e: MouseEvent) {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!visible) {
        visible = true;
        el!.style.opacity = "1";
      }
    }

    function onLeave() {
      visible = false;
      el!.style.opacity = "0";
    }

    function tick() {
      // Lerp current toward target
      current.x += (target.x - current.x) * 0.12;
      current.y += (target.y - current.y) * 0.12;
      el!.style.transform = `translate3d(${current.x - 120}px, ${current.y - 120}px, 0)`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-[240px] h-[240px] pointer-events-none z-0 opacity-0 transition-opacity duration-500 mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(229, 165, 55, 0.08) 0%, rgba(229, 165, 55, 0.03) 35%, transparent 70%)",
      }}
    />
  );
}
