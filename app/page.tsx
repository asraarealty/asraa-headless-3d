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

interface WPProperty {
  id: number;
  slug: string;
  title?: {
    rendered?: string;
  };
  _embedded?: {
    ["wp:featuredmedia"]?: Array<{
      source_url?: string;
    }>;
  };
}

async function getProperties(): Promise<Property[]> {
  try {
    const res = await fetch(
      "https://asraarealty.com/wp-json/wp/v2/property?_embed",
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) {
      console.log("REST API failed:", res.status);
      return [];
    }

    const data: WPProperty[] = await res.json();

    return data.map((item) => ({
      id: String(item.id),
      title: item.title?.rendered || "Untitled Project",
      slug: item.slug || "",
      featuredImage: {
        node: {
          sourceUrl:
            item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            "/masterplans/project-map.jpg",
        },
      },
    }));
  } catch (error) {
    console.error("Property fetch error:", error);
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

    const data: BrokerProperty[] = await res.json();
    return data;
  } catch {
    return [];
  }
}

export default async function Home() {
  const properties = await getProperties();
  const brokerProperties = await getBrokerProperties();

  return (
    <main className="bg-black text-white overflow-hidden">
      <Hero />

      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16">
        <PropertyGlobe properties={properties} />
      </section>

      {brokerProperties.length > 0 && (
        <section className="py-14 md:py-18 px-4 sm:px-6 md:px-12 lg:px-20 bg-zinc-950">
          <div className="flex items-center justify-between mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold">
              Broker Feed Listings
            </h2>

            <Link
              href="/projects"
              className="text-sm md:text-base text-amber-400 border border-amber-500 px-4 py-2 rounded-xl"
            >
              View All
            </Link>
          </div>

          <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4">
            {brokerProperties.map((property) => (
              <div
                key={property.id}
                className="min-w-[260px] md:min-w-[320px] bg-zinc-900 rounded-2xl p-5 md:p-6 border border-zinc-800 hover:border-amber-500 transition"
              >
                <h3 className="text-lg md:text-xl font-semibold mb-2">
                  {property.title}
                </h3>

                <p className="text-zinc-400 text-sm md:text-base">
                  {property.location || "Mumbai"}
                </p>

                {property.price && (
                  <p className="text-amber-400 mt-3 text-base md:text-lg font-semibold">
                    ₹{property.price}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-14 md:py-18 px-4 sm:px-6 md:px-12 lg:px-20">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-10">
          Explore By Location
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {["Mira Road", "Thane", "Kandivali", "Panvel"].map((location) => (
            <div
              key={location}
              className="bg-zinc-900 rounded-2xl p-6 md:p-8 text-center border border-zinc-800 hover:border-amber-500 transition cursor-pointer"
            >
              <h3 className="text-lg md:text-2xl font-bold">{location}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 md:py-18 px-4 sm:px-6 md:px-12 lg:px-20 bg-zinc-950">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 md:mb-10">
          Top Developers
        </h2>

        <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4">
          {["Godrej", "Lodha", "Runwal", "Shapoorji", "Danube"].map(
            (developer) => (
              <div
                key={developer}
                className="min-w-[200px] md:min-w-[260px] bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-800 hover:border-amber-500 transition"
              >
                <h3 className="text-lg md:text-2xl font-semibold">
                  {developer}
                </h3>
              </div>
            )
          )}
        </div>
      </section>

      <section className="py-14 md:py-18 px-4 sm:px-6 md:px-12 lg:px-20 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-3xl p-6 md:p-10 text-center border border-zinc-800">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            Looking for Commercial Spaces?
          </h2>

          <p className="text-zinc-400 text-sm md:text-base mb-6 md:mb-8 max-w-2xl mx-auto">
            Offices, Retail, Warehouses, Shops — connect directly with verified
            commercial opportunities.
          </p>

          <Link
            href="/commercial"
            className="inline-block bg-amber-500 text-black px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold"
          >
            Explore Commercial
          </Link>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
            Know Your Property Value
          </h2>

          <Link
            href="/valuation"
            className="inline-block border border-amber-500 px-6 md:px-8 py-3 md:py-4 rounded-xl text-amber-400 hover:bg-amber-500 hover:text-black transition"
          >
            Get Instant Valuation
          </Link>
        </div>
      </section>
    </main>
  );
}
