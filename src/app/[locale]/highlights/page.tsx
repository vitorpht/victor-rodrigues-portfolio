import { notFound } from "next/navigation";
import { TechnicalHighlights } from "@/components/highlights/technical-highlights";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "highlights");
}

export default async function HighlightsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="page-main">
      <TechnicalHighlights dict={dict} locale={locale} />
    </div>
  );
}
