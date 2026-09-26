"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/site/brand-logo";
import { cn } from "@/lib/utils";

/**
 * Customer-app mock: floating MIAN badge expands on hover/focus into the report iframe.
 * Matches what hosts see after dropping the embed snippet.
 */
export function EmbedHostPreview({
  src = "/embed/report",
  className,
  height = 420,
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
      {/* Fake host app chrome */}
      <div className="flex items-center gap-2 border-b border-[#1f1f1f] px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#2e2e2e]" />
          <span className="size-2.5 rounded-full bg-[#2e2e2e]" />
          <span className="size-2.5 rounded-full bg-[#2e2e2e]" />
        </span>
        <span className="ml-2 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.08em] text-[#6e6e6e]">
          app.customer.io · your product
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#6e6e6e]">
          Host page
        </span>
      </div>

      <div
        className="relative"
        style={{ minHeight: height }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Host page filler */}
        <div className="pointer-events-none space-y-3 p-4 md:p-5 opacity-40" aria-hidden>
          <div className="h-3 w-1/3 bg-[#1f1f1f]" />
          <div className="h-2 w-2/3 bg-[#1a1a1a]" />
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-16 border border-[#1f1f1f] bg-[#0a0a0a]" />
            ))}
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-full bg-[#1a1a1a]" />
            <div className="h-2 w-5/6 bg-[#1a1a1a]" />
            <div className="h-2 w-4/6 bg-[#1a1a1a]" />
          </div>
        </div>

        {/* Collapsed badge → expands to iframe panel */}
        <div
          className={cn(
            "absolute bottom-3 right-3 z-10 flex flex-col items-end gap-2",
            "transition-[width] duration-200 ease-[var(--ease-out)]",
            open ? "w-[min(100%-1.5rem,340px)]" : "w-auto",
          )}
        >
          <div
            className={cn(
              "origin-bottom-right overflow-hidden border border-[#2e2e2e] bg-[#0a0a0a]",
              "shadow-[0_12px_40px_rgb(0_0_0/0.45)]",
              "transition-[opacity,transform,max-height,width] duration-200 ease-[var(--ease-out)]",
              open
                ? "pointer-events-auto max-h-[360px] w-full scale-100 opacity-100"
                : "pointer-events-none max-h-0 w-0 scale-95 opacity-0",
            )}
          >
            <div className="flex items-center gap-2 border-b border-[#1f1f1f] px-2.5 py-2">
              <BrandLogo linked={false} className="!h-4" />
              <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#a1a1a1]">
                Report embed
              </span>
              <span className="ml-auto size-1.5 rounded-full bg-[#22c55e]" aria-hidden />
            </div>
            <iframe
              title="MIAN DAST report embed"
              src={src}
              className="block w-full border-0 bg-[#0a0a0a]"
              style={{ height: 280 }}
              tabIndex={open ? 0 : -1}
            />
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Collapse MIAN DAST embed" : "Expand MIAN DAST embed"}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "group flex items-center gap-2 border border-[#2e2e2e] bg-[#0a0a0a] px-2.5 py-2",
              "transition-[border-color,box-shadow,transform] duration-150 ease-[var(--ease-out)]",
              "hover:border-[#ededed] hover:shadow-[0_1px_0_#2e2e2e]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ededed]",
              open && "border-[#ededed]",
            )}
          >
            <BrandLogo linked={false} className="!h-5 transition-transform duration-150 group-hover:scale-[1.03]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#a1a1a1] group-hover:text-[#ededed]">
              Secured by MIAN
            </span>
            <span
              aria-hidden
              className={cn(
                "font-mono text-[10px] text-[#6e6e6e] transition-transform duration-150",
                open && "rotate-180",
              )}
            >
              ▴
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
