import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { getActivePriceMyr, membership } from "@/lib/site-config";

export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sila log masuk dahulu." }, { status: 401 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const priceMyr = getActivePriceMyr();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: user.email,
    line_items: [
      {
        price_data: {
          currency: "myr",
          unit_amount: Math.round(priceMyr * 100),
          product_data: {
            name: membership.productName,
            description: `${membership.description} — sah sehingga ${membership.validUntil}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      user_id: user.id,
      amount_myr: String(priceMyr),
    },
    success_url: `${siteUrl}/akaun?checkout=success`,
    cancel_url: `${siteUrl}/daftar?checkout=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
