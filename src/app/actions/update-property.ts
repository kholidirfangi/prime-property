"use server";

import { prisma } from "@/lib/prisma";
import { PropertyStatus } from "@prisma/client";

type UpdatePropertyInput = {
  id: string;

  title: string;
  description: string;
  location: string;
  price: bigint;
  status: PropertyStatus;

  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  buildingSize?: number;

  imageUrls?: string[];
};

export async function updateProperty(data: UpdatePropertyInput) {
  await prisma.property.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      price: data.price,
      status: data.status,

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

  return {
    success: true,
  };
}
