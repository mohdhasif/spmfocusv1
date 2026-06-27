import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Tetapkan Kata Laluan",
};

export default function TetapkanKataLaluanPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-center text-2xl font-extrabold text-brand-900">
        Tetapkan Kata Laluan Baharu
      </h1>

      <div className="mt-8 rounded-2xl border border-brand-100 p-6 shadow-sm">
        <ResetPasswordForm />
      </div>
    </section>
  );
}
