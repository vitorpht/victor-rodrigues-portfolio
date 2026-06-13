import Link from "next/link";
import { ExternalLink, FileDown, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getCvPdfUrl } from "@/lib/cv/urls";
import type {
  CvCertificationGroup,
  CvData,
  CvEducationItem,
  CvMainProject,
  CvSkillCard,
  CvStatItem,
} from "@/lib/cv/build-cv-data";
import { cn } from "@/lib/utils";

type CvPageContentProps = {
  data: CvData;
  downloadLabel: string;
};

function splitHalf<T>(items: T[]): [T[], T[]] {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}

export function CvPageContent({ data, downloadLabel }: CvPageContentProps) {
  return (
    <article className="mx-auto w-full max-w-3xl">
      {/* Hero */}
      <header className="mb-10 border-b border-border pb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{data.name}</h1>
            <p className="mt-2 text-lg font-semibold text-primary">{data.title}</p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-secondary sm:text-base">{data.tagline}</p>
            <p className="mt-3 flex items-center gap-2 text-sm text-foreground-secondary">
              <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {data.location}
            </p>
          </div>
          <a
            href={getCvPdfUrl(data.locale)}
            className={cn(buttonVariants({ size: "default" }), "w-full shrink-0 sm:w-auto")}
            download
          >
            <FileDown className="h-4 w-4" />
            {downloadLabel}
          </a>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
          {data.links.map((link) => (
            <div key={link.label}>
              <dt className="sr-only">{link.label}</dt>
              <dd>
                <a
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="group inline-flex flex-wrap items-center gap-1.5 text-sm text-foreground-secondary hover:text-primary"
                >
                  <span className="font-medium text-foreground">{link.label}:</span>
                  <span className="break-all">{link.display}</span>
                  {!link.url.startsWith("mailto:") && (
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-40" aria-hidden="true" />
                  )}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <CvSection title={data.sections.summary}>
        <div className="space-y-3">
          {data.summary.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-foreground-secondary sm:text-[15px]">
              {paragraph}
            </p>
          ))}
        </div>
      </CvSection>

      <CvSection title={data.sections.objectives}>
        <p className="text-sm leading-relaxed text-foreground sm:text-[15px]">{data.objectiveHighlight}</p>
      </CvSection>

      <CvSection title={data.sections.mainProject}>
        <FlowJerseyBlock project={data.mainProject} />
      </CvSection>

      <CvSection title={data.sections.keySkills}>
        <div className="space-y-4">
          {data.keySkillCards.map((skill) => (
            <SkillLine key={skill.title} skill={skill} />
          ))}
        </div>
      </CvSection>

      <CvSection title={data.sections.technicalProfile}>
        <ul className="space-y-1.5">
          {data.technicalProfileCards.map((card) => (
            <li key={card.id} className="text-sm text-foreground-secondary">
              • {card.label}
            </li>
          ))}
        </ul>
      </CvSection>

      {data.academicProjects.length > 0 && (
        <CvSection title={data.sections.academicProjects}>
          {data.academicProjects.map((project) => {
            const [left, right] = splitHalf(project.topics);
            return (
              <div key={project.name}>
                <h3 className="font-semibold text-foreground">{project.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-secondary">{project.description}</p>
                <div className="mt-4 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                  <ul className="space-y-1">
                    {left.map((topic) => (
                      <li key={topic} className="text-sm text-foreground-secondary">
                        • {topic}
                      </li>
                    ))}
                  </ul>
                  <ul className="space-y-1">
                    {right.map((topic) => (
                      <li key={topic} className="text-sm text-foreground-secondary">
                        • {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </CvSection>
      )}

      {data.educationCurrent.length > 0 && (
        <CvSection title={data.sections.educationCurrent}>
          <EducationLines items={data.educationCurrent} />
        </CvSection>
      )}

      {data.educationPlanned.length > 0 && (
        <CvSection title={data.sections.educationPlanned}>
          <EducationLines items={data.educationPlanned} compact />
        </CvSection>
      )}

      {data.educationFutureAreas.length > 0 && (
        <CvSection title={data.sections.educationFutureAreas}>
          <p className="text-sm text-foreground-secondary">{data.educationFutureAreas.join(" & ")}</p>
        </CvSection>
      )}

      {(data.certificationsCompleted.items.length > 0 || data.certificationsInProgress.items.length > 0) && (
        <CvSection title={data.sections.certifications}>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <CertColumn group={data.certificationsCompleted} />
            <CertColumn group={data.certificationsInProgress} variant="inProgress" />
          </div>
        </CvSection>
      )}

      <CvSection title={data.sections.skills}>
        <dl className="space-y-3">
          {data.technologyGroups.map((group) => (
            <div key={group.category}>
              <dt className="text-sm font-semibold uppercase tracking-wide text-primary">{group.categoryLabel}</dt>
              <dd className="mt-1 text-sm text-foreground-secondary">{group.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </CvSection>

      <CvSection title={data.sections.languages}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
              <th className="pb-2 pr-4 font-semibold">{data.labels.languageName}</th>
              <th className="pb-2 text-right font-semibold">{data.labels.languageLevel}</th>
            </tr>
          </thead>
          <tbody>
            {data.languages.map((lang) => (
              <tr key={lang.name} className="border-b border-border/60">
                <td className="py-2.5 pr-4 font-medium text-foreground">{lang.name}</td>
                <td className="py-2.5 text-right text-foreground-secondary">{lang.level}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CvSection>

      {data.interests.length > 0 && (
        <CvSection title={data.sections.interests}>
          <InterestsTwoCol tags={data.interests} />
        </CvSection>
      )}

      <div className="border-t border-border pt-6 text-center">
        <Link href={`/${data.locale}`} className="text-sm text-foreground-secondary hover:text-primary">
          ← {data.labels.backToPortfolio}
        </Link>
      </div>
    </article>
  );
}

function FlowJerseyBlock({ project }: { project: CvMainProject }) {
  const statRows = [];
  for (let i = 0; i < project.stats.length; i += 4) {
    statRows.push(project.stats.slice(i, i + 4));
  }

  return (
    <div>
      <h3 className="text-lg font-bold text-primary">{project.name}</h3>
      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {project.badges.map((badge) => (
          <span key={badge} className="text-xs font-semibold text-primary">
            {badge}
          </span>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {project.description.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-foreground-secondary">
            {paragraph}
          </p>
        ))}
      </div>

      <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-wider text-foreground">{project.statsTitle}</p>
      <div className="space-y-2">
        {statRows.map((row) => (
          <div key={row.map((s) => s.label).join("-")} className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => {
              const stat = row[i];
              if (!stat) return <div key={`empty-${i}`} />;
              return <StatCell key={stat.label} stat={stat} />;
            })}
          </div>
        ))}
      </div>

      <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-wider text-foreground">{project.metricsTitle}</p>
      <dl className="space-y-3">
        {project.technologyGroups.map((group) => (
          <div key={group.label}>
            <dt className="text-xs font-semibold uppercase tracking-wide text-primary">{group.label}</dt>
            <dd className="mt-1 text-sm text-foreground-secondary">{group.items.join(" · ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function StatCell({ stat }: { stat: CvStatItem }) {
  return (
    <div
      className={cn(
        "flex h-20 flex-col items-center justify-center rounded border px-1 text-center",
        stat.highlight ? "border-primary/30 bg-primary/[0.04]" : "border-border bg-card",
      )}
    >
      {stat.value ? (
        <p className="text-lg font-bold leading-none text-primary">{stat.value}</p>
      ) : (
        <div className="h-[18px]" />
      )}
      <p className="mt-1 text-[11px] leading-tight text-foreground-secondary">{stat.label}</p>
    </div>
  );
}

function SkillLine({ skill }: { skill: CvSkillCard }) {
  return (
    <div>
      <p className="font-semibold text-foreground">{skill.title}</p>
      <p className="mt-0.5 text-sm text-foreground-secondary">{skill.description}</p>
    </div>
  );
}

function CertColumn({
  group,
  variant = "completed",
}: {
  group: CvCertificationGroup;
  variant?: "completed" | "inProgress";
}) {
  if (group.items.length === 0) return null;

  return (
    <div>
      <p
        className={cn(
          "mb-4 text-xs font-bold uppercase tracking-wider",
          variant === "inProgress" ? "text-amber-600 dark:text-amber-400" : "text-primary",
        )}
      >
        {group.label}
      </p>
      <div className="space-y-4">
        {group.items.map((cert) => (
          <div key={cert.id}>
            <p className="text-sm font-semibold leading-snug text-foreground">{cert.name}</p>
            {(cert.issuer || cert.period) && (
              <p className="mt-0.5 text-sm text-foreground-secondary">
                {[cert.issuer, cert.period].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function EducationLines({ items, compact = false }: { items: CvEducationItem[]; compact?: boolean }) {
  return (
    <div className="space-y-4">
      {items.map((item) =>
        compact ? (
          <p key={item.id} className="text-sm text-foreground-secondary">
            {item.title}
            {item.institution ? ` · ${item.institution}` : ""}
          </p>
        ) : (
          <div key={item.id}>
            <p className="font-semibold text-foreground">{item.title}</p>
            <p className="mt-0.5 text-sm text-foreground-secondary">
              {[item.institution, item.period, item.status].filter(Boolean).join(" · ")}
            </p>
          </div>
        ),
      )}
    </div>
  );
}

function InterestsTwoCol({ tags }: { tags: string[] }) {
  const [left, right] = splitHalf(tags);
  return (
    <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
      <ul className="space-y-1">
        {left.map((tag) => (
          <li key={tag} className="text-sm text-foreground-secondary">
            • {tag}
          </li>
        ))}
      </ul>
      <ul className="space-y-1">
        {right.map((tag) => (
          <li key={tag} className="text-sm text-foreground-secondary">
            • {tag}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 border-b border-border pb-2 text-xs font-bold uppercase tracking-wider text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}
