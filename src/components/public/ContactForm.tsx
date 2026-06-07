"use client";

import { useState } from "react";
import { sendContactMessage } from "@/app/actions/contact-actions";
import { toast } from "sonner";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      await sendContactMessage({
        name,
        email,
        phone,
        message,
      });

      alert("Pesan terkirim, tim kami akan menghubungi Anda.");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error(error);

      alert("Gagal mengirim pesan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border bg-white p-8 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">Nama</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 focus:border-[#C9A961] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 focus:border-[#C9A961] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Nomor HP</label>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 focus:border-[#C9A961] focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Pesan</label>

          <textarea
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full rounded-lg border px-4 py-3 focus:border-[#C9A961] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-[#C9A961] px-6 py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Mengirim..." : "Kirim Pesan"}
        </button>
      </form>
    </div>
  );
}
