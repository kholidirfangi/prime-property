"use server";

import { prisma } from "@/lib/prisma";
import { PropertyStatus } from "@prisma/client";

type CreatePropertyInput = {
  title: string;
  description: string;
  location: string;

  price: bigint;
  status: PropertyStatus;

  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  buildingSize?: number;

  imageUrl?: string;
};

export async function createProperty(
  data: CreatePropertyInput
) {
  const slug =
    data.title.toLowerCase().replace(/\s+/g, "-") +
    "-" +
    Date.now();

  await prisma.property.create({
    data: {
      title: data.title,
      slug,

      description: data.description,
      location: data.location,

      price: data.price,
      status: data.status,

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