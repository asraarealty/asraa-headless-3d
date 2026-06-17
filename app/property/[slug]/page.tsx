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
          <p className="text-amber-400 uppercase tracking-[5px] mb-4 text-sm">
            Luxury Residence
          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            {property.title}
          </h1>

          <p className="text-zinc-300 text-lg mb-6">{property.address}</p>

          <div className="flex flex-wrap gap-4">
            <OfferPopup
              title={property.offerPopupText || "Unlock Developer Offers"}
              scheme={property.monthlyScheme}
              discount={property.discountOffer}
              inventory={property.inventoryStatus}
              propertyTitle={property.title}
            />

            <a
              href={`https://wa.me/919619973211?text=Hi I want details for ${property.title}`}
              target="_blank"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-black transition"
            >
              WhatsApp
            </a>
          </div>
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
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-center hover:border-amber-400 transition"
          >
            <p className="text-zinc-400 mb-2">{label}</p>
            <p className="text-amber-400 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </section>

      /*
|--------------------------------------------------------------------------
| Native WordPress Property Gallery
|--------------------------------------------------------------------------
*/

register_graphql_field('Property', 'gallery', [
    'type' => ['list_of' => 'String'],
    'resolve' => function ($post) {

        $gallery = get_post_meta(
            $post->databaseId,
            '_property_gallery',
            true
        );

        if (empty($gallery)) {
            return [];
        }

        $gallery = maybe_unserialize($gallery);

        if (!is_array($gallery)) {
            return [];
        }

        $images = [];

        foreach ($gallery as $image_id) {
            $url = wp_get_attachment_url($image_id);

            if ($url) {
                $images[] = $url;
            }
        }

        return $images;
    }
]);

      {/* MAIN */}
      <section className="grid md:grid-cols-3 gap-12 px-8 md:px-16 py-20">
        {/* LEFT SIDEBAR */}
        <div className="space-y-6 sticky top-10 h-fit">
          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">
              Quick Details
            </h2>

            <div className="space-y-5 text-zinc-300">
              <div>RERA: {property.reraNumber || "-"}</div>
              <div>Beds: {property.beds || "-"}</div>
              <div>Baths: {property.baths || "-"}</div>
              <div>Area: {property.homeArea || "-"} sqft</div>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
            <h2 className="text-2xl font-bold text-amber-400 mb-6">
              Developer Offer
            </h2>

            <div className="space-y-4 text-zinc-300">
              <p><strong>Developer:</strong> {property.developerName || "-"}</p>
              <p><strong>Scheme:</strong> {property.monthlyScheme || "-"}</p>
              <p><strong>Offer:</strong> {property.discountOffer || "-"}</p>
              <p><strong>Inventory:</strong> {property.inventoryStatus || "-"}</p>
            </div>

            <div className="mt-6">
              <OfferPopup
                title="Claim Exclusive Offer"
                scheme={property.monthlyScheme}
                discount={property.discountOffer}
                inventory={property.inventoryStatus}
                propertyTitle={property.title}
              />
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="md:col-span-2">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-1 h-10 bg-amber-400 rounded-full" />
              <h2 className="text-3xl font-bold text-amber-400">
                Project Overview
              </h2>
            </div>

            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: cleanedContent,
              }}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
        <div className="bg-gradient-to-r from-amber-500 to-yellow-400 rounded-3xl p-12 text-center text-black">
          <h2 className="text-4xl font-bold mb-4">
            {property.offerPopupText || "Book Your Site Visit Today"}
          </h2>

          <p className="text-lg mb-6">
            Get latest schemes, discounts and inventory updates.
          </p>

          <OfferPopup
            title={property.offerPopupText || "Enquire Now"}
            scheme={property.monthlyScheme}
            discount={property.discountOffer}
            inventory={property.inventoryStatus}
            propertyTitle={property.title}
          />
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
            className="rounded-3xl"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
          />
        </section>
      )}
    </main>
  );
}
