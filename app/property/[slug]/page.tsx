import FloorViewer from "@/components/FloorViewer";

async function getProperty(slug: string) {
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
            featuredImage {
              node {
                sourceUrl
              }
            }
            asraaGallery
            property3dData {
              floorPlanModel {
                node {
                  mediaItemUrl
                }
              }
            }
          }
        }
      `,
      variables: { slug },
    }),
    cache: "no-store",
  });

  const json = await res.json();
  return json?.data?.property;
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

  const floorModel =
    property.property3dData?.floorPlanModel?.node?.mediaItemUrl;

  return (
    <main className="bg-black text-white min-h-screen pb-28">

      {/* HERO */}
      <section className="relative h-[80vh] overflow-hidden">
        <img
          src={
            property.featuredImage?.node?.sourceUrl ||
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
        </div>
      </section>

      {/* QUICK HIGHLIGHTS */}
      <section className="px-8 md:px-20 py-10 bg-zinc-950 border-b border-zinc-800">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            "RERA Verified",
            "Luxury Project",
            "Prime Location",
            "Best Investment",
          ].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center text-amber-400 font-semibold"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      {property.asraaGallery?.length > 0 && (
        <section className="px-8 md:px-20 py-16">
          <h2 className="text-3xl font-bold mb-8 text-amber-400">
            Project Gallery
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {property.asraaGallery.map((image: string, index: number) => (
              <div
                key={index}
                className="group overflow-hidden rounded-2xl border border-zinc-800"
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 1}`}
                  className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MAIN CONTENT */}
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
                  ["Status", "Available"],
                  ["Type", "Luxury"],
                  ["RERA", "Verified"],
                  ["Possession", "2026"],
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

              <a
                href="#"
                className="block mt-6 bg-amber-500 text-black text-center py-3 rounded-xl font-semibold"
              >
                Download Brochure
              </a>
            </div>
          </div>

          {/* CONTENT */}
          <div className="md:col-span-2">

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-10">
              <h2 className="text-3xl font-bold mb-4 text-amber-400">
                Project Overview
              </h2>

              <p className="text-zinc-300 leading-8">
                Study all project insights, location benefits, floor plans,
                pricing and amenities before making your decision.
              </p>
            </div>

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
                [&_ul]:bg-zinc-900
                [&_ul]:p-6
                [&_ul]:rounded-2xl
                [&_ul]:border
                [&_ul]:border-zinc-800
              "
              dangerouslySetInnerHTML={{
                __html: property.content,
              }}
            />
          </div>

        </div>
      </section>

      {/* AMENITIES */}
      <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
        <h2 className="text-4xl font-bold mb-10 text-amber-400">
          Amenities
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Swimming Pool",
            "Gymnasium",
            "Clubhouse",
            "Garden",
            "Parking",
            "Security",
            "Kids Area",
            "Jogging Track",
          ].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center hover:border-amber-400 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* FLOORPLAN */}
      {floorModel && (
        <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold mb-10 text-amber-400">
            Interactive Floor Plan
          </h2>

          <FloorViewer modelUrl={floorModel} />
        </section>
      )}

      {/* CTA */}
      <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl p-10 text-center text-black">
          <h2 className="text-4xl font-bold mb-4">
            Interested in this project?
          </h2>

          <p className="mb-8">
            Get brochure, pricing and consultation instantly.
          </p>

          <a
            href="https://wa.me/919619973211"
            className="bg-black text-white px-8 py-4 rounded-xl font-semibold"
          >
            WhatsApp Now
          </a>
        </div>
      </section>

    </main>
  );
}
