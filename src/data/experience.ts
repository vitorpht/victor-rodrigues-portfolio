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
    id: "jweb-internship",
    company: "jweb",
    startDate: "2026-09-07",
    endDate: "2026-10-29",
    url: "https://jweb.pt/",
  },
];
