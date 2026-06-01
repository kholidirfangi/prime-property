"use server";

import { prisma } from "@/lib/prisma";

type UpdatePropertyInput = {
  id: string;

  title: string;
  description: string;
  location: string;
  price: bigint;

  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  buildingSize?: number;

  imageUrl?: string;
};

export async function updateProperty(
  data: UpdatePropertyInput
) {
  await prisma.property.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      price: data.price,

      bedrooms: data.bedrooms,
      bathrooms: data.bathrooms,
      landSize: data.landSize,
      buildingSize: data.buildingSize,

      imageUrl: data.imageUrl,
    },
  });

  return {
    success: true,
  };
}