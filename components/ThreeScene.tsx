"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Building() {
  return (
    <mesh rotation={[0.2, 0.5, 0]}>
      <boxGeometry args={[2, 5, 2]} />
      <meshStandardMaterial color="#f59e0b" />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [5, 3, 8] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />

        <Building />

        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}
