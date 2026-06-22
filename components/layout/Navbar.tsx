"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type MenuItem = {
  label: string;
  uri: string;
};

interface GraphQLMenuResponse {
  data?: {
    menu?: {
      menuItems?: {
        nodes?: MenuItem[];
      };
    };
  };
}

const fallbackMenu: MenuItem[] = [
  { label: "Home", uri: "/" },
  { label: "/projects", uri: "/projects" },
  { label: "Commercial", uri: "/commercial" },
  { label: "Valuation", uri: "/valuation" },
  { label: "About", uri: "/about" },
  { label: "Contact", uri: "/contact" },
];

export default function Navbar() {
  const [menu, setMenu] = useState<MenuItem[]>(fallbackMenu);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch("https://asraarealty.com/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: JSON.stringify({
            query: `
              query GetMenu {
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

        if (!res.ok) {
          console.log("GraphQL menu fetch failed");
          return;
        }

        const json: GraphQLMenuResponse = await res.json();
        const wpMenu = json?.data?.menu?.menuItems?.nodes || [];

        if (wpMenu.length > 0) {
          const normalizedMenu = wpMenu.map((item) => ({
            label: item.label,
            uri: item.uri.startsWith("http")
              ? new URL(item.uri).pathname
              : item.uri,
          }));

          setMenu(normalizedMenu);
        }
      } catch {
        console.log("Using fallback menu");
      }
    }

    fetchMenu();

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-4 md:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-7xl rounded-full border transition-all duration-500 ${
          scrolled
            ? "bg-black/90 border-white/10 backdrop-blur-2xl shadow-2xl"
            : "bg-white/5 border-white/5 backdrop-blur-xl"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Asraa Realty"
              className="h-9 md:h-12 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {menu.map((item, index) => (
              <Link
                key={index}
                href={item.uri}
                className="text-sm uppercase tracking-[0.15em] text-white/90 hover:text-amber-400 transition duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="https://wa.me/919619973211"
              className="text-sm text-white border border-white/20 px-5 py-2 rounded-full hover:border-amber-400 transition"
            >
              WhatsApp
            </Link>

            <Link
              href="/contact"
              className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-black transition duration-300 hover:scale-105"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white text-2xl"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 px-6">
          {menu.map((item, index) => (
            <Link
              key={index}
              href={item.uri}
              onClick={() => setMobileOpen(false)}
              className="text-xl font-semibold text-white hover:text-amber-400 transition"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="https://wa.me/919619973211"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 border border-white/20 rounded-xl text-white"
          >
            WhatsApp
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="px-8 py-4 bg-amber-500 text-black rounded-xl font-semibold"
          >
            Contact Us
          </Link>
        </div>
      )}
    </>
  );
}
