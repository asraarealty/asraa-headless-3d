"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Html,
  useGLTF,
} from "@react-three/drei";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

export default function FloorViewer({
  modelUrl,
}: {
  modelUrl?: string | null;
}) {
  // Safe fallback (prevents crash)
  if (!modelUrl) {
    return (
      <div className="w-full h-[600px] rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
        3D Model not available
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
      <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        {/* Lights */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        <Suspense
          fallback={
            <Html center>
              <div className="text-white text-sm">Loading 3D Model...</div>
            </Html>
          }
        >
          <Model url={modelUrl} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          autoRotate={false}
        />
      </Canvas>
    </div>
  );
}
