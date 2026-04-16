"use client";

import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* 3D Background */}
      <ThreeScene />

      {/* Overlay Content */}
      <div className="fixed inset-0 flex flex-col items-center justify-center text-center px-6 z-10 text-white">
        
        <h1 className="text-4xl font-bold mb-4">
          Asraa Realty
        </h1>

        <p className="mb-6 text-lg text-gray-300">
          AI-powered property matching. No broker confusion.
        </p>

        <a
          href="https://wa.me/919619973211?text=Hi%20I%20want%20best%20property%20deals"
          className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
        >
          Get Deals on WhatsApp
        </a>

      </div>
    </>
  );
}
