import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { hasActiveMembership } from "@/lib/membership";
import { formatMalayDate, getActivePriceMyr, membership } from "@/lib/site-config";
import { ConfirmPaymentButton } from "@/components/confirm-payment-button";

export const metadata: Metadata = {
  title: "Pembayaran",
};

export default async function BayarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/log-masuk?redirect=/bayar");
  }

  if (await hasActiveMembership(supabase, user.id)) {
    redirect("/akaun");
  }

  const priceMyr = getActivePriceMyr();

  return (
    <section className="mx-auto max-w-md px-6 py-16">
      <h1 className="text-2xl font-extrabold text-brand-900">Ringkasan Pembayaran</h1>

      <div className="mt-6 rounded-2xl border border-brand-100 p-6">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-brand-900">{membership.productName}</p>
          <p className="font-bold text-brand-900">RM{priceMyr}</p>
        </div>
        <p className="mt-1 text-sm text-brand-900/60">
          {membership.description} — sah sehingga {formatMalayDate(membership.validUntil)}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-brand-100 pt-4 text-lg font-extrabold text-brand-900">
          <p>Jumlah</p>
          <p>RM{priceMyr}</p>
        </div>
      </div>

      <div className="mt-8">
        <ConfirmPaymentButton />
      </div>
    </section>
  );
}
