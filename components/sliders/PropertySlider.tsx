"use client";

import { useRef } from "react";
import Link from "next/link";

interface PropertySliderProps {
  properties: {
    id: string;
    title: string;
    slug: string;
    featuredImage?: {
      node?: {
        sourceUrl?: string;
      };
    };
  }[];
}

export default function PropertySlider({
  properties,
}: PropertySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -400,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 400,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-amber-400 uppercase tracking-[0.2em] text-sm">
            Exclusive Collection
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-3">
            Featured Properties
          </h2>
        </div>

        {/* Arrows */}
        <div className="flex gap-3">
          <button
            onClick={scrollLeft}
            className="w-12 h-12 rounded-full border border-zinc-700 hover:border-amber-400 hover:text-amber-400 transition"
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            className="w-12 h-12 rounded-full border border-zinc-700 hover:border-amber-400 hover:text-amber-400 transition"
          >
            →
          </button>
        </div>
      </div>

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-4"
      >
        {properties.map((property) => (
          <div
            key={property.id}
            className="min-w-[320px] md:min-w-[380px] bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-amber-400 transition duration-500 snap-start group"
          >
            {/* Property Image */}
            <div className="overflow-hidden">
              <img
                src={
                  property.featuredImage?.node?.sourceUrl ||
                  "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
                }
                alt={property.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4 line-clamp-2">
                {property.title}
              </h3>

              <Link
                href={`/property/${property.slug}`}
                className="text-amber-400 font-medium hover:translate-x-2 inline-block transition"
              >
                View Property →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
