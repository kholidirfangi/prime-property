"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";

export async function sendContactMessage(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  try {
    await prisma.contactMessage.create({
      data,
    });

    await resend.emails.send({
      from: "Prime Property <onboarding@resend.dev>",
      to: process.env.ADMIN_EMAIL!,
      subject: `Pesan Baru dari ${data.name}`,
      html: `
        <h2>Pesan Baru Contact Form</h2>

        <p><strong>Nama:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Nomor HP:</strong> ${data.phone}</p>
        <p><strong>Waktu:</strong>${new Date().toLocaleString("id-ID")}</p>
        <hr />

        <p>${data.message}</p>
      `,
    });
    console.log("Email berhasil dikirim");
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    console.log("Email gagal dikirim");
    return {
      success: false,
      message: "Gagal mengirim pesan",
    };
  }
}
