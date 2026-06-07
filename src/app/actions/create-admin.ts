"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requireSuperadmin } from "@/lib/require-superadmin";
import { Role } from "@prisma/client";

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

  await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  return {
    success: true,
    message: "Admin berhasil dibuat",
  };
}
