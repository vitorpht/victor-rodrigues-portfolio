"use client";

import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X, ZoomOut } from "lucide-react";
import { FlowJerseyScreenshot } from "@/components/flowjersey/flowjersey-screenshot";
import { cn } from "@/lib/utils";

type GalleryItem = {
  key: string;
  image: string;
};

type FlowJerseyGalleryProps = {
  items: GalleryItem[];
  labels: Record<string, string>;
  placeholderText: string;
  screenshotsAvailable: boolean;
};

type ViewState = {
  scale: number;
  x: number;
  y: number;
};

type DragState = {
  pointerId: number;
  startX: number;
  startY: number;
  originX: number;
  originY: number;
  moved: boolean;
  /** 0 = left, 1 = middle (scroll button) */
  button: number;
};

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.4;
const SCROLL_ZOOM_STEP = 0.08;
const DRAG_THRESHOLD = 4;

const INITIAL_VIEW: ViewState = {
  scale: MIN_ZOOM,
  x: 0,
  y: 0,
};

function GallerySlide({
  item,
  title,
  placeholderText,
  screenshotsAvailable,
  priority,
  className,
  objectFit = "cover",
}: {
  item: GalleryItem;
  title: string;
  placeholderText: string;
  screenshotsAvailable: boolean;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain";
}) {
  return (
    <div className={cn("relative aspect-video w-full overflow-hidden rounded-xl bg-background-secondary", className)}>
      <FlowJerseyScreenshot
        item={item}
        title={title}
        available={screenshotsAvailable}
        placeholderText={placeholderText}
        priority={priority}
        className={objectFit === "contain" ? "!object-contain !object-center" : undefined}
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
  const [view, setView] = useState<ViewState>(INITIAL_VIEW);
  const [dragging, setDragging] = useState(false);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef(view);
  const dragRef = useRef<DragState | null>(null);
  const total = items.length;
  const isZoomed = view.scale > MIN_ZOOM + 0.001;

  viewRef.current = view;

  const resetView = useCallback(() => {
    setView(INITIAL_VIEW);
    setDragging(false);
    dragRef.current = null;
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
      resetView();
    },
    [total, resetView],
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  const closeLightbox = useCallback(() => {
    setLightbox(false);
    resetView();
  }, [resetView]);

  const zoomAtPoint = useCallback(
    (clientX: number, clientY: number, direction: 1 | -1 = 1, step = ZOOM_STEP) => {
      const frame = imageFrameRef.current;
      if (!frame) return;

      const rect = frame.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const px = clientX - rect.left;
      const py = clientY - rect.top;

      setView((current) => {
        const nextScale = Math.min(
          MAX_ZOOM,
          Math.max(MIN_ZOOM, Number((current.scale + direction * step).toFixed(3))),
        );

        if (nextScale <= MIN_ZOOM) return INITIAL_VIEW;

        const contentX = (px - current.x) / current.scale;
        const contentY = (py - current.y) / current.scale;

        return {
          scale: nextScale,
          x: px - contentX * nextScale,
          y: py - contentY * nextScale,
        };
      });
    },
    [],
  );

  const handleImageWheel = useCallback(
    (event: WheelEvent) => {
      const frame = imageFrameRef.current;
      if (!frame) return;

      const target = event.target;
      if (!(target instanceof Node) || !frame.contains(target)) return;

      event.preventDefault();
      const direction: 1 | -1 = event.deltaY < 0 ? 1 : -1;
      const intensity = Math.min(0.18, Math.max(SCROLL_ZOOM_STEP, Math.abs(event.deltaY) * 0.0012));
      zoomAtPoint(event.clientX, event.clientY, direction, intensity);
    },
    [zoomAtPoint],
  );

  const handleZoomOut = useCallback(() => {
    setView((current) => {
      const nextScale = Math.max(MIN_ZOOM, Number((current.scale - ZOOM_STEP).toFixed(2)));
      if (nextScale <= MIN_ZOOM) return INITIAL_VIEW;
      return { ...current, scale: nextScale };
    });
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isZoomed) return;

      const isMiddle = event.button === 1;
      const isLeft = event.button === 0;
      if (!isMiddle && !isLeft) return;

      // Botão do meio ou esquerdo: agarrar e mover quando há zoom
      if (isMiddle) event.preventDefault();

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        originX: viewRef.current.x,
        originY: viewRef.current.y,
        moved: false,
        button: event.button,
      };
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [isZoomed],
  );

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
      drag.moved = true;
    }

    setView((current) => ({
      ...current,
      x: drag.originX + dx,
      y: drag.originY + dy,
    }));
  }, []);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setDragging(false);

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // ignore
    }
  }, []);

  const handleLostPointerCapture = useCallback(() => {
    dragRef.current = null;
    setDragging(false);
  }, []);

  useEffect(() => {
    if (!lightbox) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isZoomed) resetView();
        else closeLightbox();
      }
      if (e.key === "ArrowLeft" && !isZoomed) goPrev();
      if (e.key === "ArrowRight" && !isZoomed) goNext();
      if (e.key === "+" || e.key === "=") {
        const frame = imageFrameRef.current?.getBoundingClientRect();
        if (frame) {
          zoomAtPoint(frame.left + frame.width / 2, frame.top + frame.height / 2, 1, ZOOM_STEP);
        }
      }
      if (e.key === "-" || e.key === "_") handleZoomOut();
    };

    // Evita o autoscroll nativo do botão do meio
    const preventMiddleAutoScroll = (e: MouseEvent) => {
      if (e.button === 1) e.preventDefault();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", handleImageWheel, { passive: false });
    window.addEventListener("mousedown", preventMiddleAutoScroll);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", handleImageWheel);
      window.removeEventListener("mousedown", preventMiddleAutoScroll);
    };
  }, [
    lightbox,
    isZoomed,
    goPrev,
    goNext,
    closeLightbox,
    resetView,
    handleZoomOut,
    zoomAtPoint,
    handleImageWheel,
  ]);

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
            <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
              <span className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground-secondary">
                {Math.round(view.scale * 100)}%
              </span>
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={!isZoomed}
                className="rounded-full border border-border bg-card p-2 transition-colors hover:border-primary/40 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Reduzir zoom 40%"
              >
                <ZoomOut className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={closeLightbox}
                className="rounded-full border border-border bg-card p-2 transition-colors hover:border-primary/40"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!isZoomed && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  aria-label="Seguinte"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="w-full max-w-6xl overflow-hidden">
              <div
                ref={imageFrameRef}
                role="img"
                aria-label={`${labels[current.key]} — scroll para zoom, arrastar para mover`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                onLostPointerCapture={handleLostPointerCapture}
                onContextMenu={(e) => e.preventDefault()}
                className={cn(
                  "relative overflow-hidden rounded-2xl touch-none select-none",
                  dragging ? "cursor-grabbing" : isZoomed ? "cursor-grab" : "cursor-default",
                )}
              >
                <div
                  className="will-change-transform"
                  style={{
                    transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
                    transformOrigin: "0 0",
                    transition: dragging ? "none" : "transform 100ms ease-out",
                  }}
                >
                  <GallerySlide
                    item={current}
                    title={labels[current.key]}
                    placeholderText={placeholderText}
                    screenshotsAvailable={screenshotsAvailable}
                    priority
                    objectFit="contain"
                    className="aspect-video max-h-[80vh] rounded-2xl"
                  />
                </div>
                {isZoomed && !dragging && (
                  <span className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border/80 bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground-secondary shadow-sm backdrop-blur-sm">
                    Arrasta para mover · scroll para zoom
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
