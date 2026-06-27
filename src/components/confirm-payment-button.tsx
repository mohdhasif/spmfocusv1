"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ConfirmPaymentButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConfirm() {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/checkout/confirm", { method: "POST" });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "Pembayaran gagal. Sila cuba semula.");
      setLoading(false);
      return;
    }

    router.push("/akaun?checkout=success");
    router.refresh();
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleConfirm}
        disabled={loading}
        className="w-full rounded-lg bg-accent-400 px-8 py-3 font-bold text-brand-900 hover:bg-accent-500 disabled:opacity-60"
      >
        {loading ? "Memproses pembayaran..." : "Sahkan Pembayaran"}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
