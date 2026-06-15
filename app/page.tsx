import ThreeScene from "../components/ThreeScene";
import PropertyGlobe from "../components/PropertyGlobe";

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
              featuredImage {
                node {
                  sourceUrl
                }
              }
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
    <main className="bg-black text-white overflow-hidden">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <img
          src="https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
          alt="Luxury Building"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        {/* 3D Background */}
        <div className="absolute inset-0 opacity-20">
          <ThreeScene />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10" />

        {/* NAVBAR */}
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

        {/* HERO CONTENT */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 z-20 max-w-4xl">
          <span className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-4">
            Premium Real Estate Advisory
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Find Luxury Homes <br />
            With Precision
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
            Verified listings, market intelligence, and premium property
            matching built for smarter investments.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/properties"
              className="bg-amber-500 text-black px-7 py-3 rounded-lg font-semibold hover:bg-amber-600 transition"
            >
              Browse Projects
            </a>

            <a
              href="https://wa.me/919619973211"
              className="border border-white px-7 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              WhatsApp Now
            </a>
          </div>

          <div className="mt-8 flex gap-6 text-sm text-zinc-400 flex-wrap">
            <span>✔ Verified Listings</span>
            <span>✔ Trusted Developers</span>
            <span>✔ Expert Advisory</span>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES GLOBE */}
      <section className="py-28 px-6 md:px-20 bg-black relative">
        <div className="text-center mb-20">
          <span className="text-amber-400 uppercase tracking-[0.25em] text-sm">
            Exclusive Collection
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-4">
            Featured Properties
          </h2>

          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto">
            Explore premium investment opportunities rotating in a luxury orbit.
          </p>
        </div>

        <PropertyGlobe properties={properties} />
      </section>

      {/* CTA */}
      <section className="py-24 px-8 md:px-20 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-3xl p-10 text-center border border-zinc-800">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Invest?
          </h2>

          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Get direct access to exclusive projects, floor plans, and pricing
            before public launch.
          </p>

          <a
            href="https://wa.me/919619973211"
            className="bg-amber-500 text-black px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition"
          >
            Connect with Asraa Realty
          </a>
        </div>
      </section>
    </main>
  );
}
