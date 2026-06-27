import Link from "next/link";
import { formatMalayDate, membership, siteConfig } from "@/lib/site-config";

const heroVideoId = "1_rcFqwmaXzIw1ypdhGemx1JqVYewwkbn";

const sampleVideos = [
  { subject: "Matematik Tambahan", driveId: "1rH6ugpnYMtEAhJ123NRuUwtrBh8_18We" },
  { subject: "Biologi", driveId: "1MNXzFR2LUCkn0-8xSZKjbmwI8U8sRBgB" },
  { subject: "Fizik", driveId: "1MtU8Fz4C9u1F5Yoh0N9aXGewtPlA6OVF" },
];

const features = [
  {
    title: "Video Ulasan Soalan-Soalan SPM Tahun Lepas",
    description:
      "Penerangan yang lebih teliti oleh para guru yang berpengalaman mengajar subjek Tingkatan 5.",
  },
  {
    title: "Video Ulangkaji Bab-Bab Serta Topik Yang Lebih Fokus Kepada Soalan SPM",
    description:
      "Mengasah kemahiran menjawab berpandukan kepada topik-topik yang penting dan kerap keluar dalam SPM.",
  },
  {
    title: "Teknik Persediaan SPM",
    description:
      "Teknik pembelajaran secara efektif dikongsikan oleh guru-guru dan para pelajar lepasan SPM yang mendapat keputusan cemerlang.",
  },
];

function PricingCta() {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p className="text-3xl font-extrabold text-brand-900">
        RM{membership.promoPriceMyr}{" "}
        <span className="text-base font-medium text-brand-900/60 line-through">
          RM{membership.regularPriceMyr}
        </span>
      </p>
      <p className="text-sm font-semibold text-accent-600">
        Harga Promosi Sehingga {formatMalayDate(membership.promoEndsAt)}
      </p>
      <p className="text-sm text-brand-900/70">({membership.description})</p>
      <Link
        href="/daftar"
        className="mt-2 rounded-lg bg-brand-600 px-8 py-3 font-bold text-white hover:bg-brand-700"
      >
        Daftar Di Sini
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-semibold italic text-brand-600">{siteConfig.tagline}</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-brand-900 sm:text-4xl">
              Bimbingan Yang Lebih Teliti Dan Strategik Disesuaikan Untuk Kejayaan
              Peperiksaan SPM Anda
            </h1>
            <div className="mt-8">
              <PricingCta />
            </div>
          </div>

          <div className="mx-auto aspect-[9/16] w-full max-w-xs overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={`https://drive.google.com/file/d/${heroVideoId}/preview`}
              className="h-full w-full"
              allow="autoplay"
              title="Video pengenalan SPMFokus"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-brand-900">Kenali SPMfokus!</h2>
        <h3 className="mt-1 text-lg font-semibold text-brand-600">Tujuan SPMFokus</h3>
        <div className="mt-6 space-y-4 text-left text-brand-900/80">
          <p>
            Apabila para pelajar melangkah masuk ke Tingkatan 5, kebanyakan mereka akan
            merasa panik, gelisah malah bimbang untuk menghadapi peperiksaan paling
            penting di Malaysia iaitu Sijil Pelajaran Malaysia (SPM).
          </p>
          <p>
            Disinilah kami akan membantu semua para pelajar SPM untuk lebih fokus,
            merancang secara efektif dan lebih yakin dalam menghadapi peperiksaan SPM
            nanti.
          </p>
          <p>
            Kami telah menyediakan video-video yang sangat bermanfaat untuk para pelajar
            SPM seperti ulasan soalan-soalan SPM tahun lepas, mengulangkaji secara
            efektif bab-bab yang kerap dipilih sebagai soalan SPM, dan teknik menjawab
            serta persediaan untuk menghadapi peperiksaan.
          </p>
          <p>
            Jadi, para pelajar SPM akan menjadi lebih teliti, fokus dan paling penting
            lebih yakin apabila menghadapi peperiksaan SPM kelak.
          </p>
        </div>
      </section>

      <section className="bg-brand-50 py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-2xl font-bold text-brand-900">
            Daftar Sekarang Dan Dapatkan Akses Kepada Video-Video SPMFokus!
          </h2>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {sampleVideos.map((video) => (
              <div key={video.driveId} className="flex flex-col items-center gap-3">
                <p className="font-semibold text-brand-900">
                  Ulasan Soalan SPM {video.subject}
                </p>
                <div className="aspect-[9/16] w-full max-w-[220px] overflow-hidden rounded-xl shadow-md">
                  <iframe
                    src={`https://drive.google.com/file/d/${video.driveId}/preview`}
                    className="h-full w-full"
                    allow="autoplay"
                    title={`Ulasan Soalan SPM ${video.subject}`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <PricingCta />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-center text-2xl font-bold text-brand-900">
          Bagaimana SPMFokus Boleh Membantu Para Pelajar SPM?
        </h2>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.title} className="flex flex-col gap-3 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-400 text-xl font-extrabold text-brand-900">
                {index + 1}
              </div>
              <p className="font-bold text-brand-900">{feature.title}</p>
              <p className="text-sm text-brand-900/70">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <PricingCta />
        </div>
      </section>

      <section className="bg-brand-900 py-16 text-center text-white">
        <h2 className="text-2xl font-bold">Inginkan Lebih Maklumat?</h2>
        <p className="mt-3 text-brand-100">
          Sila hubungi kami melalui WhatsApp{" "}
          <a href={siteConfig.contact.whatsappLink} className="font-semibold underline">
            {siteConfig.contact.whatsapp}
          </a>{" "}
          atau emel{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="font-semibold underline"
          >
            {siteConfig.contact.email}
          </a>
        </p>
      </section>
    </>
  );
}
