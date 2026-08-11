import { notFound } from "next/navigation";
import { DesbravadoresDetail } from "@/components/projects/desbravadores-detail";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { getDesbravadoresGalleryAssets } from "@/lib/desbravadores-screenshots";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "desbravadores");
}

export default async function DesbravadoresPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const desbravadoresGallery = getDesbravadoresGalleryAssets();

  return (
    <DesbravadoresDetail dict={dict} locale={locale} desbravadoresGallery={desbravadoresGallery} />
  );
}
