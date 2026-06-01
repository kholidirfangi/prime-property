"use client";

import { useTransition } from "react";
import { deleteProperty } from "@/app/actions/delete-property";

export default function DeletePropertyButton({
  id,
}: {
  id: string;
}) {
  const [pending, startTransition] =
    useTransition();

  const handleDelete = () => {
    const confirmed = confirm(
      "Yakin ingin menghapus property ini?"
    );

    if (!confirmed) return;

    startTransition(async () => {
      await deleteProperty(id);
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white transition hover:bg-red-700"
    >
      {pending
        ? "Menghapus..."
        : "Delete"}
    </button>
  );
}