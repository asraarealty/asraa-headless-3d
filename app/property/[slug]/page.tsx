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
      variables: {
        slug: slug,
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

          <h1 className="text-5xl md:text-7xl font-bold mt-4">
            {property.title}
          </h1>
        </div>
      </section>

      {/* GALLERY */}
      {property.asraaGallery?.length > 0 && (
        <section className="px-8 md:px-20 py-16">
          <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {property.asraaGallery.map(
              (image: string, index: number) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-2xl"
                >
                  <img
                    src={image}
                    alt={`${property.title} Gallery ${index + 1}`}
                    loading="lazy"
                    className="w-full h-72 object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* MAIN CONTENT */}
      <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
        <div className="grid md:grid-cols-3 gap-14">

          {/* SIDEBAR */}
          <div>
            <div className="sticky top-10 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-6">
                Quick Details
              </h3>

              <div className="space-y-4 text-zinc-400">
                <div className="flex justify-between border-b border-zinc-800 pb-3">
                  <span>Status</span>
                  <span className="text-white">Available</span>
                </div>

                <div className="flex justify-between border-b border-zinc-800 pb-3">
                  <span>Type</span>
                  <span className="text-white">Luxury</span>
                </div>

                <div className="flex justify-between border-b border-zinc-800 pb-3">
                  <span>RERA</span>
                  <span className="text-white">Verified</span>
                </div>

                <a
                  href="#"
                  className="block mt-6 bg-amber-500 text-black text-center py-3 rounded-xl font-semibold"
                >
                  Download Brochure
                </a>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="md:col-span-2">
            <h2 className="text-4xl font-bold mb-10">
              Project Overview
            </h2>

            <div
              className="
                text-zinc-300 leading-8 text-lg
                [&_.ez-toc-container]:hidden
                [&_h2]:text-3xl
                [&_h2]:font-bold
                [&_h2]:mt-14
                [&_h2]:mb-6
                [&_p]:mb-6
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
        <h2 className="text-4xl font-bold mb-10">Amenities</h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "Swimming Pool",
            "Gymnasium",
            "Children Play Area",
            "Clubhouse",
            "Jogging Track",
            "Garden",
            "Parking",
            "Security",
          ].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center"
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICE TABLE */}
      <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
        <h2 className="text-4xl font-bold mb-10">Price Plans</h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-zinc-800">
            <thead>
              <tr className="bg-zinc-900">
                <th className="p-4 border border-zinc-800">Configuration</th>
                <th className="p-4 border border-zinc-800">Size</th>
                <th className="p-4 border border-zinc-800">Price</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-4 border border-zinc-800">2 BHK</td>
                <td className="p-4 border border-zinc-800">750 Sq.ft</td>
                <td className="p-4 border border-zinc-800">₹1.25 Cr+</td>
              </tr>

              <tr>
                <td className="p-4 border border-zinc-800">3 BHK</td>
                <td className="p-4 border border-zinc-800">1100 Sq.ft</td>
                <td className="p-4 border border-zinc-800">₹2.10 Cr+</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FLOORPLAN */}
      {floorModel && (
        <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold mb-10">
            Interactive Floor Plan
          </h2>

          <div className="flex gap-4 mb-8">
            <button className="px-5 py-3 bg-amber-500 text-black rounded-xl">
              2 BHK
            </button>

            <button className="px-5 py-3 border border-zinc-700 rounded-xl">
              3 BHK
            </button>
          </div>

          <FloorViewer modelUrl={floorModel} />
        </section>
      )}

      {/* CTA */}
      <section className="px-8 md:px-20 py-20 border-t border-zinc-800">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Interested in this project?
          </h2>

          <p className="text-zinc-400 mb-8">
            Get brochure, pricing and consultation.
          </p>

          <a
            href="https://wa.me/919619973211"
            className="bg-amber-500 text-black px-8 py-4 rounded-xl font-semibold"
          >
            WhatsApp Now
          </a>
        </div>
      </section>

      {/* STICKY ENQUIRY BAR */}
      <div className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h4 className="font-semibold">{property.title}</h4>
            <p className="text-zinc-400 text-sm">
              Get latest pricing & brochure
            </p>
          </div>

          <a
            href="https://wa.me/919619973211"
            className="bg-amber-500 text-black px-6 py-3 rounded-xl font-semibold"
          >
            Enquire Now
          </a>
        </div>
      </div>

    </main>
  );
}
