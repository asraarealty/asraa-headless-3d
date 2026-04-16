"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Floor({ position }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[2, 0.3, 2]} />
      <meshStandardMaterial color="#f97316" />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
      }}
      camera={{ position: [3, 5, 8], fov: 60 }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {[...Array(8)].map((_, i) => (
        <Floor key={i} position={[0, i * 0.35, 0]} />
      ))}

      <OrbitControls autoRotate />
    </Canvas>
  );
}
