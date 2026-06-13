"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { FlowJerseyScreenshot } from "@/components/flowjersey/flowjersey-screenshot";
import type { FlowJerseyGalleryItem, FlowJerseyGalleryKey } from "@/data/flowjersey-gallery";
import { cn } from "@/lib/utils";

type GalleryLabels = Record<FlowJerseyGalleryKey, string>;

type FlowJerseyGalleryProps = {
  items: FlowJerseyGalleryItem[];
  labels: GalleryLabels;
  placeholderText: string;
  screenshotsAvailable: boolean;
};

function GallerySlide({
  item,
  title,
  placeholderText,
  screenshotsAvailable,
  priority,
  className,
}: {
  item: FlowJerseyGalleryItem;
  title: string;
  placeholderText: string;
  screenshotsAvailable: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-xl bg-background-secondary", className)}>
      <FlowJerseyScreenshot
        item={item}
        title={title}
        available={screenshotsAvailable}
        placeholderText={placeholderText}
        priority={priority}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent px-4 py-3">
        <p className="text-sm font-medium text-foreground">{title}</p>
      </div>
    </div>
  );
}

export function FlowJerseyGallery({
  items,
  labels,
  placeholderText,
  screenshotsAvailable,
}: FlowJerseyGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const total = items.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
    },
    [total],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (!lightbox) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, goPrev, goNext]);

  const current = items[index];

  return (
    <div className="space-y-4">
      <div className="relative">
        <motion.div
          key={current.key}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="group relative block w-full cursor-zoom-in text-left"
            aria-label={`${labels[current.key]} — ampliar`}
          >
            <GallerySlide
              item={current}
              title={labels[current.key]}
              placeholderText={placeholderText}
              screenshotsAvailable={screenshotsAvailable}
              priority={index === 0}
            />
            <span className="absolute right-3 top-3 rounded-md border border-border/80 bg-background/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <Expand className="h-4 w-4 text-foreground" aria-hidden="true" />
            </span>
          </button>
        </motion.div>

        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-background/90 p-2 shadow-sm backdrop-blur-sm transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="Seguinte"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-all duration-200",
              i === index
                ? "bg-primary/15 text-primary"
                : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground",
            )}
            aria-current={i === index ? "true" : undefined}
          >
            {labels[item.key]}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={labels[current.key]}
          >
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute right-4 top-4 rounded-full border border-border bg-card p-2 transition-colors hover:border-primary/40"
              aria-label="Fechar"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goPrev}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-3 transition-colors hover:border-primary/40"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="w-full max-w-5xl">
              <GallerySlide
                item={current}
                title={labels[current.key]}
                placeholderText={placeholderText}
                screenshotsAvailable={screenshotsAvailable}
                priority
                className="aspect-video max-h-[85vh] rounded-2xl"
              />
            </div>

            <button
              type="button"
              onClick={goNext}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-3 transition-colors hover:border-primary/40"
              aria-label="Seguinte"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
