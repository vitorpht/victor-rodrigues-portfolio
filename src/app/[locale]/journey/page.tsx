import { notFound } from "next/navigation";
import { Journey } from "@/components/journey/journey";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "journey");
}

export default async function JourneyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="page-main">
      <Journey dict={dict} locale={locale} />
    </div>
  );
}
