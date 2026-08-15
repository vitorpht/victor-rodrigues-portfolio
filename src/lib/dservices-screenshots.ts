import fs from "node:fs";
import path from "node:path";
import { dservicesGalleryItems, type DservicesGalleryItem } from "@/data/dservices-gallery";

const SCREENSHOT_DIR = path.join(process.cwd(), "public", "images", "screenshots", "dservices");
const SCREENSHOT_EXTENSIONS = [".png", ".jpg", ".webp"] as const;

function resolveScreenshotPath(stem: string): string | undefined {
  const baseName = path.basename(stem);
  for (const ext of SCREENSHOT_EXTENSIONS) {
    const file = `${baseName}${ext}`;
    if (fs.existsSync(path.join(SCREENSHOT_DIR, file))) {
      return `/images/screenshots/dservices/${file}`;
    }
  }
  return undefined;
}

/** Resolve paths reais em disco; vazio se faltarem ficheiros. */
export function getDservicesGalleryAssets(): {
  available: boolean;
  items: DservicesGalleryItem[];
} {
  const items = dservicesGalleryItems.map((item) => {
    const dot = item.image.lastIndexOf(".");
    const stem = dot === -1 ? item.image : item.image.slice(0, dot);
    const image = resolveScreenshotPath(stem);
    return image ? { ...item, image } : item;
  });

  const available = items.every((item) => {
    const file = path.basename(item.image);
    return fs.existsSync(path.join(SCREENSHOT_DIR, file));
  });

  return { available, items: available ? items : dservicesGalleryItems };
}
