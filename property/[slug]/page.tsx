interface PropertyPageProps {
  params: {
    slug: string;
  };
}

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

  return (
    <main className="bg-black text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">{property.title}</h1>

      <div
        className="prose prose-invert max-w-4xl"
        dangerouslySetInnerHTML={{
          __html: property.content,
        }}
      />
    </main>
  );
}
