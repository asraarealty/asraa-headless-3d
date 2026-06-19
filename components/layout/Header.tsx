"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MenuItem = {
  label: string;
  uri: string;
};

export default function Header() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("https://asraarealty.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              {
                menu(id: "Group Home 1", idType: NAME) {
                  menuItems {
                    nodes {
                      label
                      uri
                    }
                  }
                }
              }
            `,
          }),
        });

        const json = await res.json();
        setMenu(json?.data?.menu?.menuItems?.nodes || []);
      } catch (error) {
        console.error("Menu fetch failed:", error);
      }
    }

    fetchMenu();

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl rounded-full border transition-all duration-500 ${
        scrolled
          ? "bg-black/85 border-white/10 backdrop-blur-2xl shadow-2xl"
          : "bg-white/5 border-white/5 backdrop-blur-xl"
      }`}
    >
      <div className="flex items-center justify-between px-8 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="Asraa Realty"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.uri}
              className="text-sm uppercase tracking-[0.15em] text-white/90 hover:text-white transition duration-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black transition duration-300 hover:scale-105 hover:bg-zinc-200"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}
