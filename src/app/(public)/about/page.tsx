export default function AboutPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#1A1A1A] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">
            Tentang Prime Property
          </h1>

          <p className="mt-4 text-gray-300">
            Platform manajemen properti modern untuk membantu pengelolaan
            listing secara profesional.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#1A1A1A]">Siapa Kami?</h2>

          <p className="text-gray-600">
            Prime Property hadir untuk membantu agen, developer, dan pemilik
            properti dalam mengelola data properti secara lebih rapi,
            terstruktur, dan mudah diakses.
          </p>

          <p className="text-gray-600">
            Kami percaya bahwa pengelolaan properti yang baik dimulai dari data
            yang akurat dan sistem yang mudah digunakan.
          </p>
        </div>
      </section>
    </main>
  );
}
