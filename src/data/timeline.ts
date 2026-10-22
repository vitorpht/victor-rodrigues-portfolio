export type TimelineEntry = {
  id: string;
  period: string;
  isFuture?: boolean;
};

export const timelineEntries: TimelineEntry[] = [
  { id: "fullstack-start", period: "2025" },
  { id: "paos-internship", period: "Outubro/2026 - Fevereiro/2027" },
  { id: "degree", period: "future", isFuture: true },
];
