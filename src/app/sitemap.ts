import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/lib/i18n";
import { pagePaths } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

const HIGH_PRIORITY = new Set(["", "/projects", "/about"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of pagePaths) {
    const languages: Record<string, string> = Object.fromEntries(
      locales.map((loc) => [loc, `${SITE_URL}/${loc}${path}`]),
    );
    languages["x-default"] = `${SITE_URL}/${defaultLocale}${path}`;

    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${path}`,
        priority: path === "" ? 1 : HIGH_PRIORITY.has(path) ? 0.9 : 0.7,
        alternates: { languages },
      });
    }
  }

  return entries;
}
