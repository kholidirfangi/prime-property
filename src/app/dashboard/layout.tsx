import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { logoutAction } from "../actions/logout-actions";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/agent/login");
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-slate-50">
        <div className="p-6">
          <h2 className="text-xl font-bold">Prime Property</h2>
        </div>

        <nav className="space-y-2 px-4">
          <Link
            href="/dashboard"
            className="block rounded px-3 py-2 hover:bg-slate-200"
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/properties"
            className="block rounded px-3 py-2 hover:bg-slate-200"
          >
            Properties
          </Link>

          {user.role === "SUPERADMIN" && (
            <>
              <Link
                href="/dashboard/admins"
                className="block rounded px-3 py-2 hover:bg-slate-200"
              >
                Admins
              </Link>

              <Link
                href="/dashboard/audit-logs"
                className="block rounded px-3 py-2 hover:bg-slate-200"
              >
                Audit Logs
              </Link>
            </>
          )}

          <Link
            href="/dashboard/settings"
            className="block rounded px-3 py-2 hover:bg-slate-200"
          >
            Settings
          </Link>

          <div className="pt-8">
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full rounded px-3 py-2 text-left text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </form>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1">
        <header className="border-b p-4">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold">Admin Dashboard</h1>

            <span>
              {user.email} ({user.role})
            </span>
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
