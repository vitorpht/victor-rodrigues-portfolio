"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";

type ThemeToggleProps = {
  dict: Dictionary["theme"];
};

export function ThemeToggle({ dict }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        aria-label={dict.toggle}
        disabled
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      className={buttonVariants({ variant: "ghost", size: "icon" })}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? dict.light : dict.dark}
      title={dict.toggle}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
