"use client";

import NextImage from "next/image";
import { useState } from "react";
import { preload } from "react-dom";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import { CvLink } from "@/components/ui/cv-link";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { StatsSection } from "@/components/stats/stats-section";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import type { SectionProps } from "@/types";

const heroPrimaryBtn = cn(
  buttonVariants({ size: "default" }),
  "h-10 px-4 text-[15px] transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:shadow-primary/15",
);

const heroOutlineBtn = cn(
  buttonVariants({ variant: "outline", size: "default" }),
  "h-10 px-4 text-[15px] transition-all duration-200 hover:scale-[1.02] hover:shadow-md hover:shadow-primary/10",
);

const heroSocialBtn = cn(
  buttonVariants({ variant: "outline", size: "default" }),
  "h-10 text-[15px] transition-all duration-200 hover:scale-[1.02] hover:border-primary/40 hover:shadow-sm hover:shadow-primary/5",
);

export function Hero({ dict, locale }: SectionProps) {
  const t = dict.hero;

  // A foto é o LCP: o preload faz o download começar logo com o HTML, sem esperar pelo parser.
  preload(profile.photo.api, { as: "image", fetchPriority: "high" });

  return (
    <section className="w-full" aria-labelledby="hero-title">
      <div className="section-container mx-auto w-full space-y-4 lg:space-y-5">
        <div className="grid items-center gap-5 lg:grid-cols-[1fr_auto] lg:gap-10">
          <div className="flex flex-col gap-3.5 lg:gap-4">
            <div className="flex flex-col gap-2">
              <div className="rise-in">
                <Badge className="px-3 py-0.5 text-sm">{t.badge}</Badge>
              </div>

              <div className="rise-in" style={{ "--rise-delay": "0.1s" } as React.CSSProperties}>
                <p className="text-lg text-foreground-secondary">{t.greeting}</p>
                <h1
                  id="hero-title"
                  className="mt-1 text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.25rem]"
                >
                  <span className="text-gradient">{t.name}</span>
                </h1>
              </div>

              <h2
                className="text-lg font-medium tracking-tight text-foreground-secondary rise-in"
                style={{ "--rise-delay": "0.15s" } as React.CSSProperties}
              >
                {t.role}
              </h2>
            </div>

            <div
              className="max-w-xl space-y-2 text-base leading-relaxed text-foreground-secondary lg:text-[17px] rise-in"
              style={{ "--rise-delay": "0.25s" } as React.CSSProperties}
            >
              <p>{t.description}</p>
              <p>{t.currentProject}</p>
            </div>

            <div
              className="flex flex-wrap items-center gap-2.5 rise-in"
              style={{ "--rise-delay": "0.35s" } as React.CSSProperties}
            >
              <Link href={routes.projects(locale)} className={heroPrimaryBtn}>
                {t.viewProjects}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={routes.contact(locale)} prefetch={false} className={heroOutlineBtn}>
                <Mail className="h-4 w-4" />
                {t.contact}
              </Link>
              <CvLink
                label={t.cvDownload}
                source="hero"
                locale={locale}
                variant="outline"
                className={heroOutlineBtn}
              />
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className={heroSocialBtn}
              >
                <GitHubIcon className="h-4 w-4" />
                {t.github}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={heroSocialBtn}
              >
                <LinkedInIcon className="h-4 w-4" />
                {t.linkedin}
              </a>
            </div>
          </div>

          <div
            className="relative mx-auto w-[230px] shrink-0 sm:w-[250px] lg:mx-0 lg:w-[270px] rise-in"
            style={{ "--rise-delay": "0.1s" } as React.CSSProperties}
          >
            <HeroPhoto alt={t.avatarAlt} />
          </div>
        </div>

        <StatsSection dict={dict} locale={locale} inline />
      </div>
    </section>
  );
}

const DISPLAY_SIZE = 320;

function HeroPhoto({ alt }: { alt: string }) {
  const [useFallback, setUseFallback] = useState(false);
  const { focus } = profile.photo;
  const objectPosition = `${focus.x * 100}% ${focus.y * 100}%`;

  return (
    <div className="group relative w-full">
      <div
        className="pointer-events-none absolute -inset-2 rounded-2xl bg-primary/18 blur-xl transition-opacity duration-500 group-hover:opacity-110 dark:bg-primary/15 dark:blur-2xl"
        aria-hidden="true"
      />
      <div
        className={cn(
          "relative rounded-xl p-px transition-all duration-500 ease-out group-hover:scale-[1.01] group-hover:shadow-[0_0_36px_-12px] group-hover:shadow-primary/30",
          "bg-gradient-to-br from-primary via-sky-500/80 to-primary/70",
          "dark:from-sky-400 dark:via-primary/80 dark:to-primary/50",
          "shadow-[0_0_24px_-10px] shadow-primary/25 dark:shadow-primary/22",
        )}
      >
        <div
          className="relative aspect-square overflow-hidden rounded-[calc(0.75rem-1px)] bg-background-secondary select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          {!useFallback ? (
            // eslint-disable-next-line @next/next/no-img-element -- API privada; object-position para enquadramento
            <img
              src={profile.photo.api}
              alt={alt}
              width={600}
              height={600}
              fetchPriority="high"
              decoding="async"
              draggable={false}
              onError={() => setUseFallback(true)}
              className="block h-full w-full scale-[1.08] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.1]"
              style={{ objectPosition }}
            />
          ) : (
            <NextImage
              src={profile.photo.fallback}
              alt={alt}
              width={DISPLAY_SIZE}
              height={DISPLAY_SIZE}
              draggable={false}
              className="h-full w-full object-cover"
              priority
            />
          )}

          <div
            className="absolute inset-0 z-10 [-webkit-touch-callout:none]"
            aria-hidden="true"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>
  );
}
