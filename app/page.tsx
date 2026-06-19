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

async function getBrokerProperties() {
  const res = await fetch(
    "https://asraarealty.com/wp-json/asraa/v1/broker-properties",
    {
      cache: "no-store",
    }
  );

  return await res.json();
}

export default async function Home() {
  const properties = await getProperties();
  const brokerProperties = await getBrokerProperties();

  return (
    <main className="bg-black text-white overflow-hidden">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <img
          src="https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
          alt="Luxury"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 opacity-20">
          <ThreeScene />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20 z-20 max-w-4xl animate-fadeIn">
          <span className="text-amber-400 uppercase tracking-[0.3em] text-sm mb-4">
            Premium Real Estate Advisory
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Find Luxury Homes <br /> With Precision
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl mb-8">
            Verified listings, premium property matching, and market intelligence.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/properties"
              className="bg-amber-500 text-black px-7 py-3 rounded-xl font-semibold"
            >
              Browse Projects
            </a>

            <a
              href="https://wa.me/919619973211"
              className="border border-white px-7 py-3 rounded-xl"
            >
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-24 px-6 md:px-20">
        <h2 className="text-4xl font-bold mb-10">Featured Properties</h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {properties.map((property: any) => (
            <div
              key={property.id}
              className="min-w-[320px] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:scale-105 transition"
            >
              <img
                src={
                  property.featuredImage?.node?.sourceUrl ||
                  "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
                }
                alt={property.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold">{property.title}</h3>

                <a
                  href={`/property/${property.slug}`}
                  className="text-amber-400 mt-4 inline-block"
                >
                  View →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BROKER FEED */}
      <section className="py-24 px-6 md:px-20 bg-zinc-950">
        <h2 className="text-4xl font-bold mb-10">Broker Feed Listings</h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {brokerProperties.map((property: any) => (
            <div
              key={property.id}
              className="min-w-[300px] bg-zinc-900 rounded-2xl p-6 border border-zinc-800"
            >
              <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
              <p className="text-zinc-400">{property.location}</p>
              <p className="text-amber-400 mt-2">₹{property.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION CARDS */}
      <section className="py-24 px-6 md:px-20">
        <h2 className="text-4xl font-bold mb-10">Explore By Location</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {["Mira Road", "Thane", "Kandivali", "Dubai"].map((location) => (
            <div
              key={location}
              className="bg-zinc-900 rounded-2xl p-8 text-center border border-zinc-800 hover:border-amber-500 transition"
            >
              <h3 className="text-2xl font-bold">{location}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* DEVELOPERS */}
      <section className="py-24 px-6 md:px-20 bg-zinc-950">
        <h2 className="text-4xl font-bold mb-10">Top Developers</h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {["Godrej", "Lodha", "Runwal", "Shapoorji", "Danube"].map(
            (developer) => (
              <div
                key={developer}
                className="min-w-[260px] bg-zinc-900 rounded-2xl p-8 border border-zinc-800"
              >
                <h3 className="text-2xl font-semibold">{developer}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* PROPERTY GLOBE */}
      <section className="py-28 px-6 md:px-20">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold">
            Global Property Network
          </h2>
        </div>

        <PropertyGlobe properties={properties} />
      </section>

      {/* COMMERCIAL CTA */}
      <section className="py-24 px-8 md:px-20 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-3xl p-10 text-center border border-zinc-800">
          <h2 className="text-4xl font-bold mb-6">
            Looking for Commercial Spaces?
          </h2>

          <p className="text-zinc-400 mb-8">
            Offices, Retail, Warehouses, Shops — connect directly.
          </p>

          <a
            href="/commercial"
            className="bg-amber-500 text-black px-8 py-4 rounded-xl font-semibold"
          >
            Explore Commercial
          </a>
        </div>
      </section>

      {/* PROPERTY VALUATION */}
      <section className="py-20 px-8 md:px-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">
            Know Your Property Value
          </h2>

          <a
            href="/valuation"
            className="border border-amber-500 px-8 py-4 rounded-xl text-amber-400"
          >
            Get Instant Valuation
          </a>
        </div>
      </section>
    </main>
  );
}
