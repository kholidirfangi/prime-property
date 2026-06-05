import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import PropertyCarousel from "@/components/PropertyCarousel";

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const property =
    await prisma.property.findUnique({
      where: {
        slug,
      },
      include: {
        images: true,
      },
    });

  if (!property) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <PropertyCarousel
        images={property.images}
      />

      <div className="mt-8">
        <h1 className="text-4xl font-bold">
          {property.title}
        </h1>

        <p className="mt-2 text-gray-500">
          {property.location}
        </p>

        <div className="mt-4 text-3xl font-bold text-green-600">
          Rp{" "}
          {Number(property.price).toLocaleString(
            "id-ID"
          )}
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-sm ${
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

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          🛏 {property.bedrooms ?? "-"}
        </div>

        <div>
          🚿 {property.bathrooms ?? "-"}
        </div>

        <div>
          📐 {property.landSize ?? "-"} m²
        </div>

        <div>
          🏠 {property.buildingSize ?? "-"} m²
        </div>
      </div>

      <div className="mt-8">
        <h2 className="mb-3 text-xl font-semibold">
          Deskripsi
        </h2>

        <p className="whitespace-pre-line">
          {property.description}
        </p>
      </div>
    </div>
  );
}