import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getActivePriceMyr, membership } from "@/lib/site-config";

// Temporary stand-in for the Stripe webhook while the real payment gateway
// isn't wired up yet — records the membership as paid without contacting Stripe.
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sila log masuk dahulu." }, { status: 401 });
  }

  const admin = createAdminClient();
  const startsAt = new Date();
  const expiresAt = new Date(`${membership.validUntil}T23:59:59+08:00`);

  const { error } = await admin.from("memberships").insert({
    user_id: user.id,
    status: "active",
    amount_myr: getActivePriceMyr(),
    starts_at: startsAt.toISOString(),
    expires_at: expiresAt.toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: "Gagal merekod pembayaran." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
