import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asraa Realty",
  description: "Premium Real Estate Advisory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen bg-black text-white flex flex-col">

        {/* GLOBAL HEADER */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

            {/* LOGO */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Asraa Realty"
                width={220}
                height={80}
                priority
                className="h-auto w-auto max-h-16 object-contain"
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium">

              <Link href="/" className="hover:text-amber-400 transition">
                Home
              </Link>

              <Link href="/properties" className="hover:text-amber-400 transition">
                Properties
              </Link>

              <Link href="/projects" className="hover:text-amber-400 transition">
                Projects
              </Link>

              <Link href="/about" className="hover:text-amber-400 transition">
                About
              </Link>

              <Link href="/contact" className="hover:text-amber-400 transition">
                Contact
              </Link>
            </nav>

            {/* CTA */}
            <Link
              href="/contact"
              className="hidden md:flex border border-amber-500 text-amber-400 px-5 py-2 rounded-xl hover:bg-amber-500 hover:text-black transition"
            >
              Connect
            </Link>

            {/* MOBILE MENU */}
            <button className="md:hidden text-2xl text-white">
              ☰
            </button>

          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 pt-24">
          {children}
        </main>

        {/* GLOBAL FOOTER */}
        <Footer />

      </body>
    </html>
  );
}
