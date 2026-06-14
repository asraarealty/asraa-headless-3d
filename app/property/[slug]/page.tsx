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

  console.log("GRAPHQL DATA:", json);

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
      <div className="relative h-[500px]">
        <img
          src={
            property.featuredImage?.node?.sourceUrl ||
            "https://asraarealty.com/wp-content/uploads/2026/06/asraa_optimized_1.webp"
          }
          alt={property.title}
          className="w-full h-full object-cover"
        />
      </div>

      <section className="px-8 md:px-20 py-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          {property.title}
        </h1>

        <div
          className="prose prose-invert max-w-4xl mb-16"
          dangerouslySetInnerHTML={{
            __html: property.content,
          }}
        />

        {floorModel && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">
              Interactive 3D Floor Plan
            </h2>

            <FloorViewer modelUrl={floorModel} />
          </div>
        )}
      </section>
    </main>
  );
}
