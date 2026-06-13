"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Cloud,
  Code2,
  Cookie,
  Database,
  GitBranch,
  Globe,
  KeyRound,
  Layers,
  Lock,
  Server,
  Shield,
  ShieldCheck,
  Terminal,
  Wind,
} from "lucide-react";
import { useCallback, useId, useState } from "react";
import {
  technologyCategoryOrder,
  technologies as technologyCatalog,
  type TechCategory,
  type TechKey,
} from "@/data/technologies";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types";
import type { LucideIcon } from "lucide-react";

const categoryIcons: Record<TechCategory, LucideIcon> = {
  frontend: Wind,
  backend: Server,
  database: Database,
  security: Shield,
  infrastructure: Cloud,
  tools: Code2,
};

const techIcons: Record<TechKey, LucideIcon> = {
  html: Globe,
  css: Layers,
  javascript: Code2,
  typescript: Terminal,
  react: Wind,
  nextjs: Layers,
  tailwind: Wind,
  nodejs: Server,
  nextjsApi: Code2,
  postgresql: Database,
  supabase: Database,
  rls: Shield,
  jwt: KeyRound,
  httpOnly: Cookie,
  rateLimiting: Lock,
  validation: ShieldCheck,
  cloudflare: Cloud,
  vercel: Cloud,
  github: GitBranch,
  git: GitBranch,
  vscode: Code2,
  intellij: Terminal,
};

const techCategories = Object.fromEntries(
  technologyCategoryOrder.map((category) => [
    category,
    technologyCatalog[category].map((key) => ({ key, icon: techIcons[key] })),
  ]),
) as Record<TechCategory, { key: TechKey; icon: LucideIcon }[]>;

export function Technologies({ dict }: SectionProps) {
  const t = dict.technologies;
  const baseId = useId();
  const [activeCategory, setActiveCategory] = useState<TechCategory | null>(null);

  const toggleCategory = useCallback((category: TechCategory) => {
    setActiveCategory((current) => (current === category ? null : category));
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, category: TechCategory, index: number) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleCategory(category);
        return;
      }

      let nextIndex: number | null = null;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        nextIndex = index < technologyCategoryOrder.length - 1 ? index + 1 : 0;
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        nextIndex = index > 0 ? index - 1 : technologyCategoryOrder.length - 1;
      } else if (event.key === "Home") {
        event.preventDefault();
        nextIndex = 0;
      } else if (event.key === "End") {
        event.preventDefault();
        nextIndex = technologyCategoryOrder.length - 1;
      }

      if (nextIndex !== null) {
        document.getElementById(`${baseId}-${technologyCategoryOrder[nextIndex]}-trigger`)?.focus();
      }
    },
    [baseId, toggleCategory],
  );

  return (
    <PageSection labelledBy="technologies-title" compact centered>
      <SectionHeader id="technologies-title" title={t.title} subtitle={t.subtitle} />

      <ScrollReveal className="mx-auto mt-8 max-w-3xl">
        <div className="space-y-3" role="list" aria-label={t.title}>
          {technologyCategoryOrder.map((category, index) => {
            const isOpen = activeCategory === category;
            const CategoryIcon = categoryIcons[category];
            const items = techCategories[category];
            const panelId = `${baseId}-${category}-panel`;
            const triggerId = `${baseId}-${category}-trigger`;

            return (
              <div
                key={category}
                role="listitem"
                className={cn(
                  "overflow-hidden rounded-xl border bg-card transition-colors duration-300",
                  isOpen
                    ? "border-primary/40 shadow-lg shadow-primary/5"
                    : "border-border hover:border-primary/20",
                )}
              >
                <button
                  id={triggerId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleCategory(category)}
                  onKeyDown={(event) => handleKeyDown(event, category, index)}
                  className={cn(
                    "flex w-full items-center gap-4 px-4 py-4 text-left transition-colors sm:px-5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
                    isOpen ? "bg-primary/5" : "hover:bg-muted/50",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-300",
                      isOpen ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary",
                    )}
                  >
                    <CategoryIcon className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground sm:text-base">
                      {t.categories[category]}
                    </span>
                    <span className="mt-0.5 block text-xs text-foreground-secondary">
                      {t.techCount.replace("{count}", String(items.length))}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    className="shrink-0 text-foreground-secondary"
                    aria-hidden="true"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                        <motion.div
                          initial={{ y: -8 }}
                          animate={{ y: 0 }}
                          exit={{ y: -8 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                          className="grid gap-3 sm:grid-cols-2"
                        >
                          {items.map(({ key, icon: Icon }, itemIndex) => {
                            const item = t.items[key];
                            return (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  duration: 0.25,
                                  delay: itemIndex * 0.04,
                                  ease: [0.25, 0.1, 0.25, 1],
                                }}
                                className={cn(
                                  "group flex gap-3 rounded-lg border border-border bg-background-secondary/50 p-3",
                                  "transition-all duration-300 hover:border-primary/30 hover:shadow-sm hover:shadow-primary/5",
                                )}
                              >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                                  <Icon className="h-4 w-4" aria-hidden="true" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                                  <p className="mt-0.5 text-xs text-foreground-secondary leading-relaxed">
                                    {item.description}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </PageSection>
  );
}
