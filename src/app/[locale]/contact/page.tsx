import { notFound } from "next/navigation";
import { PageJsonLd } from "@/components/seo/page-json-ld";
import { Contact } from "@/components/contact/contact";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale: localeParam } = await params;
  return createPageMetadata(localeParam, "contact");
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="page-main flex min-h-0 flex-1 flex-col">
      <PageJsonLd page="contact" locale={locale} dict={dict} />
      <Contact dict={dict} locale={locale} />
    </div>
  );
}
