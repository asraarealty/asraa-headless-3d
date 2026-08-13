import Link from "next/link";
import ProjectHero from "../../../components/project/ProjectHero";
import ProjectStats from "../../../components/project/ProjectStats";
import ProjectGallery from "../../../components/project/ProjectGallery";
import FadeIn from "../../../components/animations/FadeIn";

interface Project {
  title: string;
  location: string;
  price: string;
  description: string;
  content: string;
  image: string;
  possession: string;
  developer: string;
  brochure?: string;
  gallery: string[];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 60;

async function getProject(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(
      `https://asraarealty.com/wp-json/wp/v2/property?slug=${encodeURIComponent(
        slug
      )}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return null;

    const posts = await res.json();
    const property = Array.isArray(posts) ? posts[0] : null;

    if (!property) return null;

    const featuredImage = property.featuredImageUrl || "/hero-building.jpg";

    const galleryImages =
      Array.isArray(property.gallery) && property.gallery.length > 0
        ? property.gallery
        : [featuredImage];

    return {
      title: property.title?.rendered || "Untitled Project",
      location: property.address || "Mumbai",
      price: property.price || "Price on Request",
      description:
        property.excerpt?.rendered?.replace(/<[^>]*>/g, "") ||
        "Premium luxury development",
      content:
        property.content?.rendered || "<p>No project details available.</p>",
      image: featuredImage,
      possession: property.possession || "Coming Soon",
      developer: property.developerName || "Asraa Realty",
      brochure: property.brochure || "",
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
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>

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
      <ProjectHero
        title={project.title}
        location={project.location}
        price={project.price}
        image={project.image}
      />

      <ProjectStats
        price={project.price}
        possession={project.possession}
        developer={project.developer}
      />

      <ProjectGallery images={project.gallery} title={project.title} />

      <section className="max-w-4xl mx-auto px-6 md:px-16 py-20 md:py-28">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-light mb-10 tracking-tight">
            Overview
          </h2>

          <div
            className="prose prose-invert prose-lg max-w-none text-gray-300"
            dangerouslySetInnerHTML={{
              __html: project.content,
            }}
          />
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 pb-28">
        <FadeIn>
          <div className="max-w-4xl mx-auto flex flex-wrap gap-4 justify-center border-t border-white/10 pt-16">
            <Link
              href={`/projects/${slug}/masterplan`}
              className="px-8 py-4 bg-amber-500 text-black rounded-full font-medium hover:bg-amber-400 transition"
            >
              View Masterplan
            </Link>

            {project.brochure && (
              <a
                href={project.brochure}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/20 rounded-full hover:border-amber-400 hover:text-amber-400 transition"
              >
                Download Brochure
              </a>
            )}

            <Link
              href="https://wa.me/919619973211"
              className="px-8 py-4 border border-white/20 rounded-full hover:border-amber-400 hover:text-amber-400 transition"
            >
              WhatsApp Now
            </Link>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
