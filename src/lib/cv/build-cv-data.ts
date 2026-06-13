import {
  CV_ACADEMIC_PROJECT_IDS,
  CV_EXCLUDED_CERTIFICATION_IDS,
  certifications,
  education,
  experience,
  profile,
  technologyCategoryOrder,
  technologies,
  type TechCategory,
} from "@/data";
import type { Dictionary, Locale } from "@/lib/i18n";

export type CvLink = { label: string; url: string; display: string };

export type CvSkillCard = { title: string; description: string };

export type CvProfileCard = { id: string; label: string };

export type CvStatItem = { value?: string; label: string; highlight?: boolean };

export type CvTechStackGroup = { label: string; items: string[] };

export type CvHighlightGroup = { label: string; items: string[] };

export type CvMainProject = {
  name: string;
  badges: string[];
  description: string[];
  statsTitle: string;
  stats: CvStatItem[];
  highlightsLabel: string;
  highlightGroups: CvHighlightGroup[];
  metricsTitle: string;
  technologyGroups: CvTechStackGroup[];
};

export type CvAcademicProject = {
  name: string;
  description: string;
  topics: string[];
  github?: string;
};

export type CvEducationItem = {
  id: string;
  title: string;
  institution?: string;
  period?: string;
  status?: string;
};

export type CvCertification = { id: string; name: string; issuer?: string; period?: string };

export type CvCertificationGroup = { label: string; items: CvCertification[] };

export type CvTechnologyGroup = {
  category: TechCategory;
  categoryLabel: string;
  items: string[];
};

export type CvLanguage = { name: string; level: string; progress: number };

export type CvData = {
  locale: Locale;
  name: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  links: CvLink[];
  summary: string[];
  objectiveHighlight: string;
  keySkillCards: CvSkillCard[];
  technicalProfileCards: CvProfileCard[];
  interests: string[];
  languages: CvLanguage[];
  mainProject: CvMainProject;
  academicProjects: CvAcademicProject[];
  technologyGroups: CvTechnologyGroup[];
  educationCurrent: CvEducationItem[];
  educationPlanned: CvEducationItem[];
  educationFutureAreas: string[];
  certificationsCompleted: CvCertificationGroup;
  certificationsInProgress: CvCertificationGroup;
  experience: { id: string; title: string; description: string; period?: string }[];
  sections: Dictionary["cv"]["sections"];
  labels: Dictionary["cv"]["labels"];
};

const LANGUAGE_PROGRESS: Record<string, number> = {
  native: 100,
  advanced: 88,
  professional: 82,
  intermediate: 65,
  basic: 40,
};

function formatYearPeriod(start?: string, end?: string): string | undefined {
  if (!start && !end) return undefined;
  const year = (iso: string) => iso.split("-")[0];
  if (start && end) return `${year(start)} – ${year(end)}`;
  if (start) return year(start);
  return end ? year(end) : undefined;
}

function formatLinkDisplay(url: string, type: "website" | "github" | "linkedin" | "email"): string {
  if (type === "email") return url.replace(/^mailto:/, "");
  return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
}

function getCertificationPeriod(
  entry: (typeof certifications)[number],
  locale: Locale,
): string | undefined {
  if (entry.startDate && entry.endDate) {
    const fmt = (iso: string) => {
      const [y, m] = iso.split("-");
      if (!m) return y;
      return new Date(Number(y), Number(m) - 1).toLocaleDateString(locale, {
        month: "short",
        year: "numeric",
      });
    };
    return `${fmt(entry.startDate)} – ${fmt(entry.endDate)}`;
  }
  if (entry.startDate) return entry.startDate.split("-")[0];
  if (entry.completedDate) return entry.completedDate;
  return undefined;
}

function getEducationStatusLabel(dict: Dictionary, statusKey?: string): string | undefined {
  if (!statusKey) return undefined;
  const map: Record<string, string> = {
    in_progress: dict.cv.educationStatus.in_progress,
    planned: dict.cv.educationStatus.planned,
  };
  return map[statusKey];
}

function mapCertification(
  entry: (typeof certifications)[number],
  dict: Dictionary,
  locale: Locale,
): CvCertification {
  const copy = dict.certifications.items[entry.id as keyof typeof dict.certifications.items];
  return {
    id: entry.id,
    name: copy?.name ?? entry.id,
    issuer: copy && "issuer" in copy ? copy.issuer : undefined,
    period: getCertificationPeriod(entry, locale),
  };
}

