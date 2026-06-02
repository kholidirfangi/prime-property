import Link from "next/link";
import { prisma } from "@/lib/prisma";
import DeletePropertyButton from "@/components/DeletePropertyButton";
import Image from "next/image";

export default async function PropertiesPage() {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Properties</h1>

        <Link
          href="/dashboard/properties/create"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Tambah Property
        </Link>
      </div>

      <div className="space-y-4">
        {properties.length === 0 ? (
          <div className="rounded border p-6">Belum ada property.</div>
        ) : (
          properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              {property.imageUrl && (
                <Image width={600} height={600}
                  src={property.imageUrl}
                  alt={property.title}
                  className="h-56 w-full object-cover"
                />
              )}

              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">{property.title}</h2>

                    <p className="text-sm text-gray-500">
                      📍 {property.location}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-[#C9A961]">
                      Rp {Number(property.price).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-gray-600">
                  {property.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  <span>🛏 {property.bedrooms ?? "-"}</span>
                  <span>🚿 {property.bathrooms ?? "-"}</span>
                  <span>📐 {property.landSize ?? "-"} m²</span>
                  <span>🏠 {property.buildingSize ?? "-"} m²</span>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/dashboard/properties/${property.id}/edit`}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <DeletePropertyButton id={property.id} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
