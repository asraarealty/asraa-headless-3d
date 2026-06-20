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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!properties?.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === properties.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [properties]);

  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev === properties.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? properties.length - 1 : prev - 1
    );
  };

  if (!properties?.length) {
    return (
      <div className="w-full h-[700px] flex items-center justify-center text-zinc-500">
        No properties found
      </div>
    );
  }

  return (
    <div className="relative w-full h-[850px] flex items-center justify-center overflow-hidden bg-black">
      
      {/* Background Glow */}
      <div className="absolute w-[700px] h-[250px] rounded-full bg-blue-600/20 blur-3xl bottom-24" />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-8 z-50 w-16 h-16 rounded-full border border-amber-400 text-amber-400 text-3xl hover:bg-amber-400 hover:text-black transition"
      >
        ←
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-8 z-50 w-16 h-16 rounded-full border border-amber-400 text-amber-400 text-3xl hover:bg-amber-400 hover:text-black transition"
      >
        →
      </button>

      {/* Cards */}
      <div className="relative w-full max-w-[1400px] h-[600px] flex items-center justify-center">
        {properties.map((property, index) => {
          const position = index - activeIndex;

          let translateX = position * 180;
          let scale = 0.75;
          let opacity = 0.4;
          let zIndex = 1;

          if (position === 0) {
            translateX = 0;
            scale = 1;
            opacity = 1;
            zIndex = 20;
          }

          if (Math.abs(position) === 1) {
            scale = 0.85;
            opacity = 0.75;
            zIndex = 10;
          }

          if (Math.abs(position) > 3) {
            opacity = 0;
          }

          return (
            <a
              key={property.id}
              href={`/property/${property.slug}`}
              className="absolute w-[300px] h-[430px] rounded-[30px] overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-700"
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                opacity,
                zIndex,
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

              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-amber-500 text-black text-xs px-3 py-1 rounded-full font-semibold">
                  Premium
                </span>

                <h3 className="text-white text-xl font-bold mt-4 line-clamp-3">
                  {property.title}
                </h3>
              </div>
            </a>
          );
        })}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-14 flex gap-3">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              activeIndex === index
                ? "bg-amber-400 w-8"
                : "bg-zinc-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
