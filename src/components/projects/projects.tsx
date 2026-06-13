import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/social-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { FlowJerseyPreviewStrip } from "@/components/projects/flowjersey-preview-strip";
import type { FlowJerseyGalleryItem, FlowJerseyGalleryKey } from "@/data/flowjersey-gallery";
import { getProject, projectIds, type ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import type { SectionProps } from "@/types";

function StatusBadge({
  status,
  t,
}: {
  status: ProjectStatus;
  t: SectionProps["dict"]["projects"];
}) {
  if (status === "featured") {
    return (
      <>
        <Badge>{t.saasBadge}</Badge>
        <Badge className="border-border bg-muted text-foreground-secondary">{t.featured}</Badge>
      </>
    );
  }
  if (status === "in_development") {
    return <Badge>{t.inDevelopment}</Badge>;
  }
  if (status === "coming_soon") {
    return <Badge className="border-border bg-muted text-foreground-secondary">{t.comingSoon}</Badge>;
  }
  return null;
}

export function Projects({
  dict,
  locale,
  flowjerseyGallery,
}: SectionProps & {
  flowjerseyGallery: { available: boolean; items: FlowJerseyGalleryItem[] };
}) {
  const t = dict.projects;
  const galleryLabels = dict.featuredProject.gallery as Record<FlowJerseyGalleryKey, string>;
  const flowjerseyHref = routes.flowjersey(locale);

  return (
    <PageSection labelledBy="projects-title" compact centered className="bg-background-secondary/50">
      <SectionHeader id="projects-title" title={t.title} subtitle={t.subtitle} />

      <StaggerContainer className="mt-8 flex flex-col gap-6" stagger={0.07}>
        {projectIds.map((key) => {
          const project = t[key];
          const meta = getProject(key);
          const isFeatured = key === "flowjersey";
          const technologies = meta.technologies;
          const highlights = "highlights" in project ? project.highlights : [];
          const tagline = isFeatured && "tagline" in project ? project.tagline : null;

          return (
            <StaggerItem key={key}>
              <Card
                className={cn(
                  "flex flex-col card-hover lg:flex-row lg:items-stretch",
                  isFeatured && "border-primary/30 bg-gradient-to-br from-primary/5 via-card to-card",
                )}
              >
                <CardHeader className="flex-1 space-y-4 p-6 sm:p-7">
                  <div className="flex flex-wrap gap-1.5">
                    <StatusBadge status={meta.status} t={t} />
                    {isFeatured && <Badge>{t.inDevelopment}</Badge>}
                  </div>

                  <div>
                    <CardTitle className="text-xl sm:text-2xl">{project.name}</CardTitle>
                    {tagline && <p className="mt-1.5 text-sm font-medium text-primary">{tagline}</p>}
                    <CardDescription className="mt-3 text-sm leading-relaxed sm:text-[15px]">
                      {project.description}
                    </CardDescription>
                  </div>

                  {highlights.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground-secondary">
                        {t.highlightsLabel}
                      </p>
                      <ul className="grid gap-1.5 sm:grid-cols-2">
                        {highlights.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-foreground-secondary">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="flex flex-col justify-between gap-4 border-t border-border p-6 sm:p-7 lg:max-w-md lg:border-l lg:border-t-0">
                  {isFeatured && (
                    <FlowJerseyPreviewStrip
                      items={flowjerseyGallery.items}
                      labels={galleryLabels}
                      href={flowjerseyHref}
                      ariaLabel={t.previewAriaLabel}
                      screenshotsAvailable={flowjerseyGallery.available}
                      placeholderText={dict.featuredProject.galleryPlaceholderItem}
                    />
                  )}

                  {technologies.length > 0 && (
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-foreground-secondary">
                        {t.technologiesLabel}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border bg-background-secondary px-2 py-0.5 text-xs text-foreground-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {meta.hasDetailPage && (
                      <Link href={flowjerseyHref} className={buttonVariants({ size: "sm" })}>
                        {t.viewDetails}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}
                    {meta.github && (
                      <a
                        href={meta.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        <GitHubIcon className="h-4 w-4" />
                        {t.githubLabel}
                      </a>
                    )}
                    {meta.demo && (
                      <a
                        href={meta.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={buttonVariants({ variant: "outline", size: "sm" })}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t.demoLabel}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </PageSection>
  );
}
