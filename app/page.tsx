"use client";

import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="bg-black text-white">

      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden">
        <ThreeScene />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 bg-black/30">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect Property
          </h1>

          <p className="mb-6 text-lg text-gray-300 max-w-2xl">
            AI-powered property matching. Verified listings. Smart investments.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="https://wa.me/919619973211?text=Hi%20I%20want%20best%20property%20deals"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
            >
              Get Deals on WhatsApp
            </a>

            <a
              href="/properties"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Browse Properties
            </a>
          </div>
        </div>
      </section>

      {/* PROPERTY SEARCH */}
      <section className="py-16 px-6 md:px-20 bg-zinc-950">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Search Properties
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Location"
            className="p-4 rounded-lg bg-zinc-900 border border-zinc-700"
          />

          <select className="p-4 rounded-lg bg-zinc-900 border border-zinc-700">
            <option>Property Type</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Commercial</option>
          </select>

          <select className="p-4 rounded-lg bg-zinc-900 border border-zinc-700">
            <option>Budget</option>
            <option>50L - 1Cr</option>
            <option>1Cr - 2Cr</option>
            <option>2Cr+</option>
          </select>

          <button className="bg-white text-black rounded-lg font-semibold">
            Search
          </button>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 rounded-xl p-4 border border-zinc-800"
            >
              <div className="h-48 bg-zinc-800 rounded-lg mb-4"></div>
              <h3 className="text-xl font-semibold">Luxury Apartment</h3>
              <p className="text-gray-400">Mira Road</p>
              <p className="mt-2 font-bold">₹85 Lakhs</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROPERTY VALUATION */}
      <section className="py-16 px-6 md:px-20 bg-zinc-950 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Know Your Property Value
        </h2>

        <p className="text-gray-400 mb-6">
          Get AI-powered instant valuation for your property.
        </p>

        <a
          href="/property-valuation"
          className="bg-white text-black px-6 py-3 rounded-lg"
        >
          Check Valuation
        </a>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Why Choose Asraa Realty
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div>
            <h3 className="font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-400">No fake inventory.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">AI Property Match</h3>
            <p className="text-gray-400">Personalized recommendations.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-400">Guided buying process.</p>
          </div>
        </div>
      </section>

    </main>
  );
}
