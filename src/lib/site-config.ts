export const siteConfig = {
  name: "SPMFokus",
  tagline: "Pelajar Lebih Cemerlang!",
  description:
    "Bimbingan yang lebih teliti dan strategik disesuaikan untuk kejayaan peperiksaan SPM anda.",
  url: "https://www.spmfokus.my",
  contact: {
    whatsapp: "+6019-3113058",
    whatsappLink: "https://wa.me/60193113058",
    email: "admin@spmfokus.my",
  },
  company: {
    legalName: "ST Venture Marketing",
    ssm: "003227728-D",
  },
  // TODO: ganti dengan URL sebenar profil media sosial klien.
  social: {
    facebook: "#",
    instagram: "#",
    tiktok: "#",
  },
} as const;

export const mainNav = [
  { label: "Utama", href: "/" },
  { label: "Kenali Kami", href: "/kenali-kami" },
  { label: "Ulangkaji SPM", href: "/ulangkaji-spm" },
  { label: "Daftar", href: "/daftar" },
  { label: "Hubungi Kami", href: "/hubungi-kami" },
] as const;

export const membership = {
  productName: "Ahli SPMFokus",
  regularPriceMyr: 39,
  promoPriceMyr: 34,
  promoEndsAt: "2026-07-31",
  validUntil: "2026-12-31",
  description: "Keahlian Tahunan",
} as const;

export function isPromoActive() {
  return new Date() <= new Date(`${membership.promoEndsAt}T23:59:59+08:00`);
}

export function getActivePriceMyr() {
  return isPromoActive() ? membership.promoPriceMyr : membership.regularPriceMyr;
}

const MALAY_MONTHS = [
  "Januari", "Februari", "Mac", "April", "Mei", "Jun",
  "Julai", "Ogos", "September", "Oktober", "November", "Disember",
] as const;

export function formatMalayDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day} ${MALAY_MONTHS[month - 1]} ${year}`;
}
