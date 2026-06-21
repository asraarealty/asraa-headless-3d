"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";

const amenities = [
  {
    id: 1,
    title: "Clubhouse",
    position: [5, 2, 4],
  },
  {
    id: 2,
    title: "Swimming Pool",
    position: [-4, 2, 1],
  },
  {
    id: 3,
    title: "Gym",
    position: [2, 2, -3],
  },
  {
    id: 4,
    title: "Garden",
    position: [-6, 2, -4],
  },
];

function BuildingBlock({
  position,
}: {
  position: [number, number, number];
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={[4, 8, 4]} />
      <meshStandardMaterial color="#cfcfcf" />
    </mesh>
  );
}o


function AmenityPin({
  title,
  position,
}: {
  title: string;
  position: [number, number, number];
}) {
  return (
    <Html position={position} center>
      <div className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-semibold shadow-xl cursor-pointer">
        {title}
      </div>
    </Html>
  );
}

export default function MasterPlanViewer() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Sidebar */}
      <div className="absolute top-10 left-10 z-30 w-[320px] bg-black/70 backdrop-blur-xl rounded-2xl border border-white/10 p-5">
        <h2 className="text-white text-2xl font-bold mb-4">
          Project Amenities
        </h2>

        <div className="space-y-4">
          {amenities.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>

      {/* 3D Scene */}
      <Canvas camera={{ position: [12, 12, 16], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 10]} intensity={2} />
        <Environment preset="city" />

        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Buildings */}
        <BuildingBlock position={[0, 4, 0]} />
        <BuildingBlock position={[6, 4, 2]} />
        <BuildingBlock position={[-6, 4, -2]} />
        <BuildingBlock position={[2, 4, -6]} />
        <BuildingBlock position={[-4, 4, 5]} />

        {/* Amenity Pins */}
        {amenities.map((item) => (
          <AmenityPin
            key={item.id}
            title={item.title}
            position={item.position as [number, number, number]}
          />
        ))}

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
        />
      </Canvas>

      {/* Bottom thumbnails */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="w-24 h-16 rounded-xl bg-zinc-800 border border-white/10"
          />
        ))}
      </div>
    </section>
  );
}
