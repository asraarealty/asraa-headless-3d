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
  setRotation((prev) => prev + 0.0025);
}, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[750px] flex items-center justify-center overflow-hidden bg-black perspective-[1400px]">
      
      {/* Center Earth */}
      <div className="absolute w-44 h-44 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-800 shadow-[0_0_120px_rgba(0,150,255,0.6)] animate-pulse" />

      {properties.map((property, index) => {
        const activeIndex = Math.floor(
          (rotation * 10) % properties.length
        );

        const angle =
          ((index - activeIndex) / properties.length) *
          Math.PI *
          2;

        const radius = 280;

        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius + radius;

        const y = Math.sin(angle * 2) * 40;

        const scale = 0.45 + (z / (radius * 2)) * 1.2;

        const opacity = 0.25 + (z / (radius * 2)) * 0.75;

        const zIndex = Math.floor(scale * 100);

        return (
          <a
            key={property.id}
            href={`/property/${property.slug}`}
            className="absolute w-[190px] h-[260px] rounded-2xl overflow-hidden border border-zinc-800 shadow-xl transition-all duration-500"
            style={{
              left: `calc(50% + ${x}px - 95px)`,
              top: `calc(50% + ${y}px - 130px)`,
              zIndex,
              transform: `
                scale(${scale})
                rotateY(${angle * 25}deg)
              `,
              opacity,
            }}
          >
            {/* Property Image */}
            <img
              src={
                property.featuredImage?.node?.sourceUrl ||
                "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
              }
              alt={property.title}
              className="w-full h-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            {/* Content */}
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
