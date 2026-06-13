import pt from "@/messages/pt.json";

export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export type Dictionary = typeof pt;

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const dictionary = await import(`@/messages/${locale}.json`);
  return dictionary.default as Dictionary;
}
