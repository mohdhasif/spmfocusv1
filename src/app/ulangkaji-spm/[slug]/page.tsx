import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { hasActiveMembership } from "@/lib/membership";
import { ulangkajiModules } from "@/lib/ulangkaji-modules";

export function generateStaticParams() {
  return ulangkajiModules.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mod = ulangkajiModules.find((item) => item.slug === slug);

  return { title: mod?.title ?? "Ulangkaji SPM" };
}

export default async function UlangkajiSpmModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mod = ulangkajiModules.find((item) => item.slug === slug);

  if (!mod) {
    notFound();
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isMember = user ? await hasActiveMembership(supabase, user.id) : false;

  if (!isMember) {
    redirect("/daftar");
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/ulangkaji-spm"
        className="text-sm font-semibold text-brand-600 hover:underline"
      >
        ← Kembali ke Ulangkaji SPM
      </Link>

      <h1 className="mt-4 text-2xl font-extrabold text-brand-900">{mod.title}</h1>

      <p className="mt-4 text-brand-900/70">
        Kandungan untuk modul ini akan dikemas kini tidak lama lagi.
      </p>
    </section>
  );
}
