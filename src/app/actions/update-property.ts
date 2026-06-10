"use server";

import { createAuditLog } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";
import { requireSuperadmin } from "@/lib/require-superadmin";
import { PropertyStatus } from "@prisma/client";

type UpdatePropertyInput = {
  id: string;

  title: string;
  description: string;
  location: string;
  price: bigint;
  status: PropertyStatus;
  featured: boolean;

  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  buildingSize?: number;

  imageUrls?: string[];
};

export async function updateProperty(data: UpdatePropertyInput) {
  const user = await requireSuperadmin();
  const property = await prisma.property.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      price: data.price,
      status: data.status,
      featured: data.featured,

      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      landSize: data.landSize,
      buildingSize: data.buildingSize,

      images: {
        deleteMany: {},

        create:
          data.imageUrls?.map((url) => ({
            imageUrl: url,
          })) ?? [],
      },
    },
  });

  await createAuditLog({
    action: "UPDATE_PROPERTY",
    entityType: "PROPERTY",
    entityId: property.id,
    description: `Mengubah property ${property.title}`,
    performedById: user.id,
  });

  return {
    success: true,
  };
}
