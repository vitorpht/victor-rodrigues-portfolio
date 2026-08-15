export type DservicesGalleryKey = "mockup" | "desktop" | "services" | "about" | "contact";

export type DservicesGalleryItem = {
  key: DservicesGalleryKey;
  /** WebP preferred; PNG/JPG supported */
  image: string;
};

/** Screenshots em public/images/screenshots/dservices/ */
export const dservicesGalleryItems: DservicesGalleryItem[] = [
  { key: "mockup", image: "/images/screenshots/dservices/Dservices-1.png" },
  { key: "desktop", image: "/images/screenshots/dservices/Dservices-2.png" },
  { key: "services", image: "/images/screenshots/dservices/Dservices-3.png" },
  { key: "about", image: "/images/screenshots/dservices/Dservices-4.png" },
  { key: "contact", image: "/images/screenshots/dservices/Dservices-5.png" },
];
