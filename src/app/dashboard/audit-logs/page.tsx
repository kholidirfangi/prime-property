import { prisma } from "@/lib/prisma";
import { requireSuperadminPage } from "@/lib/require-superadmin-page";

export default async function AuditLogsPage() {
  await requireSuperadminPage();

  const logs = await prisma.auditLog.findMany({
    include: {
      performedBy: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Audit Logs</h1>

        <p className="mt-2 text-gray-500">
          Riwayat seluruh aktivitas penting yang dilakukan admin dan
          superadmin.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border bg-white">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Waktu
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                User
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Action
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Entity
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Deskripsi
              </th>
            </tr>
          </thead>

          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  Belum ada audit log.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id} className="border-t">
                  <td className="px-4 py-3 text-sm">
                    {new Date(log.createdAt).toLocaleString("id-ID")}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    {log.performedBy.email}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium">
                      {log.action}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm">
                    {log.entityType}
                  </td>

                  <td className="px-4 py-3 text-sm">
                    {log.description ?? "-"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}