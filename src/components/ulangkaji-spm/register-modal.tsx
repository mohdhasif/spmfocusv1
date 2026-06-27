"use client";

import Link from "next/link";
import { getActivePriceMyr, isPromoActive, membership } from "@/lib/site-config";

const NOTE_TEXT =
  "Sila Daftar Untuk Mendapatkan Akses Sepenuhnya Kepada Video-video Soalan SPM Tahun Lepas";

export function RegisterModal({
  open,
  onClose,
  hasUser,
}: {
  open: boolean;
  onClose: () => void;
  hasUser: boolean;
}) {
  if (!open) return null;

  const promoPriceMyr = getActivePriceMyr();
  const promoActive = isPromoActive();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 text-xl text-brand-900/40 hover:text-brand-900"
        >
          ✕
        </button>

        <h2 className="text-lg font-bold text-brand-900">{NOTE_TEXT}</h2>

        <div className="mt-6">
          <p className="text-3xl font-extrabold text-brand-900">
            RM{promoPriceMyr}{" "}
            {promoActive && (
              <span className="text-base font-medium text-brand-900/60 line-through">
                RM{membership.regularPriceMyr}
              </span>
            )}
          </p>
          <p className="mt-1 text-sm text-brand-900/60">
            (Yuran asal RM{membership.regularPriceMyr})
          </p>
        </div>

        <Link
          href={hasUser ? "/daftar" : "/cipta-akaun?redirect=/daftar"}
          className="mt-6 inline-block w-full rounded-lg bg-accent-400 px-8 py-3 font-bold text-brand-900 hover:bg-accent-500"
        >
          {hasUser ? "Daftar Di Sini" : "Cipta Akaun Untuk Daftar"}
        </Link>
      </div>
    </div>
  );
}
