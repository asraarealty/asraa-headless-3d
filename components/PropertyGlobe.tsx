"use client";

import { motion } from "framer-motion";

export default function PropertyGlobe({
  properties,
}: {
  properties: any[];
}) {
  return (
    <div className="relative w-full h-[800px] flex items-center justify-center overflow-hidden [perspective:1400px]">
      
      {/* EARTH CORE */}
      <div className="absolute z-20 w-52 h-52 rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-700 shadow-[0_0_100px_rgba(0,217,255,0.7)] animate-pulse" />

      {/* ORBIT RING */}
      <div className="absolute w-[650px] h-[650px] border border-white/10 rounded-full [transform:rotateX(75deg)]" />

      {/* ROTATING PROPERTY ORBIT */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative w-[650px] h-[650px]"
      >
        {properties.slice(0, 8).map((property, i) => {
          const angle = (i / 8) * Math.PI * 2;

          const x = Math.cos(angle) * 280;
          const y = Math.sin(angle) * 180;

          return (
            <motion.a
              key={property.id}
              href={`/property/${property.slug}`}
              className="absolute w-48 h-64 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl"
              style={{
                left: `calc(50% + ${x}px - 96px)`,
                top: `calc(50% + ${y}px - 128px)`,
              }}
              whileHover={{
                scale: 1.2,
                zIndex: 50,
              }}
            >
              {/* PROPERTY IMAGE */}
              <img
                src={
                  property.featuredImage?.node?.sourceUrl ||
                  "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
                }
                alt={property.title}
                className="w-full h-full object-cover"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* TEXT */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block bg-amber-500 text-black text-[10px] px-2 py-1 rounded-full font-semibold mb-2">
                  Premium
                </span>

                <h3 className="text-white text-sm font-bold leading-tight line-clamp-2">
                  {property.title}
                </h3>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
