"use client";

import { motion } from "framer-motion";

interface ProjectHeroProps {
  title: string;
  location: string;
  price: string;
  image: string;
}

export default function ProjectHero({
  title,
  location,
  price,
  image,
}: ProjectHeroProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <motion.img
        src={image}
        alt={title}
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />

      <div className="relative z-10 flex items-end min-h-screen px-6 md:px-16 lg:px-24 pb-24 md:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <p className="uppercase tracking-[0.4em] text-orange-400 text-xs md:text-sm mb-6 font-medium">
            {location}
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] tracking-tight text-white">
            {title}
          </h1>

          <p className="mt-8 text-2xl md:text-3xl text-white/90 font-light">
            {price}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-white/30"
        />
      </motion.div>
    </section>
  );
}
