import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

export type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export type SectionProps = {
  dict: Dictionary;
  locale: Locale;
};
