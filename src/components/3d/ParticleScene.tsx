"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points } from "@react-three/drei";
import * as THREE from "three";

function ParticleEnvironment() {
  const ref = useRef<THREE.Points>(null);
  
  // Use lazy useState to ensure this is only calculated once upon mount on the client.
  // This avoids all SSR hydration issues and bypasses the ESLint purity rule for Math.random.
  const [positions] = useState(() => {
    const count = 2000;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 2 + Math.random() * 4;
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      const targetX = (state.pointer.x * Math.PI) / 10;
      const targetY = (state.pointer.y * Math.PI) / 10;
      
      ref.current.rotation.x += 0.05 * (targetY - ref.current.rotation.x);
      ref.current.rotation.y += 0.05 * (targetX - ref.current.rotation.y);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Drei's Points automatically handles BufferGeometry creation from positions */}
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <pointsMaterial
          size={0.015} // Elegant, thin particles
          color="#ffffff"
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ParticleScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ParticleEnvironment />
    </Canvas>
  );
}
