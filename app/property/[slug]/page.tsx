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
      
      {/* HERO SECTION */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={
            property.featuredImage?.node?.sourceUrl ||
            "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
          }
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Title Overlay */}
        <div className="absolute bottom-12 left-8 md:left-20 z-10 max-w-4xl">
          <span className="text-amber-400 uppercase tracking-[0.25em] text-sm">
            Premium Real Estate
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-4 leading-tight">
            {property.title}
          </h1>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <section className="px-8 md:px-20 py-16">
        <div className="max-w-5xl mx-auto space-y-10">

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

          {/* 3D FLOOR VIEWER */}
          {floorModel && (
            <div className="mt-20 border-t border-zinc-800 pt-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Interactive 3D Floor Plan
              </h2>

              <FloorViewer modelUrl={floorModel} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
