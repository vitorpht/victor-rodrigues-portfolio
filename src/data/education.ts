export type EducationStatus = "completed" | "in_progress" | "planned";
export type EducationGroup = "current" | "planned_degree" | "future_specialization";

export type EducationEntry = {
  id: string;
  institution?: string;
  startDate?: string;
  endDate?: string;
  status: EducationStatus;
  group: EducationGroup;
};

export const education: EducationEntry[] = [
  {
    id: "frontend-developer",
    institution: "Tokio School",
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    status: "in_progress",
    group: "current",
  },
  {
    id: "ise-c-computer-engineering",
    institution: "ISEC",
    status: "planned",
    group: "planned_degree",
  },
  {
    id: "cybersecurity-specialization",
    status: "planned",
    group: "future_specialization",
  },
  {
    id: "ai-specialization",
    status: "planned",
    group: "future_specialization",
  },
];
