"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { isValidLocale, type Locale } from "@/lib/i18n";
import en from "@/messages/en.json";
import es from "@/messages/es.json";
import pt from "@/messages/pt.json";

const errorDict = { pt: pt.errors, en: en.errors, es: es.errors };

function getLocaleFromPath(pathname: string): Locale {
  const segment = pathname.split("/")[1];
  return isValidLocale(segment) ? segment : "pt";
}

export function NotFoundContent() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = errorDict[locale];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">{t.notFoundTitle}</h1>
      <p className="mt-2 max-w-md text-sm text-foreground-secondary">{t.notFoundDescription}</p>
      <Link href={routes.home(locale)} className={buttonVariants({ className: "mt-8" })}>
        {t.notFoundBack}
      </Link>
    </div>
  );
}

export function ErrorContent({ reset }: { reset: () => void }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = errorDict[locale];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl font-bold text-primary">500</p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight">{t.errorTitle}</h1>
      <p className="mt-2 max-w-md text-sm text-foreground-secondary">{t.errorDescription}</p>
      <button type="button" onClick={reset} className={buttonVariants({ className: "mt-8" })}>
        {t.errorRetry}
      </button>
    </div>
  );
}
