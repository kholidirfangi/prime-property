import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-[#C9A961]">
              Prime Property
            </h3>

            <p className="mt-3 text-sm text-gray-300">
              Platform manajemen properti profesional
              untuk membantu pengelolaan data properti
              secara lebih efisien dan terorganisir.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 font-semibold text-[#C9A961]">
              Navigasi
            </h4>

            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/"
                className="text-gray-300 hover:text-white"
              >
                Beranda
              </Link>

              <Link
                href="/about"
                className="text-gray-300 hover:text-white"
              >
                Tentang Kami
              </Link>

              <Link
                href="/contact"
                className="text-gray-300 hover:text-white"
              >
                Kontak
              </Link>

              <Link
                href="/property"
                className="text-gray-300 hover:text-white"
              >
                Properti
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-[#C9A961]">
              Kontak
            </h4>

            <div className="space-y-2 text-sm text-gray-300">
              <p>📞 +62 812-3456-7890</p>

              <p>💬 WhatsApp: +62 812-3456-7890</p>

              <p>✉️ info@primeproperty.id</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Prime Property.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}