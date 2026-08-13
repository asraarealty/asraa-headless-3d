"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return null;
  }

  const next = () => setActive((prev) => (prev + 1) % images.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24">
      <h2 className="text-3xl md:text-5xl font-light mb-10 md:mb-14 tracking-tight">
        Gallery
      </h2>

      <div className="relative rounded-3xl overflow-hidden bg-zinc-900 aspect-[16/9]">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={images[active]}
            alt={`${title} - ${active + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition"
            >
              <ChevronRight size={20} />
            </button>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  aria-label={`Go to image ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === active ? "w-8 bg-amber-400" : "w-1.5 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-5 overflow-x-auto scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`shrink-0 rounded-xl overflow-hidden border-2 transition ${
                index === active
                  ? "border-amber-400"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${index + 1}`}
                className="w-24 h-16 md:w-32 md:h-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
