import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { Projects } from "@/components/projects/projects";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { getDesbravadoresGalleryAssets } from "@/lib/desbravadores-screenshots";
import { getDservicesGalleryAssets } from "@/lib/dservices-screenshots";
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
  const desbravadoresGallery = getDesbravadoresGalleryAssets();
  const dservicesGallery = getDservicesGalleryAssets();

  return (
    <div className="page-main">
      <PageJsonLd page="projects" locale={locale} dict={dict} />
      <Projects
        dict={dict}
        locale={locale}
        desbravadoresGallery={desbravadoresGallery}
        dservicesGallery={dservicesGallery}
      />
    </div>
  );
}
