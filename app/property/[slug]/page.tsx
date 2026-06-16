import FloorViewer from "@/components/FloorViewer";

async function getProperty(slug: string) {
  try {
    const res = await fetch("https://asraarealty.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query GetProperty($slug: ID!) {
            property(id: $slug, idType: SLUG) {
              title
              slug
              content
              price
              beds
              baths
              homeArea
              reraNumber
              address
              latitude
              longitude
              gallery
            }
          }
        `,
        variables: {
          slug: slug,
        },
      }),
      cache: "no-store",
    });

    const json = await res.json();

    console.log("Slug Sent:", slug);
    console.log("GraphQL Response:", json);

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      return null;
    }

    return json?.data?.property || null;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  console.log("Page slug:", slug);

  const property = await getProperty(slug);

  if (!property) {
    return (
      <main className="bg-black min-h-screen flex items-center justify-center text-white">
        Property not found
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="relative h-[80vh]">
        <img
          src={property.gallery?.[0]}
          alt={property.title}
          className="w-full h-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute bottom-16 left-8 md:left-16 z-10 max-w-4xl">
          <p className="text-amber-400 uppercase tracking-[4px] text-sm mb-4">
            Premium Project
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {property.title}
          </h1>

          <p className="text-zinc-300 text-lg max-w-3xl">
            {property.address}
          </p>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 md:px-16 py-12 border-b border-zinc-800">
        {[
          ["Price", property.price],
          ["Beds", property.beds],
          ["Baths", property.baths],
          ["Area", `${property.homeArea} sqft`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800"
          >
            <p className="text-zinc-400 mb-2">{label}</p>
            <p className="text-amber-400 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </section>

      {/* CONTENT */}
      <section className="grid md:grid-cols-3 gap-12 px-8 md:px-16 py-20">
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 h-fit sticky top-10">
          <h2 className="text-2xl font-bold text-amber-400 mb-6">
            Quick Details
          </h2>

          <div className="space-y-4">
            <div>RERA: {property.reraNumber}</div>
            <div>Beds: {property.beds}</div>
            <div>Baths: {property.baths}</div>
            <div>Area: {property.homeArea} sqft</div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{
              __html: property.content,
            }}
          />
        </div>
      </section>

      {/* GALLERY */}
      {Array.isArray(property.gallery) && property.gallery.length > 0 && (
        <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Gallery
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {property.gallery.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`${property.title}-${index}`}
                className="rounded-2xl h-72 w-full object-cover"
              />
            ))}
          </div>
        </section>
      )}

      {/* MAP */}
      {property.latitude && property.longitude && (
        <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Location Map
          </h2>

          <iframe
            width="100%"
            height="500"
            className="rounded-2xl"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
          />
        </section>
      )}
    </main>
  );
}
