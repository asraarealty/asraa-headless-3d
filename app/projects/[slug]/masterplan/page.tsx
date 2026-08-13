"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Tower {
  id: string;
  name: string;
  floors: number;
  status: string;
  image?: string;
}

interface Unit {
  unit: string;
  type: string;
  area: string;
  price: string;
  status: string;
}

export default function MasterplanPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [towers, setTowers] = useState<Tower[]>([]);
  const [units, setUnits] = useState<Record<string, Unit[]>>({});
  const [selectedTower, setSelectedTower] = useState<string>("");
  const [projectImage, setProjectImage] = useState("/hero-building.jpg");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMasterplan() {
      try {
        const res = await fetch(
          `https://asraarealty.com/wp-json/wp/v2/property?slug=${encodeURIComponent(
            slug
          )}`
        );

        if (!res.ok) return;

        const posts = await res.json();
        const property = Array.isArray(posts) ? posts[0] : null;

        if (!property) return;

        setProjectImage(property.featuredImageUrl || "/hero-building.jpg");

        // Towers/units aren't modeled in WordPress yet (no CPT or REST
        // endpoint for them) - left empty until that backend data exists,
        // rather than pointed at a fetch that can't return real data.
        setTowers([]);
        setUnits({});
      } catch (error) {
        console.error("Masterplan fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchMasterplan();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Masterplan...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14">
          <p className="uppercase tracking-[0.3em] text-orange-400 mb-4">
            Interactive Masterplan
          </p>

          <h1 className="text-5xl md:text-7xl font-bold">
            Explore Project Layout
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl">
            Select a tower and explore live inventory.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Masterplan */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-white/10">
            <img
              src={projectImage}
              alt="Masterplan"
              className="w-full h-[700px] object-cover"
            />

            {towers.map((tower, index) => (
              <button
                key={tower.id}
                onClick={() => setSelectedTower(tower.id)}
                className="absolute w-6 h-6 rounded-full bg-orange-500 border-2 border-white animate-pulse"
                style={{
                  top: `${30 + index * 18}%`,
                  left: `${25 + index * 20}%`,
                }}
              />
            ))}
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Towers */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Towers</h2>

              <div className="space-y-4">
                {towers.map((tower) => (
                  <button
                    key={tower.id}
                    onClick={() => setSelectedTower(tower.id)}
                    className={`w-full text-left p-4 rounded-xl border transition ${
                      selectedTower === tower.id
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-white/10"
                    }`}
                  >
                    <h3 className="font-semibold">{tower.name}</h3>
                    <p className="text-sm text-gray-400">
                      {tower.floors} Floors • {tower.status}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Units */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">Available Units</h2>

              <div className="space-y-4">
                {(units[selectedTower] || []).map((unit, index) => (
                  <div
                    key={index}
                    className="border border-white/10 rounded-xl p-4"
                  >
                    <h3 className="font-semibold">{unit.unit}</h3>
                    <p className="text-gray-400">{unit.type}</p>
                    <p className="text-gray-400">{unit.area}</p>
                    <p className="text-orange-400 font-semibold mt-2">
                      {unit.price}
                    </p>
                    <p className="text-sm mt-2">{unit.status}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
