"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className, inverted }: { className?: string; inverted?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label="Cambiar tema"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg transition-colors",
        inverted
          ? "text-primary-fixed-dim hover:bg-white/10"
          : "text-on-surface-variant hover:bg-surface-high",
        className,
      )}
    >
      {mounted && isDark ? (
        <Sun className="size-5" strokeWidth={1.5} />
      ) : (
        <Moon className="size-5" strokeWidth={1.5} />
      )}
    </button>
  );
}
