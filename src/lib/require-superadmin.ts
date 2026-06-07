import { getCurrentUser } from "./get-current-user";

export async function requireSuperadmin() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (user.role !== "SUPERADMIN") {
    throw new Error("Forbidden");
  }

  return user;
}