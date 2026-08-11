export type TechKey =
  | "html"
  | "css"
  | "javascript"
  | "typescript"
  | "react"
  | "nextjs"
  | "tailwind"
  | "bootstrap"
  | "wordpress"
  | "elementor"
  | "rankMath"
  | "pageSpeed"
  | "nodejs"
  | "nextjsApi"
  | "java"
  | "csharp"
  | "postgresql"
  | "supabase"
  | "rls"
  | "jwt"
  | "httpOnly"
  | "rateLimiting"
  | "validation"
  | "cloudflare"
  | "vercel"
  | "github"
  | "git"
  | "vscode"
  | "intellij";

export type TechCategory =
  | "frontend"
  | "cms"
  | "backend"
  | "database"
  | "security"
  | "infrastructure"
  | "tools";

export const technologyCategoryOrder: TechCategory[] = [
  "frontend",
  "cms",
  "backend",
  "database",
  "security",
  "infrastructure",
  "tools",
];

export const technologies: Record<TechCategory, TechKey[]> = {
  frontend: ["html", "css", "javascript", "typescript", "react", "nextjs", "tailwind", "bootstrap"],
  cms: ["wordpress", "elementor", "rankMath", "pageSpeed"],
  backend: ["nodejs", "nextjsApi", "java", "csharp"],
  database: ["postgresql", "supabase"],
  security: ["rls", "jwt", "httpOnly", "rateLimiting", "validation"],
  infrastructure: ["cloudflare", "vercel", "github"],
  tools: ["git", "vscode", "intellij"],
};

export function getAllTechnologyKeys(): TechKey[] {
  return technologyCategoryOrder.flatMap((category) => technologies[category]);
}

export function countTechnologies(): number {
  return getAllTechnologyKeys().length;
}
