import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const [
    totalProperties,
    availableProperties,
    bookedProperties,
    soldProperties,
    featuredProperties,
  ] = await Promise.all([
    prisma.property.count(),

    prisma.property.count({
      where: {
        status: "AVAILABLE",
      },
    }),

    prisma.property.count({
      where: {
        status: "BOOKED",
      },
    }),

    prisma.property.count({
      where: {
        status: "SOLD",
      },
    }),

    prisma.property.count({
      where: {
        featured: true,
      },
    }),
  ]);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <p className="mt-2 text-gray-500">Selamat datang di Prime Property.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Total Property</p>

          <h3 className="mt-2 text-3xl font-bold">{totalProperties}</h3>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Tersedia</p>

          <h3 className="mt-2 text-3xl font-bold text-green-600">
            {availableProperties}
          </h3>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Dibooking</p>

          <h3 className="mt-2 text-3xl font-bold text-yellow-600">
            {bookedProperties}
          </h3>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Terjual</p>

          <h3 className="mt-2 text-3xl font-bold text-red-600">
            {soldProperties}
          </h3>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Property Unggulan</p>

          <h3 className="mt-2 text-3xl font-bold text-blue-600">
            {featuredProperties}
          </h3>
        </div>
      </div>
    </div>
  );
}
