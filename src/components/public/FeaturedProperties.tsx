import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function FeaturedProperties() {
  const properties = await prisma.property.findMany({
    where: {
      featured: true,
      status: "AVAILABLE",
    },

    take: 6,

    orderBy: {
      createdAt: "desc",
    },
  });

  if (properties.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#1A1A1A]">
            Properti Unggulan
          </h2>

          <p className="mt-2 text-gray-500">
            Pilihan properti terbaik yang tersedia saat ini.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <Link
              key={property.id}
              href={`/property/${property.slug}`}
              className="rounded-xl border bg-[#F5F5F5] p-6 transition hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">
                {property.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {property.location}
              </p>

              <div className="mt-4 text-2xl font-bold text-[#C9A961]">
                Rp{" "}
                {Number(property.price).toLocaleString(
                  "id-ID"
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                <span>
                  🛏 {property.bedrooms ?? "-"}
                </span>

                <span>
                  🚿 {property.bathrooms ?? "-"}
                </span>

                <span>
                  📐 {property.landSize ?? "-"} m²
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}