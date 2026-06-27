import Link from "next/link";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log Masuk",
  description: "Log masuk ke akaun SPMFokus anda.",
};

export default async function LogMasukPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const { redirect } = await searchParams;

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-center text-2xl font-extrabold text-brand-900">Log Masuk</h1>

      <div className="mt-8 rounded-2xl border border-brand-100 p-6 shadow-sm">
        <LoginForm redirectTo={redirect ?? "/akaun"} />
      </div>

      <p className="mt-4 text-center text-sm">
        <Link href="/lupa-kata-laluan" className="font-semibold text-brand-600 hover:underline">
          Lupa kata laluan?
        </Link>
      </p>

      <p className="mt-6 text-center text-sm text-brand-900/70">
        Belum ada akaun?{" "}
        <Link href="/cipta-akaun" className="font-semibold text-brand-600 hover:underline">
          Cipta Akaun
        </Link>
      </p>
    </section>
  );
}
