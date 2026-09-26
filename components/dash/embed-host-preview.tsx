"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/site/brand-logo";
import { cn } from "@/lib/utils";

/**
 * Customer-app mock: logo-only MIAN badge expands on hover into a short report iframe.
 */
export function EmbedHostPreview({
  src = "/embed/report",
  className,
  height = 280,
}: {
  src?: string;
  className?: string;
  height?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-code-border bg-[#111] text-[#ededed]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#1f1f1f] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#2e2e2e]" />
          <span className="size-2.5 rounded-full bg-[#2e2e2e]" />
          <span className="size-2.5 rounded-full bg-[#2e2e2e]" />
        </span>
        <span className="ml-2 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.08em] text-[#6e6e6e]">
          app.customer.io · your product
        </span>
      </div>

      <div
        className="relative"
        style={{ minHeight: height }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="pointer-events-none space-y-3 p-4 opacity-40" aria-hidden>
          <div className="h-3 w-1/3 bg-[#1f1f1f]" />
          <div className="h-2 w-2/3 bg-[#1a1a1a]" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 border border-[#1f1f1f] bg-[#0a0a0a]" />
            ))}
          </div>
        </div>

        <div
          className={cn(
            "absolute bottom-3 right-3 z-10 flex flex-col items-end gap-2",
            "transition-[width] duration-200 ease-[var(--ease-out)]",
            open ? "w-[min(100%-1.5rem,300px)]" : "w-auto",
          )}
        >
          <div
            className={cn(
              "origin-bottom-right overflow-hidden border border-[#2e2e2e] bg-[#0a0a0a]",
              "shadow-[0_12px_40px_rgb(0_0_0/0.45)]",
              "transition-[opacity,transform,max-height,width] duration-200 ease-[var(--ease-out)]",
              open
                ? "pointer-events-auto max-h-[220px] w-full scale-100 opacity-100"
                : "pointer-events-none max-h-0 w-0 scale-95 opacity-0",
            )}
          >
            <iframe
              title="MIAN DAST report embed"
              src={src}
              className="block w-full border-0 bg-[#0a0a0a]"
              style={{ height: 200 }}
              tabIndex={open ? 0 : -1}
            />
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Collapse MIAN embed" : "Expand MIAN embed"}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "group relative size-11 flex items-center justify-center border border-[#2e2e2e] bg-[#0a0a0a]",
              "transition-[border-color,transform] duration-150 ease-[var(--ease-out)]",
              "hover:border-[#ededed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ededed]",
              open && "border-[#ededed]",
            )}
          >
            <BrandLogo
              linked={false}
              variant="mark"
              className="!h-7 transition-transform duration-150 group-hover:scale-[1.04]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
