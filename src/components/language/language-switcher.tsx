"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocaleFlag } from "@/components/ui/flag-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Dictionary, Locale } from "@/lib/i18n";
import { locales } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  dict: Dictionary["language"];
};

const localeLabels: Record<Locale, keyof Dictionary["language"]> = {
  pt: "pt",
  en: "en",
  es: "es",
};

export function LanguageSwitcher({ locale, dict }: LanguageSwitcherProps) {
  const pathname = usePathname();

  const getLocalizedPath = (newLocale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    return segments.join("/") || `/${newLocale}`;
  };

  return (
    <div className="relative group">
      <button
        className={buttonVariants({ variant: "ghost", size: "sm" })}
        aria-label={dict.select}
        aria-haspopup="listbox"
      >
        <LocaleFlag locale={locale} />
        <span className="hidden sm:inline">{dict[localeLabels[locale]]}</span>
      </button>
      <div
        role="listbox"
        aria-label={dict.select}
        className={cn(
          "absolute right-0 top-full z-50 mt-2 min-w-[160px] rounded-lg border border-border bg-card p-1 shadow-lg",
          "opacity-0 invisible translate-y-1 transition-all duration-200",
          "group-hover:opacity-100 group-hover:visible group-hover:translate-y-0",
          "group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0",
        )}
      >
        {locales.map((loc) => (
          <Link
            key={loc}
            href={getLocalizedPath(loc)}
            role="option"
            aria-selected={loc === locale}
            className={cn(
              "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
              loc === locale
                ? "bg-primary/10 text-primary font-medium"
                : "text-foreground-secondary hover:bg-muted hover:text-foreground",
            )}
          >
            <LocaleFlag locale={loc} />
            {dict[localeLabels[loc]]}
          </Link>
        ))}
      </div>
    </div>
  );
}
