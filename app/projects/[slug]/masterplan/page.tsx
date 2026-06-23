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
        const res = await fetch("https://asraarealty.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              query GetProject($slug: ID!) {
                property(id: $slug, idType: SLUG) {
                  title
                  featuredImage {
                    node {
                      sourceUrl
                    }
                  }
                  towers {
                    nodes {
                      id
                      title
                      towerMeta {
                        floors
                        status
                      }
                      units {
                        nodes {
                          title
                          unitMeta {
                            type
                            area
                            price
                            status
                          }
                        }
                      }
                    }
                  }
                }
              }
            `,
            variables: {
              slug,
            },
          }),
        });

        const json = await res.json();
        const property = json?.data?.property;

        if (!property) return;

        setProjectImage(
          property.featuredImage?.node?.sourceUrl || "/hero-building.jpg"
        );

        const towerData =
          property.towers?.nodes?.map((tower: any) => ({
            id: tower.id,
            name: tower.title,
            floors: tower.towerMeta?.floors || 0,
            status: tower.towerMeta?.status || "Available",
          })) || [];

        setTowers(towerData);

        if (towerData.length > 0) {
          setSelectedTower(towerData[0].id);
        }

        const unitMap: Record<string, Unit[]> = {};

        property.towers?.nodes?.forEach((tower: any) => {
          unitMap[tower.id] =
            tower.units?.nodes?.map((unit: any) => ({
              unit: unit.title,
              type: unit.unitMeta?.type || "N/A",
              area: unit.unitMeta?.area || "N/A",
              price: unit.unitMeta?.price || "Price on Request",
              status: unit.unitMeta?.status || "Available",
            })) || [];
        });

        setUnits(unitMap);
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
