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
    let frame: number;

    const animate = () => {
      setRotation((prev) => prev + 0.004);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!properties?.length) {
    return (
      <div className="w-full h-[700px] flex items-center justify-center text-zinc-500">
        No properties found
      </div>
    );
  }

  return (
    <div className="relative w-full h-[750px] flex items-center justify-center overflow-hidden bg-black [perspective:1800px]">

      {/* Center Globe */}
      <div className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-900 shadow-[0_0_100px_rgba(0,150,255,0.35)]" />

      {properties.map((property, index) => {
        const angle =
          (index / properties.length) * Math.PI * 2 + rotation;

        const radius = 320;

        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const y = Math.sin(angle * 2) * 50;

        const depth = (z + radius) / (radius * 2);

        const scale = 0.55 + depth * 0.7;
        const opacity = 0.35 + depth * 0.65;
        const zIndex = Math.floor(depth * 100);

        return (
          <a
            key={property.id}
            href={`/property/${property.slug}`}
            className="absolute w-[200px] h-[280px] rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-300 hover:scale-105"
            style={{
              left: `calc(50% + ${x}px - 100px)`,
              top: `calc(50% + ${y}px - 140px)`,
              zIndex,
              opacity,
              transform: `
                translateZ(${z}px)
                scale(${scale})
                rotateY(${-angle * 25}deg)
              `,
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
