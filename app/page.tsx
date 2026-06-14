import ThreeScene from "../components/ThreeScene";

async function getProperties() {
  const res = await fetch("https://asraarealty.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        {
          properties {
            nodes {
              id
              title
              slug
            }
          }
        }
      `,
    }),
    cache: "no-store",
  });

  const json = await res.json();
  return json?.data?.properties?.nodes || [];
}

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="bg-black text-white">
      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden">
        {/* 3D Background */}
        <ThreeScene />

        {/* Overlay */}
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

          <div className="mt-8 flex gap-6 text-sm text-zinc-400 flex-wrap">
            <span>✔ Verified Listings</span>
            <span>✔ Trusted Developers</span>
            <span>✔ Expert Advisory</span>
          </div>
        </div>

        {/* Search Box */}
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

      {/* FEATURED PROPERTIES */}
      <section className="py-28 px-8 md:px-20">
        <div className="text-center mb-14">
          <span className="text-amber-400 uppercase tracking-[0.25em] text-sm">
            Exclusive Collection
          </span>

          <h2 className="text-4xl font-bold mt-4">
            Featured Properties
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {properties.slice(0, 6).map((property: any) => (
            <div
              key={property.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-400 transition"
            >
              <div className="h-64 bg-zinc-800" />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {property.title}
                </h3>

                <p className="text-zinc-400 mb-6">
                  Premium property listing directly from Asraa database.
                </p>

                <a
                  href={`/property/${property.slug}`}
                  className="text-amber-400 font-medium"
                >
                  View Property →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BLOCK */}
      <section className="py-24 px-8 md:px-20 border-t border-zinc-900">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Verified Listings",
            "AI Property Match",
            "Market Intelligence",
            "Trusted Developers",
          ].map((item) => (
            <div
              key={item}
              className="p-8 rounded-2xl border border-zinc-900 bg-zinc-950"
            >
              <h3 className="text-xl font-semibold mb-3">{item}</h3>

              <p className="text-zinc-400">
                Premium property advisory built for serious investors.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* VALUATION CTA */}
      <section className="py-24 px-8 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-4">
          Know Your Property Value
        </h2>

        <p className="text-zinc-400 mb-8">
          Get accurate property valuation using local market intelligence.
        </p>

        <a
          href="/property-valuation"
          className="bg-amber-500 text-black px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition"
        >
          Check Valuation
        </a>
      </section>

      {/* CONTACT FORM */}
      <section className="py-24 px-8 md:px-20 bg-zinc-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Get Free Property Consultation
          </h2>

          <p className="text-zinc-400 mb-10">
            Connect with our advisors for premium investment opportunities.
          </p>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full bg-zinc-900 p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full bg-zinc-900 p-4 rounded-xl"
            />

            <input
              type="text"
              placeholder="Preferred Location"
              className="w-full bg-zinc-900 p-4 rounded-xl"
            />

            <button className="w-full bg-green-500 text-black py-4 rounded-xl font-semibold hover:bg-green-600 transition">
              Get Callback
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
