"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

export default function FloorViewer({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-zinc-900">
      <Canvas camera={{ position: [0, 5, 10] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />
        <Model url={modelUrl} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
