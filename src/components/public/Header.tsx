import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#1A1A1A]">
          Prime Property
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-[#1A1A1A] hover:text-[#C9A961]"
          >
            Beranda
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium text-[#1A1A1A] hover:text-[#C9A961]"
          >
            Tentang Kami
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium text-[#1A1A1A] hover:text-[#C9A961]"
          >
            Kontak
          </Link>
        </nav>

        {/* Login Agent */}
        <Link
          href="/agent/login"
          className="rounded-lg border border-[#C9A961] px-4 py-2 text-sm font-medium text-[#C9A961] transition hover:bg-[#C9A961] hover:text-black"
        >
          Login Agent
        </Link>
      </div>
    </header>
  );
}
