"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Hero scene — vanilla three.js, no React Three Fiber.
 *
 * Why vanilla over R3F: this scene has zero React-driven interactivity
 * (no props -> scene mutations, no events, no state). R3F adds a custom
 * reconciler that conflicts with Next.js 16 + Turbopack's React internals
 * resolution. Vanilla three.js inside a single useEffect is smaller,
 * faster to mount, and not coupled to any third-party reconciler.
 *
 * Contents:
 *   - Slowly rotating wireframe icosahedron (the "system" shape)
 *   - Drifting 280-particle field (70% amber, 30% cyan)
 *
 * Lifecycle:
 *   - Mount: build scene, attach renderer to container, start RAF loop
 *   - Resize: ResizeObserver updates camera aspect + renderer size
 *   - Visibility: pause RAF when tab hidden to save battery
 *   - Unmount: cancel RAF, dispose geometry/material/renderer, detach DOM
 */

const PARTICLE_COUNT = 280;
const PARTICLE_RADIUS = 6;
const AMBER = new THREE.Color("#E5A537");
const CYAN = new THREE.Color("#3FBDD4");

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ─── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    const initialWidth = container.clientWidth;
    const initialHeight = container.clientHeight;
    renderer.setSize(initialWidth, initialHeight, false);
    container.appendChild(renderer.domElement);

    // ─── Scene + Camera ───────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      initialWidth / initialHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 8);

    // ─── Wireframe icosahedron ────────────────────────────────
    const wireframeGeometry = new THREE.IcosahedronGeometry(2.2, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: AMBER,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    scene.add(wireframe);

    // ─── Particle field ───────────────────────────────────────
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Uniform distribution inside a sphere via cube-root weighting
      const r = PARTICLE_RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const c = Math.random() < 0.7 ? AMBER : CYAN;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    particleGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3),
    );

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // ─── Animation loop ───────────────────────────────────────
    const clock = new THREE.Clock();
    let rafId = 0;
    let isVisible = !document.hidden;

    function tick() {
      const delta = clock.getDelta();

      wireframe.rotation.x += delta * 0.05;
      wireframe.rotation.y += delta * 0.08;

      particles.rotation.y += delta * 0.02;
      particles.rotation.x += delta * 0.008;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    }

    function startLoop() {
      if (rafId) return;
      clock.start();
      rafId = requestAnimationFrame(tick);
    }

    function stopLoop() {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    }

    if (isVisible) startLoop();

    // ─── Visibility handling — save battery when tab hidden ───
    function onVisibilityChange() {
      isVisible = !document.hidden;
      if (isVisible) {
        startLoop();
      } else {
        stopLoop();
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    // ─── Resize handling ──────────────────────────────────────
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width === 0 || height === 0) continue;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    });
    resizeObserver.observe(container);

    // ─── Cleanup ──────────────────────────────────────────────
    return () => {
      stopLoop();
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);

      scene.remove(wireframe);
      scene.remove(particles);

      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0"
      style={{ pointerEvents: "none" }}
    />
  );
}
