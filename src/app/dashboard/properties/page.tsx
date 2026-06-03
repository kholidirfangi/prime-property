import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import DeletePropertyButton from "@/components/DeletePropertyButton";
import { PropertyStatus } from "@prisma/client";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
  }>;
}) {
  const { status } = await searchParams;

  const properties = await prisma.property.findMany({
    where:
      status && status !== "ALL"
        ? {
            status: status as PropertyStatus,
          }
        : undefined,

    include: {
      images: true,
    },

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
          className="rounded-lg bg-black px-4 py-2 text-white transition hover:bg-neutral-800"
        >
          Tambah Property
        </Link>
      </div>

      {/* FILTER */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href="/dashboard/properties"
          className={`rounded-lg px-4 py-2 text-sm ${
            !status
              ? "bg-black text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          Semua
        </Link>

        <Link
          href="/dashboard/properties?status=AVAILABLE"
          className={`rounded-lg px-4 py-2 text-sm ${
            status === "AVAILABLE"
              ? "bg-green-600 text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          Tersedia
        </Link>

        <Link
          href="/dashboard/properties?status=BOOKED"
          className={`rounded-lg px-4 py-2 text-sm ${
            status === "BOOKED"
              ? "bg-yellow-500 text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          Dibooking
        </Link>

        <Link
          href="/dashboard/properties?status=SOLD"
          className={`rounded-lg px-4 py-2 text-sm ${
            status === "SOLD"
              ? "bg-red-600 text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          Terjual
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="rounded-lg border p-6">
          Tidak ada property ditemukan.
        </div>
      ) : (
        <div className="grid gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="overflow-hidden rounded-xl border bg-white shadow-sm"
            >
              <div className="grid gap-4 md:grid-cols-[300px_1fr]">
                <div className="relative h-55">
                  <Image
                    src={
                      property.images[0]?.imageUrl ??
                      "/placeholder-property.jpg"
                    }
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {property.title}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {property.location}
                      </p>
                    </div>

                    <span className="text-lg font-bold text-green-600">
                      Rp{" "}
                      {Number(property.price).toLocaleString("id-ID")}
                    </span>
                  </div>

                  {/* STATUS BADGE */}
                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        property.status === "AVAILABLE"
                          ? "bg-green-100 text-green-700"
                          : property.status === "BOOKED"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {property.status}
                    </span>
                  </div>

                  <p className="mt-3 line-clamp-2 text-gray-600">
                    {property.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <span>🛏 {property.bedrooms ?? "-"}</span>

                    <span>🚿 {property.bathrooms ?? "-"}</span>

                    <span>📐 {property.landSize ?? "-"} m²</span>

                    <span>🏠 {property.buildingSize ?? "-"} m²</span>

                    <span>📸 {property.images.length} Foto</span>
                  </div>

                  <div className="mt-5 flex gap-2">
                    <Link
                      href={`/property/${property.slug}`}
                      className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Lihat Detail
                    </Link>

                    <Link
                      href={`/dashboard/properties/${property.id}/edit`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <DeletePropertyButton id={property.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}