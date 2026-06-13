import { notFound } from "next/navigation";
import { Hero } from "@/components/hero/hero";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "home");
}

export default async function HomePage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="page-main grid min-h-[calc(100dvh-7.5rem)] flex-1 place-content-center overflow-hidden">
      <Hero dict={dict} locale={locale} />
    </div>
  );
}
