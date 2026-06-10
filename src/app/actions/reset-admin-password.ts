"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireSuperadmin } from "@/lib/require-superadmin";
import { createAuditLog } from "@/lib/audit-log";

export async function resetAdminPassword(userId: string, newPassword: string) {
  const currentUser = await requireSuperadmin();

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "User tidak ditemukan",
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,

      // reset login lockout juga
      failedLoginCount: 0,
      failedLoginStartedAt: null,
      lockedUntil: null,
    },
  });

  await createAuditLog({
    action: "RESET_PASSWORD",

    entityType: "USER",
    entityId: user.id,

    description: `Reset password ${user.email}`,

    performedById: currentUser.id,
  });

  return {
    success: true,
    message: "Password berhasil direset",
  };
}
