import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import DeletePropertyButton from "@/components/DeletePropertyButton";
import { PropertyStatus } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const { status, search, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const user = await getCurrentUser();

  const PAGE_SIZE = 10;

  const where = {
    ...(status &&
      status !== "ALL" && {
        status: status as PropertyStatus,
      }),

    ...(search && {
      OR: [
        {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
        {
          location: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      ],
    }),
  };

  const totalProperties = await prisma.property.count({
    where,
  });

  const totalPages = Math.ceil(totalProperties / PAGE_SIZE);

  const properties = await prisma.property.findMany({
    where,

    include: {
      images: true,
    },

    orderBy: {
      createdAt: "desc",
    },

    skip: (currentPage - 1) * PAGE_SIZE,

    take: PAGE_SIZE,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Properties</h1>

        {user?.role === "SUPERADMIN" && (
          <Link href="/dashboard/properties/create">Tambah Property</Link>
        )}
      </div>

      <div className="mb-6">
        <form className="flex gap-2">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Cari property..."
            className="flex-1 rounded-lg border px-4 py-2"
          />

          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Cari
          </button>

          {status && <input type="hidden" name="status" value={status} />}
        </form>
      </div>

      {/* FILTER */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Link
          href={`/dashboard/properties${
            search ? `?search=${encodeURIComponent(search)}` : ""
          }`}
          className={`rounded-lg px-4 py-2 text-sm ${
            !status ? "bg-black text-white" : "border bg-white hover:bg-gray-50"
          }`}
        >
          Semua
        </Link>

        <Link
          href={`/dashboard/properties?status=AVAILABLE${
            search ? `&search=${encodeURIComponent(search)}` : ""
          }`}
          className={`rounded-lg px-4 py-2 text-sm ${
            status === "AVAILABLE"
              ? "bg-green-600 text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          Tersedia
        </Link>

        <Link
          href={`/dashboard/properties?status=BOOKED${
            search ? `&search=${encodeURIComponent(search)}` : ""
          }`}
          className={`rounded-lg px-4 py-2 text-sm ${
            status === "BOOKED"
              ? "bg-yellow-500 text-white"
              : "border bg-white hover:bg-gray-50"
          }`}
        >
          Dibooking
        </Link>

        <Link
          href={`/dashboard/properties?status=SOLD${
            search ? `&search=${encodeURIComponent(search)}` : ""
          }`}
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
                      Rp {Number(property.price).toLocaleString("id-ID")}
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

                    {user?.role === "SUPERADMIN" && (
                      <Link
                        href={`/dashboard/properties/${property.id}/edit`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>
                    )}

                    {user?.role === "SUPERADMIN" && (
                      <DeletePropertyButton id={property.id} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={`/dashboard/properties?page=${currentPage - 1}${
                status ? `&status=${status}` : ""
              }${search ? `&search=${encodeURIComponent(search)}` : ""}`}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              ← Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Link
                key={pageNumber}
                href={`/dashboard/properties?page=${pageNumber}${
                  status ? `&status=${status}` : ""
                }${search ? `&search=${encodeURIComponent(search)}` : ""}`}
                className={`rounded-lg px-4 py-2 ${
                  pageNumber === currentPage
                    ? "bg-black text-white"
                    : "border hover:bg-gray-50"
                }`}
              >
                {pageNumber}
              </Link>
            ),
          )}

          {currentPage < totalPages && (
            <Link
              href={`/dashboard/properties?page=${currentPage + 1}${
                status ? `&status=${status}` : ""
              }${search ? `&search=${encodeURIComponent(search)}` : ""}`}
              className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
