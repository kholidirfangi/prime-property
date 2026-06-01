"use server";

import { prisma } from "@/lib/prisma";

type CreatePropertyInput = {
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

export async function createProperty(data: CreatePropertyInput) {
  console.log("START CREATE");
  console.log("DATA:", data);

  const slug = data.title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

  const property = await prisma.property.create({
    data: {
      title: data.title,
      slug,
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

  console.log("CREATED PROPERTY:", property);

  return {
    success: true,
  };
}
