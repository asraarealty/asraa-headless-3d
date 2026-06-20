import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 60;

interface Property {
  id: string;
  title: string;
  slug: string;
  image: string;
  location: string;
  price?: string;
  source: "wordpress" | "broker";
}

const FALLBACK_IMAGE =
  "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp";

async function getWpProperties(): Promise<Property[]> {
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

    return (json?.data?.properties?.nodes || []).map((item: any) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      image: item.featuredImage?.node?.sourceUrl || FALLBACK_IMAGE,
      location: "Premium",
      source: "wordpress",
    }));
  } catch {
    return [];
  }
}

async function getBrokerProperties(): Promise<Property[]> {
  try {
    const res = await fetch(
      "https://asraarealty.com/wp-json/asraa/v1/broker-properties",
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return [];

    const json = await res.json();

    return (json || []).map((item: any) => ({
      id: String(item.id),
      title: item.title || "Untitled Property",
      slug: String(item.id),
      image: item.image_url || FALLBACK_IMAGE,
      location: item.location || item.city || "Mumbai",
      price: item.price,
      source: "broker",
    }));
  } catch {
    return [];
  }
}

export default async function PropertiesPage() {
  const wpProperties = await getWpProperties();
  const brokerProperties = await getBrokerProperties();

  const allProperties = [...wpProperties, ...brokerProperties];

  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-20 py-20">
      {/* Header */}
      <div className="mb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          All Properties
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl">
          Explore verified premium and broker-listed properties
        </p>
      </div>

      {/* Properties Grid */}
      {allProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allProperties.map((property) => (
            <div
              key={`${property.source}-${property.id}`}
              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-400 transition duration-500"
            >
              {/* Image */}
              <div className="relative w-full h-60">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-amber-400">
                    {property.location}
                  </span>

                  <span className="text-xs px-3 py-1 rounded-full bg-zinc-800">
                    {property.source === "broker" ? "Broker" : "Premium"}
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                  {property.title}
                </h2>

                {property.price && !isNaN(Number(property.price)) && (
                  <p className="text-zinc-300 mb-4 text-lg font-medium">
                    ₹{Number(property.price).toLocaleString("en-IN")}
                  </p>
                )}

                <a
                  href={
                    property.source === "wordpress"
                      ? `/property/${property.slug}`
                      : `/property/broker/${property.slug}`
                  }
                  className="inline-block text-amber-400 font-medium hover:translate-x-1 transition"
                >
                  View Property →
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-24 text-zinc-500 text-lg">
          No properties found.
        </div>
      )}
    </main>
  );
}
