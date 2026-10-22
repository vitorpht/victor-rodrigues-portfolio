import type { Metadata } from "next";
import type { Dictionary, Locale } from "@/lib/i18n";
import { defaultLocale, getDictionary, isValidLocale, locales } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { profile } from "@/data/profile";
import { getProject, type ProjectId } from "@/data/projects";
import { getAllTechnologyKeys } from "@/data/technologies";

const OG_IMAGE = "/opengraph-image";

const OG_LOCALES: Record<Locale, string> = {
  pt: "pt_PT",
  en: "en_US",
  es: "es_ES",
};

export type PageKey =
  | "home"
  | "about"
  | "highlights"
  | "technologies"
  | "certifications"
  | "projects"
  | "desbravadores"
  | "dservices"
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
  desbravadores: "/desbravadores",
  dservices: "/dservices",
  journey: "/journey",
  contact: "/contact",
  cv: "/cv",
};

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

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
  const url = `${SITE_URL}/${locale}${path}`;

  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = `${SITE_URL}/${loc}${path}`;
  });
  languages["x-default"] = `${SITE_URL}/${defaultLocale}${path}`;

  const alternateLocale = locales.filter((loc) => loc !== locale).map((loc) => OG_LOCALES[loc]);
  const [firstName, ...rest] = profile.name.split(" ");
  const isProfilePage = page === "home" || page === "about";

  const openGraphBase = {
    locale: OG_LOCALES[locale],
    alternateLocale,
    url,
    title: seo.title,
    description: seo.description,
    siteName: profile.name,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${dict.hero.role}`,
      },
    ],
  };

  return {
    title: seo.title,
    description: seo.description,
    keywords: dict.meta.keywords,
    applicationName: profile.name,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    publisher: profile.name,
    category: "technology",
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: isProfilePage
      ? { ...openGraphBase, type: "profile", firstName, lastName: rest.join(" ") }
      : { ...openGraphBase, type: "website" },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    formatDetection: { telephone: false, email: false, address: false },
  };
}

/** Entidades partilhadas por todas as páginas: a pessoa e o website. */
export function generateJsonLd(locale: Locale, dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: profile.name,
        url: `${SITE_URL}/${locale}`,
        jobTitle: dict.hero.role,
        description: dict.meta.description,
        address: { "@type": "PostalAddress", addressCountry: "PT" },
        knowsLanguage: profile.languages.map((lang) => lang.id),
        sameAs: [profile.github, profile.linkedin],
        knowsAbout: getAllTechnologyKeys().map((key) => dict.technologies.items[key].name),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: `${profile.name} — ${dict.hero.role}`,
        alternateName: profile.name,
        url: SITE_URL,
        inLanguage: locales.map((loc) => OG_LOCALES[loc].replace("_", "-")),
        publisher: { "@id": PERSON_ID },
        author: { "@id": PERSON_ID },
      },
    ],
  };
}

const PROJECT_PAGE_IDS: Record<"desbravadores" | "dservices", ProjectId> = {
  desbravadores: "desbravadores",
  dservices: "dservices",
};

function projectCreativeWork(locale: Locale, dict: Dictionary, id: ProjectId) {
  const meta = getProject(id);
  const copy = dict.projects[id];
  const overview =
    id === "desbravadores" ? dict.desbravadoresProject.overview : dict.dservicesProject.overview;

  return {
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/${locale}/${id}#project`,
    name: copy.name,
    description: overview,
    url: `${SITE_URL}/${locale}/${id}`,
    sameAs: meta.demo,
    keywords: meta.technologies.join(", "),
    author: { "@id": PERSON_ID },
    creator: { "@id": PERSON_ID },
  };
}

function breadcrumbs(locale: Locale, dict: Dictionary, page: PageKey) {
  const home = { name: dict.nav.home, url: `${SITE_URL}/${locale}` };
  const trail: { name: string; url: string }[] = [home];

  if (page === "desbravadores" || page === "dservices") {
    trail.push({ name: dict.nav.projects, url: `${SITE_URL}/${locale}/projects` });
    trail.push({ name: dict.projects[PROJECT_PAGE_IDS[page]].name, url: `${SITE_URL}/${locale}${pagePaths[page]}` });
  } else if (page !== "home") {
    const name = page === "cv" ? dict.cv.title : dict.nav[page];
    trail.push({ name, url: `${SITE_URL}/${locale}${pagePaths[page]}` });
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Entidades específicas de cada página (tipo de página, migalhas de pão, projetos). */
export function generatePageJsonLd(locale: Locale, dict: Dictionary, page: PageKey) {
  const seo = dict.seo[page];
  const url = `${SITE_URL}/${locale}${pagePaths[page]}`;
  const pageId = `${url}#webpage`;

  const isProfilePage = page === "home" || page === "about" || page === "cv";
  const isCollection = page === "projects";

  const webPage: Record<string, unknown> = {
    "@type": isProfilePage ? "ProfilePage" : isCollection ? "CollectionPage" : "WebPage",
    "@id": pageId,
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: OG_LOCALES[locale].replace("_", "-"),
    isPartOf: { "@id": WEBSITE_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
  };

  const graph: Record<string, unknown>[] = [webPage];

  if (isProfilePage) {
    webPage.mainEntity = { "@id": PERSON_ID };
  } else {
    webPage.about = { "@id": PERSON_ID };
  }

  if (isCollection) {
    const ids: ProjectId[] = ["desbravadores", "dservices"];
    webPage.mainEntity = {
      "@type": "ItemList",
      numberOfItems: ids.length,
      itemListElement: ids.map((id, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: projectCreativeWork(locale, dict, id),
      })),
    };
  }

  if (page === "desbravadores" || page === "dservices") {
    const work = projectCreativeWork(locale, dict, PROJECT_PAGE_IDS[page]);
    graph.push(work);
    webPage.mainEntity = { "@id": work["@id"] };
  }

  graph.push({ ...breadcrumbs(locale, dict, page), "@id": `${url}#breadcrumb` });

  return { "@context": "https://schema.org", "@graph": graph };
}
