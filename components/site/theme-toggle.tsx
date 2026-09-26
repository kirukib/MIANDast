"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-pressed={isDark}
      className={cn(
        "label-mono text-muted-foreground hover:text-foreground transition-colors",
        className,
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (isDark ? "DARK" : "LIGHT") : "LIGHT"} /{" "}
      {mounted ? (isDark ? "LIGHT" : "DARK") : "DARK"}
    </button>
  );
}
