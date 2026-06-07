import ContactForm from "@/components/public/ContactForm";

export default function ContactPage() {
  console.log(process.env.ADMIN_EMAIL);
  return (
    <main>
      {/* HERO */}
      <section className="bg-[#1A1A1A] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            Hubungi Prime Property
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-300">
            Tim kami siap membantu kebutuhan properti Anda, mulai dari
            konsultasi hingga transaksi.
          </p>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-4">
            <div className="rounded-xl border p-6">
              <h3 className="mb-2 font-semibold text-[#1A1A1A]">Alamat</h3>

              <p className="text-sm text-gray-600">
                Jl. Contoh No.123
                <br />
                Bandung, Indonesia
              </p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="mb-2 font-semibold text-[#1A1A1A]">Telepon</h3>

              <p className="text-sm text-gray-600">+62 812 3456 7890</p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="mb-2 font-semibold text-[#1A1A1A]">Email</h3>

              <p className="text-sm text-gray-600">hello@primeproperty.com</p>
            </div>

            <div className="rounded-xl border p-6">
              <h3 className="mb-2 font-semibold text-[#1A1A1A]">WhatsApp</h3>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                className="text-[#C9A961] hover:underline"
              >
                Chat via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section className="bg-[#F5F5F5] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-3xl font-bold">Lokasi Kantor</h2>

          <div className="overflow-hidden rounded-2xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb="
              width="100%"
              height="450"
              loading="lazy"
              className="border-0"
            />
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-8 text-center text-3xl font-bold">Kirim Pesan</h2>

          <ContactForm />
        </div>
      </section>
    </main>
  );
}
