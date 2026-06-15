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

        <div className="absolute inset-0 opacity-20">
          <ThreeScene />
        </div>

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
              className="bg-amber-500 text-black px-7 py-3 rounded-lg font-semibold"
            >
              Browse Projects
            </a>

            <a
              href="https://wa.me/919619973211"
              className="border border-white px-7 py-3 rounded-lg"
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-24 px-6 md:px-20 bg-black">
        <div className="text-center mb-14">
          <span className="text-amber-400 uppercase tracking-[0.25em] text-sm">
            Exclusive Collection
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Featured Properties
          </h2>
        </div>

        {/* CAROUSEL */}
        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">
          {properties.map((property: any) => (
            <a
              key={property.id}
              href={`/property/${property.slug}`}
              className="min-w-[320px] md:min-w-[420px] snap-start group relative rounded-3xl overflow-hidden border border-zinc-800"
            >
              {/* IMAGE */}
              <div className="relative h-[500px] overflow-hidden">
                <img
                  src={
                    property.featuredImage?.node?.sourceUrl ||
                    "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
                  }
                  alt={property.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 p-8 z-10">
                <span className="inline-block bg-amber-500 text-black text-xs px-3 py-1 rounded-full mb-4 font-semibold">
                  New Launch
                </span>

                <h3 className="text-2xl font-bold mb-3 leading-snug">
                  {property.title}
                </h3>

                <p className="text-zinc-300 text-sm mb-5 max-w-sm">
                  Premium curated investment opportunities directly from Asraa Realty.
                </p>

                <div className="inline-flex items-center gap-2 text-amber-400 font-semibold">
                  View Property →
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
