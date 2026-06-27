"use client";

import { useState } from "react";
import Link from "next/link";
import { getActivePriceMyr, isPromoActive, membership } from "@/lib/site-config";

export function FloatingCta({ hasUser }: { hasUser: boolean }) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const promoPriceMyr = getActivePriceMyr();
  const promoActive = isPromoActive();

  return (
    <div className="fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:right-4">
      <div className="relative flex items-center gap-4 rounded-2xl bg-brand-900 px-5 py-3 shadow-2xl">
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Tutup"
          className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-900 shadow"
        >
          ✕
        </button>

        <div className="text-white">
          <p className="text-lg font-extrabold">
            RM{promoPriceMyr}{" "}
            {promoActive && (
              <span className="text-sm font-medium text-white/60 line-through">
                RM{membership.regularPriceMyr}
              </span>
            )}
          </p>
          <p className="text-xs text-white/70">Akses Penuh Video Ulangkaji SPM</p>
        </div>

        <Link
          href={hasUser ? "/daftar" : "/cipta-akaun?redirect=/daftar"}
          className="shrink-0 rounded-lg bg-accent-400 px-4 py-2 text-sm font-bold text-brand-900 hover:bg-accent-500"
        >
          Daftar Sekarang
        </Link>
      </div>
    </div>
  );
}
