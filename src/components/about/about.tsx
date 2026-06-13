import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CvLink } from "@/components/ui/cv-link";
import { PageSection, SectionHeader } from "@/components/ui/section-header";
import { StaggerContainer, StaggerItem } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types";

const aboutKeys = ["whoAmI", "studies", "mainTech", "goals"] as const;

export function About({ dict, locale }: SectionProps) {
  const t = dict.about;

  return (
    <PageSection labelledBy="about-title" compact centered className="bg-background-secondary/50">
      <SectionHeader id="about-title" title={t.title} subtitle={t.subtitle} />

      <StaggerContainer className="mt-8 grid gap-5 sm:grid-cols-2" stagger={0.06}>
        {aboutKeys.map((key) => {
          const block = t[key];
          return (
            <StaggerItem key={key} className="h-full">
              <Card
                className={cn(
                  "about-card flex h-full flex-col !p-6 sm:!p-7",
                )}
              >
                <CardHeader className="gap-2 p-0">
                  <CardTitle className="text-base leading-snug sm:text-lg">{block.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col p-0 pt-4">
                  <CardDescription className="text-sm leading-[1.75] text-foreground-secondary sm:text-[15px] sm:leading-[1.7]">
                    {block.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      <div className="mt-8 flex justify-center">
        <CvLink label={t.viewCv} source="about" locale={locale} variant="button" />
      </div>
    </PageSection>
  );
}
