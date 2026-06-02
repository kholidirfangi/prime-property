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

type PropertyFormProps = {
  property?: {
    id: string;
    title: string;
    description: string;
    location: string;
    price: bigint;
    bedrooms: number | null;
    bathrooms: number | null;
    landSize: number | null;
    buildingSize: number | null;
    imageUrl: string | null;
  };
};

export default function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

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

  const [imageUrl, setImageUrl] = useState(property?.imageUrl ?? "");

  const [uploading, setUploading] = useState(false);

  const submitLabel = property ? "Update Property" : "Simpan Property";

  useEffect(() => {
    console.log("IMAGE URL CHANGED:", imageUrl);
  }, [imageUrl]);

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

    console.log("STATUS:", response.status);

    const data = await response.json();

    console.log("CLOUDINARY DATA:", data);

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

          price: BigInt(price),

          bedrooms: bedrooms ? Number(bedrooms) : undefined,

          bathrooms: bathrooms ? Number(bathrooms) : undefined,

          landSize: landSize ? Number(landSize) : undefined,

          buildingSize: buildingSize ? Number(buildingSize) : undefined,

          imageUrl,
        });
      } else {
        await createProperty({
          title,
          description,
          location,

          price: BigInt(price),

          bedrooms: bedrooms ? Number(bedrooms) : undefined,

          bathrooms: bathrooms ? Number(bathrooms) : undefined,

          landSize: landSize ? Number(landSize) : undefined,

          buildingSize: buildingSize ? Number(buildingSize) : undefined,

          imageUrl,
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
          onChange={async (e) => {
            try {
              const file = e.target.files?.[0];

              if (!file) return;

              setUploading(true);

              const uploadedUrl = await uploadImage(file);

              setImageUrl(uploadedUrl);

              console.log("UPLOADED URL:", uploadedUrl);
            } catch (error) {
              console.error(error);
              alert("Upload gambar gagal");
            } finally {
              setUploading(false);
            }
          }}
        />
      </div>

      {imageUrl && (
        <Image
          width={600}
          height={600}
          src={imageUrl}
          alt="Preview"
          className="mt-4 h-40 w-full rounded-lg object-cover"
        />
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
