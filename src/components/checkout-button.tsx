"use client";

import { useState } from "react";

export function CheckoutButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/checkout", { method: "POST" });
    const data = await response.json();

    if (!response.ok || !data.url) {
      setError(data.error ?? "Gagal memulakan pembayaran. Sila cuba semula.");
      setLoading(false);
      return;
    }

    window.location.href = data.url;
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="rounded-lg bg-accent-400 px-8 py-3 font-bold text-brand-900 hover:bg-accent-500 disabled:opacity-60"
      >
        {loading ? "Sedang memproses..." : label}
      </button>
      {error && <p className="text-sm text-red-300">{error}</p>}
    </div>
  );
}
