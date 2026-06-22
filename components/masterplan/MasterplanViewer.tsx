"use client";

import { useState } from "react";
import {
  Building2,
  Dumbbell,
  Trees,
  Car,
  ShoppingBag,
  Waves,
} from "lucide-react";

const amenities = [
  {
    id: 1,
    title: "Clubhouse",
    description:
      "Luxury clubhouse with indoor lounge, business center and social spaces.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
    icon: Building2,
    x: "42%",
    y: "38%",
  },
  {
    id: 2,
    title: "Fitness Center",
    description:
      "Modern gym and wellness studio designed for active living.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80",
    icon: Dumbbell,
    x: "63%",
    y: "45%",
  },
  {
    id: 3,
    title: "Landscaped Garden",
    description:
      "Private green zones, meditation lawns and walking tracks.",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80",
    icon: Trees,
    x: "54%",
    y: "60%",
  },
  {
    id: 4,
    title: "Parking Zone",
    description:
      "Multi-level secure parking with EV charging stations.",
    image:
      "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1200&q=80",
    icon: Car,
    x: "28%",
    y: "72%",
  },
  {
    id: 5,
    title: "Retail Plaza",
    description:
      "Daily essentials, cafes and convenience shopping within walking distance.",
    image:
      "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=1200&q=80",
    icon: ShoppingBag,
    x: "77%",
    y: "56%",
  },
  {
    id: 6,
    title: "Swimming Pool",
    description:
      "Resort-style infinity pool with private deck and lounge seating.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
    icon: Waves,
    x: "49%",
    y: "48%",
  },
];

export default function MasterplanViewer() {
  const [activeAmenity, setActiveAmenity] = useState(amenities[0]);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Masterplan Background */}
      <img
        src="/masterplans/project-map.jpg"
        alt="Masterplan"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Left Panel */}
      <div className="absolute left-6 top-24 z-30 w-[360px] bg-black/55 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-3xl font-bold">Amenities</h2>
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          {amenities.map((amenity) => (
            <button
              key={amenity.id}
              onClick={() => setActiveAmenity(amenity)}
              className={`w-full text-left flex gap-4 p-4 border-b border-white/5 transition ${
                activeAmenity.id === amenity.id
                  ? "bg-white/10"
                  : "hover:bg-white/5"
              }`}
            >
              <img
                src={amenity.image}
                alt={amenity.title}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div>
                <h3 className="font-semibold text-lg">{amenity.title}</h3>
                <p className="text-sm text-zinc-300 line-clamp-3 mt-1">
                  {amenity.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Hotspots */}
      {amenities.map((amenity) => (
        <button
          key={amenity.id}
          onClick={() => setActiveAmenity(amenity)}
          className={`absolute z-20 w-12 h-12 rounded-full flex items-center justify-center border transition ${
            activeAmenity.id === amenity.id
              ? "bg-amber-500 border-white scale-125"
              : "bg-black/70 border-white/30"
          }`}
          style={{
            left: amenity.x,
            top: amenity.y,
          }}
        >
          <amenity.icon className="w-5 h-5 text-white" />
        </button>
      ))}

      {/* Active Amenity Preview */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-[90%] max-w-6xl bg-black/55 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
        <div className="grid md:grid-cols-2">
          <img
            src={activeAmenity.image}
            alt={activeAmenity.title}
            className="w-full h-[260px] object-cover"
          />

          <div className="p-8 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4">
              {activeAmenity.title}
            </h2>

            <p className="text-zinc-300 leading-relaxed mb-6">
              {activeAmenity.description}
            </p>

            <button className="w-fit px-6 py-3 rounded-xl bg-amber-500 text-black font-semibold">
              Explore More
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Thumbnails */}
      <div className="absolute bottom-0 left-0 w-full z-30 px-6 pb-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {amenities.map((amenity) => (
            <button
              key={amenity.id}
              onClick={() => setActiveAmenity(amenity)}
              className={`min-w-[160px] h-[100px] rounded-xl overflow-hidden border transition ${
                activeAmenity.id === amenity.id
                  ? "border-amber-500"
                  : "border-white/10"
              }`}
            >
              <img
                src={amenity.image}
                alt={amenity.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
