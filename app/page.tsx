import PropertyGlobe from "../components/PropertyGlobe";
import Hero from "../components/home/Hero";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 60;

interface Property {
  id: string;
  title: string;
  slug: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
}

interface BrokerProperty {
  id: string;
  title: string;
  location?: string;
  price?: string;
}

async function getProperties(): Promise<Property[]> {
  try {
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
      next: { revalidate: 60 },
    });

    if (!res.ok) return [];

    const json = await res.json();
    return json?.data?.properties?.nodes || [];
  } catch {
    return [];
  }
}

async function getBrokerProperties(): Promise<BrokerProperty[]> {
  try {
    const res = await fetch(
      "https://asraarealty.com/wp-json/asraa/v1/broker-properties",
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const properties = await getProperties();
  const brokerProperties = await getBrokerProperties();

  return (
    <main className="bg-black text-white overflow-hidden">
      {/* Premium Hero */}
      <Hero />

      {/* Property Globe */}
      <section className="px-6 md:px-20 py-20">
        <PropertyGlobe properties={properties} />
      </section>

      {/* Broker Feed */}
      {brokerProperties?.length > 0 && (
        <section className="py-24 px-6 md:px-20 bg-zinc-950">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">Broker Feed Listings</h2>

            <Link
              href="/projects"
              className="text-amber-400 border border-amber-500 px-5 py-2 rounded-xl"
            >
              View All
            </Link>
          </div>

          <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
            {brokerProperties.map((property) => (
              <div
                key={property.id}
                className="min-w-[320px] bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-amber-500 transition"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {property.title}
                </h3>

                <p className="text-zinc-400">
                  {property.location || "Mumbai"}
                </p>

                {property.price && (
                  <p className="text-amber-400 mt-3 text-lg font-semibold">
                    ₹{property.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Locations */}
      <section className="py-24 px-6 md:px-20">
        <h2 className="text-4xl font-bold mb-10">Explore By Location</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Mira Road", "Thane", "Kandivali", "Panvel"].map((location) => (
            <div
              key={location}
              className="bg-zinc-900 rounded-2xl p-8 text-center border border-zinc-800 hover:border-amber-500 transition cursor-pointer"
            >
              <h3 className="text-xl md:text-2xl font-bold">{location}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Top Developers */}
      <section className="py-24 px-6 md:px-20 bg-zinc-950">
        <h2 className="text-4xl font-bold mb-10">Top Developers</h2>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">
          {["Godrej", "Lodha", "Runwal", "Shapoorji", "Danube"].map(
            (developer) => (
              <div
                key={developer}
                className="min-w-[260px] bg-zinc-900 rounded-2xl p-8 border border-zinc-800 hover:border-amber-500 transition"
              >
                <h3 className="text-2xl font-semibold">{developer}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Commercial CTA */}
      <section className="py-24 px-8 md:px-20 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-3xl p-10 text-center border border-zinc-800">
          <h2 className="text-4xl font-bold mb-6">
            Looking for Commercial Spaces?
          </h2>

          <p className="text-zinc-400 mb-8">
            Offices, Retail, Warehouses, Shops — connect directly with verified
            commercial opportunities.
          </p>

          <Link
            href="/commercial"
            className="bg-amber-500 text-black px-8 py-4 rounded-xl font-semibold"
          >
            Explore Commercial
          </Link>
        </div>
      </section>

      {/* Property Valuation */}
      <section className="py-20 px-8 md:px-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-6">
            Know Your Property Value
          </h2>

          <Link
            href="/valuation"
            className="border border-amber-500 px-8 py-4 rounded-xl text-amber-400"
          >
            Get Instant Valuation
          </Link>
        </div>
      </section>
    </main>
  );
}
