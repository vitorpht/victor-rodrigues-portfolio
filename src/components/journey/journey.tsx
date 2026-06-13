import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { CvLink } from "@/components/ui/cv-link";
import { timelineEntries } from "@/data/timeline";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types";

export function Journey({ dict, locale }: SectionProps) {
  const t = dict.journey;

  return (
    <PageSection labelledBy="journey-title" compact centered>
      <SectionHeader id="journey-title" title={t.title} subtitle={t.subtitle} />

      <StaggerContainer className="relative mx-auto mt-10 max-w-2xl" stagger={0.08}>
        <div className="absolute bottom-0 left-[11px] top-0 w-px bg-border sm:left-4" aria-hidden="true" />

        {timelineEntries.map((entry) => {
          const item = t.items[entry.id as keyof typeof t.items];
          const periodLabel = entry.isFuture ? t.futureLabel : entry.period;

          return (
            <StaggerItem key={entry.id}>
              <div className="relative flex gap-5 pb-10 last:pb-0 sm:gap-6">
                <div className="relative z-10 mt-1 flex shrink-0 flex-col items-center">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-full border-2 sm:h-8 sm:w-8",
                      entry.isFuture
                        ? "border-amber-500/40 bg-amber-500/10"
                        : "border-primary/40 bg-primary/10",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5",
                        entry.isFuture ? "bg-amber-500" : "bg-primary",
                      )}
                    />
                  </span>
                </div>

                <div className="min-w-0 flex-1 rounded-xl border border-border bg-card p-4 ring-1 ring-primary/[0.04] sm:p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "text-xs font-semibold uppercase tracking-wide",
                        entry.isFuture ? "text-amber-600 dark:text-amber-400" : "text-primary",
                      )}
                    >
                      {periodLabel}
                    </span>
                    {entry.isFuture && (
                      <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-700 dark:text-amber-400">
                        {t.plannedBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-foreground-secondary">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <div className="mt-10 flex justify-center">
        <CvLink label={t.viewCv} source="journey" locale={locale} variant="button" />
      </div>
    </PageSection>
  );
}
