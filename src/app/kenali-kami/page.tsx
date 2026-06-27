import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kenali Kami",
  description: "Kenali pasukan guru berdedikasi di sebalik SPMFokus.",
};

export default function KenaliKamiPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h1 className="text-3xl font-extrabold text-brand-900 sm:text-4xl">
            Pasukan Guru Yang Berdedikasi!
          </h1>
          <p className="mt-6 text-lg text-brand-900/80">
            Kami adalah sepasukan guru yang berpengalaman mengajar matapelajaran
            Tingkatan 4 dan 5, ingin membantu semua pelajar mencapai potensi penuh
            mereka dengan bimbingan yang terperinci dan fokus kepada peperiksaan SPM.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-2">
        <div className="rounded-2xl bg-brand-50 p-8">
          <h2 className="text-xl font-bold text-brand-900">Siapa Kami</h2>
          <p className="mt-3 text-brand-900/80">
            Kami adalah pusat pendidikan yang memberi bimbingan berfokus untuk
            membantu pelajar menguasai peperiksaan SPM dengan cemerlang!
          </p>
        </div>
        <div className="rounded-2xl bg-brand-50 p-8">
          <h2 className="text-xl font-bold text-brand-900">Misi</h2>
          <p className="mt-3 text-brand-900/80">
            Misi kami adalah untuk membimbing setiap pelajar memahami konsep
            pembelajaran dengan jelas, terperinci dan fokus serta membina keyakinan
            untuk mencapai keputusan SPM dengan cemerlang!
          </p>
        </div>
      </section>

      <section className="bg-brand-900 py-16 text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold">Jawatan Kosong</h2>

          <div className="mt-8 rounded-2xl bg-white/5 p-8">
            <h3 className="text-xl font-bold text-accent-400">Module Expert (M.E)</h3>

            <h4 className="mt-4 font-semibold">Kelayakan</h4>
            <p className="mt-2 text-brand-100">
              Guru yang berkelulusan di peringkat ijazah, minimum lima tahun
              pengalaman mengajar matapelajaran Tingkatan 4 dan 5 (SPM) di sekolah
              kerajaan atau swasta, umur diantara 30 - 35 tahun dan wajib
              berpengetahuan mengedit video.
            </p>
            <p className="mt-2 text-brand-100">Bayaran diantara RM60 - RM100 sejam.</p>

            <p className="mt-4 text-sm text-brand-100/80">
              Emel resume anda kepada{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="font-semibold text-accent-400 underline"
              >
                {siteConfig.contact.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
