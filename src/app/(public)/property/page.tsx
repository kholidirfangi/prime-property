import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import { PropertyStatus } from "@prisma/client";

export default async function PropertyPage({
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

  const PAGE_SIZE = 9;

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
    <main>
      <section className="bg-[#1A1A1A] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold text-white">Daftar Properti</h1>

          <p className="mt-3 text-gray-300">
            Temukan properti terbaik sesuai kebutuhan Anda.
          </p>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-4">
          <form className="flex flex-col gap-3 md:flex-row">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Cari properti atau lokasi..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#C9A961]"
            />

            <button
              type="submit"
              className="rounded-lg bg-[#C9A961] px-6 py-3 font-medium text-black transition hover:opacity-90"
            >
              Cari
            </button>

            {status && <input type="hidden" name="status" value={status} />}
          </form>
        </div>
      </section>

      <section className="pb-8">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4">
          <Link
            href={`/property${
              search ? `?search=${encodeURIComponent(search)}` : ""
            }`}
            className={`rounded-lg px-4 py-2 text-sm ${
              !status ? "bg-[#1A1A1A] text-white" : "border bg-white"
            }`}
          >
            Semua
          </Link>

          <Link
            href={`/property?status=AVAILABLE${
              search ? `&search=${encodeURIComponent(search)}` : ""
            }`}
            className={`rounded-lg px-4 py-2 text-sm ${
              status === "AVAILABLE"
                ? "bg-green-600 text-white"
                : "border bg-white"
            }`}
          >
            Tersedia
          </Link>

          <Link
            href={`/property?status=BOOKED${
              search ? `&search=${encodeURIComponent(search)}` : ""
            }`}
            className={`rounded-lg px-4 py-2 text-sm ${
              status === "BOOKED"
                ? "bg-yellow-500 text-white"
                : "border bg-white"
            }`}
          >
            Dibooking
          </Link>

          <Link
            href={`/property?status=SOLD${
              search ? `&search=${encodeURIComponent(search)}` : ""
            }`}
            className={`rounded-lg px-4 py-2 text-sm ${
              status === "SOLD" ? "bg-red-600 text-white" : "border bg-white"
            }`}
          >
            Terjual
          </Link>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4">
          {properties.length === 0 ? (
            <div className="rounded-xl border bg-white p-10 text-center">
              <h3 className="text-xl font-semibold">
                Tidak ada properti ditemukan
              </h3>

              <p className="mt-2 text-gray-500">
                Coba ubah kata kunci pencarian atau filter.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {properties.map((property) => (
                <Link
                  key={property.id}
                  href={`/property/${property.slug}`}
                  className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={
                        property.images[0]?.imageUrl ??
                        "/placeholder-property.jpg"
                      }
                      alt={property.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {property.featured && (
                      <span className="absolute left-3 top-3 rounded-full bg-[#C9A961] px-3 py-1 text-xs font-semibold text-black">
                        Unggulan
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="mb-2">
                      <h2 className="line-clamp-1 text-xl font-bold text-[#1A1A1A]">
                        {property.title}
                      </h2>

                      <p className="text-sm text-gray-500">
                        {property.location}
                      </p>
                    </div>

                    <div className="mb-4 text-2xl font-bold text-[#C9A961]">
                      Rp {Number(property.price).toLocaleString("id-ID")}
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>🛏 {property.bedrooms ?? "-"}</span>

                      <span>🚿 {property.bathrooms ?? "-"}</span>

                      <span>📐 {property.landSize ?? "-"} m²</span>
                    </div>

                    <div className="mt-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
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
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {totalPages > 1 && (
  <section className="pb-16">
    <div className="flex items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={`/property?page=${currentPage - 1}${
            status ? `&status=${status}` : ""
          }${
            search
              ? `&search=${encodeURIComponent(search)}`
              : ""
          }`}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          ←
        </Link>
      )}

      {Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map((pageNumber) => (
        <Link
          key={pageNumber}
          href={`/property?page=${pageNumber}${
            status ? `&status=${status}` : ""
          }${
            search
              ? `&search=${encodeURIComponent(search)}`
              : ""
          }`}
          className={`rounded-lg px-4 py-2 ${
            pageNumber === currentPage
              ? "bg-[#1A1A1A] text-white"
              : "border hover:bg-gray-50"
          }`}
        >
          {pageNumber}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link
          href={`/property?page=${currentPage + 1}${
            status ? `&status=${status}` : ""
          }${
            search
              ? `&search=${encodeURIComponent(search)}`
              : ""
          }`}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50"
        >
          →
        </Link>
      )}
    </div>
  </section>
)}
    </main>
  );
}
