import { notFound } from "next/navigation";
import { Projects } from "@/components/projects/projects";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { getFlowjerseyGalleryAssets } from "@/lib/flowjersey-screenshots";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "projects");
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const flowjerseyGallery = getFlowjerseyGalleryAssets();

  return (
    <div className="page-main">
      <Projects dict={dict} locale={locale} flowjerseyGallery={flowjerseyGallery} />
    </div>
  );
}
