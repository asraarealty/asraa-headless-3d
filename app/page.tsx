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

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10 bg-black/40">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 leading-tight">
            Buy Smart. <br />
            Invest Better.
          </h1>

          <p className="mb-6 text-lg md:text-xl text-gray-300 max-w-2xl">
            Discover verified homes and investment opportunities with AI precision.
          </p>

          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="https://wa.me/919619973211?text=Hi%20I%20want%20best%20property%20deals"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold"
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

          <div className="mt-6 flex gap-4 text-sm text-gray-400 flex-wrap justify-center">
            <span>✔ Verified Listings</span>
            <span>✔ Zero Spam</span>
            <span>✔ Expert Guidance</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce z-10">
          ↓ Explore Properties
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

          <button className="bg-white text-black rounded-lg font-semibold p-4">
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
              className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:scale-105 transition"
            >
              <div className="h-56 bg-zinc-800"></div>

              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">
                  Luxury Apartment
                </h3>

                <p className="text-gray-400 mb-2">Mira Road</p>

                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>1200 sqft</span>
                  <span>Ready 2027</span>
                </div>

                <p className="font-bold text-lg">₹85 Lakhs</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY ASRAA */}
      <section className="py-20 px-6 md:px-20 bg-zinc-950 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Why Choose Asraa Realty
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-400">No fake inventory.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">AI Property Match</h3>
            <p className="text-gray-400">Personalized recommendations.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Market Intelligence</h3>
            <p className="text-gray-400">Investment-focused guidance.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-400">Guided buying process.</p>
          </div>
        </div>
      </section>

      {/* PROPERTY VALUATION */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Know Your Property Value
        </h2>

        <p className="text-gray-400 mb-6">
          Get AI-powered instant valuation for your property.
        </p>

        <a
          href="/property-valuation"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold"
        >
          Check Valuation
        </a>
      </section>

      {/* CONSULTATION FORM */}
      <section className="py-20 px-6 md:px-20 bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
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

            <button className="bg-green-500 hover:bg-green-600 p-4 rounded-lg font-semibold">
              Get Callback
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
