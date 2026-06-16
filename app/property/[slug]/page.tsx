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
              address
              latitude
              longitude
              gallery
              featuredImageUrl
            }
          }
        `,
        variables: { slug },
      }),
      cache: "no-store",
    });

    const json = await res.json();

    console.log(json);

    return json?.data?.property || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = await getProperty(params.slug);

  if (!property) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        Property not found
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

        <div className="absolute bottom-20 left-8 md:left-20 z-10">
          <p className="text-amber-400 uppercase tracking-[0.4em] mb-4">
            Premium Project
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {property.title}
          </h1>

          <p className="text-xl text-zinc-300">{property.address}</p>
        </div>
      </section>

      {/* STATS */}
      <section className="px-8 md:px-20 py-12 grid md:grid-cols-4 gap-6">
        {[
          ["Price", property.price],
          ["Beds", property.beds],
          ["Baths", property.baths],
          ["Area", `${property.homeArea} sqft`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center"
          >
            <p className="text-zinc-400">{label}</p>
            <p className="text-amber-400 text-2xl font-bold mt-2">{value}</p>
          </div>
        ))}
      </section>

      {/* CONTENT */}
      <section className="px-8 md:px-20 py-20">
        <div
          className="
            prose prose-invert max-w-none
            prose-h2:text-amber-400
            prose-p:text-zinc-300
          "
          dangerouslySetInnerHTML={{
            __html: property.content,
          }}
        />
      </section>

      {/* GALLERY */}
      {property.gallery?.length > 0 && (
        <section className="px-8 md:px-20 py-20">
          <h2 className="text-4xl font-bold text-amber-400 mb-8">
            Project Gallery
          </h2>

          <div className="flex gap-6 overflow-x-auto">
            {property.gallery.map((img: string, i: number) => (
              <div
                key={i}
                className="min-w-[350px] rounded-2xl overflow-hidden border border-zinc-800"
              >
                <img
                  src={img}
                  alt={property.title}
                  className="w-full h-[450px] object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MAP */}
      {property.latitude && property.longitude && (
        <section className="px-8 md:px-20 py-20">
          <h2 className="text-4xl font-bold text-amber-400 mb-8">
            Location Map
          </h2>

          <iframe
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
            width="100%"
            height="500"
            className="rounded-2xl"
          />
        </section>
      )}

      {/* CTA */}
      <section className="px-8 md:px-20 py-20">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl p-10 text-black">
          <h2 className="text-4xl font-bold mb-4">
            Ready to explore {property.title}?
          </h2>

          <p className="mb-6">
            Book your private visit now.
          </p>

          <button className="bg-black text-white px-8 py-4 rounded-xl">
            Book Site Visit
          </button>
        </div>
      </section>

    </main>
  );
}
