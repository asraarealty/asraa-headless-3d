"use client";

import { useEffect, useState } from "react";

interface Property {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
}

export default function PropertyGlobe({
  properties,
}: {
  properties: Property[];
}) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.01);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[700px] flex items-center justify-center overflow-hidden bg-black perspective-[1200px]">
      
      {/* Earth Core */}
      <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 shadow-[0_0_120px_rgba(0,150,255,0.6)] animate-pulse" />

      {/* Orbit Cards */}
      {properties.map((property, index) => {
        const angle =
          (index / properties.length) * Math.PI * 2 + rotation;

        const radius = 260;

        // Sphere positioning
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;

        // Depth simulation
        const scale =
          0.55 + ((z + radius) / (radius * 2)) * 0.9;

        const opacity =
          0.3 + ((z + radius) / (radius * 2)) * 0.7;

        const y = Math.sin(angle * 2) * 50;

        const zIndex = Math.floor(scale * 100);

        return (
          <a
            key={property.id}
            href={`/property/${property.slug}`}
            className="absolute w-[180px] h-[240px] rounded-2xl overflow-hidden border border-zinc-800 shadow-xl transition-all duration-500"
            style={{
              left: `calc(50% + ${x}px - 90px)`,
              top: `calc(50% + ${y}px - 120px)`,
              zIndex,
              transform: `
                scale(${scale})
                rotateY(${angle * 40}deg)
              `,
              opacity,
            }}
          >
            <img
              src={
                property.featuredImage?.node?.sourceUrl ||
                "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
              }
              alt={property.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4">
              <span className="bg-amber-500 text-black text-[10px] px-2 py-1 rounded-full font-semibold">
                Premium
              </span>

              <h3 className="text-white text-sm font-bold mt-2 line-clamp-2">
                {property.title}
              </h3>
            </div>
          </a>
        );
      })}
    </div>
  );
}
