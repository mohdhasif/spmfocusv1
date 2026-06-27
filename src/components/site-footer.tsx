import Link from "next/link";
import { mainNav, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <p className="text-xl font-extrabold tracking-tight">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-brand-100">{siteConfig.tagline}</p>

          <div className="mt-4 flex gap-3">
            <a
              href={siteConfig.social.facebook}
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <span className="text-sm font-bold">f</span>
            </a>
            <a
              href={siteConfig.social.instagram}
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <span className="text-sm font-bold">ig</span>
            </a>
            <a
              href={siteConfig.social.tiktok}
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <span className="text-sm font-bold">tt</span>
            </a>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-accent-400">Pautan Pantas</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-100">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/dasar-privasi" className="hover:text-white">
                Dasar Privasi
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-accent-400">Hubungi Kami</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-100">
            <li>
              <a href={siteConfig.contact.whatsappLink} className="hover:text-white">
                WhatsApp: {siteConfig.contact.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white">
                {siteConfig.contact.email}
              </a>
            </li>
            <li className="pt-2 text-brand-100/80">{siteConfig.company.legalName}</li>
            <li className="text-brand-100/80">SSM: {siteConfig.company.ssm}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-brand-100/80">
        © {year} {siteConfig.name}. Hak cipta terpelihara.
      </div>
    </footer>
  );
}
