"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProperty } from "@/app/actions/property-actions";
import Image from "next/image";
import { updateProperty } from "@/app/actions/update-property";
import { PropertyStatus } from "@prisma/client";

type PropertyFormProps = {
  property?: {
    id: string;
    title: string;
    description: string;
    location: string;
    status: PropertyStatus;
    price: bigint;
    bedrooms: number | null;
    bathrooms: number | null;
    landSize: number | null;
    buildingSize: number | null;
    images?: {
      id: string;
      imageUrl: string;
    }[];
  };
};

export default function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<PropertyStatus>(
    property?.status ?? "AVAILABLE",
  );

  const [title, setTitle] = useState(property?.title ?? "");
  const [location, setLocation] = useState(property?.location ?? "");

  const [description, setDescription] = useState(property?.description ?? "");

  const [price, setPrice] = useState(property?.price?.toString() ?? "");

  const [bedrooms, setBedrooms] = useState(
    property?.bedrooms?.toString() ?? "",
  );

  const [bathrooms, setBathrooms] = useState(
    property?.bathrooms?.toString() ?? "",
  );

  const [landSize, setLandSize] = useState(
    property?.landSize?.toString() ?? "",
  );

  const [buildingSize, setBuildingSize] = useState(
    property?.buildingSize?.toString() ?? "",
  );

  const [imageUrls, setImageUrls] = useState<string[]>(
    property?.images?.map((img) => img.imageUrl) ?? [],
  );

  const [uploading, setUploading] = useState(false);

  const submitLabel = property ? "Update Property" : "Simpan Property";

  async function uploadImage(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", "prime-property");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(JSON.stringify(data));
    }

    return data.secure_url;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      if (property) {
        await updateProperty({
          id: property.id,

          title,
          description,
          location,
          status,

          price: BigInt(price),

          bedrooms: bedrooms ? Number(bedrooms) : undefined,

          bathrooms: bathrooms ? Number(bathrooms) : undefined,

          landSize: landSize ? Number(landSize) : undefined,

          buildingSize: buildingSize ? Number(buildingSize) : undefined,

          imageUrls,
        });
      } else {
        await createProperty({
          title,
          description,
          location,
          status,

          price: BigInt(price),

          bedrooms: bedrooms ? Number(bedrooms) : undefined,

          bathrooms: bathrooms ? Number(bathrooms) : undefined,

          landSize: landSize ? Number(landSize) : undefined,

          buildingSize: buildingSize ? Number(buildingSize) : undefined,

          imageUrls,
        });
      }

      router.push("/dashboard/properties");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan property");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="mb-2 block">Judul Property</label>

        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block">Lokasi</label>

        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="mb-2 block">Harga</label>

        <Input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div>
          <label className="mb-2 block">Status Property</label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as PropertyStatus)}
            className="w-full rounded-md border p-2"
          >
            <option value="AVAILABLE">Tersedia</option>

            <option value="BOOKED">Dibooking</option>

            <option value="SOLD">Terjual</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block">Kamar Tidur</label>

          <Input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block">Kamar Mandi</label>

          <Input
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block">Luas Tanah (m²)</label>

          <Input
            type="number"
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
          />
        </div>

        <div>
          <label className="mb-2 block">Luas Bangunan (m²)</label>

          <Input
            type="number"
            value={buildingSize}
            onChange={(e) => setBuildingSize(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block">Deskripsi</label>

        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          required
        />
      </div>

      <div>
        <label className="mb-2 block">Gambar Property</label>

        <Input
          type="file"
          accept="image/*"
          multiple
          onChange={async (e) => {
            const files = e.target.files;

            if (!files?.length) return;

            try {
              setUploading(true);

              const uploadedUrls = await Promise.all(
                Array.from(files).map((file) => uploadImage(file)),
              );

              setImageUrls((prev) => [...prev, ...uploadedUrls]);
            } finally {
              setUploading(false);
            }
          }}
        />
      </div>

      {imageUrls.length > 0 && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {imageUrls.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative h-32 overflow-hidden rounded-lg"
            >
              <Image
                src={url}
                alt={`Property ${index + 1}`}
                fill
                className="object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setImageUrls((prev) => prev.filter((_, i) => i !== index))
                }
                className="absolute right-2 top-2 rounded bg-red-600 px-2 py-1 text-xs text-white"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}

      <Button type="submit" disabled={loading || uploading}>
        {uploading
          ? "Mengupload gambar..."
          : loading
            ? "Menyimpan..."
            : submitLabel}
      </Button>
    </form>
  );
}
