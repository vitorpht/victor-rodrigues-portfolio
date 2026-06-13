import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";

export const routes = {
  home: (locale: Locale) => `/${locale}`,
  about: (locale: Locale) => `/${locale}/about`,
  highlights: (locale: Locale) => `/${locale}/highlights`,
  technologies: (locale: Locale) => `/${locale}/technologies`,
  certifications: (locale: Locale) => `/${locale}/certifications`,
  projects: (locale: Locale) => `/${locale}/projects`,
  flowjersey: (locale: Locale) => `/${locale}/flowjersey`,
  journey: (locale: Locale) => `/${locale}/journey`,
  contact: (locale: Locale) => `/${locale}/contact`,
  cv: (locale: Locale) => `/${locale}/cv`,
} as const;

export const navItems = [
  "about",
  "journey",
  "highlights",
  "technologies",
  "certifications",
  "projects",
  "contact",
] as const;

export type NavKey = (typeof navItems)[number];

export function getNavLabel(dict: Dictionary, key: NavKey): string {
  return dict.nav[key];
}

export const pagePaths = [
  "",
  "/about",
  "/highlights",
  "/technologies",
  "/certifications",
  "/projects",
  "/flowjersey",
  "/journey",
  "/contact",
  "/cv",
] as const;
