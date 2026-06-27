"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/lib/site-config";

export function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
        emailRedirectTo: `${window.location.origin}/auth/callback?redirect=/daftar`,
      },
    });

    setLoading(false);

    if (signUpError) {
      console.error("Signup failed:", signUpError.message);
      setError(
        signUpError.message.includes("already registered")
          ? "E-mel ini telah didaftarkan. Sila log masuk."
          : signUpError.message.toLowerCase().includes("rate limit")
            ? "Terlalu banyak percubaan e-mel dalam masa singkat. Sila cuba semula selepas beberapa minit."
            : "Pendaftaran gagal. Sila cuba semula.",
      );
      return;
    }

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-brand-50 p-6 text-center text-brand-900">
        <p className="font-semibold">Pendaftaran berjaya!</p>
        <p className="mt-2 text-sm">
          Sila periksa e-mel anda ({email}) untuk pautan pengesahan akaun. Periksa
          juga folder spam jika tidak diterima dalam beberapa minit.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-brand-900">
          Nama Penuh
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          className="mt-1 w-full rounded-lg border border-brand-100 px-4 py-2 focus:border-brand-600 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-brand-900">
          No. Telefon
        </label>
        <input
          id="phone"
          type="tel"
          required
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="mt-1 w-full rounded-lg border border-brand-100 px-4 py-2 focus:border-brand-600 focus:outline-none"
        />
      </div>

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

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-brand-900">
          Kata Laluan
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="mt-1 w-full rounded-lg border border-brand-100 px-4 py-2 focus:border-brand-600 focus:outline-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}{" "}
          {error.includes("log masuk") && (
            <Link href="/log-masuk" className="font-semibold underline">
              Log Masuk
            </Link>
          )}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-brand-600 py-2.5 font-semibold text-white hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Sedang mendaftar..." : "Cipta Akaun"}
      </button>

      <p className="text-center text-xs text-brand-900/60">
        Sebarang masalah pendaftaran, hubungi kami di{" "}
        <a href={`mailto:${siteConfig.contact.email}`} className="underline">
          {siteConfig.contact.email}
        </a>
      </p>
    </form>
  );
}
