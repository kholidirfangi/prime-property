"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteProperty(
  id: string
) {
  await prisma.property.delete({
    where: {
      id,
    },
  });

  revalidatePath(
    "/dashboard/properties"
  );

  return {
    success: true,
  };
}