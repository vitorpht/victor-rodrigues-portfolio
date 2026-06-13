import { Check } from "lucide-react";
import { FlowJerseyGallery } from "@/components/flowjersey/flowjersey-gallery";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import type { FlowJerseyGalleryItem, FlowJerseyGalleryKey } from "@/data/flowjersey-gallery";
import { getProject } from "@/data/projects";
import type { SectionProps } from "@/types";

const challengeKeys = [
  "multiTenancy",
  "security",
  "stripe",
  "rateLimiting",
  "performance",
  "scalability",
] as const;

export function FlowJerseyDetail({
  dict,
  flowjerseyGallery,
}: SectionProps & {
  flowjerseyGallery: { available: boolean; items: FlowJerseyGalleryItem[] };
}) {
  const t = dict.featuredProject;
  const saasBadge = dict.projects.saasBadge;
  const galleryLabels = t.gallery as Record<FlowJerseyGalleryKey, string>;
  const technologies = getProject("flowjersey").technologies;

  return (
    <PageSection labelledBy="flowjersey-title">
      <ScrollReveal>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{saasBadge}</Badge>
            <Badge>{dict.projects.inDevelopment}</Badge>
            <Badge className="border-border bg-muted text-foreground-secondary">{t.title}</Badge>
          </div>
          <h1 id="flowjersey-title" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            {t.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-primary sm:text-base">{t.subtitle}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal className="mt-8">
        <SectionHeader id="gallery-title" title={t.galleryTitle} align="left" className="mb-4 !mx-0 !max-w-none !text-left" />
        <FlowJerseyGallery
          items={flowjerseyGallery.items}
          labels={galleryLabels}
          placeholderText={t.galleryPlaceholderItem}
          screenshotsAvailable={flowjerseyGallery.available}
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
                    <CardDescription className="text-xs leading-relaxed">{challenge.description}</CardDescription>
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
