import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { pagePaths } from "@/lib/routes";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victorrodrigues.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of pagePaths) {
      const url = `${BASE_URL}/${locale}${path}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: path === "" && locale === "pt" ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${BASE_URL}/${loc}${path}`]),
          ),
        },
      });
    }
  }

  return entries;
}
