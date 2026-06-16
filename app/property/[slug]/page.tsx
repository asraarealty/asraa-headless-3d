import FloorViewer from "@/components/FloorViewer";

async function getProperty(slug: string) {
  try {
    console.log("SLUG:", slug);

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
              uri
              content
              propertyId
              price
              rooms
              beds
              baths
              garages
              yearBuilt
              homeArea
              reraNumber
              address
              latitude
              longitude
              gallery
              featuredImageUrl
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

    console.log("GRAPHQL RESPONSE:", json);

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      return null;
    }

    return json?.data?.property ?? null;
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return null;
  }
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const property = await getProperty(slug);

  if (!property) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <h1>Property not found</h1>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="relative h-screen">
        <img
          src={property.featuredImageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-20 left-10 z-10">
          <p className="text-amber-400 uppercase tracking-[4px] text-sm mb-4">
            Premium Project
          </p>

          <h1 className="text-6xl font-bold max-w-4xl">
            {property.title}
          </h1>

          <p className="mt-4 text-zinc-300 max-w-2xl text-lg">
            {property.address}
          </p>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="grid md:grid-cols-4 gap-6 px-10 py-14 border-b border-zinc-800">
        {[
          ["Price", property.price],
          ["Beds", property.beds],
          ["Baths", property.baths],
          ["Area", `${property.homeArea} sqft`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 text-center"
          >
            <p className="text-zinc-400 mb-2">{label}</p>
            <p className="text-amber-400 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </section>

      {/* CONTENT */}
      <section className="grid lg:grid-cols-3 gap-10 px-10 py-20">
        {/* SIDEBAR */}
        <aside className="sticky top-10 h-fit bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
          <h3 className="text-2xl font-bold text-amber-400 mb-6">
            Quick Details
          </h3>

          <div className="space-y-5">
            {[
              ["Property ID", property.propertyId],
              ["RERA", property.reraNumber],
              ["Rooms", property.rooms],
              ["Garages", property.garages],
              ["Year Built", property.yearBuilt],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-zinc-800 pb-3"
              >
                <span className="text-zinc-400">{label}</span>
                <span className="font-semibold">{value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="lg:col-span-2">
          <div
            className="
              prose prose-invert max-w-none
              prose-headings:text-amber-400
              prose-p:text-zinc-300
            "
            dangerouslySetInnerHTML={{
              __html: property.content,
            }}
          />
        </div>
      </section>

      {/* GALLERY */}
      {property.gallery?.length > 0 && (
        <section className="px-10 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Gallery
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {property.gallery.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`${property.title} ${index}`}
                className="rounded-2xl h-80 w-full object-cover"
              />
            ))}
          </div>
        </section>
      )}

      {/* MAP */}
      {property.latitude && property.longitude && (
        <section className="px-10 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Location Map
          </h2>

          <iframe
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
            className="w-full h-[500px] rounded-2xl"
          />
        </section>
      )}
    </main>
  );
}
