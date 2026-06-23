interface PageProps {
  params: Promise<{
    slug: string;
    towerId: string;
  }>;
}

export default async function TowerPage({
  params,
}: PageProps) {
  const { towerId } = await params;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold">Tower {towerId}</h1>
      </div>
    </main>
  );
}
