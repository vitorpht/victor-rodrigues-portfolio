"use client";

import Link from "next/link";
import { useState } from "react";
import { ProjectScreenshot } from "@/components/projects/project-screenshot";
import { cn } from "@/lib/utils";

type GalleryItem = {
  key: string;
  image: string;
};

type ProjectPreviewStripProps = {
  items: GalleryItem[];
  labels: Record<string, string>;
  href: string;
  ariaLabel: string;
  screenshotsAvailable: boolean;
  placeholderText: string;
  className?: string;
};

export function ProjectPreviewStrip({
  items,
  labels,
  href,
  ariaLabel,
  screenshotsAvailable,
  placeholderText,
  className,
}: ProjectPreviewStripProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = items[activeIndex] ?? items[0];

  if (!active) return null;

  return (
    <div className={cn("space-y-1.5", className)}>
      <Link
        href={href}
        aria-label={ariaLabel}
        className="group block overflow-hidden rounded-lg border border-border/50 bg-background-secondary/30 transition-colors hover:border-primary/25"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <ProjectScreenshot
            key={active.key}
            item={active}
            title={labels[active.key]}
            available={screenshotsAvailable}
            placeholderText={placeholderText}
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      </Link>

      <div
        className={cn(
          "grid gap-1",
          items.length <= 2 && "grid-cols-2",
          items.length === 3 && "grid-cols-3",
          items.length === 4 && "grid-cols-4",
          items.length >= 5 && "grid-cols-5",
        )}
      >
        {items.map((item, i) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActiveIndex(i)}
            onMouseEnter={() => setActiveIndex(i)}
            className={cn(
              "relative aspect-[16/10] overflow-hidden rounded-md transition-all duration-200",
              i === activeIndex
                ? "ring-1 ring-primary/50 opacity-100"
                : "opacity-45 hover:opacity-75",
            )}
            aria-label={labels[item.key]}
            aria-current={i === activeIndex ? "true" : undefined}
          >
            <ProjectScreenshot
              item={item}
              title={labels[item.key]}
              available={screenshotsAvailable}
              compact
              eager
            />
          </button>
        ))}
      </div>
    </div>
  );
}
