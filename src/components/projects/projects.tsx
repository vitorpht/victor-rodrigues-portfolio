import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/social-icons";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { FlowJerseyPreviewStrip } from "@/components/projects/flowjersey-preview-strip";
import type { DesbravadoresGalleryItem, DesbravadoresGalleryKey } from "@/data/desbravadores-gallery";
import type { DservicesGalleryItem, DservicesGalleryKey } from "@/data/dservices-gallery";
import type { FlowJerseyGalleryItem, FlowJerseyGalleryKey } from "@/data/flowjersey-gallery";
import { getProject, projectIds, type ProjectId, type ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";
import type { SectionProps } from "@/types";

type GalleryAssets = {
  available: boolean;
  items: { key: string; image: string }[];
};

function StatusBadge({
  status,
  t,
}: {
  status: ProjectStatus;
  t: SectionProps["dict"]["projects"];
}) {
  if (status === "in_development") {
    return <Badge>{t.inDevelopment}</Badge>;
  }
  if (status === "completed") {
    return <Badge className="border-border bg-muted text-foreground-secondary">{t.completed}</Badge>;
  }
  if (status === "coming_soon") {
    return <Badge className="border-border bg-muted text-foreground-secondary">{t.comingSoon}</Badge>;
  }
  return null;
}

function TypeBadge({
  id,
  t,
}: {
  id: ProjectId;
  t: SectionProps["dict"]["projects"];
}) {
  if (id === "desbravadores") return <Badge>{t.wordpressBadge}</Badge>;
  if (id === "dservices") return <Badge>{t.nextjsBadge}</Badge>;
  if (id === "flowjersey") return <Badge>{t.saasBadge}</Badge>;
  return null;
}

function getDetailHref(id: ProjectId, locale: Locale): string | null {
  if (id === "flowjersey") return routes.flowjersey(locale);
  if (id === "desbravadores") return routes.desbravadores(locale);
  if (id === "dservices") return routes.dservices(locale);
  return null;
}

export function Projects({
  dict,
  locale,
  flowjerseyGallery,
  desbravadoresGallery,
  dservicesGallery,
}: SectionProps & {
  flowjerseyGallery: { available: boolean; items: FlowJerseyGalleryItem[] };
  desbravadoresGallery: { available: boolean; items: DesbravadoresGalleryItem[] };
  dservicesGallery: { available: boolean; items: DservicesGalleryItem[] };
}) {
  const t = dict.projects;
  const flowjerseyLabels = dict.featuredProject.gallery as Record<FlowJerseyGalleryKey, string>;
  const desbravadoresLabels = dict.desbravadoresProject.gallery as Record<
    DesbravadoresGalleryKey,
    string
  >;
  const dservicesProject = dict.dservicesProject;
  const dservicesLabels = (dservicesProject?.gallery ?? {}) as Record<DservicesGalleryKey, string>;

  const galleries: Partial<Record<ProjectId, GalleryAssets>> = {
    flowjersey: flowjerseyGallery,
    desbravadores: desbravadoresGallery,
    dservices: dservicesGallery,
  };

  const galleryLabels: Partial<Record<ProjectId, Record<string, string>>> = {
    flowjersey: flowjerseyLabels,
    desbravadores: desbravadoresLabels,
    dservices: dservicesLabels,
  };

  const placeholderTexts: Partial<Record<ProjectId, string>> = {
    flowjersey: dict.featuredProject.galleryPlaceholderItem,
    desbravadores: dict.desbravadoresProject.galleryPlaceholderItem,
    dservices: dservicesProject?.galleryPlaceholderItem ?? "",
  };

  const previewAriaLabels: Partial<Record<ProjectId, string>> = {
    flowjersey: t.previewAriaLabel,
    desbravadores: t.desbravadoresPreviewAriaLabel,
    dservices: t.dservicesPreviewAriaLabel,
  };

  return (
    <PageSection labelledBy="projects-title" compact centered className="bg-background-secondary/50">
      <SectionHeader id="projects-title" title={t.title} subtitle={t.subtitle} />

      <StaggerContainer className="mt-8 flex flex-col gap-6" stagger={0.07}>
        {projectIds.map((key) => {
          const project = t[key];
          if (!project || typeof project !== "object") return null;

          const meta = getProject(key);
          const isFeatured = meta.featured;
          const technologies = meta.technologies;
          const highlights = "highlights" in project ? project.highlights : [];
          const tagline = "tagline" in project ? project.tagline : null;
          const detailHref = meta.hasDetailPage ? getDetailHref(key, locale) : null;
          const gallery = galleries[key];
          const labels = galleryLabels[key];

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
                    <TypeBadge id={key} t={t} />
                    {isFeatured && (
                      <Badge className="border-border bg-muted text-foreground-secondary">
                        {t.featured}
                      </Badge>
                    )}
                    <StatusBadge status={meta.status} t={t} />
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
                  {gallery && labels && detailHref && (
                    <FlowJerseyPreviewStrip
                      items={gallery.items}
                      labels={labels}
                      href={detailHref}
                      ariaLabel={previewAriaLabels[key] ?? t.viewDetails}
                      screenshotsAvailable={gallery.available}
                      placeholderText={placeholderTexts[key] ?? ""}
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
                    {detailHref && (
                      <Link href={detailHref} className={buttonVariants({ size: "sm" })}>
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
                        {key === "desbravadores" || key === "dservices" || key === "flowjersey"
                          ? t.websiteLabel
                          : t.demoLabel}
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