export function buildCvData(locale: Locale, dict: Dictionary): CvData {
  const cv = dict.cv;
  const mainCopy = cv.mainProject;

  const mainProject: CvMainProject = {
    name: mainCopy.name,
    badges: mainCopy.badges,
    description: mainCopy.description,
    statsTitle: mainCopy.statsTitle,
    stats: mainCopy.stats,
    highlightsLabel: mainCopy.highlightsLabel,
    highlightGroups: mainCopy.highlightGroups,
    metricsTitle: mainCopy.metricsTitle,
    technologyGroups: mainCopy.technologyGroups,
  };

  const academicProjects: CvAcademicProject[] = CV_ACADEMIC_PROJECT_IDS.map((id) => {
    const copy = cv.academicProjects[id];
    return {
      name: copy.name,
      description: copy.description,
      topics: copy.topics,
      github: profile.github,
    };
  });

  const filteredCerts = certifications.filter(
    (entry) => !CV_EXCLUDED_CERTIFICATION_IDS.includes(entry.id as (typeof CV_EXCLUDED_CERTIFICATION_IDS)[number]),
  );

  const eduItems = cv.educationItems as Record<
    string,
    { title: string; period?: string; statusKey?: string }
  >;

  const mapEducation = (entry: (typeof education)[number]): CvEducationItem => {
    const copy = eduItems[entry.id];
    return {
      id: entry.id,
      title: copy?.title ?? entry.id,
      institution: entry.institution,
      period: copy?.period ?? formatYearPeriod(entry.startDate, entry.endDate),
      status: getEducationStatusLabel(dict, copy?.statusKey ?? entry.status),
    };
  };

  return {
    locale,
    name: profile.name,
    title: cv.jobTitle,
    tagline: cv.heroTagline,
    location: profile.location,
    email: profile.email,
    links: [
      { label: cv.linkLabels.website, url: profile.website, display: formatLinkDisplay(profile.website, "website") },
      { label: cv.linkLabels.github, url: profile.github, display: formatLinkDisplay(profile.github, "github") },
      { label: cv.linkLabels.linkedin, url: profile.linkedin, display: formatLinkDisplay(profile.linkedin, "linkedin") },
      { label: cv.linkLabels.email, url: `mailto:${profile.email}`, display: formatLinkDisplay(`mailto:${profile.email}`, "email") },
    ],
    summary: cv.summary,
    objectiveHighlight: cv.objectiveHighlight,
    keySkillCards: cv.keySkillCards,
    technicalProfileCards: cv.technicalProfileCards,
    interests: cv.interestTags,
    languages: profile.languages.map((lang) => ({
      name: cv.languages[lang.id],
      level: cv.languageLevels[lang.level],
      progress: LANGUAGE_PROGRESS[lang.level] ?? 70,
    })),
    mainProject,
    academicProjects,
    technologyGroups: technologyCategoryOrder.map((category) => ({
      category,
      categoryLabel: dict.technologies.categories[category],
      items: technologies[category].map((key) => dict.technologies.items[key].name),
    })),
    educationCurrent: education.filter((e) => e.group === "current").map(mapEducation),
    educationPlanned: education.filter((e) => e.group === "planned_degree").map(mapEducation),
    educationFutureAreas: education
      .filter((e) => e.group === "future_specialization")
      .map((e) => eduItems[e.id]?.title ?? e.id),
    certificationsCompleted: {
      label: cv.certificationGroups.completed,
      items: filteredCerts.filter((e) => e.status === "completed").map((e) => mapCertification(e, dict, locale)),
    },
    certificationsInProgress: {
      label: cv.certificationGroups.in_progress,
      items: filteredCerts.filter((e) => e.status === "in_progress").map((e) => mapCertification(e, dict, locale)),
    },
    experience: experience.map((entry) => {
      const items = cv.experienceItems as Record<string, { title: string; description: string }>;
      const copy = items[entry.id];
      return {
        id: entry.id,
        title: copy?.title ?? entry.company,
        description: copy?.description ?? "",
        period: formatYearPeriod(entry.startDate, entry.endDate),
      };
    }),
    sections: cv.sections,
    labels: cv.labels,
  };
}
