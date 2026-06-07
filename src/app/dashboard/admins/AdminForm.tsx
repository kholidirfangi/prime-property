"use client";

import { useState } from "react";
import { Role } from "@prisma/client";
import { useRouter } from "next/navigation";
import { createAdmin } from "@/app/actions/create-admin";

export default function AdminForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("ADMIN");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const result = await createAdmin({
        email,
        password,
        role,
      });

      if (!result.success) {
        alert(result.message);
        return;
      }

      router.push("/dashboard/admins");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      <div>
        <label className="mb-2 block font-medium">Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Password</label>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">Role</label>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="w-full rounded-lg border p-3"
        >
          <option value="ADMIN">ADMIN</option>

          <option value="SUPERADMIN">SUPERADMIN</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-black px-5 py-3 text-white"
      >
        {loading ? "Menyimpan..." : "Simpan Admin"}
      </button>
    </form>
  );
}
