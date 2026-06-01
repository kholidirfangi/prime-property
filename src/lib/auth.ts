import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET!;
const secret = new TextEncoder().encode(secretKey);
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function createSession(payload: {
  userId: string;
  role: string;
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySession(
  token: string
) {
  try {
    const { payload } = await jwtVerify(
      token,
      secret
    );

    return payload;
  } catch {
    return null;
  }
}

export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  const payload = await verifySession(token);

  if (!payload?.userId) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId as string,
    },
  });

  return user;
}