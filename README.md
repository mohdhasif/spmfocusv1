# SPMFokus

Website rasmi SPMFokus — bimbingan video ulangkaji SPM berasaskan keahlian tahunan.
Dibina dengan Next.js (App Router), Supabase (Auth + Postgres), dan Stripe Checkout.
Menggantikan platform WordPress/WooCommerce/Elementor/Ultimate Member terdahulu.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, TypeScript, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Supabase](https://supabase.com) — Auth (email/password) + Postgres (`profiles`, `memberships`)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout) — one-time annual membership payment

## Getting started

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

### Environment variables

Salin `.env.local.example` (atau buat fail `.env.local`) dengan nilai sebenar:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_SITE_URL=
```

`SUPABASE_SERVICE_ROLE_KEY` dan `STRIPE_*` hanya digunakan di sebelah server
(route handlers / webhook) dan tidak pernah didedahkan kepada pelanggan.

### Database

Jalankan `supabase/schema.sql` dalam Supabase SQL Editor untuk membina jadual
`profiles` dan `memberships`, dasar RLS, serta trigger yang mengisi `profiles`
secara automatik selepas pendaftaran.

### Stripe webhook (local dev)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

## Struktur halaman

- `/` — Utama
- `/kenali-kami` — Pasukan & misi SPMFokus
- `/ulangkaji-spm` — Pustaka video (3 pratonton percuma, penuh untuk Ahli)
- `/daftar` — Pendaftaran keahlian + checkout Stripe
- `/hubungi-kami` — Hubungi kami
- `/cipta-akaun`, `/log-masuk` — Pendaftaran & log masuk (Supabase Auth)
- `/akaun` — Dashboard ahli (dilindungi oleh proxy/middleware)
- `/dasar-privasi` — Dasar Privasi
