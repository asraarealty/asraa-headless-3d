import React from "react";
import OfferPopup from "@/components/OfferPopup";

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
              featuredImageUrl
              gallery
              developerName
              monthlyScheme
              discountOffer
              inventoryStatus
              offerPopupText
            }
          }
        `,
        variables: { slug },
      }),
      cache: "no-store",
    });

    const json = await res.json();

    if (json.errors) {
      console.error(json.errors);
      return null;
    }

    return json?.data?.property || null;
  } catch (error) {
    console.error(error);
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

  const cleanedContent =
    property.content
      ?.replace(/<div class="ez-toc-container[\s\S]*?<\/div>/g, "")
      .replace(/Table of Contents[\s\S]*?(?=<h2)/g, "")
      .replace(/(<h2[^>]*>.*?<\/h2>)/g, `</div><div class="content-block">$1`)
      .replace(/^<\/div>/, "") || "<p>No content available.</p>";

  return (
    <main className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[85vh]">
        <img
          src={property.featuredImageUrl || "/placeholder.jpg"}
          alt={property.title}
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <div className="absolute bottom-20 left-8 md:left-16 z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {property.title}
          </h1>

          <p className="text-zinc-300 text-lg mb-6">{property.address}</p>

          <div className="flex gap-4">
            <OfferPopup
              title={property.offerPopupText || "Unlock Offers"}
              scheme={property.monthlyScheme}
              discount={property.discountOffer}
              inventory={property.inventoryStatus}
              propertyTitle={property.title}
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 py-12">
        {[
          ["Price", property.price || "On Request"],
          ["Beds", property.beds || "-"],
          ["Baths", property.baths || "-"],
          ["Area", `${property.homeArea || "-"} sqft`],
        ].map(([label, value]) => (
          <div key={label} className="bg-zinc-900 rounded-2xl p-6 text-center">
            <p>{label}</p>
            <p className="text-amber-400 text-2xl font-bold">{value}</p>
          </div>
        ))}
      </section>

      {/* CONTENT */}
      <section className="px-8 md:px-16 py-20">
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: cleanedContent,
          }}
        />
      </section>

      {/* GALLERY */}
      {property.gallery?.length > 0 && (
        <section className="px-8 md:px-16 py-20">
          <h2 className="text-4xl font-bold text-amber-400 mb-8">
            Project Gallery
          </h2>

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory">
            {property.gallery.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`${property.title}-${index}`}
                className="min-w-[320px] h-[420px] object-cover rounded-3xl snap-center"
              />
            ))}
          </div>
        </section>
      )}

      {/* MAP */}
      {property.latitude && property.longitude && (
        <section className="px-8 md:px-16 py-20">
          <iframe
            width="100%"
            height="500"
            className="rounded-3xl"
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
          />
        </section>
      )}
    </main>
  );
}
