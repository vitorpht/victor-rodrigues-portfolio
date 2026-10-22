"use client";

import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryImageItem = {
  image: string;
};

type ProjectScreenshotProps = {
  item: GalleryImageItem;
  title: string;
  available: boolean;
  placeholderText?: string;
  priority?: boolean;
  /** Força loading eager (ex.: miniaturas above-the-fold com o mesmo src da preview) */
  eager?: boolean;
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

export function ProjectScreenshot({
  item,
  title,
  available,
  placeholderText,
  priority,
  eager,
  compact,
  className,
}: ProjectScreenshotProps) {
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

  const loadEager = Boolean(priority || eager);

  return (
    <Image
      src={item.image}
      alt={title}
      fill
      className={cn("object-cover object-top", className)}
      // Screenshots de UI perdem nitidez com AVIF/WebP — servir o ficheiro original
      unoptimized={!compact}
      quality={compact ? 90 : 100}
      sizes={
        compact
          ? "(max-width: 768px) 25vw, 280px"
          : "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1920px"
      }
      priority={priority}
      fetchPriority={priority ? "high" : "auto"}
      loading={loadEager ? "eager" : "lazy"}
    />
  );
}
