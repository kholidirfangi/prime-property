"use server";

import { prisma } from "@/lib/prisma";
import { PropertyStatus } from "@prisma/client";
import { requireSuperadmin } from "@/lib/require-superadmin";

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
  await requireSuperadmin();
  const slug = data.title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

  const images =
    data.imageUrls?.map((url) => ({
      imageUrl: url,
    })) ?? [];

  await prisma.property.create({
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

  return {
    success: true,
  };
}
