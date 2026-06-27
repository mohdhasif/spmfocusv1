import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { membership } from "@/lib/site-config";
import { CheckoutButton } from "@/components/checkout-button";
import { LogoutButton } from "@/components/auth/logout-button";

export const metadata: Metadata = {
  title: "Akaun Saya",
};

export default async function AkaunPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone")
    .eq("id", user!.id)
    .single();

  const { data: activeMembership } = await supabase
    .from("memberships")
    .select("status, expires_at")
    .eq("user_id", user!.id)
    .eq("status", "active")
    .gte("expires_at", new Date().toISOString())
    .order("expires_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-brand-900">Akaun Saya</h1>
        <LogoutButton />
      </div>

      <div className="mt-8 rounded-2xl border border-brand-100 p-6">
        <p className="text-sm text-brand-900/60">Nama Penuh</p>
        <p className="font-semibold text-brand-900">{profile?.full_name ?? "-"}</p>

        <p className="mt-4 text-sm text-brand-900/60">E-mel</p>
        <p className="font-semibold text-brand-900">{user!.email}</p>

        <p className="mt-4 text-sm text-brand-900/60">No. Telefon</p>
        <p className="font-semibold text-brand-900">{profile?.phone ?? "-"}</p>
      </div>

      <div className="mt-6 rounded-2xl bg-brand-50 p-6">
        <p className="text-sm font-semibold text-brand-900">Status Keahlian</p>

        {activeMembership ? (
          <div className="mt-2">
            <p className="font-bold text-green-700">Ahli SPMFokus Aktif</p>
            <p className="mt-1 text-sm text-brand-900/70">
              Sah sehingga{" "}
              {new Date(activeMembership.expires_at).toLocaleDateString("ms-MY", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        ) : (
          <div className="mt-3">
            <p className="text-brand-900/70">
              Anda belum mendaftar sebagai Ahli SPMFokus.
            </p>
            <div className="mt-4">
              <CheckoutButton
                label={`RM${membership.promoPriceMyr} | DAFTAR SEKARANG`}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
