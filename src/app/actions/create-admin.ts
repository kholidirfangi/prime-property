"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireSuperadmin } from "@/lib/require-superadmin";
import { Role } from "@prisma/client";
import { createAuditLog } from "@/lib/audit-log";

type CreateAdminInput = {
  email: string;
  password: string;
  role: Role;
};

export async function createAdmin(data: CreateAdminInput) {
  await requireSuperadmin();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (existingUser) {
    return {
      success: false,
      message: "Email sudah digunakan",
    };
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const admin = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  const currentUser = await prisma.user.findFirst({
    where: {
      role: "SUPERADMIN",
    },
  });

  await createAuditLog({
    action: "CREATE_ADMIN",
    entityType: "USER",
    entityId: admin.id,
    description: `Membuat admin ${admin.email}`,
    performedById: currentUser?.id || "",
  });

  return {
    success: true,
    message: "Admin berhasil dibuat",
  };
}
