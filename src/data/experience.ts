export type ExperienceEntry = {
  id: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  url?: string;
};

export const experience: ExperienceEntry[] = [
  {
    id: "paos-internship",
    company: "PAOS",
    startDate: "2026-10-12",
    endDate: "2027-02-02",
  },
];
