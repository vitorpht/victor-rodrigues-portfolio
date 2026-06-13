"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  GraduationCap,
} from "lucide-react";
import { CertificationModal } from "@/components/certifications/certification-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { buttonVariants } from "@/components/ui/button";
import {
  certifications,
  countCertificationsByStatus,
  filterCertifications,
  type CertificationEntry,
  type CertificationStatus,
} from "@/data/certifications";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { SectionProps } from "@/types";

const statusStyles: Record<CertificationStatus, string> = {
  completed:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  in_progress: "border-primary/30 bg-primary/10 text-primary",
  planned: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  renewal_required:
    "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400",
};

const statusAccent: Record<CertificationStatus, string> = {
  completed: "from-emerald-500/80 via-emerald-500/40 to-transparent",
  in_progress: "from-primary/80 via-primary/40 to-transparent",
  planned: "from-amber-500/80 via-amber-500/40 to-transparent",
  renewal_required: "from-orange-500/80 via-orange-500/40 to-transparent",
};

const filterKeys = ["all", "completed", "in_progress", "planned"] as const;
type FilterTab = (typeof filterKeys)[number];

type CertificationItemCopy = {
  name: string;
  issuer?: string;
  language?: string;
  description?: string;
};

export function Certifications({ dict, locale }: SectionProps) {
  const t = dict.certifications;
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [selectedEntry, setSelectedEntry] = useState<CertificationEntry | null>(null);

  const stats = useMemo(() => countCertificationsByStatus(certifications), []);
  const filtered = useMemo(
    () => filterCertifications(certifications, activeFilter),
    [activeFilter],
  );

  const selectedCopy = selectedEntry
    ? (t.items[selectedEntry.id as keyof typeof t.items] as CertificationItemCopy)
    : null;

  return (
    <PageSection labelledBy="certifications-title" compact className="bg-background-secondary/40">
      <SectionHeader id="certifications-title" title={t.title} subtitle={t.subtitle} />

      <StaggerContainer className="mt-8 grid gap-3 sm:grid-cols-3" stagger={0.06}>
        <StaggerItem>
          <StatCard
            label={t.stats.completed}
            value={stats.completed}
            accent="emerald"
            icon={CheckCircle2}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard
            label={t.stats.inProgress}
            value={stats.in_progress}
            accent="primary"
            icon={GraduationCap}
          />
        </StaggerItem>
        <StaggerItem>
          <StatCard label={t.stats.planned} value={stats.planned} accent="amber" icon={Clock} />
        </StaggerItem>
      </StaggerContainer>

      <div className="mt-8 flex justify-center">
        <div
          className="inline-flex flex-wrap gap-1 rounded-xl border border-border bg-card/80 p-1 shadow-sm ring-1 ring-primary/[0.04] backdrop-blur-sm"
          role="tablist"
          aria-label={t.filters.label}
        >
          {filterKeys.map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={activeFilter === key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                activeFilter === key
                  ? "bg-primary/10 text-primary shadow-sm"
                  : "text-foreground-secondary hover:bg-background-secondary/80 hover:text-foreground",
              )}
            >
              {t.filters[key]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-foreground-secondary">{t.empty}</p>
      ) : (
        <StaggerContainer
          key={activeFilter}
          className="mt-8 grid gap-5 sm:grid-cols-2"
          stagger={0.05}
        >
          {filtered.map((entry) => {
            const item = t.items[entry.id as keyof typeof t.items] as CertificationItemCopy;
            return (
              <StaggerItem key={entry.id}>
                <CertificationCard
                  entry={entry}
                  item={item}
                  labels={t.labels}
                  locale={locale}
                  statusLabel={t.status[entry.status]}
                  viewLabel={t.viewCertificate}
                  onView={() => setSelectedEntry(entry)}
                />
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      )}

      <CertificationModal
        open={!!selectedEntry}
        onClose={() => setSelectedEntry(null)}
        title={selectedCopy?.name ?? ""}
        issuer={selectedCopy?.issuer}
        credential={selectedEntry?.credential}
        labels={{
          close: t.modal.close,
          noCredential: t.modal.noCredential,
          openExternal: t.modal.openExternal,
          viewPdf: t.modal.viewPdf,
        }}
      />
    </PageSection>
  );
}

function StatCard({
  label,
  value,
  accent,
  icon: Icon,
}: {
  label: string;
  value: number;
  accent: "emerald" | "primary" | "amber";
  icon: typeof CheckCircle2;
}) {
  const styles = {
    emerald: {
      value: "text-emerald-600 dark:text-emerald-400",
      icon: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      glow: "shadow-emerald-500/5",
    },
    primary: {
      value: "text-primary",
      icon: "bg-primary/10 text-primary",
      glow: "shadow-primary/5",
    },
    amber: {
      value: "text-amber-600 dark:text-amber-400",
      icon: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      glow: "shadow-amber-500/5",
    },
  }[accent];

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-xl border border-border bg-card p-4 ring-1 ring-primary/[0.04] shadow-sm",
        styles.glow,
      )}
    >
      <div
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-lg",
          styles.icon,
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium leading-snug text-foreground-secondary">{label}</p>
        <p className={cn("mt-0.5 text-2xl font-bold tabular-nums tracking-tight", styles.value)}>
          {value}
        </p>
      </div>
    </div>
  );
}

