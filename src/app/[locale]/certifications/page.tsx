import Script from "next/script";
import { notFound } from "next/navigation";
import { Certifications } from "@/components/certifications/certifications";
import { certifications } from "@/data/certifications";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { generateCertificationsJsonLd } from "@/lib/certifications-schema";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "certifications");
}

export default async function CertificationsPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const jsonLd = generateCertificationsJsonLd(locale, dict, certifications);

  return (
    <>
      <Script
        id={`certifications-schema-${locale}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="page-main">
        <Certifications dict={dict} locale={locale} />
      </div>
    </>
  );
}
