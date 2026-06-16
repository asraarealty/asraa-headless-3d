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
              content(format: RENDERED)
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
      <main className="bg-black min-h-screen flex items-center justify-center text-white text-2xl">
        Property not found
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="relative h-[80vh]">
        <img
          src={property.gallery?.[0] || "/placeholder.jpg"}
          alt={property.title}
          className="w-full h-full object-cover opacity-50"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div className="absolute bottom-16 left-8 md:left-16 z-10 max-w-4xl">
          <p className="text-amber-400 uppercase tracking-[4px] text-sm mb-4">
            Premium Project
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {property.title}
          </h1>

          <p className="text-zinc-300 text-lg">{property.address}</p>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 md:px-16 py-12 border-b border-zinc-800">
        {[
          ["Price", property.price || "On Request"],
          ["Beds", property.beds || "-"],
          ["Baths", property.baths || "-"],
          ["Area", `${property.homeArea || "-"} sqft`],
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

      {/* CONTENT SECTION */}
      <section className="grid md:grid-cols-3 gap-12 px-8 md:px-16 py-20">
        {/* SIDEBAR */}
        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 h-fit sticky top-10">
          <h2 className="text-2xl font-bold text-amber-400 mb-6">
            Quick Details
          </h2>

          <div className="space-y-5 text-zinc-300">
            <div className="border-b border-zinc-800 pb-3">
              RERA: {property.reraNumber || "-"}
            </div>
            <div className="border-b border-zinc-800 pb-3">
              Beds: {property.beds || "-"}
            </div>
            <div className="border-b border-zinc-800 pb-3">
              Baths: {property.baths || "-"}
            </div>
            <div>Area: {property.homeArea || "-"} sqft</div>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:col-span-2 space-y-10">
          {/* CONTENT BOX */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-10 bg-amber-400 rounded-full" />
              <h2 className="text-3xl font-bold text-amber-400">
                Project Overview
              </h2>
            </div>

            <div
              className="
prose prose-invert max-w-none
[&_.ez-toc-container]:hidden

prose-h2:text-amber-400
prose-h2:text-3xl
prose-h2:font-bold
prose-h2:mt-16
prose-h2:mb-8
prose-h2:border-b
prose-h2:border-zinc-800
prose-h2:pb-4

prose-h3:text-yellow-300
prose-h3:text-2xl
prose-h3:font-semibold
prose-h3:mt-10
prose-h3:mb-4

prose-p:text-zinc-300
prose-p:text-lg
prose-p:leading-8
prose-p:bg-zinc-900
prose-p:border
prose-p:border-zinc-800
prose-p:p-6
prose-p:rounded-2xl
prose-p:mb-6
prose-p:hover:border-amber-400
prose-p:transition

prose-ul:grid
prose-ul:grid-cols-2
prose-ul:gap-4
prose-ul:my-8

prose-li:bg-zinc-900
prose-li:border
prose-li:border-zinc-800
prose-li:p-4
prose-li:rounded-xl
prose-li:list-none
prose-li:hover:border-yellow-400
prose-li:transition

prose-strong:text-white
"
              dangerouslySetInnerHTML={{
                __html: property.content || "<p>No content available.</p>",
              }}
            />
          </div>

          {/* FEATURE CARDS */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Luxury Lifestyle",
                desc: "Premium amenities crafted for elevated living.",
              },
              {
                title: "Prime Connectivity",
                desc: "Excellent road, metro and highway access.",
              },
              {
                title: "Investment Potential",
                desc: "High appreciation and strong future demand.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* HIGHLIGHTS */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-amber-400 mb-8">
              Project Highlights
            </h2>

            <div className="space-y-6">
              {[
                "Premium Construction Quality",
                "Spacious Floor Plans",
                "Smart Investment Opportunity",
                "Trusted Developer Legacy",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-black font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <p className="text-lg font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FLOOR VIEWER DISABLED FOR NOW */}

      {/* GALLERY */}
      {Array.isArray(property.gallery) && property.gallery.length > 0 && (
        <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Project Gallery
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {property.gallery.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`${property.title}-${index}`}
                className="rounded-2xl h-80 w-full object-cover hover:scale-105 transition duration-500"
              />
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-3xl p-12 text-center text-black">
          <h2 className="text-4xl font-bold mb-4">
            Book Your Site Visit Today
          </h2>

          <p className="text-lg mb-6">
            Get exclusive offers, floor plans and developer pricing.
          </p>

          <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold">
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
            className="rounded-2xl"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
          />
        </section>
      )}
    </main>
  );
}
