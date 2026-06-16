import FloorViewer from "@/components/FloorViewer";
import Link from "next/link";

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
              content
              propertyId
              price
              rooms
              beds
              baths
              garages
              yearBuilt
              homeArea
              reraNumber
              address
              latitude
              longitude
              gallery
              featuredImageUrl
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

    return json?.data?.property ?? null;
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
      <main className="bg-black text-white min-h-screen flex items-center justify-center">
        Property not found
      </main>
    );
  }

  return (
    <main className="bg-black text-white min-h-screen pb-32">
      {/* HERO */}
      <section className="relative h-screen">
        <img
          src={property.featuredImageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="absolute bottom-16 left-8 md:left-16 max-w-4xl z-10">
          <p className="text-amber-400 uppercase tracking-[4px] text-sm mb-4">
            Premium Project
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {property.title}
          </h1>

          <p className="mt-5 text-zinc-300 text-lg max-w-2xl">
            {property.address}
          </p>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-zinc-800 bg-zinc-950 py-5">
        <div className="grid grid-cols-2 md:grid-cols-5 text-center gap-4 px-6">
          {[
            "RERA Approved",
            "Verified Listing",
            "Zero Brokerage",
            "Site Visit Available",
            "Premium Project",
          ].map((item) => (
            <div
              key={item}
              className="text-sm text-amber-400 font-semibold"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="grid md:grid-cols-4 gap-6 px-8 md:px-16 py-12">
        {[
          ["Price", property.price],
          ["Beds", property.beds],
          ["Baths", property.baths],
          ["Area", `${property.homeArea} sqft`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 text-center"
          >
            <p className="text-zinc-400 mb-2">{label}</p>
            <p className="text-amber-400 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </section>

      {/* WHY INVEST */}
      <section className="px-8 md:px-16 py-16 border-t border-zinc-800">
        <h2 className="text-4xl font-bold text-amber-400 mb-8">
          Why Invest Here?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "Prime location with metro connectivity",
            "High appreciation potential",
            "Premium lifestyle amenities",
            "Strong rental demand",
            "Trusted developer reputation",
            "Ideal for end-use & investors",
          ].map((point) => (
            <div
              key={point}
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
            >
              ✓ {point}
            </div>
          ))}
        </div>
      </section>

      {/* 3D SECTION */}
      <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
        <h2 className="text-4xl font-bold text-amber-400 mb-10">
          Interactive 3D Walkthrough
        </h2>

        <FloorViewer modelUrl="/demo.glb" />
      </section>

      {/* GALLERY CAROUSEL */}
      {property.gallery?.length > 0 && (
        <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Project Gallery
          </h2>

          <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
            {property.gallery.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`${property.title} ${index}`}
                className="w-[400px] h-[280px] object-cover rounded-2xl flex-shrink-0 snap-center"
              />
            ))}
          </div>
        </section>
      )}

      {/* CONTENT + DETAILS */}
      <section className="grid lg:grid-cols-3 gap-10 px-8 md:px-16 py-20 border-t border-zinc-800">
        {/* SIDEBAR */}
        <aside className="sticky top-10 h-fit bg-zinc-900 rounded-2xl border border-zinc-800 p-8">
          <h3 className="text-2xl font-bold text-amber-400 mb-6">
            Quick Details
          </h3>

          <div className="space-y-4">
            {[
              ["Property ID", property.propertyId],
              ["RERA", property.reraNumber],
              ["Rooms", property.rooms],
              ["Garages", property.garages],
              ["Year Built", property.yearBuilt],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-zinc-800 pb-3"
              >
                <span className="text-zinc-400">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* CONTENT */}
        <div className="lg:col-span-2">
          <div
            className="
              prose prose-invert max-w-none
              prose-headings:text-amber-400
              prose-p:text-zinc-300
              prose-strong:text-white
            "
            dangerouslySetInnerHTML={{
              __html: property.content,
            }}
          />
        </div>
      </section>

      {/* LOCATION ADVANTAGES */}
      <section className="px-8 md:px-16 py-16 border-t border-zinc-800">
        <h2 className="text-4xl font-bold text-amber-400 mb-8">
          Location Advantages
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            "2 min to Metro",
            "5 min to Highway",
            "10 min to Mall",
            "15 min to Hospital",
          ].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* MAP */}
      {property.latitude && property.longitude && (
        <section className="px-8 md:px-16 py-20 border-t border-zinc-800">
          <h2 className="text-4xl font-bold text-amber-400 mb-10">
            Location Map
          </h2>

          <iframe
            src={`https://maps.google.com/maps?q=${property.latitude},${property.longitude}&z=15&output=embed`}
            className="w-full h-[500px] rounded-2xl"
          />
        </section>
      )}

      {/* STICKY CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-zinc-800 z-50">
        <div className="grid grid-cols-4 text-center">
          <Link href="tel:+919999999999" className="py-4 border-r border-zinc-800">
            Call
          </Link>

          <Link
            href="https://wa.me/919999999999"
            target="_blank"
            className="py-4 border-r border-zinc-800"
          >
            WhatsApp
          </Link>

          <Link href="/site-visit" className="py-4 border-r border-zinc-800">
            Site Visit
          </Link>

          <Link href="/contact" className="py-4 text-amber-400 font-bold">
            Enquire
          </Link>
        </div>
      </div>
    </main>
  );
}
