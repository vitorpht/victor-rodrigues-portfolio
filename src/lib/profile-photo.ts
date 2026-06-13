import fs from "node:fs";
import path from "node:path";

const PHOTO_CANDIDATES = [
  { file: "victor.webp", mime: "image/webp" },
  { file: "victor.jpg", mime: "image/jpeg" },
  { file: "victor.png", mime: "image/png" },
] as const;

/** Pastas onde a foto pode existir — private primeiro (não exposta em /public). */
const PHOTO_DIRS = [
  path.join(process.cwd(), "private", "images"),
  path.join(process.cwd(), "public", "images"),
] as const;

export type ProfilePhotoAsset = {
  absolutePath: string;
  mime: string;
};

export function resolveProfilePhotoAsset(): ProfilePhotoAsset | undefined {
  for (const dir of PHOTO_DIRS) {
    for (const { file, mime } of PHOTO_CANDIDATES) {
      const absolutePath = path.join(dir, file);
      if (fs.existsSync(absolutePath)) {
        return { absolutePath, mime };
      }
    }
  }
  return undefined;
}

export function readProfilePhotoBuffer(): { buffer: Buffer; mime: string } | undefined {
  const asset = resolveProfilePhotoAsset();
  if (!asset) return undefined;
  return { buffer: fs.readFileSync(asset.absolutePath), mime: asset.mime };
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
