"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-building.jpg"
          alt="Luxury Property"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Floating Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-8 z-20"
      >
        <span className="px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm uppercase tracking-[0.25em]">
          Asraa Luxury Living
        </span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-12">
        <div className="max-w-4xl">
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-orange-400 uppercase tracking-[0.35em] text-sm mb-6"
          >
            Premium Real Estate Intelligence
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
          >
            Build Wealth Through
            <br />
            Smart Property Decisions
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1 }}
            className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed"
          >
            Explore premium projects, live unit inventory, masterplans,
            investment intelligence, and curated real estate opportunities
            designed for long-term wealth creation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              href="/projects"
              className="px-8 py-4 bg-orange-500 text-black rounded-xl font-semibold hover:scale-105 transition"
            >
              Explore Projects
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition"
            >
              Book Consultation
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="absolute bottom-10 left-6 md:left-12 z-20 flex gap-10">
        <div>
          <h3 className="text-2xl font-bold">150+</h3>
          <p className="text-gray-400 text-sm">Premium Projects</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold">₹500Cr+</h3>
          <p className="text-gray-400 text-sm">Assets Mapped</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold">20K+</h3>
          <p className="text-gray-400 text-sm">Investors Guided</p>
        </div>
      </div>
    </section>
  );
}
