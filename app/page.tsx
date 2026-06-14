"use client";

import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="bg-black text-white">
      <section className="relative h-screen overflow-hidden">

        {/* 3D Background */}
        <ThreeScene />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black z-10" />

        {/* Navbar */}
        <header className="absolute top-0 left-0 w-full z-20 px-8 md:px-20 py-6">
          <div className="flex items-center justify-between">

            <div className="text-2xl font-bold text-amber-400">
              Asraa Realty
            </div>

            <nav className="hidden md:flex gap-8 text-sm text-white">
              <a href="/">Home</a>
              <a href="/properties">Properties</a>
              <a href="/projects">Projects</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>

            <a
              href="https://wa.me/919619973211"
              className="border border-amber-400 text-amber-400 px-5 py-2 rounded-lg hover:bg-amber-400 hover:text-black transition"
            >
              Contact
            </a>

          </div>
        </header>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 z-20 max-w-4xl">

          <span className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-4">
            Premium Real Estate Advisory
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Find Luxury Homes <br />
            With Precision
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
            Verified listings, market intelligence, and AI-driven property
            matching built for smarter investments.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 flex-wrap">
            <a
              href="https://wa.me/919619973211"
              className="bg-amber-500 text-black px-7 py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
            >
              Get Premium Deals
            </a>

            <a
              href="/properties"
              className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Browse Projects
            </a>
          </div>

          {/* Trust Strip */}
          <div className="mt-8 flex gap-6 text-sm text-zinc-400 flex-wrap">
            <span>✔ Verified Listings</span>
            <span>✔ Trusted Developers</span>
            <span>✔ Expert Advisory</span>
          </div>
        </div>

        {/* Floating Search Box */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl bg-zinc-900/90 backdrop-blur-lg border border-zinc-800 rounded-2xl p-4 z-20">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              type="text"
              placeholder="Location"
              className="bg-zinc-800 p-4 rounded-xl text-white outline-none"
            />

            <select className="bg-zinc-800 p-4 rounded-xl text-white outline-none">
              <option>Property Type</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Commercial</option>
            </select>

            <select className="bg-zinc-800 p-4 rounded-xl text-white outline-none">
              <option>Budget</option>
              <option>₹50L - ₹1Cr</option>
              <option>₹1Cr - ₹2Cr</option>
              <option>₹2Cr+</option>
            </select>

            <button className="bg-amber-500 text-black rounded-xl font-semibold hover:bg-amber-600 transition">
              Search Properties
            </button>

          </div>
        </div>

      </section>
    </main>
  );
}
