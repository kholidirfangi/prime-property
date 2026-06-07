import { redirect } from "next/navigation";
import { getCurrentUser } from "./get-current-user";

export async function requireSuperadminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/agent/login");
  }

  if (user.role !== "SUPERADMIN") {
    redirect("/dashboard");
  }

  return user;
}