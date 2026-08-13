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
  { label: "Commercial", uri: "https://asraarealty.com/property-type/commercial/" },
  { label: "Valuation", uri: "https://asraarealty.com/property-valuation/" },
  { label: "About", uri: "https://asraarealty.com/real-estate-agents-mira-road/" },
  { label: "Contact", uri: "https://asraarealty.com/contact/" },
];

// Only /property/{slug} has a real page on this headless site (the
// property detail route). Everything else in the WordPress menu -
// listing/archive pages, blog, contact, valuation, etc. - doesn't exist
// here yet, so it's left as the full live WordPress URL rather than
// rewritten into a path that would 404 on this app.
function normalizeUri(uri: string): string {
  if (!uri) return "/";

  const isAbsolute = uri.startsWith("http");

  let pathname = uri;

  if (isAbsolute) {
    try {
      pathname = new URL(uri).pathname;
    } catch {
      return uri;
    }
  }

  if (pathname === "/" || pathname === "") {
    return "/";
  }

  if (pathname.startsWith("/property/")) {
    const slug = pathname.replace("/property/", "").replace(/\/$/, "");
    return `/projects/${slug}`;
  }

  return isAbsolute ? uri : `https://asraarealty.com${pathname}`;
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

  const linkColor = scrolled
    ? "text-neutral-700 hover:text-amber-600"
    : "text-white hover:text-amber-300";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-10 py-2.5 md:py-3">
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Asraa Realty"
              className="h-8 md:h-9 w-auto object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {menu.map((item, index) =>
              item.children?.length ? (
                <div key={index} className="relative group">
                  <Link
                    href={item.uri}
                    className={`flex items-center gap-1 px-3 py-2 text-sm uppercase tracking-[0.1em] transition duration-300 ${linkColor}`}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300 group-hover:rotate-180"
                    />
                  </Link>

                  <div className="absolute left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out">
                    <div className="min-w-[220px] rounded-xl border border-black/5 bg-white shadow-xl overflow-hidden py-2">
                      {item.children.map((child, childIndex) => (
                        <Link
                          key={childIndex}
                          href={child.uri}
                          className="block px-5 py-2.5 text-sm text-neutral-700 hover:text-amber-600 hover:bg-neutral-50 transition duration-200"
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
                  className={`px-3 py-2 text-sm uppercase tracking-[0.1em] transition duration-300 ${linkColor}`}
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
              className={`text-sm px-5 py-2 rounded-full border transition duration-300 ${
                scrolled
                  ? "border-neutral-300 text-neutral-700 hover:border-amber-500 hover:text-amber-600"
                  : "border-white/40 text-white hover:border-amber-300 hover:text-amber-300"
              }`}
            >
              WhatsApp
            </Link>

            <Link
              href="https://asraarealty.com/contact/"
              className="rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-black transition duration-300 hover:bg-amber-400"
            >
              Contact
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden text-2xl ${scrolled ? "text-neutral-800" : "text-white"}`}
            aria-label="Toggle Menu"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-2 px-6 overflow-y-auto py-24">
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
                  className="flex items-center justify-center gap-2 w-full py-3 text-xl font-semibold text-neutral-900 hover:text-amber-600 transition"
                >
                  {item.label}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${
                      mobileExpanded === item.label ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <Link
                  href={item.uri}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-amber-600 pb-2"
                >
                  Go to {item.label}
                </Link>

                {mobileExpanded === item.label && (
                  <div className="flex flex-col items-center gap-1 pb-2">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.uri}
                        onClick={() => setMobileOpen(false)}
                        className="py-2 text-base text-neutral-600 hover:text-amber-600 transition"
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
                className="py-3 text-xl font-semibold text-neutral-900 hover:text-amber-600 transition"
              >
                {item.label}
              </Link>
            )
          )}

          <Link
            href="https://wa.me/919619973211"
            target="_blank"
            onClick={() => setMobileOpen(false)}
            className="mt-4 px-8 py-3 border border-neutral-300 rounded-xl text-neutral-800"
          >
            WhatsApp
          </Link>

          <Link
            href="https://asraarealty.com/contact/"
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
