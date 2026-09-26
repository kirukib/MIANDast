"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { toast } from "sonner";
import { BrandLogo } from "@/components/site/brand-logo";
import { Button } from "@/components/ui/button";
import { createReportFromEmbed, upsertReport } from "@/lib/reports";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, transitions, useReducedMotion } from "@/components/motion";

const HIDDEN_PREFIXES = ["/dash", "/embed", "/sandbox", "/sign-in", "/checkout"];

/**
 * Floating logo-only launcher — SAMPLE report desk (title + description).
 */
export function BugReportLauncher() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => setMounted(true), []);

  const hidden = HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (!mounted || hidden) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    const report = createReportFromEmbed({
      title: title.trim(),
      target: title.trim().toLowerCase().replace(/\s+/g, "-").slice(0, 48) || "bug",
    });
    upsertReport({
      ...report,
      notes: description.trim() || undefined,
    });
    setBusy(false);
    setOpen(false);
    setTitle("");
    setDescription("");
    toast.success("SAMPLE report filed", {
      description: `${report.id} → /dash/reports`,
      action: {
        label: "Open",
        onClick: () => {
          window.location.href = `/dash/reports/${report.id}`;
        },
      },
    });
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3 pointer-events-none">
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="pointer-events-auto w-[min(100vw-2rem,300px)] border border-border bg-card shadow-[0_8px_24px_rgb(0_0_0/0.08)] dark:shadow-[0_8px_24px_rgb(0_0_0/0.4)] overflow-hidden"
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
            transition={transitions.base}
          >
            <header className="flex items-center gap-2 border-b border-border px-3 py-2.5 bg-secondary/60">
              <span className="relative shrink-0 overflow-hidden">
                <BrandLogo linked={false} className="!h-5" />
                {!reduce ? <span className="logo-shine" aria-hidden /> : null}
              </span>
              <p id={titleId} className="sr-only">
                Report a bug
              </p>
              <button
                type="button"
                className="ml-auto label-mono text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </header>

            <form onSubmit={submit} className="p-3 space-y-2.5">
              <Field label="Title *">
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Short title"
                  className="w-full h-9 px-2.5 border border-border bg-background text-sm outline-none focus:border-foreground"
                />
              </Field>
              <Field label="Description">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  placeholder="What happened?"
                  className="w-full px-2.5 py-2 border border-border bg-background text-sm outline-none focus:border-foreground resize-none"
                />
              </Field>
              <Button type="submit" variant="primary" size="sm" className="w-full" disabled={busy}>
                {busy ? "Working…" : "File report →"}
              </Button>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground text-center">
                <Link href="/dash/embed" className="hover:text-foreground underline-offset-2 hover:underline">
                  Embed guide
                </Link>
              </p>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close bug report" : "Open bug report"}
        className={cn(
          "pointer-events-auto relative h-11 px-2.5 flex items-center justify-center border border-border-strong bg-card",
          "shadow-[0_8px_24px_rgb(0_0_0/0.08)] dark:shadow-[0_8px_24px_rgb(0_0_0/0.4)]",
          "transition-[border-color,transform] duration-150 ease-[var(--ease-out)]",
          "hover:border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          open && "border-foreground",
        )}
        onClick={() => setOpen((v) => !v)}
        whileHover={reduce ? undefined : { y: -1, scale: 1.03 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
      >
        {!reduce && !open ? (
          <span
            aria-hidden
            className="absolute inset-0 border border-foreground/25 animate-[bug-ping_2.4s_ease-out_infinite]"
          />
        ) : null}
        <span className="relative shrink-0 overflow-hidden">
          <BrandLogo linked={false} className="!h-6" />
          {!reduce ? <span className="logo-shine" aria-hidden /> : null}
        </span>
      </motion.button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
