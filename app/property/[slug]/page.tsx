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
          slug,
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
      <section className="relative h-[85vh]">
        <img
          src={property.gallery?.[0] || "/fallback.jpg"}
          alt={property.title}
          className="w-full h-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute bottom-20 left-8 md:left-16 z-10 max-w-5xl">
          <p className="text-amber-400 uppercase tracking-[5px] text-sm mb-4 font-semibold">
            Premium Project
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-5">
            {property.title}
          </h1>

          <p className="text-zinc-300 text-lg max-w-3xl leading-8">
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
            className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800 hover:border-amber-400 transition"
          >
            <p className="text-zinc-400 mb-2">{label}</p>
            <p className="text-amber-400 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </section>

      {/* CONTENT */}
      <section className="grid md:grid-cols-3 gap-12 px-8 md:px-16 py-20">
        {/* SIDEBAR */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 h-fit sticky top-10">
          <h2 className="text-2xl font-bold text-amber-400 mb-6">
            Quick Details
          </h2>

          <div className="space-y-5 text-zinc-300">
            <div className="border-b border-zinc-800 pb-3">
              RERA: {property.reraNumber}
            </div>
            <div className="border-b border-zinc-800 pb-3">
              Beds: {property.beds}
            </div>
            <div className="border-b border-zinc-800 pb-3">
              Baths: {property.baths}
            </div>
            <div className="border-b border-zinc-800 pb-3">
              Area: {property.homeArea} sqft
            </div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:col-span-2">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 shadow-xl">
            <h2 className="text-4xl font-bold text-amber-400 mb-8">
              Project Overview
            </h2>

            <div
              className="
                prose prose-invert max-w-none
                prose-h2:text-amber-400
                prose-h2:text-3xl
                prose-h2:font-bold
                prose-h2:mt-12
                prose-h2:mb-6
                prose-h3:text-yellow-300
                prose-h3:text-2xl
                prose-p:text-zinc-300
                prose-p:leading-8
                prose-p:mb-6
                prose-li:text-zinc-300
                prose-strong:text-white
                prose-a:text-amber-400
              "
              dangerouslySetInnerHTML={{
                __html: property.content,
              }}
            />
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {Array.isArray(property.gallery) && property.gallery.length > 0 && (
        <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Project Gallery
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x scrollbar-hide">
            {property.gallery.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`${property.title}-${index}`}
                className="rounded-2xl h-80 min-w-[380px] object-cover snap-center border border-zinc-800"
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-3xl p-10 text-black text-center">
          <h2 className="text-4xl font-bold mb-4">
            Book Your Site Visit Today
          </h2>

          <p className="text-lg mb-6">
            Get exclusive offers, floor plans and developer pricing.
          </p>

          <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
            Enquire Now
          </button>
        </div>
      </section>

      {/* MAP */}
      {property.latitude && property.longitude && (
        <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Location Map
          </h2>

          <iframe
            width="100%"
            height="500"
            className="rounded-2xl border border-zinc-800"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
          />
        </section>
      )}
    </main>
  );
}
