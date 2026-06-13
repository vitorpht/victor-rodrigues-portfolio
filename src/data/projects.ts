export type ProjectId = "flowjersey";

export type ProjectStatus = "featured" | "in_development" | "active" | "coming_soon";

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
    id: "flowjersey",
    featured: true,
    status: "featured",
    technologies: FLOWJERSEY_TECHNOLOGIES,
    hasDetailPage: true,
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
