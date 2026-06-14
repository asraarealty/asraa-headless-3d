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

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="min-h-screen bg-black text-white px-8 md:px-20 py-20">
      <div className="mb-14 text-center">
        <h1 className="text-5xl font-bold mb-4">All Properties</h1>
        <p className="text-zinc-400">
          Explore premium verified properties from Asraa Realty
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {properties.map((property: any) => (
          <div
            key={property.id}
            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-amber-400 transition"
          >
            <img
              src={
                property.featuredImage?.node?.sourceUrl ||
                "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
              }
              alt={property.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-6">
              <h2 className="text-xl font-semibold mb-3">
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
    </main>
  );
}
