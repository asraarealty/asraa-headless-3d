"use client";

import { motion } from "framer-motion";

const developers = [
  "Godrej Properties",
  "Lodha Group",
  "Runwal",
  "Shapoorji Pallonji",
  "Danube",
  "Mayfair",
  "Kalpataru",
  "Rustomjee",
];

export default function DeveloperSlider() {
  return (
    <div className="overflow-hidden py-12 border-y border-zinc-800 bg-zinc-950">
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
      >
        {[...developers, ...developers].map((developer, index) => (
          <div
            key={index}
            className="min-w-[260px] px-8 py-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-400 transition"
          >
            <h3 className="text-xl font-semibold text-white">
              {developer}
            </h3>

            <p className="text-zinc-400 text-sm mt-2">
              Premium Developer
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
