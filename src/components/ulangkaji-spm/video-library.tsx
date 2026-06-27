"use client";

import { useState } from "react";
import { LockIcon } from "@/components/ulangkaji-spm/lock-icon";
import { RegisterModal } from "@/components/ulangkaji-spm/register-modal";

const PAGE_SIZE = 9;

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
  const [visibleCount, setVisibleCount] = useState(Math.min(PAGE_SIZE, videoIds.length));

  const visibleIds = videoIds.slice(0, visibleCount);
  const remaining = videoIds.length - visibleCount;

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleIds.map((id, index) => {
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

      {remaining > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + PAGE_SIZE, videoIds.length))}
            className="rounded-lg border border-brand-200 px-8 py-3 font-semibold text-brand-900 hover:bg-brand-50"
          >
            Lihat Lagi ({remaining} Video Lagi)
          </button>
        </div>
      )}

      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} hasUser={hasUser} />
    </>
  );
}
