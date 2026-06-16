"use client";

import { useState } from "react";

type OfferPopupProps = {
  title?: string;
  scheme?: string;
  discount?: string;
  inventory?: string;
  propertyTitle?: string;
};

export default function OfferPopup({
  title = "Unlock Offers",
  scheme,
  discount,
  inventory,
  propertyTitle,
}: OfferPopupProps) {
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const payload = {
      name: form.get("name"),
      phone: form.get("phone"),
      email: form.get("email"),
      property: propertyTitle,
      scheme,
      discount,
      inventory,
    };

    console.log("Lead Data:", payload);

    // NEXT STEP:
    // connect this to CRM / WP API
    // await fetch("/api/leads", { method: "POST", body: JSON.stringify(payload) });

    alert("Offer unlocked. Our team will contact you shortly.");
    setOpen(false);
  };

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="bg-amber-400 text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
      >
        {title}
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 w-full max-w-lg relative">

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white text-xl"
            >
              ✕
            </button>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-amber-400 mb-4">
              Unlock Developer Offer
            </h2>

            <p className="text-zinc-400 mb-6">
              Fill details to get latest pricing, inventory & monthly payment
              plans.
            </p>

            {/* Dynamic Backend Data */}
            <div className="bg-black border border-zinc-800 rounded-2xl p-4 mb-6 space-y-2 text-sm">
              {scheme && (
                <p className="text-zinc-300">
                  <strong>Scheme:</strong> {scheme}
                </p>
              )}

              {discount && (
                <p className="text-zinc-300">
                  <strong>Offer:</strong> {discount}
                </p>
              )}

              {inventory && (
                <p className="text-zinc-300">
                  <strong>Inventory:</strong> {inventory}
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
              />

              <input
                name="phone"
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
              />

              <button
                type="submit"
                className="w-full bg-amber-400 text-black py-4 rounded-xl font-bold"
              >
                Unlock Now
              </button>
            </form>

            {/* Quick Actions */}
            <div className="mt-6 flex gap-4">
              <a
                href="tel:+919619973211"
                className="flex-1 border border-zinc-700 py-3 rounded-xl text-center text-white"
              >
                Call
              </a>

              <a
                href={`https://wa.me/919619973211?text=Hi I want ${propertyTitle}`}
                target="_blank"
                className="flex-1 bg-green-500 text-white py-3 rounded-xl text-center"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
