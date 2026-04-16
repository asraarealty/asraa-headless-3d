export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-black text-white text-center px-6">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-4">
        Asraa Realty
      </h1>

      {/* Subtext */}
      <p className="mb-6 text-lg text-gray-300">
        AI-powered property matching. No broker confusion.
      </p>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/91XXXXXXXXXX?text=Hi%20I%20want%20best%20property%20deals"
        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-white font-medium transition"
      >
        Get Deals on WhatsApp
      </a>

    </main>
  );
}
