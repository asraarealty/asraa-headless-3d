"use client";

import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <div className="absolute inset-0 z-20 flex items-center px-8 md:px-20">
      <div className="max-w-4xl">

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-amber-400 uppercase tracking-[0.3em] text-sm"
        >
          Premium Real Estate Advisory
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-8xl font-bold mt-6 leading-tight"
        >
          Build Wealth
          <br />
          Through Real Estate
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-zinc-300 mt-6 max-w-2xl text-lg"
        >
          Discover premium homes, commercial spaces, and investment
          opportunities with verified market intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="mt-8 flex gap-4 flex-wrap"
        >
          <a
            href="/properties"
            className="bg-amber-500 text-black px-7 py-3 rounded-xl font-semibold hover:bg-amber-600 transition"
          >
            Explore Properties
          </a>

          <a
            href="/valuation"
            className="border border-white px-7 py-3 rounded-xl hover:bg-white hover:text-black transition"
          >
            Free Valuation
          </a>
        </motion.div>

      </div>
    </div>
  );
}
