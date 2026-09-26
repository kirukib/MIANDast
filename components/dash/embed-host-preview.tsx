"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/site/brand-logo";
import { cn } from "@/lib/utils";

/**
 * Customer-app mock: logo badge. Hover enlarges the full mark; click opens the short embed form.
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
  const [hover, setHover] = useState(false);
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

      <div className="relative" style={{ minHeight: height }}>
        <div className="pointer-events-none space-y-3 p-4 opacity-40" aria-hidden>
          <div className="h-3 w-1/3 bg-[#1f1f1f]" />
          <div className="h-2 w-2/3 bg-[#1a1a1a]" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-12 border border-[#1f1f1f] bg-[#0a0a0a]" />
            ))}
          </div>
        </div>

        <div className="absolute bottom-3 right-3 z-10 flex flex-col items-end gap-2">
          {open ? (
            <div className="w-[min(100vw-3rem,300px)] overflow-hidden border border-[#2e2e2e] bg-[#0a0a0a] shadow-[0_12px_40px_rgb(0_0_0/0.45)]">
              <iframe
                title="MIAN report embed"
                src={src}
                className="block w-full border-0 bg-[#0a0a0a]"
                style={{ height: 200 }}
              />
            </div>
          ) : null}

          {/* Hover: larger full logo with DAST wordmark */}
          <div
            className={cn(
              "pointer-events-none absolute bottom-full right-0 mb-2",
              "transition-[opacity,transform] duration-200 ease-[var(--ease-out)]",
              hover && !open
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-90 translate-y-1",
            )}
            aria-hidden
          >
            <div className="relative grid h-14 w-[min(72vw,220px)] place-items-center border border-[#2e2e2e] bg-[#0a0a0a] px-4 shadow-[0_12px_32px_rgb(0_0_0/0.4)]">
              <BrandLogo linked={false} shine className="!h-7" />
            </div>
          </div>

          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close MIAN embed" : "Open MIAN embed"}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onFocus={() => setHover(true)}
            onBlur={() => setHover(false)}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "group relative h-10 px-2.5 flex items-center justify-center border border-[#2e2e2e] bg-[#0a0a0a]",
              "transition-[border-color,transform] duration-150 ease-[var(--ease-out)]",
              "hover:border-[#ededed] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ededed]",
              (open || hover) && "border-[#ededed]",
            )}
          >
            <BrandLogo
              linked={false}
              shine
              className="!h-5 transition-transform duration-150 group-hover:scale-[1.04]"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
