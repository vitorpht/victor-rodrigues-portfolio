"use client";

import { FileDown } from "lucide-react";
import { trackCvDownload } from "@/lib/analytics";
import { getCvPdfUrl } from "@/lib/cv/urls";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CvLinkProps = {
  label: string;
  source: string;
  locale: Locale;
  className?: string;
  variant?: "button" | "link" | "outline";
};

export function CvLink({ label, source, locale, className, variant = "link" }: CvLinkProps) {
  return (
    <a
      href={getCvPdfUrl(locale)}
      download
      onClick={() => trackCvDownload(source)}
      className={cn(
        variant === "button" &&
          "inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary",
        variant === "link" &&
          "inline-flex items-center gap-1.5 text-sm text-foreground-secondary transition-colors hover:text-primary",
        variant === "outline" && "inline-flex items-center gap-2",
        className,
      )}
    >
      <FileDown className="h-4 w-4 shrink-0" aria-hidden="true" />
      {label}
    </a>
  );
}
