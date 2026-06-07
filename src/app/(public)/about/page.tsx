export default function AboutPage() {
  return (
    <main>
      <section className="bg-[#1A1A1A] py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-white">
            Tentang Prime Property
          </h1>

          <p className="mt-4 max-w-3xl text-gray-300">
            Prime Property adalah platform properti modern yang
            membantu masyarakat menemukan properti terbaik dengan
            informasi yang jelas, akurat, dan terpercaya.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-[#1A1A1A]">
                Visi Kami
              </h2>

              <p className="text-gray-600">
                Menjadi platform properti terpercaya yang
                menghubungkan pembeli, penjual, dan agen properti
                secara efisien dan transparan.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold text-[#1A1A1A]">
                Misi Kami
              </h2>

              <ul className="space-y-3 text-gray-600">
                <li>
                  • Menyediakan informasi properti yang akurat.
                </li>

                <li>
                  • Membantu proses pencarian properti menjadi lebih mudah.
                </li>

                <li>
                  • Memberikan pengalaman pengguna yang modern.
                </li>

                <li>
                  • Mendukung profesional properti dalam mengelola listing.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}