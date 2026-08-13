"use client";

import FadeIn from "../animations/FadeIn";

interface ProjectStatsProps {
  price: string;
  possession: string;
  developer: string;
}

export default function ProjectStats({
  price,
  possession,
  developer,
}: ProjectStatsProps) {
  const stats = [
    { label: "Starting Price", value: price },
    { label: "Possession", value: possession },
    { label: "Developer", value: developer },
  ];

  return (
    <section className="border-y border-white/10 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
        {stats.map((stat, index) => (
          <FadeIn key={index}>
            <div className="py-6 sm:py-0 sm:px-8 text-center sm:text-left">
              <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-3">
                {stat.label}
              </p>
              <p className="text-2xl md:text-3xl font-light text-white">
                {stat.value}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
