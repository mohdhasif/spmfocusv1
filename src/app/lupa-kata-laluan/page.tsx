import Link from "next/link";
import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

export const metadata: Metadata = {
  title: "Lupa Kata Laluan",
  description: "Tetapkan semula kata laluan akaun SPMFokus anda.",
};

export default function LupaKataLaluanPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-center text-2xl font-extrabold text-brand-900">
        Lupa Kata Laluan
      </h1>
      <p className="mt-2 text-center text-sm text-brand-900/70">
        Masukkan e-mel anda dan kami akan hantar pautan untuk menetapkan
        semula kata laluan.
      </p>

      <div className="mt-8 rounded-2xl border border-brand-100 p-6 shadow-sm">
        <ForgotPasswordForm />
      </div>

      <p className="mt-6 text-center text-sm text-brand-900/70">
        <Link href="/log-masuk" className="font-semibold text-brand-600 hover:underline">
          Kembali ke Log Masuk
        </Link>
      </p>
    </section>
  );
}
