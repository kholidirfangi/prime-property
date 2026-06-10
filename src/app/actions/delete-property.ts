"use server";

import { createAuditLog } from "@/lib/audit-log";
import { prisma } from "@/lib/prisma";
import { requireSuperadmin } from "@/lib/require-superadmin";
import { revalidatePath } from "next/cache";

export async function deleteProperty(id: string) {
  const user = await requireSuperadmin();

  const property = await prisma.property.delete({
    where: {
      id,
    },
  });

  await createAuditLog({
    action: "DELETE_PROPERTY",

    entityType: "PROPERTY",
    entityId: property?.id,

    description: `Menghapus property ${property?.title}`,

    performedById: user.id,
  });

  revalidatePath("/dashboard/properties");

  return {
    success: true,
  };
}
