export type DemoBrand = {
  name: string;
  accent: string;
  city: string;
  phone: string;
  whatsapp: string;
  tagline: string;
};

const STORAGE_PREFIX = "kazsaq-demo:";

export function loadBrand(demoId: string, fallback: DemoBrand): DemoBrand {
  const fromUrl = brandFromSearch(window.location.search);
  if (fromUrl) return { ...fallback, ...fromUrl };

  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + demoId);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

export function saveBrand(demoId: string, brand: DemoBrand) {
  localStorage.setItem(STORAGE_PREFIX + demoId, JSON.stringify(brand));
  const url = new URL(window.location.href);
  url.searchParams.set("name", brand.name);
  url.searchParams.set("accent", brand.accent.replace("#", ""));
  url.searchParams.set("city", brand.city);
  url.searchParams.set("phone", brand.phone);
  url.searchParams.set("wa", brand.whatsapp);
  url.searchParams.set("tagline", brand.tagline);
  window.history.replaceState({}, "", url.toString());
}

function brandFromSearch(search: string): Partial<DemoBrand> | null {
  const p = new URLSearchParams(search);
  if (![...p.keys()].length) return null;
  const out: Partial<DemoBrand> = {};
  if (p.get("name")) out.name = p.get("name")!;
  if (p.get("accent")) out.accent = `#${p.get("accent")!.replace("#", "")}`;
  if (p.get("city")) out.city = p.get("city")!;
  if (p.get("phone")) out.phone = p.get("phone")!;
  if (p.get("wa")) out.whatsapp = p.get("wa")!;
  if (p.get("tagline")) out.tagline = p.get("tagline")!;
  return Object.keys(out).length ? out : null;
}

export function waLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}`;
}
