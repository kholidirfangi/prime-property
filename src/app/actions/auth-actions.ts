"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { createSession } from "@/lib/auth";


export async function loginAction(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
  return {
    success: false,
    message: "Email atau password salah",
  };
}

if (!user.isActive) {
  return {
    success: false,
    message: "Akun dinonaktifkan",
  };
}

if (user.lockedUntil && user.lockedUntil > new Date()) {
  return {
    success: false,
    message: "Akun sementara dikunci. Coba lagi beberapa menit lagi.",
  };
}

  const isPasswordValid = await bcrypt.compare(password, user.password);

 if (!isPasswordValid) {
  const now = new Date();

  let failedCount = user.failedLoginCount;
  let startedAt = user.failedLoginStartedAt;

  // gagal pertama
  if (!startedAt) {
    failedCount = 1;
    startedAt = now;
  } else {
    const diffMinutes =
      (now.getTime() - startedAt.getTime()) / (1000 * 60);

    // window 30 menit sudah lewat → reset
    if (diffMinutes > 30) {
      failedCount = 1;
      startedAt = now;
    } else {
      failedCount += 1;
    }
  }

  // lock akun
  if (failedCount >= 5) {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        failedLoginCount: 0,
        failedLoginStartedAt: null,
        lockedUntil: new Date(
          now.getTime() + 15 * 60 * 1000
        ),
      },
    });

    return {
      success: false,
      message:
        "Terlalu banyak percobaan login. Akun dikunci selama 15 menit.",
    };
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      failedLoginCount: failedCount,
      failedLoginStartedAt: startedAt,
    },
  });

  return {
    success: false,
    message: "Email atau password salah",
  };
}

await prisma.user.update({
  where: {
    id: user.id,
  },
  data: {
    failedLoginCount: 0,
    failedLoginStartedAt: null,
    lockedUntil: null,
  },
});

  const token = await createSession({
    userId: user.id,
    role: user.role,
  });

  const cookieStore = await cookies();

  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });


  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}
