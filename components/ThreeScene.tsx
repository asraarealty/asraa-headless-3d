"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { memo } from "react";

type FloorProps = {
  position: [number, number, number];
};

const Floor = memo(function Floor({ position }: FloorProps) {
  return (
    <mesh position={position}>
      <boxGeometry args={[2, 0.3, 2]} />
      <meshStandardMaterial color="#f97316" />
    </mesh>
  );
});

export default function ThreeScene() {
  return (
    <Canvas
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
      camera={{
        position: [3, 5, 8],
        fov: 60,
      }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
      }}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.8} />

      {/* Directional Light */}
      <directionalLight position={[5, 5, 5]} intensity={1.2} />

      {/* Building Floors */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Floor
          key={i}
          position={[0, i * 0.35, 0]}
        />
      ))}

      {/* Controls */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={1}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
