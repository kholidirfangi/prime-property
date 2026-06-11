"use server";

import { prisma } from "@/lib/prisma";
import { PropertyStatus } from "@prisma/client";
import { requireSuperadmin } from "@/lib/require-superadmin";
import { createAuditLog } from "@/lib/audit-log";

type CreatePropertyInput = {
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

export async function createProperty(data: CreatePropertyInput) {
  const user = await requireSuperadmin();
  const slug = data.title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

  const images =
    data.imageUrls?.map((url) => ({
      imageUrl: url,
    })) ?? [];

  const property = await prisma.property.create({
    data: {
      title: data.title,
      slug,
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
        create: images,
      },
    },
  });

  await createAuditLog({
    action: "CREATE_PROPERTY",

    entityType: "PROPERTY",
    entityId: property.id,

    description: `Membuat property ${property.title}`,

    performedById: user.id,
  });

  return {
    success: true,
  };
}
