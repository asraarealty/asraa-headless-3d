"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function PropertyGlobe({
  properties,
}: {
  properties: any[];
}) {
  const [active, setActive] = useState(0);

  const next = () => {
    setActive((prev) => (prev + 1) % properties.length);
  };

  const prev = () => {
    setActive((prev) =>
      prev === 0 ? properties.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden">
      {properties.slice(0, 5).map((property, index) => {
        const position = index - active;

        let translateX = position * 280;
        let scale = 1;
        let opacity = 1;
        let zIndex = 10 - Math.abs(position);

        if (position === 0) {
          scale = 1.15;
        } else {
          scale = 0.8;
          opacity = 0.5;
        }

        return (
          <motion.a
            key={property.id}
            href={`/property/${property.slug}`}
            animate={{
              x: translateX,
              scale,
              opacity,
            }}
            transition={{
              duration: 0.8,
            }}
            className="absolute w-[320px] h-[460px] rounded-3xl overflow-hidden border border-zinc-800"
            style={{ zIndex }}
          >
            <img
              src={
                property.featuredImage?.node?.sourceUrl ||
                "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
              }
              className="w-full h-full object-cover"
              alt={property.title}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            <div className="absolute bottom-8 left-6 right-6">
              <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                Premium
              </span>

              <h3 className="text-2xl font-bold mt-4">
                {property.title}
              </h3>
            </div>
          </motion.a>
        );
      })}

      {/* Left */}
      <button
        onClick={prev}
        className="absolute left-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"
      >
        ←
      </button>

      {/* Right */}
      <button
        onClick={next}
        className="absolute right-8 z-50 w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center"
      >
        →
      </button>
    </div>
  );
}
