"use server";

import { prisma } from "@/lib/prisma";
import { requireSuperadmin } from "@/lib/require-superadmin";
import { revalidatePath } from "next/cache";

export async function deleteProperty(id: string) {
  await requireSuperadmin();
  await prisma.property.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/properties");

  return {
    success: true,
  };
}
