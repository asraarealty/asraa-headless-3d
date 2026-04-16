"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function ThreeScene() {
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full">
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} />

      {/* Building */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1, 3, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      <OrbitControls autoRotate />
    </Canvas>
  );
}
