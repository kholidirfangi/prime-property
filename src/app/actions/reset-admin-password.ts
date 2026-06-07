"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireSuperadmin } from "@/lib/require-superadmin";

export async function resetAdminPassword(
  userId: string,
  newPassword: string,
) {
  await requireSuperadmin();

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

  const hashedPassword = await bcrypt.hash(
    newPassword,
    10,
  );

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

  return {
    success: true,
    message: "Password berhasil direset",
  };
}