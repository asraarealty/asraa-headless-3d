import Link from "next/link";

interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  image: string;
  status: string;
}

export const dynamic = "force-dynamic";
export const revalidate = 120;

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(
      "https://asraarealty.com/wp-json/wp/v2/property?_embed&per_page=24",
      { next: { revalidate: 120 } }
    );

    if (!res.ok) return [];

    const data = await res.json();

    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
      id: String(item.id),
      slug: item.slug || "",
      title: item.title?.rendered || "Untitled Project",
      location: item.address || "Mumbai",
      price: item.price || "Price on Request",
      image:
        item.featuredImageUrl ||
        item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "/hero-building.jpg",
      status: item.possession || "Available",
    }));
  } catch (error) {
    console.error("Projects fetch failed:", error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-orange-400 mb-4">
            Premium Collection
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Explore Projects
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl">
            Discover curated premium real estate opportunities across Mumbai,
            Thane, Dubai, and emerging growth corridors.
          </p>
        </div>

        {/* Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5"
              >
                <div className="relative h-[420px]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 text-xs rounded-full bg-orange-500 text-black font-semibold">
                      {project.status}
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6">
                    <h2 className="text-3xl font-bold">{project.title}</h2>
                    <p className="text-gray-300 mt-2">{project.location}</p>
                    <p className="text-orange-400 mt-4 font-semibold">
                      {project.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No projects available right now.</p>
        )}
      </div>
    </main>
  );
}
