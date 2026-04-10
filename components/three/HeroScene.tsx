"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero scene — minimal R3F:
 *  - Slowly rotating wireframe icosahedron (the "system" shape)
 *  - Drifting particle field of ~280 points (amber + cyan tinted)
 *
 * No postprocessing, no shadows, single mesh + single Points geometry.
 * frameloop="always" so it animates continuously even without interaction.
 */

const PARTICLE_COUNT = 280;
const PARTICLE_RADIUS = 6;
const AMBER = new THREE.Color("#E5A537");
const CYAN = new THREE.Color("#3FBDD4");

function Wireframe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.08;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshBasicMaterial color={AMBER} wireframe transparent opacity={0.18} />
    </mesh>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate stable positions + colors once
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random spherical distribution
      const r = PARTICLE_RADIUS * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      // 70% amber, 30% cyan
      const c = Math.random() < 0.7 ? AMBER : CYAN;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    return { positions, colors };
  }, []);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.02;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      frameloop="always"
    >
      <ambientLight intensity={0.4} />
      <Wireframe />
      <ParticleField />
    </Canvas>
  );
}
