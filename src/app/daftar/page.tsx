import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { hasActiveMembership } from "@/lib/membership";
import { formatMalayDate, membership } from "@/lib/site-config";
import { CheckoutButton } from "@/components/checkout-button";

export const metadata: Metadata = {
  title: "Daftar",
  description: "Daftar sebagai Ahli SPMFokus dan dapatkan akses penuh ke semua video.",
};

export default async function DaftarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isMember = user ? await hasActiveMembership(supabase, user.id) : false;

  return (
    <section className="bg-gradient-to-b from-brand-50 to-white">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center">
        <h1 className="text-3xl font-extrabold text-brand-900 sm:text-4xl">
          Daftar Sekarang!
        </h1>

        <h2 className="mt-6 text-lg font-semibold text-accent-600">
          Harga Promosi Sehingga {formatMalayDate(membership.promoEndsAt)}
        </h2>

        <div className="mt-6">
          <p className="text-4xl font-extrabold text-brand-900">
            RM{membership.promoPriceMyr}{" "}
            <span className="text-lg font-medium text-brand-900/60 line-through">
              RM{membership.regularPriceMyr}
            </span>
          </p>
          <p className="mt-1 text-sm text-brand-900/70">
            (Yuran asal RM{membership.regularPriceMyr})
          </p>
        </div>

        <div className="mt-8">
          {isMember ? (
            <div className="rounded-lg bg-brand-50 p-6 text-brand-900">
              <p className="font-semibold">Anda sudah menjadi Ahli SPMFokus!</p>
              <Link href="/akaun" className="mt-3 inline-block font-semibold text-brand-600 underline">
                Lihat Akaun Saya
              </Link>
            </div>
          ) : user ? (
            <CheckoutButton label={`RM${membership.promoPriceMyr} | DAFTAR DI SINI`} />
          ) : (
            <Link
              href="/cipta-akaun?redirect=/daftar"
              className="inline-block rounded-lg bg-accent-400 px-8 py-3 font-bold text-brand-900 hover:bg-accent-500"
            >
              Cipta Akaun Untuk Daftar
            </Link>
          )}
        </div>

        <h3 className="mt-12 text-xl font-semibold italic text-brand-900">
          Kearah Kecemerlangan SPM Anda!
        </h3>

        <p className="mt-4 text-sm text-brand-900/80">
          Pendaftaran ini adalah untuk &quot;{membership.description}&quot; dan sah
          sehingga {formatMalayDate(membership.validUntil)}.
        </p>
        <p className="mt-2 text-sm italic text-brand-900/70">
          Akses penuh akan diaktifkan serta-merta selepas pembayaran berjaya —
          tiada kelulusan manual diperlukan.
        </p>
      </div>
    </section>
  );
}
