"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/language/language-switcher";
import { NavbarBrand } from "@/components/navbar/navbar-brand";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import type { Dictionary, Locale } from "@/lib/i18n";
import { getNavLabel, navItems, routes } from "@/lib/routes";

type NavbarProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Navbar({ locale, dict }: NavbarProps) {
  const scrolled = useScroll();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav shadow-sm shadow-black/5" : "bg-transparent",
      )}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-background"
      >
        {dict.nav.skipToContent}
      </a>

      <nav className="section-container flex h-16 items-center justify-between" aria-label="Main navigation">
        <NavbarBrand locale={locale} homeLabel={dict.nav.home} />

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((key) => {
            const href = routes[key](locale);
            const isActive = pathname === href;

            return (
              <Link
                key={key}
                href={href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "font-medium text-primary"
                    : "text-foreground-secondary hover:text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {getNavLabel(dict, key)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher locale={locale} dict={dict.language} />
          <ThemeToggle dict={dict.theme} />
          <button
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="section-container flex flex-col gap-1 py-4">
            {navItems.map((key) => {
              const href = routes[key](locale);
              const isActive = pathname === href;

              return (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-3 text-sm transition-colors hover:bg-card hover:text-foreground",
                    isActive ? "font-medium text-primary" : "text-foreground-secondary",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {getNavLabel(dict, key)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
