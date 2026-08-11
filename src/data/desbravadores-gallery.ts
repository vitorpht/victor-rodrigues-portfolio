export type DesbravadoresGalleryKey = "mockup" | "desktop" | "mobile";

export type DesbravadoresGalleryItem = {
  key: DesbravadoresGalleryKey;
  /** WebP preferred; PNG/JPG supported */
  image: string;
};

/** Screenshots em public/images/screenshots/desbravadores/ */
export const desbravadoresGalleryItems: DesbravadoresGalleryItem[] = [
  { key: "mockup", image: "/images/screenshots/desbravadores/Desbravadores-1.png" },
  { key: "desktop", image: "/images/screenshots/desbravadores/Desbravadores-2.png" },
  { key: "mobile", image: "/images/screenshots/desbravadores/Desbravadores-3.png" },
];
