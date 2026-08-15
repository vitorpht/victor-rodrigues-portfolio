import pt from "@/messages/pt.json";
import en from "@/messages/en.json";
import es from "@/messages/es.json";

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export type Dictionary = typeof pt;

const dictionaries: Record<Locale, Dictionary> = {
  pt,
  en: en as Dictionary,
  es: es as Dictionary,
};

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale];
}
