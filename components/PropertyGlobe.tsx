"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PropertyGlobe({ properties }: any) {
  return (
    <div className="relative h-[700px] flex items-center justify-center overflow-hidden perspective-[2000px]">
      <motion.div
        animate={{ rotateY: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative w-[900px] h-[900px] preserve-3d"
      >
        {properties.map((property: any, index: number) => {
          const angle = (360 / properties.length) * index;

          return (
            <Link
              key={property.id}
              href={`/property/${property.slug}`}
              className="absolute top-1/2 left-1/2 w-[300px] h-[420px] -ml-[150px] -mt-[210px]"
              style={{
                transform: `
                  rotateY(${angle}deg)
                  translateZ(500px)
                `,
              }}
            >
              <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                <img
                  src={
                    property.featuredImage?.node?.sourceUrl ||
                    "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
                  }
                  alt={property.title}
                  className="w-full h-[420px] object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <div className="absolute bottom-0 p-6">
                  <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    Premium
                  </span>

                  <h3 className="text-xl font-bold mt-4">
                    {property.title}
                  </h3>

                  <p className="text-zinc-300 text-sm mt-2">
                    Explore Project →
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
