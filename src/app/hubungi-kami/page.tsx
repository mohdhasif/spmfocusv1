import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Hubungi SPMFokus melalui WhatsApp atau emel untuk maklumat lanjut.",
};

export default function HubungiKamiPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 text-center">
      <h1 className="text-3xl font-extrabold text-brand-900 sm:text-4xl">Hubungi Kami</h1>

      <div className="mt-8 space-y-2 text-lg text-brand-900/80">
        <p>Inginkan maklumat yang lebih lanjut?</p>
        <p>
          Hubungi kami melalui WhatsApp:{" "}
          <a
            href={siteConfig.contact.whatsappLink}
            className="font-semibold text-brand-600 hover:underline"
          >
            {siteConfig.contact.whatsapp}
          </a>
        </p>
        <p>
          E-melkan kepada kami:{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-semibold text-brand-600 hover:underline"
          >
            {siteConfig.contact.email}
          </a>
        </p>
        <p>Kami akan menghubungi anda secepat mungkin.</p>
      </div>

      <h2 className="mt-10 text-xl font-bold text-brand-900">
        Kami sentiasa sedia membantu anda mencapai keputusan SPM dengan cemerlang!
      </h2>

      <a
        href={siteConfig.contact.whatsappLink}
        className="mt-8 inline-block rounded-lg bg-brand-600 px-8 py-3 font-bold text-white hover:bg-brand-700"
      >
        Hubungi Kami Melalui WhatsApp
      </a>
    </section>
  );
}
