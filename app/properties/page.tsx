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
      image:
        item.featuredImage?.node?.sourceUrl ||
        "/logo.png",
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
      title: item.title || "Untitled",
      slug: String(item.id),
      image: item.image_url || "/logo.png",
      location: item.location || item.city || "Unknown",
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
    <main className="min-h-screen bg-black text-white px-8 md:px-20 py-20">
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Globe Properties
        </h1>

        <p className="text-zinc-400 text-lg">
          Explore verified premium listings
        </p>
      </div>

      {wpProperties.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-8">
          {wpProperties.map((property) => (
            <div
              key={property.id}
              className="group bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-400 transition"
            >
              <div className="relative w-full h-64">
                <Image
                  src={property.image}
                  alt={property.title}
                  fill
                  className="object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="p-6">
                <span className="text-sm text-amber-400 mb-2 block">
                  {property.location}
                </span>

                <h2 className="text-xl font-semibold mb-4 line-clamp-2">
                  {property.title}
                </h2>

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
      ) : (
        <div className="text-center text-zinc-500 mt-20">
          No properties found.
        </div>
      )}
    </main>
  );
}
