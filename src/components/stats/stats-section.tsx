"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { statsItems } from "@/data/stats";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types";

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const spring = useSpring(0, { duration: 1.8, bounce: 0 });
  const display = useTransform(spring, (v) => `${Math.round(v)}${suffix}`);
  const [text, setText] = useState(`0${suffix}`);

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, spring, value]);

  useEffect(() => {
    return display.on("change", (v) => setText(v));
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
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
    <div className={cn("grid grid-cols-2 gap-2.5 lg:grid-cols-4", isInline ? "mt-2.5" : "mt-8")}>
      {statsItems.map((item, i) => {
        const copy = t.items[item.id as keyof typeof t.items];
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className={cn(
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
            <p className={cn("font-medium text-foreground", isInline ? "mt-1 text-[15px]" : "mt-2 text-sm")}>
              {copy.label}
            </p>
          </motion.div>
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
    <PageSection labelledBy="stats-title" compact className="border-y border-border/50 bg-background-secondary/30">
      <SectionHeader id="stats-title" title={t.title} subtitle={t.subtitle} />
      {grid}
    </PageSection>
  );
}
