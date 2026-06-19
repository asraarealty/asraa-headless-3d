async function getWpProperties() {
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

  return (json?.data?.properties?.nodes || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    image:
      item.featuredImage?.node?.sourceUrl ||
      "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp",
    location: "Premium",
    source: "wordpress",
  }));
}

async function getBrokerProperties() {
  const res = await fetch(
    "https://asraarealty.com/wp-json/asraa/v1/broker-properties",
    {
      cache: "no-store",
    }
  );

  const json = await res.json();

  return (json || []).map((item: any) => ({
    id: item.id,
    title: item.title,
    slug: item.id.toString(),
    image:
      item.image_url ||
      "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp",
    location: item.location || item.city || "Unknown",
    price: item.price,
    source: "broker",
  }));
}

export default async function PropertiesPage() {
  const wpProperties = await getWpProperties();
  const brokerProperties = await getBrokerProperties();

  const allProperties = [...wpProperties, ...brokerProperties];

  // Sort by location
  allProperties.sort((a, b) =>
    a.location.localeCompare(b.location)
  );

  return (
    <main className="min-h-screen bg-black text-white px-8 md:px-20 py-20">
      <div className="mb-14 text-center">
        <h1 className="text-5xl font-bold mb-4">All Properties</h1>
        <p className="text-zinc-400">
          Explore verified premium & broker-listed properties
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {allProperties.map((property: any) => (
          <div
            key={`${property.source}-${property.id}`}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-400 transition"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <div className="flex justify-between mb-3">
                <span className="text-sm text-amber-400">
                  {property.location}
                </span>

                <span className="text-xs bg-zinc-800 px-2 py-1 rounded">
                  {property.source === "broker" ? "Broker" : "Premium"}
                </span>
              </div>

              <h2 className="text-xl font-semibold mb-3">
                {property.title}
              </h2>

              {property.price && (
                <p className="text-zinc-300 mb-3">
                  ₹{Number(property.price).toLocaleString()}
                </p>
              )}

              <a
                href={
                  property.source === "wordpress"
                    ? `/property/${property.slug}`
                    : `/property/broker/${property.slug}`
                }
                className="text-amber-400 font-medium"
              >
                View Property →
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
