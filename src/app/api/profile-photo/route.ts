import { NextResponse } from "next/server";
import { readProfilePhotoBuffer } from "@/lib/profile-photo";

function isSameOriginRequest(request: Request): boolean {
  const host = request.headers.get("host");
  if (!host) return false;

  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "same-origin" || fetchSite === "same-site") {
    return true;
  }

  const referer = request.headers.get("referer");
  const origin = request.headers.get("origin");

  if (origin) {
    try {
      return new URL(origin).host === host;
    } catch {
      return false;
    }
  }

  if (referer) {
    try {
      return new URL(referer).host === host;
    } catch {
      return false;
    }
  }

  return false;
}

export async function GET(request: Request) {
  if (!isSameOriginRequest(request)) {
    return new NextResponse(null, { status: 403 });
  }

  const photo = readProfilePhotoBuffer();
  if (!photo) {
    return new NextResponse(null, { status: 404 });
  }

  return new NextResponse(new Uint8Array(photo.buffer), {
    headers: {
      "Content-Type": photo.mime,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
