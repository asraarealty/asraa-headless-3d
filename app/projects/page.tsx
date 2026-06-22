import Link from "next/link";

const projects = [
  {
    id: 1,
    slug: "godrej-reserve",
    title: "Godrej Reserve",
    location: "Kandivali East, Mumbai",
    price: "₹1.25 Cr onwards",
    image: "/hero-building.jpg",
    status: "New Launch",
  },
  {
    id: 2,
    slug: "asraa-heights",
    title: "Asraa Heights",
    location: "Mira Road, Mumbai",
    price: "₹89 L onwards",
    image: "/hero-building.jpg",
    status: "Ready Possession",
  },
];

export default function ProjectsPage() {
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
      </div>
    </main>
  );
}
