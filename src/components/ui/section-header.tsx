import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "center" | "left";
};

export function SectionHeader({
  id,
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <ScrollReveal className={cn(align === "center" && "mx-auto max-w-2xl text-center", className)}>
      <h2 id={id} className="text-2xl font-bold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-sm text-foreground-secondary sm:text-base">{subtitle}</p>}
    </ScrollReveal>
  );
}

type PageSectionProps = {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  className?: string;
  compact?: boolean;
  centered?: boolean;
};

export function PageSection({
  children,
  id,
  labelledBy,
  className,
  compact = false,
  centered = false,
}: PageSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        compact ? "section-padding-compact" : "section-padding",
        centered && "flex flex-1 flex-col justify-center",
        className,
      )}
    >
      <div className="section-container">{children}</div>
    </section>
  );
}
