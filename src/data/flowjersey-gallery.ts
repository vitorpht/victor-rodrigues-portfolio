export type FlowJerseyGalleryKey =
  | "dashboard"
  | "products"
  | "orders"
  | "customers"
  | "store"
  | "checkout"
  | "plans"
  | "admin";

export type FlowJerseyGalleryItem = {
  key: FlowJerseyGalleryKey;
  /** WebP preferred; PNG/JPG supported */
  image: string;
};

/** Screenshots em public/images/screenshots/flowjersey/ */
export const flowjerseyGalleryItems: FlowJerseyGalleryItem[] = [
  { key: "dashboard", image: "/images/screenshots/flowjersey/Flowjersey-1.png" },
  { key: "products", image: "/images/screenshots/flowjersey/Flowjersey-2.png" },
  { key: "orders", image: "/images/screenshots/flowjersey/Flowjersey-3.png" },
  { key: "customers", image: "/images/screenshots/flowjersey/Flowjersey-4.png" },
];
