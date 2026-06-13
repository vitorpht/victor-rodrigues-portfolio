"use client";

import { Mail, Send } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/social-icons";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SectionProps } from "@/types";

import { profile } from "@/data/profile";

function createContactSchema(v: SectionProps["dict"]["contact"]["form"]["validation"]) {
  return z.object({
    name: z.string().min(1, v.nameRequired).min(2, v.nameMin),
    email: z.string().min(1, v.emailRequired).email(v.emailInvalid),
    message: z.string().min(1, v.messageRequired).min(10, v.messageMin),
    website: z.string().max(0).optional(),
  });
}

export function Contact({ dict }: SectionProps) {
  const t = dict.contact;
  const cta = dict.cta;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("idle");
    setFieldErrors({});

    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      website: (formData.get("website") as string) || "",
    };

    const schema = createContactSchema(t.form.validation);
    const result = schema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    if (result.data.website) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.data.name,
          email: result.data.email,
          message: result.data.message,
        }),
      });

      if (!response.ok) throw new Error("Failed");
      setStatus("success");
      event.currentTarget.reset();
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="flex flex-1 flex-col justify-center px-4 py-4 sm:px-6 lg:px-8"
      aria-labelledby="contact-title"
    >
      <div className="section-container max-w-4xl">
        <div className="mx-auto max-w-xl text-center">
          <h1 id="contact-title" className="text-xl font-bold tracking-tight sm:text-2xl">
            {cta.title}
          </h1>
          <p className="mt-1.5 text-sm text-foreground-secondary leading-snug">{cta.description}</p>
        </div>

        <div className="mx-auto mt-5 grid max-w-4xl gap-4 lg:grid-cols-5 lg:gap-5">
          <form
            onSubmit={onSubmit}
            className="space-y-3 rounded-xl border border-border bg-card p-4 ring-1 ring-primary/[0.06] sm:p-5 lg:col-span-3"
            noValidate
          >
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs">
                  {t.form.name}
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t.form.namePlaceholder}
                  className="h-9"
                  aria-invalid={!!fieldErrors.name}
                  aria-describedby={fieldErrors.name ? "name-error" : undefined}
                />
                {fieldErrors.name && (
                  <p id="name-error" className="text-xs text-red-500" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  {t.form.email}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.form.emailPlaceholder}
                  className="h-9"
                  aria-invalid={!!fieldErrors.email}
                  aria-describedby={fieldErrors.email ? "email-error" : undefined}
                />
                {fieldErrors.email && (
                  <p id="email-error" className="text-xs text-red-500" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-xs">
                {t.form.message}
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t.form.messagePlaceholder}
                className="min-h-[72px] resize-none py-2"
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "message-error" : undefined}
              />
              {fieldErrors.message && (
                <p id="message-error" className="text-xs text-red-500" role="alert">
                  {fieldErrors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <button type="submit" disabled={isSubmitting} className={buttonVariants({ size: "sm" })}>
                <Send className="h-4 w-4" />
                {isSubmitting ? t.form.sending : t.form.submit}
              </button>
              {status === "success" && (
                <p className="text-xs text-primary" role="status">
                  {t.form.success}
                </p>
              )}
              {status === "error" && (
                <p className="text-xs text-red-500" role="alert">
                  {t.form.error}
                </p>
              )}
            </div>
          </form>

          <div className="flex flex-col gap-2 lg:col-span-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 ring-1 ring-primary/[0.04] transition-colors hover:border-primary/40 hover:ring-primary/10"
            >
              <GitHubIcon className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground-secondary">{t.links.github}</span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 ring-1 ring-primary/[0.04] transition-colors hover:border-primary/40 hover:ring-primary/10"
            >
              <LinkedInIcon className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground-secondary">{t.links.linkedin}</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 ring-1 ring-primary/[0.04] transition-colors hover:border-primary/40 hover:ring-primary/10"
            >
              <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="truncate text-sm text-foreground-secondary">{profile.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
