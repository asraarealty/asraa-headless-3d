"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type MenuItem = {
  label: string;
  uri: string;
  children?: MenuItem[];
};

const fallbackMenu: MenuItem[] = [
  { label: "Home", uri: "/" },
  { label: "Projects", uri: "/projects" },
  { label: "Commercial", uri: "/commercial" },
  { label: "Valuation", uri: "/valuation" },
  { label: "About", uri: "/about" },
  { label: "Contact", uri: "/contact" },
];

function normalizeUri(uri: string) {
  if (!uri) return "/";

  if (uri.startsWith("http")) {
    const pathname = new URL(uri).pathname;

    if (pathname.startsWith("/property/")) {
      const slug = pathname.replace("/property/", "").replace(/\/$/, "");
      return `/projects/${slug}`;
    }

    return pathname;
  }

  if (uri.startsWith("/property/")) {
    const slug = uri.replace("/property/", "").replace(/\/$/, "");
    return `/projects/${slug}`;
  }

  return uri;
}

function normalizeMenu(items: MenuItem[]): MenuItem[] {
  return items.map((item) => ({
    label: item.label,
    uri: normalizeUri(item.uri),
    children: item.children?.length ? normalizeMenu(item.children) : undefined,
  }));
}

export default function Navbar() {
  const [menu, setMenu] = useState<MenuItem[]>(fallbackMenu);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(
          "https://asraarealty.com/wp-json/asraa/v1/menu/group-home-1",
          { cache: "no-store" }
        );

        if (!res.ok) {
          console.log("Menu fetch failed");
          return;
        }

        const wpMenu: MenuItem[] = await res.json();

        if (wpMenu.length > 0) {
          setMenu(normalizeMenu(wpMenu));
        }
      } catch (error) {
        console.log("Using fallback menu", error);
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
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-500 ${
          scrolled
            ? "bg-black/95 border-white/10 backdrop-blur-2xl shadow-lg"
            : "bg-black/20 border-white/0 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-4 md:py-5">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Asraa Realty"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {menu.map((item, index) =>
              item.children?.length ? (
                <div key={index} className="relative group">
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm uppercase tracking-[0.15em] text-white/90 hover:text-amber-400 transition duration-300"
                    type="button"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </button>

                  <div className="absolute left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <div className="min-w-[220px] rounded-2xl border border-white/10 bg-black/95 backdrop-blur-2xl shadow-2xl overflow-hidden py-2">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.uri}
                          className="block px-5 py-2.5 text-sm text-white/80 hover:text-amber-400 hover:bg-white/5 transition duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={item.uri}
                  className="relative px-4 py-2 text-sm uppercase tracking-[0.15em] text-white/90 hover:text-amber-400 transition duration-300 after:content-[''] after:absolute after:left-4 after:right-4 after:-bottom-0.5 after:h-px after:bg-amber-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="https://wa.me/919619973211"
              target="_blank"
              className="text-sm text-white border border-white/20 px-5 py-2 rounded-full hover:border-amber-400 hover:text-amber-400 transition duration-300"
            >
              WhatsApp
            </Link>

            <Link
              href="/contact"
              className="rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.15em] text-black transition duration-300 hover:bg-amber-400 hover:scale-105"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white text-2xl"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-2 px-6 overflow-y-auto py-24">
          {menu.map((item, index) =>
            item.children?.length ? (
              <div key={index} className="w-full max-w-xs text-center">
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === item.label ? null : item.label
                    )
                  }
                  className="flex items-center justify-center gap-2 w-full py-3 text-xl font-semibold text-white hover:text-amber-400 transition"
                >
                  {item.label}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      mobileExpanded === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileExpanded === item.label && (
                  <div className="flex flex-col items-center gap-1 pb-2">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.uri}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 text-base text-white/70 hover:text-amber-400 transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={index}
                href={item.uri}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-xl font-semibold text-white hover:text-amber-400 transition"
              >
                {item.label}
              </Link>
            )
          )}

          <Link
            href="https://wa.me/919619973211"
            target="_blank"
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
