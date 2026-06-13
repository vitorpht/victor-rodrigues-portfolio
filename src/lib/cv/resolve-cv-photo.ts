import { getInitials, readProfilePhotoBuffer } from "@/lib/profile-photo";

export { getInitials };

/** Resolve foto do CV para data URI (uso exclusivo no gerador PDF). */
export function resolveCvPhotoSrc(): string | undefined {
  const photo = readProfilePhotoBuffer();
  if (!photo) return undefined;
  return `data:${photo.mime};base64,${photo.buffer.toString("base64")}`;
}
