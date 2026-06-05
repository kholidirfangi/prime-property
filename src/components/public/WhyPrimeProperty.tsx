import {
  Database,
  BadgeCheck,
  Zap,
  Smartphone,
} from "lucide-react";

const features = [
  {
    title: "Data Terpusat",
    description:
      "Seluruh data properti tersimpan dalam satu sistem yang terorganisir.",
    icon: Database,
  },
  {
    title: "Informasi Akurat",
    description:
      "Status properti selalu diperbarui sehingga meminimalkan kesalahan informasi.",
    icon: BadgeCheck,
  },
  {
    title: "Proses Lebih Cepat",
    description:
      "Memudahkan pencarian dan pengelolaan properti secara efisien.",
    icon: Zap,
  },
  {
    title: "Mobile Responsive",
    description:
      "Nyaman digunakan di desktop, tablet, maupun smartphone.",
    icon: Smartphone,
  },
];

export default function WhyPrimeProperty() {
  return (
    <section className="bg-[#F5F5F5] py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[#1A1A1A]">
            Mengapa Prime Property?
          </h2>

          <p className="mt-3 text-gray-600">
            Solusi modern untuk pengelolaan properti yang
            lebih profesional dan efisien.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-xl bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#C9A961]/10">
                  <Icon
                    size={24}
                    className="text-[#C9A961]"
                  />
                </div>

                <h3 className="text-lg font-semibold text-[#1A1A1A]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}