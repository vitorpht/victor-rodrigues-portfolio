import type { SVGProps } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type FlagProps = SVGProps<SVGSVGElement> & { className?: string };

export function FlagBrazil({ className, ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={cn("h-3.5 w-5 shrink-0 rounded-sm", className)}
      aria-hidden="true"
      {...props}
    >
      <rect width="24" height="16" fill="#009B3A" />
      <path d="M12 1.5L22 8L12 14.5L2 8Z" fill="#FFDF00" />
      <circle cx="12" cy="8" r="3.2" fill="#002776" />
      <path
        d="M9.2 8a2.8 2.8 0 015.6 0"
        stroke="#FFFFFF"
        strokeWidth="0.35"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}

export function FlagUSA({ className, ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={cn("h-3.5 w-5 shrink-0 rounded-sm", className)}
      aria-hidden="true"
      {...props}
    >
      <rect width="24" height="16" fill="#B22234" />
      <path
        d="M0 1.23h24M0 3.08h24M0 4.92h24M0 6.77h24M0 8.62h24M0 10.46h24M0 12.31h24M0 14.15h24"
        stroke="#FFFFFF"
        strokeWidth="1.23"
      />
      <rect width="9.6" height="8.62" fill="#3C3B6E" />
      <g fill="#FFFFFF" opacity="0.9">
        <circle cx="1.6" cy="1.4" r="0.45" />
        <circle cx="3.2" cy="1.4" r="0.45" />
        <circle cx="4.8" cy="1.4" r="0.45" />
        <circle cx="6.4" cy="1.4" r="0.45" />
        <circle cx="8" cy="1.4" r="0.45" />
        <circle cx="2.4" cy="2.6" r="0.45" />
        <circle cx="4" cy="2.6" r="0.45" />
        <circle cx="5.6" cy="2.6" r="0.45" />
        <circle cx="7.2" cy="2.6" r="0.45" />
        <circle cx="1.6" cy="3.8" r="0.45" />
        <circle cx="3.2" cy="3.8" r="0.45" />
        <circle cx="4.8" cy="3.8" r="0.45" />
        <circle cx="6.4" cy="3.8" r="0.45" />
        <circle cx="8" cy="3.8" r="0.45" />
        <circle cx="2.4" cy="5" r="0.45" />
        <circle cx="4" cy="5" r="0.45" />
        <circle cx="5.6" cy="5" r="0.45" />
        <circle cx="7.2" cy="5" r="0.45" />
        <circle cx="1.6" cy="6.2" r="0.45" />
        <circle cx="3.2" cy="6.2" r="0.45" />
        <circle cx="4.8" cy="6.2" r="0.45" />
        <circle cx="6.4" cy="6.2" r="0.45" />
        <circle cx="8" cy="6.2" r="0.45" />
        <circle cx="2.4" cy="7.4" r="0.45" />
        <circle cx="4" cy="7.4" r="0.45" />
        <circle cx="5.6" cy="7.4" r="0.45" />
        <circle cx="7.2" cy="7.4" r="0.45" />
      </g>
    </svg>
  );
}

export function FlagSpain({ className, ...props }: FlagProps) {
  return (
    <svg
      viewBox="0 0 24 16"
      className={cn("h-3.5 w-5 shrink-0 rounded-sm", className)}
      aria-hidden="true"
      {...props}
    >
      <rect width="24" height="16" fill="#AA151B" />
      <rect y="4" width="24" height="8" fill="#F1BF00" />
      <rect x="6" y="6.5" width="4" height="3" fill="#AA151B" opacity="0.85" />
      <rect x="6.8" y="5.8" width="2.4" height="0.8" fill="#AA151B" opacity="0.85" />
    </svg>
  );
}

const localeFlags = {
  pt: FlagBrazil,
  en: FlagUSA,
  es: FlagSpain,
} as const;

export function LocaleFlag({ locale, className }: { locale: Locale; className?: string }) {
  const Flag = localeFlags[locale];
  return <Flag className={className} />;
}
