import { notFound } from "next/navigation";
import { CvPageContent } from "@/components/cv/cv-page-content";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { buildCvData } from "@/lib/cv/build-cv-data";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "cv");
}

export default async function CvPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const data = buildCvData(locale, dict);

  return (
    <div className="page-main section-padding">
      <CvPageContent data={data} downloadLabel={dict.cv.download} />
    </div>
  );
}
