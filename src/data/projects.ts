export type ProjectId = "desbravadores" | "dservices" | "flowjersey";

export type ProjectStatus =
  | "featured"
  | "in_development"
  | "active"
  | "completed"
  | "coming_soon";

/** Stack partilhada — única fonte para projetos, FlowJersey e CV */
export const FLOWJERSEY_TECHNOLOGIES = [
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "Supabase",
  "Stripe",
  "Redis",
  "Cloudflare",
] as const;

export const DESBRAVADORES_TECHNOLOGIES = [
  "WordPress",
  "Elementor Pro",
  "PHP",
  "CSS3",
  "JavaScript",
  "HTML5",
  "Responsive Design",
  "UI/UX Design",
] as const;

export const DSERVICES_TECHNOLOGIES = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Responsive Design",
  "SEO",
] as const;

export type ProjectEntry = {
  id: ProjectId;
  featured: boolean;
  status: ProjectStatus;
  technologies: readonly string[];
  github?: string;
  demo?: string;
  hasDetailPage?: boolean;
};

export const projects: ProjectEntry[] = [
  {
    id: "desbravadores",
    featured: true,
    status: "completed",
    technologies: DESBRAVADORES_TECHNOLOGIES,
    hasDetailPage: true,
    demo: "https://desbravadoresnaestrada.com/",
  },
  {
    id: "dservices",
    featured: false,
    status: "completed",
    technologies: DSERVICES_TECHNOLOGIES,
    hasDetailPage: true,
    demo: "https://dservices.pt/",
  },
  {
    id: "flowjersey",
    featured: false,
    status: "in_development",
    technologies: FLOWJERSEY_TECHNOLOGIES,
    hasDetailPage: true,
    demo: "https://flowjersey.com/",
  },
];

export const projectIds = projects.map((p) => p.id) as ProjectId[];

export type ProjectMeta = Pick<ProjectEntry, "id" | "status" | "github" | "demo">;

/** @deprecated Use `projects` — mantido para compatibilidade */
export const projectsMeta: ProjectMeta[] = projects.map(({ id, status, github, demo }) => ({
  id,
  status,
  github,
  demo,
}));

export function getProject(id: ProjectId): ProjectEntry {
  const project = projects.find((p) => p.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
}

export function getProjectMeta(id: ProjectId): ProjectMeta {
  return getProject(id);
}

export function getFeaturedProjects(): ProjectEntry[] {
  return projects.filter((p) => p.featured);
}
