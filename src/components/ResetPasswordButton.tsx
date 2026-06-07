"use client";

import { useTransition } from "react";
import { resetAdminPassword } from "@/app/actions/reset-admin-password";

type Props = {
  userId: string;
};

export default function ResetPasswordButton({
  userId,
}: Props) {
  const [pending, startTransition] =
    useTransition();

  function handleReset() {
    const password = prompt(
      "Masukkan password baru",
    );

    if (!password) return;

    startTransition(async () => {
      const result =
        await resetAdminPassword(
          userId,
          password,
        );

      alert(result.message);
    });
  }

  return (
    <button
      onClick={handleReset}
      disabled={pending}
      className="rounded bg-blue-600 px-3 py-1 text-white"
    >
      {pending
        ? "Loading..."
        : "Reset Password"}
    </button>
  );
}