import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { DservicesDetail } from "@/components/projects/dservices-detail";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { getDservicesGalleryAssets } from "@/lib/dservices-screenshots";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "dservices");
}

export default async function DservicesPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const dservicesGallery = getDservicesGalleryAssets();

  return (
    <>
      <PageJsonLd page="dservices" locale={locale} dict={dict} />
      <DservicesDetail dict={dict} locale={locale} dservicesGallery={dservicesGallery} />
    </>
  );
}
