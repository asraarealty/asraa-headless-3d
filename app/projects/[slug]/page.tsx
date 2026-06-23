import Link from "next/link";

interface Project {
  title: string;
  location: string;
  price: string;
  description: string;
  content: string;
  image: string;
  possession: string;
  developer: string;
  gallery: string[];
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getProject(slug: string): Promise<Project | null> {
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
              content
              excerpt
              featuredImage {
                node {
                  sourceUrl
                }
              }
              properties {
                location
                price
                possession
                developer
                gallery {
                  sourceUrl
                }
              }
            }
          }
        `,
        variables: { slug },
      }),
      next: { revalidate: 60 },
    });

    if (!res.ok) return null;

    const json = await res.json();
    const property = json?.data?.property;

    if (!property) return null;

    const featuredImage =
      property.featuredImage?.node?.sourceUrl || "/hero-building.jpg";

    const galleryImages =
      property.properties?.gallery?.map(
        (img: { sourceUrl: string }) => img.sourceUrl
      ) || [featuredImage];

    return {
      title: property.title || "Untitled Project",
      location: property.properties?.location || "Mumbai",
      price: property.properties?.price || "Price on Request",
      description:
        property.excerpt?.replace(/<[^>]*>/g, "") ||
        "Premium luxury development",
      content:
        property.content || "<p>No project details available.</p>",
      image: featuredImage,
      possession:
        property.properties?.possession || "Coming Soon",
      developer:
        property.properties?.developer || "Asraa Realty",
      gallery: galleryImages,
    };
  } catch (error) {
    console.error("Project fetch failed:", error);
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: PageProps) {
  const project = await getProject(params.slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Project Not Found
          </h1>

          <Link
            href="/projects"
            className="px-6 py-3 bg-orange-500 text-black rounded-xl font-semibold"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex items-end min-h-screen px-6 md:px-16 pb-20 max-w-6xl">
          <div>
            <p className="uppercase tracking-[0.35em] text-orange-400 text-xs md:text-sm mb-4">
              Premium Project
            </p>

            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              {project.title}
            </h1>

            <p className="mt-4 text-lg md:text-xl text-gray-300">
              {project.location}
            </p>

            <p className="mt-6 text-2xl md:text-3xl text-orange-400 font-semibold">
              {project.price}
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-16 px-6 md:px-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Project Gallery
        </h2>

        <div className="flex gap-5 overflow-x-auto scrollbar-hide">
          {project.gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${project.title}-${index}`}
              className="min-w-[280px] md:min-w-[520px] h-[220px] md:h-[340px] object-cover rounded-3xl"
            />
          ))}
        </div>
      </section>

      {/* DETAILS */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-[2fr_1fr] gap-12">
        {/* LEFT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Project Overview
          </h2>

          <div
            className="prose prose-invert max-w-none text-gray-300"
            dangerouslySetInnerHTML={{
              __html: project.content,
            }}
          />
        </div>

        {/* RIGHT CARD */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 sticky top-28 h-fit">
          <div className="space-y-8">
            <div>
              <p className="text-zinc-500">Developer</p>
              <h3 className="text-xl md:text-2xl font-semibold">
                {project.developer}
              </h3>
            </div>

            <div>
              <p className="text-zinc-500">Possession</p>
              <h3 className="text-xl md:text-2xl font-semibold">
                {project.possession}
              </h3>
            </div>

            <div>
              <p className="text-zinc-500">Starting Price</p>
              <h3 className="text-xl md:text-2xl font-semibold text-orange-400">
                {project.price}
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="px-6 md:px-16 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Amenities
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            "Swimming Pool",
            "Gymnasium",
            "Clubhouse",
            "Kids Play Area",
            "Garden",
            "Parking",
            "Security",
            "Sky Deck",
          ].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-center"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 pb-24">
        <div className="flex flex-wrap gap-4">
          <Link
            href={`/projects/${params.slug}/masterplan`}
            className="px-8 py-4 bg-orange-500 text-black rounded-xl font-semibold"
          >
            View Masterplan
          </Link>

          <button className="px-8 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition">
            Download Brochure
          </button>

          <Link
            href="https://wa.me/919619973211"
            className="px-8 py-4 border border-white/20 rounded-xl hover:bg-white/10 transition"
          >
            WhatsApp Now
          </Link>
        </div>
      </section>
    </main>
  );
}
