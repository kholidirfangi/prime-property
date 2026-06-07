import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PropertyForm from "../../create/PropertyForm";
import { requireSuperadmin } from "@/lib/require-superadmin";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  await requireSuperadmin();

  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Edit Property</h1>

      <PropertyForm property={property} />
    </div>
  );
}
