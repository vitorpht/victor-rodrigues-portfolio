"use client";

import Link from "next/link";
import { useState } from "react";
import { FlowJerseyScreenshot } from "@/components/flowjersey/flowjersey-screenshot";
import type { FlowJerseyGalleryItem, FlowJerseyGalleryKey } from "@/data/flowjersey-gallery";
import { cn } from "@/lib/utils";

type FlowJerseyPreviewStripProps = {
  items: FlowJerseyGalleryItem[];
  labels: Record<FlowJerseyGalleryKey, string>;
  href: string;
  ariaLabel: string;
  screenshotsAvailable: boolean;
  placeholderText: string;
  className?: string;
};

export function FlowJerseyPreviewStrip({
  items,
  labels,
  href,
  ariaLabel,
  screenshotsAvailable,
  placeholderText,
  className,
}: FlowJerseyPreviewStripProps) {
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
          <FlowJerseyScreenshot
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

      <div className="grid grid-cols-4 gap-1">
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
            <FlowJerseyScreenshot
              item={item}
              title={labels[item.key]}
              available={screenshotsAvailable}
              compact
            />
          </button>
        ))}
      </div>
    </div>
  );
}
