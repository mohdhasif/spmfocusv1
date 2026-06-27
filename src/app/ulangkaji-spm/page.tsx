import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { hasActiveMembership } from "@/lib/membership";

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

  const visibleIds = isMember ? videoIds : videoIds.slice(0, PREVIEW_COUNT);
  const lockedCount = videoIds.length - visibleIds.length;

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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleIds.map((id, index) => (
            <div key={id} className="flex flex-col items-center gap-3">
              <p className="font-semibold text-brand-900">Video Ulangkaji {index + 1}</p>
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
                <iframe
                  src={`https://drive.google.com/file/d/${id}/preview`}
                  className="h-full w-full"
                  allow="autoplay"
                  title={`Video Ulangkaji ${index + 1}`}
                />
              </div>
            </div>
          ))}
        </div>

        {!isMember && (
          <div className="mt-12 rounded-2xl bg-brand-900 px-8 py-10 text-center text-white">
            <h2 className="text-xl font-bold">
              {lockedCount} Lagi Video Menanti Anda!
            </h2>
            <p className="mt-2 text-brand-100">
              Daftar sebagai Ahli SPMFokus untuk akses penuh kepada semua video
              ulangkaji.
            </p>
            <Link
              href="/daftar"
              className="mt-6 inline-block rounded-lg bg-accent-400 px-8 py-3 font-bold text-brand-900 hover:bg-accent-500"
            >
              Daftar Di Sini
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
