import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { mainNav } from "@/lib/site-config";
import { Logo } from "@/components/logo";
import { MobileNav } from "@/components/mobile-nav";

export async function SiteHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="relative border-b border-brand-100 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />

        <nav className="hidden items-center gap-8 text-sm font-medium text-brand-900 md:flex">
          {mainNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href={user ? "/akaun" : "/log-masuk"}
          className="hidden rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 md:inline-block"
        >
          {user ? "Akaun Saya" : "Log Masuk"}
        </Link>

        <MobileNav isLoggedIn={Boolean(user)} />
      </div>
    </header>
  );
}
