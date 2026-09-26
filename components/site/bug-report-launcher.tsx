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
 * Floating chat-style launcher — SAMPLE bug report desk for demos.
 * Shining logo bubble opens a compact panel (not a live ticket system).
 */
export function BugReportLauncher() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [target, setTarget] = useState("");
  const [title, setTitle] = useState("");
  const [severity, setSeverity] = useState("High");
  const [notes, setNotes] = useState("");

  useEffect(() => setMounted(true), []);

  const hidden = HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (!mounted || hidden) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!target.trim()) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 500));
    const report = createReportFromEmbed({
      target: target.trim(),
      title: title.trim() || `Bug report · ${severity}`,
      findings: severity === "Critical" ? 1 : 0,
      grade: severity === "Critical" ? "F" : severity === "High" ? "D" : "C",
      score: severity === "Critical" ? 40 : severity === "High" ? 55 : 70,
    });
    upsertReport({
      ...report,
      notes: notes.trim() || `SAMPLE bug · ${severity}`,
    });
    setBusy(false);
    setOpen(false);
    setTarget("");
    setTitle("");
    setNotes("");
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
            className="pointer-events-auto w-[min(100vw-2rem,360px)] border border-border bg-card shadow-[0_8px_24px_rgb(0_0_0/0.08)] dark:shadow-[0_8px_24px_rgb(0_0_0/0.4)] overflow-hidden"
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 8, scale: 0.98 }}
            transition={transitions.base}
          >
            <header className="flex items-center gap-3 border-b border-border px-4 py-3 bg-secondary/60">
              <span className="relative shrink-0">
                <BrandLogo linked={false} className="!h-5" />
                {!reduce ? <span className="logo-shine" aria-hidden /> : null}
              </span>
              <div className="min-w-0 flex-1">
                <p id={titleId} className="font-mono text-[11px] uppercase tracking-[0.08em]">
                  Report a bug
                </p>
                <p className="text-[12px] text-muted-foreground truncate">SAMPLE · demo desk</p>
              </div>
              <button
                type="button"
                className="label-mono text-muted-foreground hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </header>

            <form onSubmit={submit} className="p-4 space-y-3">
              <p className="text-[13px] text-muted-foreground text-pretty">
                Show customers how findings land in the dash. Files a SAMPLE report — not a live
                ticket.
              </p>
              <Field label="Host / target *">
                <input
                  required
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="api.example.com"
                  className="w-full h-9 px-3 border border-border bg-background text-sm outline-none focus:border-foreground"
                />
              </Field>
              <Field label="Title">
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Optional summary"
                  className="w-full h-9 px-3 border border-border bg-background text-sm outline-none focus:border-foreground"
                />
              </Field>
              <Field label="Severity">
                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full h-9 px-2 border border-border bg-background text-sm"
                >
                  {["Critical", "High", "Medium", "Low"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Notes">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="What broke?"
                  className="w-full px-3 py-2 border border-border bg-background text-sm outline-none focus:border-foreground resize-none"
                />
              </Field>
              <Button type="submit" variant="primary" size="md" className="w-full" disabled={busy}>
                {busy ? "Working…" : "File SAMPLE report →"}
              </Button>
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground text-center">
                Or use the{" "}
                <Link href="/dash/embed" className="text-foreground underline-offset-2 hover:underline">
                  embed iframe
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
          "pointer-events-auto relative group flex items-center gap-2.5 border border-border-strong bg-card pl-2.5 pr-3.5 py-2",
          "shadow-[0_8px_24px_rgb(0_0_0/0.08)] dark:shadow-[0_8px_24px_rgb(0_0_0/0.4)]",
          "transition-[border-color,transform] duration-150 ease-[var(--ease-out)]",
          "hover:border-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          open && "border-foreground",
        )}
        onClick={() => setOpen((v) => !v)}
        whileHover={reduce ? undefined : { y: -1 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
      >
        {/* Soft chat-style ping ring */}
        {!reduce && !open ? (
          <span
            aria-hidden
            className="absolute inset-0 border border-foreground/25 animate-[bug-ping_2.4s_ease-out_infinite]"
          />
        ) : null}
        <span className="relative shrink-0 overflow-hidden rounded-[3px]">
          <BrandLogo linked={false} className="!h-6" />
          {!reduce ? <span className="logo-shine" aria-hidden /> : null}
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-foreground">
            {open ? "Close" : "Report bug"}
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            Live demo
          </span>
        </span>
      </motion.button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
