export type CertificationStatus = "completed" | "in_progress" | "planned" | "renewal_required";

export type CredentialType = "pdf" | "image" | "external";

export type CertificationCredential = {
  type: CredentialType;
  url: string;
};

export type CertificationGrades = {
  finalProject?: number;
  projectDefense?: number;
  finalExam?: number;
  maxScore?: number;
};

export type CertificationEntry = {
  id: string;
  status: CertificationStatus;
  /** ISO date YYYY-MM-DD */
  startDate?: string;
  /** ISO date YYYY-MM-DD */
  endDate?: string;
  /** Year or date when endDate is unavailable */
  completedDate?: string;
  issuerLogo?: string;
  credential?: CertificationCredential;
  grades?: CertificationGrades;
};

export function getCertificationStartSortKey(entry: CertificationEntry): string {
  if (entry.startDate) return entry.startDate;
  if (entry.completedDate) {
    return /^\d{4}$/.test(entry.completedDate) ? `${entry.completedDate}-01-01` : entry.completedDate;
  }
  if (entry.endDate) return entry.endDate;
  return "9999-12-31";
}

export function sortCertificationsByStartDate(entries: CertificationEntry[]): CertificationEntry[] {
  return [...entries].sort((a, b) => {
    const diff = getCertificationStartSortKey(a).localeCompare(getCertificationStartSortKey(b));
    return diff !== 0 ? diff : a.id.localeCompare(b.id);
  });
}

/**
 * Add new certifications here. Copy, translations in messages/{locale}.json
 * under certifications.items.{id}, and optional logo in public/images/certifications/.
 */
export const certifications: CertificationEntry[] = sortCertificationsByStartDate([
  {
    id: "frontend-developer",
    status: "completed",
    startDate: "2024-11-12",
    endDate: "2026-04-13",
    grades: { finalProject: 90, projectDefense: 90 },
  },
  {
    id: "csharp-oop",
    status: "completed",
    startDate: "2026-02-18",
    endDate: "2026-04-30",
    grades: { finalExam: 94 },
  },
  {
    id: "java-ocp",
    status: "in_progress",
    startDate: "2026-02-26",
  },
  {
    id: "spring-boot",
    status: "in_progress",
    startDate: "2026-06-12",
  },
]);

export type CertificationFilter = "all" | CertificationStatus;

export function countCertificationsByStatus(entries: CertificationEntry[]) {
  return entries.reduce(
    (acc, entry) => {
      acc[entry.status] += 1;
      return acc;
    },
    {
      completed: 0,
      in_progress: 0,
      planned: 0,
      renewal_required: 0,
    } satisfies Record<CertificationStatus, number>,
  );
}

export function filterCertifications(
  entries: CertificationEntry[],
  filter: CertificationFilter,
): CertificationEntry[] {
  const filtered = filter === "all" ? entries : entries.filter((entry) => entry.status === filter);
  return sortCertificationsByStartDate(filtered);
}
