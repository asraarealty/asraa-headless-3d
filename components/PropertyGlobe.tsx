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
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const total = properties?.length || 0;

  const nextSlide = () => {
    if (!total) return;

    setActiveIndex((prev) =>
      prev === total - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (!total) return;

    setActiveIndex((prev) =>
      prev === 0 ? total - 1 : prev - 1
    );
  };

  useEffect(() => {
    setMounted(true);

    const checkScreen = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };

    checkScreen();

    window.addEventListener("resize", checkScreen);

    return () => {
      window.removeEventListener("resize", checkScreen);
    };
  }, []);

  useEffect(() => {
    if (!total) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [total]);

  if (!mounted || !properties?.length) return null;

  return (
    <section className="relative bg-black overflow-hidden py-12 md:py-20">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[size:38px_38px]" />

      {/* Globe glow */}
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 w-[700px] md:w-[1000px] h-[250px] md:h-[350px] rounded-full bg-blue-500/20 blur-[140px]" />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-8 top-[40%] -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full border border-amber-400 text-amber-400 text-2xl md:text-3xl flex items-center justify-center bg-black/50 backdrop-blur-md hover:scale-110 transition"
      >
        ←
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-8 top-[40%] -translate-y-1/2 z-50 w-12 h-12 md:w-16 md:h-16 rounded-full border border-amber-400 text-amber-400 text-2xl md:text-3xl flex items-center justify-center bg-black/50 backdrop-blur-md hover:scale-110 transition"
      >
        →
      </button>

      {/* Cards */}
      <div className="relative h-[420px] md:h-[580px] flex items-center justify-center z-20">
        {properties.map((property, index) => {
          let position = index - activeIndex;

          if (position < -3) position += total;
          if (position > 3) position -= total;

          if (Math.abs(position) > 3) return null;

          const translateX = isMobile
            ? position * 110
            : position * 230;

          const rotateY = position * -12;
          const scale = position === 0 ? 1.08 : 0.82;
          const opacity = position === 0 ? 1 : 0.6;
          const zIndex = 20 - Math.abs(position);

          return (
            <a
              key={property.id}
              href={`/projects/${property.slug}`}
              className="absolute w-[190px] h-[280px] md:w-[320px] md:h-[460px] rounded-[24px] overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-700 hover:scale-[1.02]"
              style={{
                transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <img
                src={
                  property.featuredImage?.node?.sourceUrl ||
                  "/masterplans/project-map.jpg"
                }
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-amber-500 text-black text-[10px] md:text-xs px-3 py-1 rounded-full font-semibold">
                  Premium
                </span>

                <h3 className="text-white text-sm md:text-2xl font-bold mt-3 leading-tight line-clamp-3">
                  {property.title}
                </h3>
              </div>
            </a>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 md:gap-3 mt-4 relative z-20">
        {properties.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-8 h-2 bg-amber-400"
                : "w-2 h-2 bg-zinc-600"
            }`}
          />
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 px-4 md:px-20 mt-12 md:mt-16 relative z-20">
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
            className="border border-zinc-800 bg-zinc-950 rounded-2xl p-5 md:p-6 flex gap-4 hover:border-amber-400 transition"
          >
            <item.icon className="text-amber-400 w-7 h-7 md:w-8 md:h-8 shrink-0" />

            <div>
              <h4 className="text-white font-semibold text-base md:text-lg">
                {item.title}
              </h4>

              <p className="text-zinc-400 text-xs md:text-sm mt-1">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
