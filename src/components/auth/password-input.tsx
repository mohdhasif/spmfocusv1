"use client";

import { useState } from "react";

function EyeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-5 w-5">
      <path d="M2.5 12s3.5-7 9.5-7c2.04 0 3.77.58 5.2 1.42M21.5 12s-1.13 2.27-3.2 4.08M9.9 14.1a3 3 0 1 0 4.2-4.2" />
      <path d="M3 3l18 18" />
    </svg>
  );
}

export function PasswordInput({
  id,
  value,
  onChange,
  required,
  minLength,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative mt-1">
      <input
        id={id}
        type={visible ? "text" : "password"}
        required={required}
        minLength={minLength}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-brand-100 px-4 py-2 pr-11 focus:border-brand-600 focus:outline-none"
      />
      <button
        type="button"
        onClick={() => setVisible((current) => !current)}
        aria-label={visible ? "Sembunyikan kata laluan" : "Tunjukkan kata laluan"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-900/40 hover:text-brand-900"
      >
        {visible ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
