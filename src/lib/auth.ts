import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.AUTH_SECRET!;
const secret = new TextEncoder().encode(secretKey);
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

type SessionPayload = {
  userId: string;
  role: string;
};

export async function createSession(payload: SessionPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret);
}

export async function verifySession(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);

    return {
      userId: payload.userId as string,
      role: payload.role as string,
    };
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
