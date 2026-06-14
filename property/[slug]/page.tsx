interface PropertyPageProps {
  params: {
    slug: string;
  };
}

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
            content
            slug
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

export default async function PropertyPage({ params }: PropertyPageProps) {
  const property = await getProperty(params.slug);

  if (!property) {
    return (
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        <h1>Property not found</h1>
      </main>
    );
  }

  const modelUrl =
    property.property3dData?.floorPlanModel?.node?.mediaItemUrl;

  return (
    <main className="bg-black text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">{property.title}</h1>

      {/* 3D Floor Viewer */}
      {modelUrl && (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-amber-400">
            Interactive 3D Floor Plan
          </h2>

          <FloorViewer modelUrl={modelUrl} />
        </div>
      )}

      {/* Property Description */}
      <div
        className="prose prose-invert max-w-4xl"
        dangerouslySetInnerHTML={{
          __html: property.content,
        }}
      />
    </main>
  );
}
