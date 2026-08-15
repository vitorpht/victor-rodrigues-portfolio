import { Check, ExternalLink } from "lucide-react";
import { FlowJerseyGallery } from "@/components/flowjersey/flowjersey-gallery";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import type { DservicesGalleryItem, DservicesGalleryKey } from "@/data/dservices-gallery";
import { getProject } from "@/data/projects";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types";

const challengeKeys = [
  "nextjs",
  "visualIdentity",
  "responsive",
  "seo",
  "conversion",
  "performance",
] as const;

export function DservicesDetail({
  dict,
  dservicesGallery,
}: SectionProps & {
  dservicesGallery: { available: boolean; items: DservicesGalleryItem[] };
}) {
  const t = dict.dservicesProject;
  const galleryLabels = t.gallery as Record<DservicesGalleryKey, string>;
  const project = getProject("dservices");
  const technologies = project.technologies;

  return (
    <PageSection labelledBy="dservices-title">
      <ScrollReveal>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{dict.projects.nextjsBadge}</Badge>
            <Badge>{dict.projects.completed}</Badge>
          </div>
          <h1 id="dservices-title" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-primary sm:text-base">{t.subtitle}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-foreground-secondary sm:text-[15px]">
            {t.overview}
          </p>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "sm" }), "mt-5")}
            >
              <ExternalLink className="h-4 w-4" />
              {dict.projects.websiteLabel}
            </a>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mt-8">
        <SectionHeader
          id="dservices-gallery-title"
          title={t.galleryTitle}
          align="left"
          className="mb-4 !mx-0 !max-w-none !text-left"
        />
        <FlowJerseyGallery
          items={dservicesGallery.items}
          labels={galleryLabels}
          placeholderText={t.galleryPlaceholderItem}
          screenshotsAvailable={dservicesGallery.available}
        />
      </ScrollReveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <ScrollReveal>
          <Card className="h-full card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t.problemLabel}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">{t.problem}</CardDescription>
            </CardContent>
          </Card>
        </ScrollReveal>
        <ScrollReveal>
          <Card className="h-full card-hover">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{t.solutionLabel}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">{t.solution}</CardDescription>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      <ScrollReveal className="mt-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">{t.technologiesTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      <ScrollReveal className="mt-8">
        <h2 className="mb-4 text-base font-semibold">{t.featuresTitle}</h2>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {t.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2.5"
            >
              <Check className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span className="text-sm text-foreground-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal className="mt-8">
        <h2 className="mb-4 text-base font-semibold">{t.challengesTitle}</h2>
        <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
          {challengeKeys.map((key) => {
            const challenge = t.challenges[key];
            return (
              <StaggerItem key={key}>
                <Card className="h-full card-hover">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-xs leading-relaxed">
                      {challenge.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </ScrollReveal>
    </PageSection>
  );
}
