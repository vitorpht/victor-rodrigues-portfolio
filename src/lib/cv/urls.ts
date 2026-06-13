import type { Locale } from "@/lib/i18n";

export function getCvPdfUrl(locale: Locale): string {
  return `/api/cv/${locale}`;
}

export function getCvPageUrl(locale: Locale): string {
  return `/${locale}/cv`;
}
