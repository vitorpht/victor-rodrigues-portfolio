import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { routes } from "@/lib/routes";

type NavbarBrandProps = {
  locale: Locale;
  homeLabel: string;
  className?: string;
};

export function NavbarBrand({ locale, homeLabel, className }: NavbarBrandProps) {
  return (
    <Link
      href={routes.home(locale)}
      aria-label={`Victor Rodrigues — ${homeLabel}`}
      className={cn(
        "group inline-flex shrink-0 rounded-sm outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span
        className={cn(
          "font-extrabold tracking-tight leading-tight",
          "text-sm min-[380px]:text-[15px] sm:text-[17px]",
          "bg-[linear-gradient(110deg,var(--color-primary)_0%,color-mix(in_srgb,var(--color-foreground)_94%,var(--color-primary)_6%)_100%)]",
          "bg-clip-text text-transparent",
          "transition-[filter,opacity] duration-250 ease-out",
          "group-hover:opacity-90",
          "group-hover:[filter:drop-shadow(0_0_12px_color-mix(in_srgb,var(--color-primary)_18%,transparent))]",
        )}
      >
        Victor Rodrigues
      </span>
    </Link>
  );
}
