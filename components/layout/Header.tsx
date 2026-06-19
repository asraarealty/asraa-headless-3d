"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MenuItem = {
  label: string;
  uri: string;
};

export default function Header() {
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function fetchMenu() {
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
    }

    fetchMenu();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/">
          <img
            src="/logo.png"
            alt="Asraa Realty"
            className="h-14 object-contain"
          />
        </Link>

        {/* Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.uri}
              className="text-white hover:text-amber-400 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="bg-amber-500 text-black px-5 py-2 rounded-xl font-semibold hover:scale-105 transition"
        >
          Contact
        </Link>
      </div>
    </header>
  );
}
