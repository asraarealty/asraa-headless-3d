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
              featuredImageUrl
              gallery
            }
          }
        `,
        variables: { slug },
      }),
      cache: "no-store",
    });

    const json = await res.json();

    console.log("GRAPHQL RESPONSE:", json);

    if (json.errors) {
      console.error(json.errors);
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
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Property not found</h1>
          <p className="text-zinc-400">Slug: {slug}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen pb-28">
      {/* HERO */}
      <section className="relative h-[80vh] overflow-hidden">
        <img
          src={
            property.featuredImageUrl ||
            "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
          }
          alt={property.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-16 left-8 md:left-20 max-w-4xl z-10">
          <span className="text-amber-400 uppercase tracking-[0.3em] text-sm font-semibold">
            Premium Project
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-4 leading-tight">
            {property.title}
          </h1>

          <p className="text-zinc-300 mt-4 text-lg">{property.address}</p>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS */}
      <section className="px-8 md:px-20 py-10 bg-zinc-950 border-b border-zinc-800">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            ["Price", property.price],
            ["Beds", property.beds],
            ["Baths", property.baths],
            ["Area", `${property.homeArea} sqft`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center"
            >
              <div className="text-zinc-400 text-sm">{label}</div>
              <div className="text-amber-400 font-bold text-xl mt-2">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      {Array.isArray(property.gallery) && property.gallery.length > 0 && (
        <section className="px-8 md:px-20 py-16">
          <h2 className="text-3xl font-bold mb-8 text-amber-400">
            Project Gallery
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {property.gallery.map((image: string, index: number) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-zinc-800"
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  loading="lazy"
                  className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
        <div className="grid md:grid-cols-3 gap-14">
          {/* SIDEBAR */}
          <div>
            <div className="sticky top-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6 text-amber-400">
                Quick Details
              </h3>

              <div className="space-y-4 text-zinc-300">
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
                    <span>{label}</span>
                    <span className="text-white font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="md:col-span-2">
            <div
              className="
                text-zinc-300 leading-8 text-lg
                [&_.ez-toc-container]:hidden
                [&_h2]:text-3xl
                [&_h2]:font-bold
                [&_h2]:text-amber-400
                [&_h2]:mt-14
                [&_h2]:mb-6
                [&_p]:mb-6
              "
              dangerouslySetInnerHTML={{
                __html: property.content || "",
              }}
            />
          </div>
        </div>
      </section>

      {/* MAP */}
      {property.latitude?.length > 0 && property.longitude?.length > 0 && (
        <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold mb-10 text-amber-400">
            Location Map
          </h2>

          <iframe
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
            className="w-full h-[500px] rounded-2xl border border-zinc-800"
          />
        </section>
      )}
    </main>
  );
}
