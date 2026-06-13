export type ExperienceEntry = {
  id: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
};

/** Preparado para experiências profissionais futuras */
export const experience: ExperienceEntry[] = [];
