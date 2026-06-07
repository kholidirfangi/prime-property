import { requireSuperadmin } from "@/lib/require-superadmin";
import AdminForm from "../AdminForm";

export default async function CreateAdminPage() {
  await requireSuperadmin();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Tambah Admin</h1>

      <AdminForm />
    </div>
  );
}
