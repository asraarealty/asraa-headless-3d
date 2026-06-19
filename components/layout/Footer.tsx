import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">

        {/* Top Grid */}
        <div className="grid md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-amber-400 mb-4">
              Asraa Realty
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Premium real estate advisory for investors, home buyers,
              and commercial property seekers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-3 text-zinc-400">
              <Link href="/" className="hover:text-amber-400 transition">
                Home
              </Link>
              <Link href="/properties" className="hover:text-amber-400 transition">
                Properties
              </Link>
              <Link href="/about" className="hover:text-amber-400 transition">
                About
              </Link>
              <Link href="/contact" className="hover:text-amber-400 transition">
                Contact
              </Link>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Top Locations
            </h3>
            <div className="flex flex-col gap-3 text-zinc-400">
              <Link href="/properties?location=mira-road" className="hover:text-amber-400 transition">
                Mira Road
              </Link>
              <Link href="/properties?location=thane" className="hover:text-amber-400 transition">
                Thane
              </Link>
              <Link href="/properties?location=kandivali" className="hover:text-amber-400 transition">
                Kandivali
              </Link>
              <Link href="/properties?location=dubai" className="hover:text-amber-400 transition">
                Dubai
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">
              Contact
            </h3>
            <div className="flex flex-col gap-3 text-zinc-400">
              <p>📍 Mira Road, Mumbai</p>
              <p>📞 +91 9619973211</p>
              <p>✉ info@asraarealty.com</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-zinc-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
          <p>© {new Date().getFullYear()} Asraa Realty. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-amber-400 transition">
              Instagram
            </Link>
            <Link href="#" className="hover:text-amber-400 transition">
              Facebook
            </Link>
            <Link href="#" className="hover:text-amber-400 transition">
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
