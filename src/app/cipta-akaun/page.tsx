import Link from "next/link";
import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Cipta Akaun",
  description: "Cipta akaun SPMFokus untuk mendaftar sebagai Ahli SPMFokus.",
};

export default function CiptaAkaunPage() {
  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-center text-2xl font-extrabold text-brand-900">Cipta Akaun</h1>

      <div className="mt-8 rounded-2xl border border-brand-100 p-6 shadow-sm">
        <SignupForm />
      </div>

      <p className="mt-6 text-center text-sm text-brand-900/70">
        Sudah ada akaun?{" "}
        <Link href="/log-masuk" className="font-semibold text-brand-600 hover:underline">
          Log Masuk
        </Link>
      </p>
    </section>
  );
}
