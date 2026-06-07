"use client";

import { useTransition } from "react";
import { toggleAdminStatus } from "@/app/actions/toggle-admin-status";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
  isActive: boolean;
};

export default function ToggleAdminStatusButton({
  userId,
  isActive,
}: Props) {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  function handleClick() {
    startTransition(async () => {
      const result =
        await toggleAdminStatus(
          userId,
          !isActive,
        );

      if (!result.success) {
        alert(result.message);
        return;
      }

      router.refresh();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={pending}
      className={`rounded px-3 py-1 text-white ${
        isActive
          ? "bg-red-600"
          : "bg-green-600"
      }`}
    >
      {pending
        ? "Loading..."
        : isActive
          ? "Disable"
          : "Enable"}
    </button>
  );
}