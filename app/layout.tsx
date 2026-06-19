import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

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

        {/* HEADER */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Asraa Realty"
                width={180}
                height={60}
                priority
                className="object-contain hover:scale-105 transition duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">

              <Link
                href="/"
                className="hover:text-amber-400 transition duration-300"
              >
                Home
              </Link>

              <Link
                href="/properties"
                className="hover:text-amber-400 transition duration-300"
              >
                Properties
              </Link>

              <Link
                href="/projects"
                className="hover:text-amber-400 transition duration-300"
              >
                Projects
              </Link>

              <Link
                href="/about"
                className="hover:text-amber-400 transition duration-300"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="hover:text-amber-400 transition duration-300"
              >
                Contact
              </Link>
            </nav>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:flex border border-amber-500 text-amber-400 px-5 py-2 rounded-xl hover:bg-amber-500 hover:text-black transition duration-300"
            >
              Connect
            </Link>

            {/* Mobile Button */}
            <button className="md:hidden text-white text-2xl">
              ☰
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 pt-24">
          {children}
        </main>

      </body>
    </html>
  );
}
