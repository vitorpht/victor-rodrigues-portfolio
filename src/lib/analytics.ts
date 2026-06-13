type AnalyticsEvent = {
  action: string;
  category: string;
  label?: string;
};

/** Prepared for future analytics integration (GA4, Plausible, etc.) */
export function trackEvent({ action, category, label }: AnalyticsEvent) {
  if (process.env.NODE_ENV === "development") {
    console.info("[Analytics]", { action, category, label });
  }

  if (typeof window !== "undefined" && "gtag" in window) {
    const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
    gtag?.("event", action, { event_category: category, event_label: label });
  }
}

export function trackCvDownload(source: string) {
  trackEvent({ action: "cv_download", category: "engagement", label: source });
}
