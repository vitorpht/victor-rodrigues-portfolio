import { profile } from "@/data/profile";
import { buildCvData } from "@/lib/cv/build-cv-data";
import { generateCvPdfBuffer } from "@/lib/cv/generate-cv-pdf";
import { getDictionary, isValidLocale, type Locale } from "@/lib/i18n";

export const runtime = "nodejs";

type RouteParams = {
  params: Promise<{ locale: string }>;
};

export async function GET(_request: Request, { params }: RouteParams) {
  const { locale: localeParam } = await params;

  if (!isValidLocale(localeParam)) {
    return new Response("Not found", { status: 404 });
  }

  const locale = localeParam as Locale;

  try {
    const dict = await getDictionary(locale);
    const data = buildCvData(locale, dict);
    const buffer = await generateCvPdfBuffer(data);

    const filename = `${profile.name.replace(/\s+/g, "-")}-CV-${locale}.pdf`;

    return new Response(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-cache",
      },
    });
  } catch (error) {
    console.error("[cv-pdf]", error);
    return new Response("Failed to generate CV", { status: 500 });
  }
}
