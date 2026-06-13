import {
  Cloud,
  CreditCard,
  Database,
  Globe,
  Layers,
  Lock,
  RefreshCw,
  Server,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import type { SectionProps } from "@/types";
import type { LucideIcon } from "lucide-react";

const highlightKeys = [
  "saas",
  "multiTenant",
  "postgresql",
  "supabase",
  "rls",
  "stripe",
  "rateLimiting",
  "cloudflare",
  "cicd",
  "i18n",
] as const;

const highlightIcons: Record<(typeof highlightKeys)[number], LucideIcon> = {
  saas: Server,
  multiTenant: Layers,
  postgresql: Database,
  supabase: Database,
  rls: Shield,
  stripe: CreditCard,
  rateLimiting: Lock,
  cloudflare: Cloud,
  cicd: RefreshCw,
  i18n: Globe,
};

export function TechnicalHighlights({ dict }: SectionProps) {
  const t = dict.highlights;

  return (
    <PageSection labelledBy="highlights-title" compact centered>
      <SectionHeader id="highlights-title" title={t.title} subtitle={t.subtitle} />

      <StaggerContainer className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" stagger={0.04}>
        {highlightKeys.map((key) => {
          const item = t.items[key];
          const Icon = highlightIcons[key];
          return (
            <StaggerItem key={key}>
              <Card className="h-full card-hover">
                <CardHeader className="pb-2">
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-sm leading-snug">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs leading-relaxed">{item.description}</CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </PageSection>
  );
}
