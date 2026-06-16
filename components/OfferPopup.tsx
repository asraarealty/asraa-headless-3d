"use client";

import { useState } from "react";

export default function OfferPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="bg-amber-400 text-black px-6 py-3 rounded-xl font-bold"
      >
        Unlock Offers
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 w-full max-w-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-amber-400 mb-4">
              Get Monthly Scheme
            </h2>

            <p className="text-zinc-400 mb-8">
              Fill details to unlock developer discounts, inventory & payment
              plans.
            </p>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-4 rounded-xl bg-black border border-zinc-700 text-white"
              />

              <button
                type="submit"
                className="w-full bg-amber-400 text-black py-4 rounded-xl font-bold"
              >
                Unlock Now
              </button>
            </form>

            <div className="mt-6 flex gap-4">
              <a
                href="tel:+919619973211"
                className="flex-1 border border-zinc-700 py-3 rounded-xl text-center"
              >
                Call
              </a>

              <a
                href="https://wa.me/919619973211"
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
