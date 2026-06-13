import type { CertificationEntry } from "@/data/certifications";
import type { Dictionary, Locale } from "@/lib/i18n";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victorrodrigues.dev";

export function generateCertificationsJsonLd(
  locale: Locale,
  dict: Dictionary,
  entries: CertificationEntry[],
) {
  const t = dict.certifications;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.title,
    description: t.subtitle,
    url: `${BASE_URL}/${locale}/certifications`,
    numberOfItems: entries.length,
    itemListElement: entries.map((entry, index) => {
      const item = t.items[entry.id as keyof typeof t.items];
      const credential: Record<string, unknown> = {
        "@type": "EducationalOccupationalCredential",
        name: item.name,
        description: "description" in item ? item.description : undefined,
        credentialCategory: "certification",
        recognizedBy: {
          "@type": "Organization",
          name: "issuer" in item && item.issuer ? item.issuer : item.name,
        },
      };

      if (entry.completedDate) {
        credential.dateCreated = entry.completedDate;
      } else if (entry.endDate) {
        credential.dateCreated = entry.endDate;
      }

      if (entry.credential?.url) {
        credential.url = entry.credential.url.startsWith("http")
          ? entry.credential.url
          : `${BASE_URL}${entry.credential.url}`;
      }

      return {
        "@type": "ListItem",
        position: index + 1,
        item: credential,
      };
    }),
  };
}
