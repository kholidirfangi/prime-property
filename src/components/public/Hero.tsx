import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-[#1A1A1A]">
      <div className="mx-auto max-w-7xl px-4 py-24 text-center lg:px-8">
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          Prime Property
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-300">
          Platform manajemen properti profesional untuk
          mengelola data properti, memantau status unit,
          dan mempercepat proses pemasaran.
        </p>

        <div className="mt-10">
          <Link
            href="/property"
            className="rounded-lg bg-[#C9A961] px-6 py-3 font-semibold text-black transition hover:opacity-90"
          >
            Lihat Properti
          </Link>
        </div>
      </div>
    </section>
  );
}