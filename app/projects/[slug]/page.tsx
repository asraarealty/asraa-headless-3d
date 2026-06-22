import Link from "next/link";

interface Project {
  title: string;
  location: string;
  price: string;
  description: string;
  image: string;
  possession: string;
  developer: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `https://asraarealty.com/wp-json/wp/v2/property?slug=${slug}&_embed`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();

    if (!data?.length) return null;

    const property = data[0];

    return {
      title: property.title?.rendered || "Untitled Project",
      location:
        property.acf?.location ||
        property.meta?.location ||
        "Mumbai",
      price:
        property.acf?.price ||
        property.meta?.price ||
        "Price on Request",
      description:
        property.excerpt?.rendered?.replace(/<[^>]*>/g, "") ||
        "Premium real estate development with strong appreciation potential and curated luxury living.",
      image:
        property._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/masterplans/project-map.jpg",
      possession:
        property.acf?.possession ||
        "Coming Soon",
      developer:
        property.acf?.developer ||
        "Asraa Realty",
    };
  } catch (error) {
    console.error("Project fetch failed:", error);
    return null;
  }
}

export default async function ProjectDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Project Not Found
          </h1>

          <Link
            href="/projects"
            className="inline-block mt-4 px-6 py-3 bg-orange-500 text-black rounded-xl font-semibold"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative min-h-screen">
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex items-end min-h-screen px-6 md:px-10 pb-16 md:pb-20 max-w-5xl">
          <div>
            <p className="uppercase tracking-[0.3em] text-orange-400 mb-4 text-xs md:text-sm">
              Premium Project
            </p>

            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mt-4">
              {project.location}
            </p>

            <p className="text-2xl md:text-3xl text-orange-400 font-semibold mt-6">
              {project.price}
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-6 py-14 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Project Overview
          </h2>

          <p className="text-gray-400 leading-relaxed text-base md:text-lg">
            {project.description}
          </p>
        </div>

        <div className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          <div>
            <p className="text-gray-500">Developer</p>
            <h3 className="text-xl md:text-2xl font-semibold">
              {project.developer}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Possession</p>
            <h3 className="text-xl md:text-2xl font-semibold">
              {project.possession}
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Starting Price</p>
            <h3 className="text-xl md:text-2xl font-semibold">
              {project.price}
            </h3>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-16 md:pb-24">
        <div className="flex flex-wrap gap-4">
          <Link
            href={`/projects/${slug}/masterplan`}
            className="px-6 md:px-8 py-3 md:py-4 bg-orange-500 text-black rounded-xl font-semibold"
          >
            View Masterplan
          </Link>

          <button className="px-6 md:px-8 py-3 md:py-4 border border-white/20 rounded-xl hover:bg-white/10 transition">
            Download Brochure
          </button>

          <Link
            href="https://wa.me/919619973211"
            className="px-6 md:px-8 py-3 md:py-4 border border-white/20 rounded-xl hover:bg-white/10 transition"
          >
            WhatsApp Now
          </Link>
        </div>
      </section>
    </main>
  );
}
