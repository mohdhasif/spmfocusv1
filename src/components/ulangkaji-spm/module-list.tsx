"use client";

import { useState } from "react";
import Link from "next/link";
import { LockIcon } from "@/components/ulangkaji-spm/lock-icon";
import { RegisterModal } from "@/components/ulangkaji-spm/register-modal";

export function ModuleList({
  modules,
  isMember,
  hasUser,
}: {
  modules: readonly { slug: string; title: string }[];
  isMember: boolean;
  hasUser: boolean;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {modules.map((mod) =>
          isMember ? (
            <Link
              key={mod.slug}
              href={`/ulangkaji-spm/${mod.slug}`}
              className="rounded-xl border border-brand-100 px-6 py-4 font-semibold text-brand-900 hover:bg-brand-50"
            >
              {mod.title}
            </Link>
          ) : (
            <button
              key={mod.slug}
              type="button"
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-between gap-3 rounded-xl border border-brand-100 bg-brand-900 px-6 py-4 text-left font-semibold text-white hover:bg-brand-900/90"
            >
              {mod.title}
              <LockIcon />
            </button>
          ),
        )}
      </div>

      <RegisterModal open={modalOpen} onClose={() => setModalOpen(false)} hasUser={hasUser} />
    </>
  );
}
