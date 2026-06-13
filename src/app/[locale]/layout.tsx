import Script from "next/script";
import { notFound } from "next/navigation";
import { HtmlLang } from "@/components/language/html-lang";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";
import { generateJsonLd } from "@/lib/metadata";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "pt" }, { locale: "en" }, { locale: "es" }];
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);
  const jsonLd = generateJsonLd(locale, dict);

  return (
    <>
      <HtmlLang locale={locale} />
      <Script
        id={`schema-org-${locale}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex min-h-dvh flex-col">
        <Navbar locale={locale} dict={dict} />
        <main id="main-content" className="flex min-h-0 flex-1 flex-col pt-16">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
      </div>
    </>
  );
}
