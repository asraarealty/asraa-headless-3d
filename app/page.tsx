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

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">

          <div className="mb-6">
            <span className="text-amber-400 uppercase tracking-[0.3em] text-sm font-medium">
              Premium Real Estate Advisory
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-white">
            Find Luxury Homes <br />
            With Precision
          </h1>

          <p className="mb-8 text-lg md:text-xl text-zinc-300 max-w-2xl leading-relaxed">
            Verified listings, market intelligence, and AI-driven property
            matching built for smarter investments.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="https://wa.me/919619973211?text=Hi%20I%20want%20best%20property%20deals"
              className="bg-amber-500 hover:bg-amber-600 text-black px-7 py-3 rounded-lg font-semibold transition"
            >
              Get Premium Deals
            </a>

            <a
              href="/properties"
              className="border border-zinc-400 px-7 py-3 rounded-lg hover:border-white hover:bg-white hover:text-black transition"
            >
              Browse Projects
            </a>
          </div>

          <div className="mt-8 flex gap-6 text-sm text-zinc-400 flex-wrap justify-center">
            <span>✔ Verified Listings</span>
            <span>✔ Trusted Developers</span>
            <span>✔ Expert Advisory</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-400 animate-bounce z-10">
          ↓ Explore Properties
        </div>
      </section>

      {/* PROPERTY SEARCH */}
      <section className="py-20 px-6 md:px-20 bg-zinc-950">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Search Premium Properties
        </h2>

        <div className="grid md:grid-cols-4 gap-4 max-w-6xl mx-auto">
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
            <option>₹50L - ₹1Cr</option>
            <option>₹1Cr - ₹2Cr</option>
            <option>₹2Cr+</option>
          </select>

          <button className="bg-amber-500 text-black rounded-lg font-semibold p-4 hover:bg-amber-600 transition">
            Search
          </button>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-400 transition"
            >
              <div className="h-64 bg-zinc-800"></div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Sobha Luxury Residences
                </h3>

                <p className="text-zinc-400 mb-4">Mira Road, Mumbai</p>

                <div className="flex justify-between text-sm text-zinc-400 mb-4">
                  <span>1450 sqft</span>
                  <span>Ready 2027</span>
                </div>

                <div className="flex justify-between items-center">
                  <p className="font-bold text-xl text-amber-400">
                    ₹85 Lakhs
                  </p>

                  <a
                    href="/properties"
                    className="text-sm border border-zinc-700 px-4 py-2 rounded-lg hover:border-amber-400 transition"
                  >
                    View
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY ASRAA */}
      <section className="py-20 px-6 md:px-20 bg-zinc-950">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Why Choose Asraa Realty
        </h2>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {[
            "Verified Listings",
            "AI Property Match",
            "Market Intelligence",
            "Trusted Developers",
          ].map((item) => (
            <div
              key={item}
              className="p-6 border border-zinc-800 rounded-xl"
            >
              <h3 className="font-semibold mb-2">{item}</h3>
              <p className="text-zinc-400 text-sm">
                Premium property advisory designed for serious buyers.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PROPERTY VALUATION */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Know Your Property Value
        </h2>

        <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
          Get accurate property valuation using local market intelligence and AI insights.
        </p>

        <a
          href="/property-valuation"
          className="bg-amber-500 text-black px-7 py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
        >
          Check Valuation
        </a>
      </section>

      {/* CONSULTATION FORM */}
      <section className="py-20 px-6 md:px-20 bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Get Free Property Consultation
          </h2>

          <div className="grid gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Preferred Location"
              className="p-4 rounded-lg bg-zinc-900 border border-zinc-700"
            />

            <button className="bg-green-500 hover:bg-green-600 p-4 rounded-lg font-semibold transition">
              Get Callback
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
