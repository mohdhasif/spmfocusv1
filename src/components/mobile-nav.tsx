"use client";

import Link from "next/link";
import { useState } from "react";
import { mainNav } from "@/lib/site-config";

export function MobileNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Buka menu"
        className="flex h-10 w-10 items-center justify-center rounded-lg text-brand-900"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
          {open ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full z-50 border-t border-brand-100 bg-white px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-4 text-base font-medium text-brand-900">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link
              href={isLoggedIn ? "/akaun" : "/log-masuk"}
              onClick={() => setOpen(false)}
              className="rounded-lg bg-brand-600 px-4 py-2 text-center text-white"
            >
              {isLoggedIn ? "Akaun Saya" : "Log Masuk"}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
