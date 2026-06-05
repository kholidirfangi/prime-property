export default function ContactPage() {
  return (
    <main className="bg-white">
      <section className="bg-[#1A1A1A] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold text-white">Hubungi Kami</h1>

          <p className="mt-4 text-gray-300">
            Kami siap membantu kebutuhan properti Anda.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-[#F5F5F5] p-6">
            <h3 className="font-semibold">Telepon</h3>

            <p className="mt-2 text-gray-600">+62 812-3456-7890</p>
          </div>

          <div className="rounded-xl bg-[#F5F5F5] p-6">
            <h3 className="font-semibold">WhatsApp</h3>

            <p className="mt-2 text-gray-600">+62 812-3456-7890</p>
          </div>

          <div className="rounded-xl bg-[#F5F5F5] p-6">
            <h3 className="font-semibold">Email</h3>

            <p className="mt-2 text-gray-600">info@primeproperty.id</p>
          </div>
        </div>
      </section>
    </main>
  );
}
