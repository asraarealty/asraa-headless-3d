import FloorViewer from "@/components/FloorViewer";

async function getProperty(slug: string) {
  const res = await fetch("https://asraarealty.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GetProperty($uri: ID!) {
          property(id: $uri, idType: URI) {
            title
            slug
            uri
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
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
      variables: {
        uri: "/property/" + slug + "/",
      },
    }),
    cache: "no-store",
  });

  const json = await res.json();
  return json?.data?.property;
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

  const floorModel =
    property.property3dData?.floorPlanModel?.node?.mediaItemUrl;

  return (
    <main className="bg-black text-white min-h-screen">

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
          <span className="text-amber-400 uppercase tracking-[0.3em] text-sm">
            Premium Project
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-4 leading-tight">
            {property.title}
          </h1>

          <div className="flex gap-4 mt-6 flex-wrap">
            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              Luxury Living
            </span>

            <span className="bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm">
              Verified Listing
            </span>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="px-8 md:px-20 py-16 border-b border-zinc-800">
        <div className="grid md:grid-cols-4 gap-6">

          {[
            "Premium Location",
            "High ROI Potential",
            "Smart Floor Planning",
            "Verified by Asraa"
          ].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold">{item}</h3>
            </div>
          ))}

        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-8 md:px-20 py-20">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold mb-10">
            Project Overview
          </h2>

          <div
            className="
              text-zinc-300 leading-8 text-lg
              [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-14 [&_h2]:mb-6
              [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-10 [&_h3]:mb-4
              [&_p]:mb-6
              [&_ul]:space-y-3
              [&_li]:text-zinc-400
              [&_table]:w-full
              [&_table]:border-collapse
              [&_td]:border
              [&_td]:border-zinc-800
              [&_td]:p-4
              [&_th]:border
              [&_th]:border-zinc-800
              [&_th]:p-4
              [&_th]:bg-zinc-900
            "
            dangerouslySetInnerHTML={{
              __html: property.content,
            }}
          />

        </div>
      </section>

      {/* 3D FLOOR PLAN */}
      {floorModel && (
        <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
          <div className="max-w-6xl mx-auto">

            <h2 className="text-4xl font-bold mb-8">
              Interactive 3D Floor Plan
            </h2>

            <p className="text-zinc-400 mb-10">
              Explore the project layout in a 3D interactive environment.
            </p>

            <FloorViewer modelUrl={floorModel} />

          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
        <div className="max-w-5xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">

          <h2 className="text-4xl font-bold mb-4">
            Interested in this project?
          </h2>

          <p className="text-zinc-400 mb-8">
            Get pricing, brochure, floor plans and expert consultation.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/919619973211"
              className="bg-amber-500 text-black px-8 py-4 rounded-xl font-semibold"
            >
              WhatsApp Now
            </a>

            <a
              href="/contact"
              className="border border-white px-8 py-4 rounded-xl"
            >
              Schedule Visit
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}
