import type { Metadata } from "next";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getDictionary, isValidLocale, locales } from "@/lib/i18n";
import { profile } from "@/data/profile";
import { getAllTechnologyKeys } from "@/data/technologies";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victorrodrigues.dev";
const OG_IMAGE = "/opengraph-image";

export type PageKey =
  | "home"
  | "about"
  | "highlights"
  | "technologies"
  | "certifications"
  | "projects"
  | "flowjersey"
  | "journey"
  | "contact"
  | "cv";

const pagePaths: Record<PageKey, string> = {
  home: "",
  about: "/about",
  highlights: "/highlights",
  technologies: "/technologies",
  certifications: "/certifications",
  projects: "/projects",
  flowjersey: "/flowjersey",
  journey: "/journey",
  contact: "/contact",
  cv: "/cv",
};

export function getPagePath(page: PageKey): string {
  return pagePaths[page];
}

export async function createPageMetadata(
  localeParam: string,
  page: PageKey,
): Promise<Metadata> {
  if (!isValidLocale(localeParam)) return {};
  const dict = await getDictionary(localeParam);
  return generatePageMetadata(localeParam, dict, page);
}

export function generatePageMetadata(
  locale: Locale,
  dict: Dictionary,
  page: PageKey,
): Metadata {
  const seo = dict.seo[page];
  const path = pagePaths[page];
  const url = `${BASE_URL}/${locale}${path}`;

  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = `${BASE_URL}/${loc}${path}`;
  });

  const ogLocale =
    locale === "pt" ? "pt_PT" : locale === "es" ? "es_ES" : "en_US";

  return {
    title: seo.title,
    description: seo.description,
    keywords: page === "home" ? dict.meta.keywords : undefined,
    authors: [{ name: profile.name }],
    creator: profile.name,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url,
      title: seo.title,
      description: seo.description,
      siteName: profile.name,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      creator: "@victorrodrigues",
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateJsonLd(locale: Locale, dict: Dictionary) {
  const url = `${BASE_URL}/${locale}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: profile.name,
      url,
      jobTitle: dict.hero.role,
      description: dict.meta.description,
      sameAs: [profile.github, profile.linkedin],
      knowsAbout: getAllTechnologyKeys().map((key) => dict.technologies.items[key].name),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Victor Rodrigues Portfolio",
      url: BASE_URL,
      description: dict.meta.description,
      inLanguage: locale,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "FlowJersey",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: dict.featuredProject.solution,
      author: {
        "@type": "Person",
        name: profile.name,
      },
      offers: {
        "@type": "Offer",
        category: "SaaS",
      },
    },
  ];
}
