import { ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type GalleryPlaceholderProps = {
  badge: string;
  title: string;
  description: string;
};

export function GalleryPlaceholder({ badge, title, description }: GalleryPlaceholderProps) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-card/50 px-6 py-12 text-center ring-1 ring-primary/[0.04] sm:px-10 sm:py-14">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <ImageIcon className="h-6 w-6" aria-hidden="true" />
      </div>
      <Badge className="mt-4">{badge}</Badge>
      <h3 className="mt-3 text-base font-semibold text-foreground">{title}</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-foreground-secondary">
        {description}
      </p>
    </div>
  );
}
