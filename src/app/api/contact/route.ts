import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  message: z.string().min(10).max(5000),
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

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, message } = result.data;
    const sanitized = {
      name: sanitize(name),
      email: sanitize(email),
      message: sanitize(message),
    };

    const contactEmail = process.env.CONTACT_EMAIL;
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey && contactEmail) {
      const resend = new Resend(resendKey);
      const from = process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";

      const { error } = await resend.emails.send({
        from,
        to: contactEmail,
        replyTo: sanitized.email,
        subject: `[Portfólio] Mensagem de ${sanitized.name}`,
        html: `
          <h2>Nova mensagem do portfólio</h2>
          <p><strong>Nome:</strong> ${escapeHtml(sanitized.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(sanitized.email)}</p>
          <p><strong>Mensagem:</strong></p>
          <p>${escapeHtml(sanitized.message).replace(/\n/g, "<br>")}</p>
        `,
      });

      if (error) {
        console.error("[Contact] Resend error:", error);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 502 });
      }
    } else {
      console.info("[Contact] RESEND_API_KEY or CONTACT_EMAIL not set — logging only:", sanitized);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact] Unexpected error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
