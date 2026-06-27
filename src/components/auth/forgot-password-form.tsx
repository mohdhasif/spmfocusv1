"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?redirect=/tetapkan-kata-laluan`,
    });

    setLoading(false);

    if (resetError) {
      console.error("Password reset failed:", resetError.message);
      setError(
        resetError.message.toLowerCase().includes("rate limit")
          ? "Terlalu banyak percubaan e-mel dalam masa singkat. Sila cuba semula selepas beberapa minit."
          : "Gagal menghantar pautan. Sila cuba semula.",
      );
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-brand-50 p-6 text-center text-brand-900">
        <p className="font-semibold">Pautan telah dihantar!</p>
        <p className="mt-2 text-sm">
          Sila periksa e-mel anda ({email}) untuk pautan menetapkan semula kata
          laluan. Periksa juga folder spam jika tidak diterima dalam beberapa
          minit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-900">
          E-mel
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="mt-1 w-full rounded-lg border border-brand-100 px-4 py-2 focus:border-brand-600 focus:outline-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand-600 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Menghantar..." : "Hantar Pautan"}
      </button>
    </form>
  );
}
