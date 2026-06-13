"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlowJerseyGalleryItem } from "@/data/flowjersey-gallery";

type FlowJerseyScreenshotProps = {
  item: FlowJerseyGalleryItem;
  title: string;
  available: boolean;
  placeholderText?: string;
  priority?: boolean;
  compact?: boolean;
  className?: string;
};

function ScreenshotPlaceholder({
  title,
  placeholderText,
  compact,
  className,
}: {
  title: string;
  placeholderText?: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-1.5 border border-dashed border-border/60 bg-background-secondary/50 text-center",
        compact ? "p-2" : "p-6",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-lg bg-primary/10 text-primary",
          compact ? "h-6 w-6" : "h-10 w-10",
        )}
      >
        <ImageIcon className={cn(compact ? "h-3 w-3" : "h-5 w-5")} aria-hidden="true" />
      </div>
      {!compact && (
        <>
          <p className="text-sm font-medium text-foreground">{title}</p>
          {placeholderText && (
            <p className="max-w-xs text-xs text-foreground-secondary">{placeholderText}</p>
          )}
        </>
      )}
    </div>
  );
}

export function FlowJerseyScreenshot({
  item,
  title,
  available,
  placeholderText,
  priority,
  compact,
  className,
}: FlowJerseyScreenshotProps) {
  if (!available) {
    return (
      <ScreenshotPlaceholder
        title={title}
        placeholderText={placeholderText}
        compact={compact}
        className={className}
      />
    );
  }

  return (
    <Image
      src={item.image}
      alt={title}
      fill
      className={cn("object-cover object-top", className)}
      sizes={
        priority
          ? "(max-width: 768px) 100vw, 640px"
          : compact
            ? "(max-width: 768px) 25vw, 160px"
            : "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 960px"
      }
      priority={priority}
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? undefined : "lazy"}
    />
  );
}
