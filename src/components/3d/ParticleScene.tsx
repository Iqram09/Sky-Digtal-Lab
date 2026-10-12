"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";

function ParticleEnvironment({ still }: { still: boolean }) {
  const ref = useRef<THREE.Points>(null);

  // Lazy useState so positions are generated once, on the client only.
  const [positions] = useState(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2 + Math.random() * 4;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (still || !ref.current) return;
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;

    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;

    ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
    ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <pointsMaterial
          size={0.016}
          color="#c9c7ba"
          transparent
          opacity={0.45}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ParticleScene({ still = false }: { still?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.75]}
      frameloop={still ? "demand" : "always"}
    >
      <ParticleEnvironment still={still} />
    </Canvas>
  );
}
