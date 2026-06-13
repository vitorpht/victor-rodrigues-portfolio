import { countTechnologies } from "./technologies";

export type StatItem = {
  id: string;
  value: number;
  suffix?: string;
};

export const statsItems: StatItem[] = [
  { id: "technologies", value: countTechnologies(), suffix: "+" },
  { id: "languages", value: 3 },
  { id: "saas", value: 1 },
  { id: "studyHours", value: 1000, suffix: "+" },
];

/** @deprecated Use `statsItems` */
export const stats = statsItems;
