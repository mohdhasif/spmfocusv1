"use client";

import { useState } from "react";
import Link from "next/link";
import { getActivePriceMyr, isPromoActive, membership } from "@/lib/site-config";

const NOTE_TEXT =
  "Sila Daftar Untuk Mendapatkan Akses Sepenuhnya Kepada Video-video Soalan SPM Tahun Lepas";

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-8 w-8"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function VideoLibrary({
  videoIds,
  previewCount,
  isMember,
  hasUser,
}: {
  videoIds: string[];
  previewCount: number;
  isMember: boolean;
  hasUser: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const promoPriceMyr = getActivePriceMyr();
  const promoActive = isPromoActive();

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videoIds.map((id, index) => {
          const locked = !isMember && index >= previewCount;

          return (
            <div key={id} className="flex flex-col items-center gap-3">
              <p className="font-semibold text-brand-900">Video Ulangkaji {index + 1}</p>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
                {locked ? (
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="group flex h-full w-full flex-col items-center justify-center gap-2 bg-brand-900 text-white transition hover:bg-brand-900/90"
                  >
                    <LockIcon />
                    <span className="text-sm font-semibold">Daftar Untuk Tonton</span>
                  </button>
                ) : (
                  <iframe
                    src={`https://drive.google.com/file/d/${id}/preview`}
                    className="h-full w-full"
                    allow="autoplay"
                    title={`Video Ulangkaji ${index + 1}`}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
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
      )}
    </>
  );
}
