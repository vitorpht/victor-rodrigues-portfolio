"use client";

import { useEffect, useRef, useState } from "react";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { statsItems } from "@/data/stats";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types";

const COUNT_UP_MS = 1800;

/** Contador animado ao entrar no viewport (IntersectionObserver + rAF, sem bibliotecas). */
function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCurrent(value);
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / COUNT_UP_MS, 1);
          setCurrent(Math.round(value * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { rootMargin: "-20px" },
    );
    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {current}
      {suffix}
    </span>
  );
}

type StatsSectionProps = SectionProps & {
  /** @deprecated use inline */
  embedded?: boolean;
  inline?: boolean;
};

export function StatsSection({ dict, embedded = false, inline = false }: StatsSectionProps) {
  const t = dict.stats;
  const isInline = inline || embedded;

  const grid = (
    <div className={cn("grid grid-cols-1 gap-2.5 sm:grid-cols-3", isInline ? "mt-2.5" : "mt-8")}>
      {statsItems.map((item, i) => {
        const copy = t.items[item.id as keyof typeof t.items];
        return (
          <div
            key={item.id}
            style={{ "--rise-delay": `${i * 0.06}s` } as React.CSSProperties}
            className={cn(
              "rise-in",
              "rounded-lg border border-border bg-card/80 text-center ring-1 ring-primary/[0.04] shadow-sm backdrop-blur-sm",
              isInline ? "px-3.5 py-2.5" : "p-5",
            )}
          >
            <p
              className={cn(
                "font-bold tracking-tight text-primary",
                isInline ? "text-2xl sm:text-[1.75rem]" : "text-3xl sm:text-4xl",
              )}
            >
              <CountUp value={item.value} suffix={item.suffix} />
            </p>
            <p
              className={cn(
                "font-medium text-foreground",
                isInline ? "mt-1 text-[15px]" : "mt-2 text-sm",
              )}
            >
              {copy.label}
            </p>
          </div>
        );
      })}
    </div>
  );

  if (isInline) {
    return (
      <div aria-labelledby="stats-title">
        <div className="mb-2.5 flex items-baseline justify-between gap-3">
          <h2 id="stats-title" className="text-lg font-bold tracking-tight sm:text-xl">
            {t.title}
          </h2>
          <p className="hidden text-[15px] text-foreground-secondary sm:block">{t.subtitle}</p>
        </div>
        {grid}
      </div>
    );
  }

  return (
    <PageSection
      labelledBy="stats-title"
      compact
      className="border-y border-border/50 bg-background-secondary/30"
    >
      <SectionHeader id="stats-title" title={t.title} subtitle={t.subtitle} />
      {grid}
    </PageSection>
  );
}
