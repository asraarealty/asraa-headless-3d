"use client";

import { useEffect, useState } from "react";
import {
  Globe,
  ShieldCheck,
  Star,
  Headphones,
} from "lucide-react";

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

  useEffect(() => {
    if (!properties?.length) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [activeIndex, properties.length]);

  if (!properties?.length) return null;

  return (
    <section className="relative bg-black overflow-hidden py-12 md:py-20">
      {/* Background Stars */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Globe Background */}
      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 w-[900px] h-[300px] rounded-full bg-blue-500/20 blur-[120px]" />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 md:left-10 top-[42%] -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full border border-amber-400 text-amber-400 text-3xl flex items-center justify-center bg-black/50 backdrop-blur-md shadow-[0_0_25px_rgba(255,176,0,0.35)] hover:scale-110 transition"
      >
        ←
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 md:right-10 top-[42%] -translate-y-1/2 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full border border-amber-400 text-amber-400 text-3xl flex items-center justify-center bg-black/50 backdrop-blur-md shadow-[0_0_25px_rgba(255,176,0,0.35)] hover:scale-110 transition"
      >
        →
      </button>

      {/* Slider */}
      <div className="relative h-[500px] md:h-[560px] flex items-center justify-center z-20">
        {properties.map((property, index) => {
          let position = index - activeIndex;

          if (position < -3) position += properties.length;
          if (position > 3) position -= properties.length;

          if (Math.abs(position) > 3) return null;

          const translateX =
            window.innerWidth < 768 ? position * 120 : position * 230;

          const rotateY = position * -14;
          const scale = position === 0 ? 1.12 : 0.82;
          const opacity = 1 - Math.abs(position) * 0.18;
          const zIndex = 20 - Math.abs(position);

          return (
            <a
              key={property.id}
              href={`/property/${property.slug}`}
              className="absolute w-[220px] h-[320px] md:w-[320px] md:h-[470px] rounded-[28px] overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-700"
              style={{
                transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
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

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-amber-500 text-black text-xs px-3 py-1 rounded-full font-semibold">
                  Premium
                </span>

                <h3 className="text-white text-lg md:text-2xl font-bold mt-3 leading-tight line-clamp-3">
                  {property.title}
                </h3>
              </div>
            </a>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-4 relative z-20">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 h-3 bg-amber-400"
                : "w-3 h-3 bg-zinc-600"
            }`}
          />
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 md:px-20 mt-14 relative z-20">
        {[
          {
            icon: Globe,
            title: "Global Reach",
            desc: "Properties across prime locations",
          },
          {
            icon: ShieldCheck,
            title: "Verified Listings",
            desc: "100% verified premium properties",
          },
          {
            icon: Star,
            title: "Best Deals",
            desc: "Exclusive offers and discounts",
          },
          {
            icon: Headphones,
            title: "Expert Support",
            desc: "Professional guidance at every step",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="border border-zinc-800 bg-zinc-950 rounded-2xl p-6 flex gap-4 hover:border-amber-400 transition"
          >
            <item.icon className="text-amber-400 w-8 h-8 shrink-0" />

            <div>
              <h4 className="text-white font-semibold text-lg">
                {item.title}
              </h4>

              <p className="text-zinc-400 text-sm mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
