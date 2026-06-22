import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <img
              src="/logo.png"
              alt="Asraa Realty"
              className="h-14 w-auto mb-6"
            />

            <p className="text-zinc-400 leading-relaxed">
              Premium real estate advisory focused on wealth creation through
              strategic property investments, luxury residences, and commercial
              opportunities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Explore</h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <Link href="/" className="hover:text-amber-400 transition">
                Home
              </Link>

              <Link href="/projects" className="hover:text-amber-400 transition">
                Projects
              </Link>

              <Link href="/commercial" className="hover:text-amber-400 transition">
                Commercial
              </Link>

              <Link href="/valuation" className="hover:text-amber-400 transition">
                Property Valuation
              </Link>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Top Locations</h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <Link href="/location/mira-road" className="hover:text-amber-400 transition">
                Mira Road
              </Link>

              <Link href="/location/thane" className="hover:text-amber-400 transition">
                Thane
              </Link>

              <Link href="/location/kandivali" className="hover:text-amber-400 transition">
                Kandivali
              </Link>

              <Link href="/location/dubai" className="hover:text-amber-400 transition">
                Dubai
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Connect</h3>

            <div className="flex flex-col gap-3 text-zinc-400">
              <a
                href="tel:+919619973211"
                className="hover:text-amber-400 transition"
              >
                +91 96199 73211
              </a>

              <a
                href="mailto:info@asraarealty.com"
                className="hover:text-amber-400 transition"
              >
                info@asraarealty.com
              </a>

              <a
                href="https://wa.me/919619973211"
                target="_blank"
                className="hover:text-amber-400 transition"
              >
                WhatsApp
              </a>

              <Link href="/contact" className="hover:text-amber-400 transition">
                Contact Form
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Asraa Realty. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
