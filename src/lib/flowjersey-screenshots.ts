import fs from "node:fs";
import path from "node:path";
import {
  flowjerseyGalleryItems,
  type FlowJerseyGalleryItem,
} from "@/data/flowjersey-gallery";

const SCREENSHOT_DIR = path.join(process.cwd(), "public", "images", "screenshots", "flowjersey");
const SCREENSHOT_EXTENSIONS = [".png", ".jpg", ".webp"] as const;

function resolveScreenshotPath(stem: string): string | undefined {
  const baseName = path.basename(stem);
  for (const ext of SCREENSHOT_EXTENSIONS) {
    const file = `${baseName}${ext}`;
    if (fs.existsSync(path.join(SCREENSHOT_DIR, file))) {
      return `/images/screenshots/flowjersey/${file}`;
    }
  }
  return undefined;
}

/** Resolve paths reais em disco; vazio se faltarem ficheiros. */
export function getFlowjerseyGalleryAssets(): {
  available: boolean;
  items: FlowJerseyGalleryItem[];
} {
  const items = flowjerseyGalleryItems.map((item) => {
    const dot = item.image.lastIndexOf(".");
    const stem = dot === -1 ? item.image : item.image.slice(0, dot);
    const image = resolveScreenshotPath(stem);
    return image ? { ...item, image } : item;
  });

  const available = items.every((item) => {
    const file = path.basename(item.image);
    return fs.existsSync(path.join(SCREENSHOT_DIR, file));
  });

  return { available, items: available ? items : flowjerseyGalleryItems };
}
