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

/** Largura servida no site: o quadro do herói tem no máximo 270px, 600px cobre ecrãs 2x. */
const WEB_PHOTO_WIDTH = 600;

let webPhotoCache: { key: string; buffer: Buffer } | undefined;

/**
 * Versão leve da foto para o site (WebP redimensionado). O PDF do CV continua a usar
 * `readProfilePhotoBuffer`, que devolve o ficheiro original.
 */
export async function readWebProfilePhoto(): Promise<{ buffer: Buffer; mime: string } | undefined> {
  const asset = resolveProfilePhotoAsset();
  if (!asset) return undefined;

  const key = `${asset.absolutePath}:${fs.statSync(asset.absolutePath).mtimeMs}`;
  if (webPhotoCache?.key === key) return { buffer: webPhotoCache.buffer, mime: "image/webp" };

  try {
    const { default: sharp } = await import("sharp");
    const buffer = await sharp(asset.absolutePath)
      .resize({ width: WEB_PHOTO_WIDTH, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    webPhotoCache = { key, buffer };
    return { buffer, mime: "image/webp" };
  } catch {
    return { buffer: fs.readFileSync(asset.absolutePath), mime: asset.mime };
  }
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