function formatCertDate(iso: string, locale: Locale): string {
  const [year, month, day] = iso.split("-").map(Number);
  const intlLocale = locale === "pt" ? "pt-PT" : locale === "es" ? "es-ES" : "en-GB";
  return new Intl.DateTimeFormat(intlLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function formatScore(score: number, max: number, template: string): string {
  return template.replace("{score}", String(score)).replace("{max}", String(max));
}

function MetaRow({
  label,
  children,
  icon: Icon,
}: {
  label: string;
  children: ReactNode;
  icon?: typeof Calendar;
}) {
  return (
    <div className="flex items-start justify-between gap-3 py-1.5">
      <dt className="flex shrink-0 items-center gap-1.5 text-xs text-foreground-secondary">
        {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
        {label}
      </dt>
      <dd className="text-right text-xs font-medium leading-snug text-foreground">{children}</dd>
    </div>
  );
}

function CertificationCard({
  entry,
  item,
  labels,
  locale,
  statusLabel,
  viewLabel,
  onView,
}: {
  entry: CertificationEntry;
  item: CertificationItemCopy;
  labels: SectionProps["dict"]["certifications"]["labels"];
  locale: Locale;
  statusLabel: string;
  viewLabel: string;
  onView: () => void;
}) {
  const hasGrades =
    entry.grades &&
    (entry.grades.finalProject != null ||
      entry.grades.projectDefense != null ||
      entry.grades.finalExam != null);

  return (
    <Card className="relative flex h-full flex-col overflow-hidden card-hover !p-0">
      <div
        className={cn("h-1 w-full bg-gradient-to-r", statusAccent[entry.status])}
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <CardHeader className="space-y-3 p-0">
          <div className="flex items-start justify-between gap-3">
            <CardTitle className="text-base leading-snug sm:text-lg">{item.name}</CardTitle>
            <StatusBadge status={entry.status} label={statusLabel} />
          </div>

          <div>
            {item.issuer && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-foreground-secondary">
                <Building2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {item.issuer}
              </p>
            )}
            {item.language && (
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <Code2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span className="text-xs text-foreground-secondary">{labels.language}</span>
                <span className="rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.language}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="mt-4 flex flex-1 flex-col space-y-4 p-0">
          <dl className="divide-y divide-border/60 rounded-lg border border-border/60 bg-background-secondary/30 px-3 py-1">
            {entry.startDate && (
              <MetaRow label={labels.start} icon={Calendar}>
                {formatCertDate(entry.startDate, locale)}
              </MetaRow>
            )}
            {entry.endDate ? (
              <MetaRow label={labels.end} icon={Calendar}>
                {formatCertDate(entry.endDate, locale)}
              </MetaRow>
            ) : (
              entry.status === "in_progress" &&
              entry.startDate && (
                <MetaRow label={labels.end} icon={Calendar}>
                  <span className="text-primary">{labels.endInProgress}</span>
                </MetaRow>
              )
            )}
            {!entry.startDate && !entry.endDate && entry.completedDate && (
              <MetaRow label={labels.date} icon={Calendar}>
                {entry.completedDate}
              </MetaRow>
            )}
            {hasGrades && (
              <div className="space-y-0 py-1.5">
                {entry.grades?.finalProject != null && (
                  <MetaRow label={labels.finalProject}>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {formatScore(
                        entry.grades.finalProject,
                        entry.grades.maxScore ?? 100,
                        labels.score,
                      )}
                    </span>
                  </MetaRow>
                )}
                {entry.grades?.projectDefense != null && (
                  <MetaRow label={labels.projectDefense}>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {formatScore(
                        entry.grades.projectDefense,
                        entry.grades.maxScore ?? 100,
                        labels.score,
                      )}
                    </span>
                  </MetaRow>
                )}
                {entry.grades?.finalExam != null && (
                  <MetaRow label={labels.finalExam}>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      {formatScore(
                        entry.grades.finalExam,
                        entry.grades.maxScore ?? 100,
                        labels.score,
                      )}
                    </span>
                  </MetaRow>
                )}
              </div>
            )}
          </dl>

          {item.description && (
            <CardDescription className="border-t border-border/50 pt-4 text-xs leading-relaxed sm:text-sm">
              {item.description}
            </CardDescription>
          )}

          <button
            type="button"
            onClick={onView}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "mt-auto w-full transition-all duration-200 hover:scale-[1.02] hover:border-primary/40 hover:shadow-sm hover:shadow-primary/5",
            )}
          >
            <ExternalLink className="h-4 w-4" />
            {viewLabel}
          </button>
        </CardContent>
      </div>
    </Card>
  );
}

function StatusBadge({
  status,
  label,
  compact = false,
}: {
  status: CertificationStatus;
  label: string;
  compact?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full border font-medium",
        statusStyles[status],
        compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs",
      )}
    >
      {label}
    </span>
  );
}
