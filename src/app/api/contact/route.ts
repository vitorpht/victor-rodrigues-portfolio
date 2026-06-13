import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { buildContactEmailHtml, buildContactEmailSubject, formatContactSentAt } from "@/lib/contact/email-template";
import { getContactEnv } from "@/lib/env/contact";

const EMAIL_SUBJECT_LINE = "Formulário de contacto";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://victorrodrigues.dev";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(5000),
  website: z.string().max(0).optional(),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }

  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

function sanitize(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

function failure(message: string, status: number) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return failure("Too many requests", 429);
  }

  const env = getContactEnv();
  if (!env) {
    console.error("[Contact] Missing RESEND_API_KEY, CONTACT_EMAIL or RESEND_FROM_EMAIL");
    return failure("Contact service unavailable", 503);
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return failure("Invalid input", 400);
    }

    if (result.data.website && result.data.website.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    const sanitized = {
      name: sanitize(result.data.name),
      email: sanitize(result.data.email),
      message: sanitize(result.data.message),
    };

    const sentAt = formatContactSentAt();
    const resend = new Resend(env.resendApiKey);

    const { data, error } = await resend.emails.send({
      from: env.resendFromEmail,
      to: env.contactEmail,
      replyTo: sanitized.email,
      subject: buildContactEmailSubject(sanitized.name),
      html: buildContactEmailHtml({
        name: sanitized.name,
        email: sanitized.email,
        subject: EMAIL_SUBJECT_LINE,
        message: sanitized.message,
        sentAt,
        siteUrl: SITE_URL,
      }),
    });

    if (error || !data?.id) {
      console.error("[Contact] Resend delivery failed:", error?.name, error?.message);
      return failure("Email delivery failed", 502);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact] Unexpected error:", error instanceof Error ? error.message : "Unknown error");
    return failure("Internal error", 500);
  }
}
