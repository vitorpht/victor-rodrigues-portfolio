export type TimelineEntry = {
  id: string;
  period: string;
  isFuture?: boolean;
};

export const timelineEntries: TimelineEntry[] = [
  { id: "fullstack-start", period: "2025" },
  { id: "first-projects", period: "2025" },
  { id: "flowjersey", period: "2026" },
  { id: "degree", period: "future", isFuture: true },
  { id: "cybersecurity", period: "future", isFuture: true },
  { id: "ai", period: "future", isFuture: true },
];
