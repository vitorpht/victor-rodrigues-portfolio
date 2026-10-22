import { JsonLd } from "@/components/seo/json-ld";
import type { Dictionary, Locale } from "@/lib/i18n";
import { generatePageJsonLd, type PageKey } from "@/lib/metadata";

type PageJsonLdProps = {
  page: PageKey;
  locale: Locale;
  dict: Dictionary;
};

export function PageJsonLd({ page, locale, dict }: PageJsonLdProps) {
  return <JsonLd data={generatePageJsonLd(locale, dict, page)} />;
}
