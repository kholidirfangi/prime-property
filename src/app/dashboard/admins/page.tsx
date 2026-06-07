import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ToggleAdminStatusButton from "@/components/ToggleAdminStatusButton";
import ResetPasswordButton from "@/components/ResetPasswordButton";
import { requireSuperadminPage } from "@/lib/require-superadmin-page";

export default async function AdminsPage() {
  await requireSuperadminPage();

  const admins = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Management</h1>

        <Link
          href="/dashboard/admins/create"
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Tambah Admin
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-t">
                <td className="px-4 py-3">{admin.email}</td>

                <td className="px-4 py-3">{admin.role}</td>

                <td className="px-4 py-3">
                  {admin.isActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Disabled</span>
                  )}
                </td>

                <td className="px-4 py-3 flex gap-5">
                  <ToggleAdminStatusButton
                    userId={admin.id}
                    isActive={admin.isActive}
                  />

                  <ResetPasswordButton userId={admin.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
