export type LanguageLevel = "native" | "advanced" | "professional" | "intermediate" | "basic";

export type ProfileLanguage = {
  id: "pt" | "en" | "es";
  level: LanguageLevel;
};

export const profile = {
  name: "Victor Rodrigues",
  titleKey: "hero.role" as const,
  email: "contact@victorrodrigues.dev",
  github: "https://github.com/vitorpht",
  linkedin: "https://www.linkedin.com/in/vitorpht/",
  website: process.env.NEXT_PUBLIC_SITE_URL ?? "https://victorrodrigues.dev",
  location: "Portugal",
  photo: {
    /** Servida via API — ficheiro em private/images/ (não public/) */
    api: "/api/profile-photo",
    fallback: "/images/victor-avatar.svg",
    /** object-position (0–1): 0.5 = centro · x maior = rosto mais à esquerda no frame */
    focus: { x: 0.5, y: 0.48 },
  },
  languages: [
    { id: "pt", level: "native" },
    { id: "en", level: "advanced" },
    { id: "es", level: "advanced" },
  ] satisfies ProfileLanguage[],
  interests: ["saas", "security", "architecture", "ai", "cloud", "postgresql", "cybersecurity", "webdev"] as const,
} as const;

export type ProfileInterest = (typeof profile.interests)[number];
