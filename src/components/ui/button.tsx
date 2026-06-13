import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export { cn } from "@/lib/utils";

export function buttonVariants({
  variant = "default",
  size = "default",
  className,
}: {
  variant?: "default" | "secondary" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: ClassValue;
} = {}) {
  return twMerge(
    clsx(
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      {
        "bg-primary text-background hover:opacity-90": variant === "default",
        "bg-card text-foreground border border-border hover:border-primary/50": variant === "secondary",
        "border border-border bg-transparent hover:bg-card hover:border-primary/50": variant === "outline",
        "hover:bg-card": variant === "ghost",
        "h-10 px-4 py-2 text-sm": size === "default",
        "h-8 px-3 text-xs": size === "sm",
        "h-12 px-6 text-base": size === "lg",
        "h-10 w-10": size === "icon",
      },
      className,
    ),
  );
}
