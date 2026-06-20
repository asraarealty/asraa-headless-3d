"use client";

import { Canvas } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";

function FloatingOrb({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3}>
      <Sphere args={[1.5, 64, 64]} position={position}>
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.8}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />

        <FloatingOrb position={[-3, 2, 0]} />
        <FloatingOrb position={[3, -2, 0]} />
        <FloatingOrb position={[0, 0, -2]} />
      </Canvas>
    </div>
  );
}
