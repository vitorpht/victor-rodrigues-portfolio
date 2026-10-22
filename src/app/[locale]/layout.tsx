import type { Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { getDictionary, isValidLocale, locales, type Locale } from "@/lib/i18n";
import { generateJsonLd } from "@/lib/metadata";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) notFound();

  const locale = localeParam as Locale;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <JsonLd data={generateJsonLd(locale, dict)} />
          <div className="flex min-h-dvh flex-col">
            <Navbar locale={locale} dict={dict} />
            <main id="main-content" className="flex min-h-0 flex-1 flex-col pt-16">
              {children}
            </main>
            <Footer locale={locale} dict={dict} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
