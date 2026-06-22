import Link from "next/link";

interface ProjectDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const projectData: Record<
  string,
  {
    title: string;
    location: string;
    price: string;
    description: string;
    image: string;
    possession: string;
    developer: string;
  }
> = {
  "godrej-reserve": {
    title: "Godrej Reserve",
    location: "Kandivali East, Mumbai",
    price: "₹1.25 Cr onwards",
    description:
      "A premium residential development designed for modern luxury living with world-class amenities, expansive green spaces, and strategic connectivity.",
    image: "/hero-building.jpg",
    possession: "Dec 2028",
    developer: "Godrej Properties",
  },
  "asraa-heights": {
    title: "Asraa Heights",
    location: "Mira Road, Mumbai",
    price: "₹89 L onwards",
    description:
      "A curated residential destination offering high ROI potential, premium lifestyle amenities, and seamless city connectivity.",
    image: "/hero-building.jpg",
    possession: "Ready Possession",
    developer: "Asraa Realty",
  },
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  const project = projectData[slug];

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Project Not Found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute bottom-20 left-10 max-w-3xl">
          <p className="uppercase tracking-[0.3em] text-orange-400 mb-4">
            Premium Project
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {project.title}
          </h1>

          <p className="text-xl text-gray-300 mt-4">{project.location}</p>

          <p className="text-2xl text-orange-400 font-semibold mt-6">
            {project.price}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-4xl font-bold mb-6">Project Overview</h2>

          <p className="text-gray-400 leading-relaxed text-lg">
            {project.description}
          </p>
        </div>

        <div className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-8">
          <div>
            <p className="text-gray-500">Developer</p>
            <h3 className="text-2xl font-semibold">{project.developer}</h3>
          </div>

          <div>
            <p className="text-gray-500">Possession</p>
            <h3 className="text-2xl font-semibold">{project.possession}</h3>
          </div>

          <div>
            <p className="text-gray-500">Starting Price</p>
            <h3 className="text-2xl font-semibold">{project.price}</h3>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-wrap gap-4">
          <Link
            href={`/projects/${slug}/masterplan`}
            className="px-8 py-4 bg-orange-500 text-black rounded-xl font-semibold"
          >
            View Masterplan
          </Link>

          <button className="px-8 py-4 border border-white/20 rounded-xl">
            Download Brochure
          </button>

          <button className="px-8 py-4 border border-white/20 rounded-xl">
            WhatsApp Now
          </button>
        </div>
      </section>
    </main>
  );
}
