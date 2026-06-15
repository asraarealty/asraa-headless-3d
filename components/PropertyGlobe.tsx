"use client";

import { motion } from "framer-motion";

export default function PropertyGlobe({
  properties,
}: {
  properties: any[];
}) {
  return (
    <div className="relative w-full h-[650px] flex items-center justify-center overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}
        className="relative w-[600px] h-[600px]"
      >
        {properties.slice(0, 8).map((property, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 220;
          const y = Math.sin(angle) * 220;

          return (
            <motion.a
              key={property.id}
              href={`/property/${property.slug}`}
              className="absolute w-56 h-72 rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900"
              style={{
                left: `calc(50% + ${x}px - 112px)`,
                top: `calc(50% + ${y}px - 144px)`,
              }}
              whileHover={{
                scale: 1.1,
                zIndex: 50,
              }}
            >
              <div className="h-full bg-zinc-800 flex items-end p-5">
                <div>
                  <span className="bg-amber-500 text-black px-3 py-1 rounded-full text-xs">
                    New Launch
                  </span>

                  <h3 className="text-white text-lg font-bold mt-3">
                    {property.title}
                  </h3>
                </div>
              </div>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
