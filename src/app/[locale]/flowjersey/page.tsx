import { notFound } from "next/navigation";
import { FlowJerseyDetail } from "@/components/projects/flowjersey-detail";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { getFlowjerseyGalleryAssets } from "@/lib/flowjersey-screenshots";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "flowjersey");
}

export default async function FlowJerseyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const flowjerseyGallery = getFlowjerseyGalleryAssets();

  return <FlowJerseyDetail dict={dict} locale={locale} flowjerseyGallery={flowjerseyGallery} />;
}
