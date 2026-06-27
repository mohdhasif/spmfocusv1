import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { hasActiveMembership } from "@/lib/membership";
import { ulangkajiModules } from "@/lib/ulangkaji-modules";
import { VideoLibrary } from "@/components/ulangkaji-spm/video-library";
import { ModuleList } from "@/components/ulangkaji-spm/module-list";

export const metadata: Metadata = {
  title: "Ulangkaji SPM",
  description: "Layari video-video ulasan soalan SPM tahun lepas.",
};

// Belum ada label subjek/topik untuk setiap video dari klien — dinamakan
// secara generik buat sementara waktu sehingga maklumat sebenar diberikan.
const videoIds = [
  "1hb5i-9iR0ez8vMR_dZpXmNAe2h2jnepB",
  "1OALAvp1DvsrVQHQ0HZO4_bLZtTMiVUMp",
  "1mh9rDY2rjtJDs6twb2YDxtnjqy4LnR90",
  "13EkJJ0BYCzSB_4b94D7cv3jVXPEaCDFV",
  "1tYhYtLDmJLww9w_KY8grQNn0VqK1bTmf",
  "1-7W9zMofHVbMvF0PPiEMYSSr80a1ICbv",
  "1rmCd7FR3PvJ79k62ACoki4S2wJDNeq9U",
  "16GWgA8JUgVGZRQvd0u-309kf9CRAjKyk",
  "1NKNCsN2t6emZmnqzyuV1KLOOX8qVxelQ",
  "1vQNoyBSdXzRxuH3t8G64vZR5Slr5EZDK",
  "12ViMQGxOCNqC-fiMhuZZeotY4c3fb8xN",
  "1sIjXDd9XmTDSndROJOSikRRCw2qkAB9X",
  "1U3oXTYnN0-y5dAkG0-cNOzzmhZuNsQKu",
  "1Yzd0B8zez48QMa9sGGTcoDqB2f8KRAIa",
  "1CGaEX2ue8xpZmramUXOiVVklXjv2Elww",
  "101yJrEIyOOXef5eP0ab_QT7uCOXeYlDz",
  "1FZW4YhgC2mA3agMqUwk3lCw3atbXMz1Z",
  "1DWmiw1AmL8n_h01nXlQM2c8-8x9yakb-",
  "19Juy4bbAdEP5r-u3UBcPWB-ghcSHVcRT",
  "1izc0u9n9CcnSVlQ59Ikd-NsLBrsATiQK",
  "1SJEiXXpvtgiE7hk6qj2H2aT4I2SLFZv0",
  "1aA6M5lgvwbF4qZW0-lUtbtGZwEaxtiQk",
  "1RboqrVdUmhj0325Vu3Zvci8cVYNtaWL5",
  "1zhjifgaD57IJij0ydGIfUENSMpfyxJ_M",
  "1QBLZatKgMu_xSUhjzcDKbBj_g3aBpo8L",
  "11uWAGh3iw2UicWuVkpQtAOZyFPFpAF3x",
  "1uzvDpEJJETGPr5pmOZEIXU0Uhc8IhYr6",
  "10VT8NY5FETCT39MSQJF2Rwe1CAeHDIoY",
  "1UTyiod0-781eARTCEe8L2jG-9Ev55qWw",
  "1ug6gl6bEaHTCnX362OOz_Euye5Z0q7C5",
  "1NXcJI9ItMOacnaoi_EXSXo6IUz9gUJ8h",
  "1Vorpn-dbrreH_cRGF0bNhnWU7RwFY5rb",
  "1ySJSJYlHb8hfUfYVSi9kv6Mlr511zPxm",
  "1uHeABRMTYNQTcktqJqNvvLfBEq9LNRf9",
  "1_rcFqwmaXzIw1ypdhGemx1JqVYewwkbn",
  "1sm58dPARuuYsyiQ-oJzZZdLPBlIXatH0",
  "1ijiukOFkBa62hpsbFqHIkAHkflWDfK2r",
  "1Z-Skde4Gls1IWHHTjlVC-ehJ3DVDJef-",
];

const PREVIEW_COUNT = 3;

export default async function UlangkajiSpmPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isMember = user ? await hasActiveMembership(supabase, user.id) : false;

  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <h1 className="text-3xl font-extrabold text-brand-900 sm:text-4xl">
            Ulangkaji SPM
          </h1>
          <p className="mt-4 text-lg text-brand-900/80">
            Layari video-video ulasan soalan SPM tahun lepas.
          </p>
          <p className="mt-1 font-semibold italic text-brand-600">
            Pelajar Lebih Cemerlang!
          </p>
          <a
            href="#modul-tambahan"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-900 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-brand-900/90"
          >
            Lompat Ke Modul Tambahan
            <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <VideoLibrary
          videoIds={videoIds}
          previewCount={PREVIEW_COUNT}
          isMember={isMember}
          hasUser={Boolean(user)}
        />

        <div id="modul-tambahan" className="mt-12 scroll-mt-8">
          <h2 className="text-xl font-bold text-brand-900">Modul Tambahan</h2>
          <ModuleList
            modules={ulangkajiModules}
            isMember={isMember}
            hasUser={Boolean(user)}
          />
        </div>
      </section>
    </>
  );
}
