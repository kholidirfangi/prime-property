import PropertyForm from "./PropertyForm";
import { requireSuperadminPage } from "@/lib/require-superadmin-page";

export default async function CreatePropertyPage() {
  await requireSuperadminPage();
  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">Tambah Property</h1>

      <PropertyForm />
    </div>
  );
}
