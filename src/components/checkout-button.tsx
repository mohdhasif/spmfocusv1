import Link from "next/link";

export function CheckoutButton({ label }: { label: string }) {
  return (
    <Link
      href="/bayar"
      className="inline-block rounded-lg bg-accent-400 px-8 py-3 font-bold text-brand-900 hover:bg-accent-500"
    >
      {label}
    </Link>
  );
}
