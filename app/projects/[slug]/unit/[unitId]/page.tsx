interface PageProps {
  params: Promise<{
    slug: string;
    unitId: string;
  }>;
}

export default async function UnitPage({
  params,
}: PageProps) {
  const { unitId } = await params;

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div>
        <h1 className="text-4xl font-bold">Unit {unitId}</h1>
      </div>
    </main>
  );
}
