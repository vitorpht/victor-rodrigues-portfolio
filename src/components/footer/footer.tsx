"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail } from "lucide-react";
import { LocaleFlag } from "@/components/ui/flag-icons";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import { CvLink } from "@/components/ui/cv-link";
import { profile } from "@/data/profile";
import type { Dictionary, Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

type FooterProps = {
  locale: Locale;
  dict: Dictionary;
};

const EMAIL = profile.email;

export function Footer({ locale, dict }: FooterProps) {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const getLocalizedPath = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || `/${newLocale}`;
  };

  return (
    <footer className="border-t border-border py-4" aria-label="Footer">
      <div className="section-container">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <p className="text-sm text-foreground-secondary">
              Victor Rodrigues · © {year}
            </p>
            <CvLink label={dict.footer.cv} source="footer" locale={locale} />
          </div>

          <div className="flex items-center gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary transition-colors hover:text-primary"
              aria-label={dict.contact.links.github}
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-secondary transition-colors hover:text-primary"
              aria-label={dict.contact.links.linkedin}
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-foreground-secondary transition-colors hover:text-primary"
              aria-label={dict.contact.links.email}
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-secondary">{dict.footer.language}:</span>
            {locales.map((loc) => (
              <Link
                key={loc}
                href={getLocalizedPath(loc)}
                className={`inline-flex items-center gap-1.5 text-xs transition-colors hover:text-primary ${
                  loc === locale ? "font-medium text-primary" : "text-foreground-secondary"
                }`}
              >
                <LocaleFlag locale={loc} className="h-2.5 w-3.5" />
                {dict.language[loc]}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
