import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { routes } from "@/lib/routes";
import type { SectionProps } from "@/types";

export function Cta({ dict, locale }: SectionProps) {
  const t = dict.cta;

  return (
    <section className="py-6 md:py-8" aria-labelledby="cta-title">
      <div className="section-container">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-card to-background-secondary px-6 py-8 text-center sm:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.1),transparent_60%)]" aria-hidden="true" />
            <div className="relative mx-auto max-w-xl">
              <h2 id="cta-title" className="text-xl font-bold tracking-tight sm:text-2xl">
                {t.title}
              </h2>
              <p className="mt-2 text-sm text-foreground-secondary leading-relaxed">{t.description}</p>
              <Link href={routes.contact(locale)} className={buttonVariants({ size: "default", className: "mt-5" })}>
                {t.button}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
