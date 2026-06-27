import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { membership } from "@/lib/site-config";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const amountMyr = session.metadata?.amount_myr;

    if (userId) {
      const supabase = createAdminClient();
      const startsAt = new Date();
      const expiresAt = new Date(`${membership.validUntil}T23:59:59+08:00`);

      await supabase.from("memberships").insert({
        user_id: userId,
        status: "active",
        amount_myr: amountMyr ? Number(amountMyr) : membership.promoPriceMyr,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id:
          typeof session.payment_intent === "string" ? session.payment_intent : null,
        starts_at: startsAt.toISOString(),
        expires_at: expiresAt.toISOString(),
      });
    }
  }

  return NextResponse.json({ received: true });
}
