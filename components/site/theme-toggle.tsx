"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground transition-colors",
        className,
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className={cn(!isDark && "text-foreground")}>Light</span>
      <span
        aria-hidden
        className={cn(
          "relative h-5 w-9 shrink-0 border border-border-strong bg-secondary transition-colors",
          isDark && "bg-foreground border-foreground",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 size-3.5 bg-foreground transition-transform duration-150 ease-[var(--ease-out)]",
            isDark && "translate-x-4 bg-background",
          )}
        />
      </span>
      <span className={cn(isDark && "text-foreground")}>Dark</span>
    </button>
  );
}
