"use server";

import { prisma } from "@/lib/prisma";
import { requireSuperadmin } from "@/lib/require-superadmin";

export async function toggleAdminStatus(
  userId: string,
  isActive: boolean,
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

  // Mencegah superadmin menonaktifkan dirinya sendiri
  const currentUser = await requireSuperadmin();

  if (currentUser.id === user.id) {
    return {
      success: false,
      message: "Tidak dapat menonaktifkan akun sendiri",
    };
  }

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive,
    },
  });

  return {
    success: true,
    message: isActive
      ? "Admin berhasil diaktifkan"
      : "Admin berhasil dinonaktifkan",
  };
}