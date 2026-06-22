"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/hero-building.jpg"
          alt="Luxury Property"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
      </div>

      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-24 md:top-28 left-4 md:left-8 z-20"
      >
        <span className="px-4 md:px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[10px] md:text-sm uppercase tracking-[0.25em]">
          Asraa Luxury Living
        </span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center px-4 sm:px-6 md:px-12 pt-28 md:pt-32">
        <div className="max-w-5xl">
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-orange-400 uppercase tracking-[0.35em] text-[11px] md:text-sm mb-5"
          >
            Premium Real Estate Intelligence
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05]"
          >
            Build Wealth
            <br />
            Through Smart
            <br />
            Property Decisions
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="mt-6 md:mt-8 text-base md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Explore premium projects, live inventory, masterplans,
            investment intelligence, and curated real estate opportunities
            built for long-term wealth creation.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3 }}
            className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/projects"
              className="px-6 md:px-8 py-3 md:py-4 bg-orange-500 text-black rounded-xl font-semibold hover:scale-105 transition text-center"
            >
              Explore Projects
            </Link>

            <Link
              href="/contact"
              className="px-6 md:px-8 py-3 md:py-4 border border-white/20 rounded-xl hover:bg-white/10 transition text-center"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-6 md:bottom-10 left-4 md:left-12 z-20 flex flex-wrap gap-6 md:gap-10">
        <div>
          <h3 className="text-xl md:text-2xl font-bold">150+</h3>
          <p className="text-gray-400 text-xs md:text-sm">
            Premium Projects
          </p>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-bold">₹500Cr+</h3>
          <p className="text-gray-400 text-xs md:text-sm">
            Assets Mapped
          </p>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-bold">20K+</h3>
          <p className="text-gray-400 text-xs md:text-sm">
            Investors Guided
          </p>
        </div>
      </div>
    </section>
  );
}
