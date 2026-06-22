"use client";

import { useState } from "react";

const towers = [
  {
    id: "tower-a",
    name: "Tower A",
    floors: 22,
    status: "Available",
  },
  {
    id: "tower-b",
    name: "Tower B",
    floors: 18,
    status: "Limited",
  },
  {
    id: "tower-c",
    name: "Tower C",
    floors: 25,
    status: "Available",
  },
];

const units = {
  "tower-a": [
    {
      unit: "A-1201",
      type: "2 BHK",
      area: "725 sqft",
      price: "₹1.45 Cr",
      status: "Available",
    },
    {
      unit: "A-1202",
      type: "3 BHK",
      area: "1100 sqft",
      price: "₹2.10 Cr",
      status: "Reserved",
    },
  ],
  "tower-b": [
    {
      unit: "B-903",
      type: "2 BHK",
      area: "680 sqft",
      price: "₹1.25 Cr",
      status: "Available",
    },
  ],
  "tower-c": [
    {
      unit: "C-1501",
      type: "4 BHK",
      area: "1600 sqft",
      price: "₹3.25 Cr",
      status: "Available",
    },
  ],
};

export default function MasterplanPage() {
  const [selectedTower, setSelectedTower] = useState("tower-a");

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
            Select a tower, explore floors, and check unit inventory in real
            time.
          </p>
        </div>

        {/* Masterplan Section */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left - Masterplan Image */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-white/10">
            <img
              src="/hero-building.jpg"
              alt="Masterplan"
              className="w-full h-[700px] object-cover"
            />

            {/* Hotspots */}
            <button
              onClick={() => setSelectedTower("tower-a")}
              className="absolute top-[35%] left-[25%] w-6 h-6 rounded-full bg-orange-500 border-2 border-white"
            />

            <button
              onClick={() => setSelectedTower("tower-b")}
              className="absolute top-[48%] left-[55%] w-6 h-6 rounded-full bg-orange-500 border-2 border-white"
            />

            <button
              onClick={() => setSelectedTower("tower-c")}
              className="absolute top-[65%] left-[72%] w-6 h-6 rounded-full bg-orange-500 border-2 border-white"
            />
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
                {units[selectedTower as keyof typeof units].map((unit, index) => (
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
