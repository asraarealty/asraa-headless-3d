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
              propertyId
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
        variables: { slug },
      }),
      cache: "no-store",
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
    }

    if (!json?.data?.property) {
      return null;
    }

    return json.data.property;
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = await getProperty(params.slug);

  console.log("PROPERTY:", property);

  if (!property) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">Property not found</h1>
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <img
          src={
            property.featuredImageUrl ||
            "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
          }
          alt={property.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-20 left-8 md:left-20 z-10 max-w-4xl">
          <p className="text-amber-400 uppercase tracking-[0.4em] text-sm mb-4">
            Premium Project
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            {property.title}
          </h1>

          <p className="text-xl text-zinc-300">
            {property.address || "Prime Location"}
          </p>
        </div>
      </section>

      {/* PROPERTY STATS */}
      <section className="px-8 md:px-20 py-12 border-b border-zinc-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            ["Price", property.price || "On Request"],
            ["Beds", property.beds || "N/A"],
            ["Baths", property.baths || "N/A"],
            ["Area", property.homeArea ? `${property.homeArea} sqft` : "N/A"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-zinc-900 rounded-2xl p-6 text-center border border-zinc-800"
            >
              <p className="text-zinc-400 text-sm">{label}</p>
              <p className="text-amber-400 text-3xl font-bold mt-2">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="px-8 md:px-20 py-8 bg-zinc-950 border-b border-zinc-800">
        <div className="flex flex-wrap gap-4">
          {[
            "RERA Verified",
            "Prime Location",
            "Luxury Living",
            "Best Investment",
          ].map((item) => (
            <div
              key={item}
              className="px-5 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT + SIDEBAR */}
      <section className="px-8 md:px-20 py-20">
        <div className="grid md:grid-cols-3 gap-14">

          {/* SIDEBAR */}
          <div>
            <div className="sticky top-10 bg-zinc-900 border border-zinc-800 rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-amber-400 mb-6">
                Quick Details
              </h3>

              <div className="space-y-5">
                {[
                  ["Property ID", property.propertyId || "N/A"],
                  ["RERA", property.reraNumber || "Pending"],
                  ["Rooms", property.rooms || "N/A"],
                  ["Garages", property.garages || "N/A"],
                  ["Year Built", property.yearBuilt || "N/A"],
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
            </div>
          </div>

          {/* CONTENT */}
          <div className="md:col-span-2">
            <div
              className="
                prose prose-invert max-w-none
                prose-h2:text-amber-400
                prose-h2:text-3xl
                prose-h2:mt-12
                prose-p:text-zinc-300
                prose-p:leading-8
              "
              dangerouslySetInnerHTML={{
                __html: property.content || "<p>No content available.</p>",
              }}
            />
          </div>
        </div>
      </section>

      {/* 3D FLOOR VIEWER */}
      <section className="px-8 md:px-20 py-20 border-t border-zinc-900">
        <h2 className="text-4xl font-bold text-amber-400 mb-10">
          Walk Through Your Future Home
        </h2>

        <FloorViewer modelUrl="/sample.glb" />
      </section>

      {/* GALLERY CAROUSEL */}
      {Array.isArray(property.gallery) && property.gallery.length > 0 && (
        <section className="px-8 md:px-20 py-20 border-t border-zinc-900">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Project Gallery
          </h2>

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4">
            {property.gallery.map((img: string, i: number) => (
              <div
                key={i}
                className="min-w-[350px] snap-center rounded-2xl overflow-hidden border border-zinc-800"
              >
                <img
                  src={img}
                  alt={`${property.title}-${i}`}
                  className="w-full h-[500px] object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MAP */}
      {property.latitude && property.longitude ? (
        <section className="px-8 md:px-20 py-20 border-t border-zinc-900">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Location Map
          </h2>

          <div className="rounded-3xl overflow-hidden border border-zinc-800">
            <iframe
              src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
              width="100%"
              height="500"
              loading="lazy"
            />
          </div>
        </section>
      ) : null}

      {/* SMART CTA */}
      <section className="px-8 md:px-20 py-20 border-t border-zinc-900">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500 to-yellow-500 p-10 text-black">
          <h2 className="text-4xl font-bold mb-4">
            Ready to explore {property.title}?
          </h2>

          <p className="text-lg mb-8">
            Schedule your private site visit and unlock premium offers.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold">
              Book Site Visit
            </button>

            <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold">
              WhatsApp Expert
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
