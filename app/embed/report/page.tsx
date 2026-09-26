"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/site/brand-logo";
import { Button } from "@/components/ui/button";
import {
  createReportFromEmbed,
  getReport,
  upsertReport,
  type Report,
} from "@/lib/reports";

export default function EmbedReportPage() {
  return (
    <Suspense>
      <EmbedInner />
    </Suspense>
  );
}

function EmbedInner() {
  const params = useSearchParams();
  const previewId = params.get("id");
  const isPreview = params.get("preview") === "1";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [busy, setBusy] = useState(false);
  const [created, setCreated] = useState<Report | null>(null);
  const [existing, setExisting] = useState<Report | null>(null);

  useEffect(() => {
    if (previewId) {
      const r = getReport(previewId);
      setExisting(r ?? null);
    }
  }, [previewId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 400));
    const report = createReportFromEmbed({
      title: title.trim(),
      target: title.trim().toLowerCase().replace(/\s+/g, "-").slice(0, 48) || "embed",
    });
    upsertReport({
      ...report,
      notes: description.trim() || undefined,
    });
    setCreated({ ...report, notes: description.trim() || undefined });
    setBusy(false);
  }

  const view = created ?? existing;

  return (
    <div className="dark min-h-0 bg-[#0a0a0a] text-[#ededed] p-3 font-sans">
      <header className="flex items-center gap-2 border-b border-[#1f1f1f] pb-2">
        <BrandLogo linked={false} className="!h-5" />
        {isPreview ? (
          <span className="ml-auto font-mono text-[10px] uppercase text-[#6e6e6e]">Preview</span>
        ) : (
          <span className="ml-auto size-1.5 rounded-full bg-[#22c55e]" aria-label="Live" />
        )}
      </header>

      {view ? (
        <div className="mt-3 space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#22c55e]">
            {created ? "Filed → dash" : "Report"}
          </p>
          <h1 className="text-base tracking-[-0.02em] leading-snug">{view.title}</h1>
          {view.notes ? (
            <p className="text-[13px] text-[#a1a1a1] text-pretty leading-snug">{view.notes}</p>
          ) : null}
          {!isPreview ? (
            <Button
              variant="secondary"
              size="sm"
              className="border-[#2e2e2e] mt-2"
              onClick={() => {
                setCreated(null);
                setTitle("");
                setDescription("");
              }}
            >
              File another
            </Button>
          ) : null}
        </div>
      ) : (
        <form onSubmit={submit} className="mt-3 space-y-2.5">
          <Field label="Title *">
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Short title"
              className="w-full h-9 px-2.5 border border-[#2e2e2e] bg-[#111] text-sm outline-none focus:border-[#ededed]"
            />
          </Field>
          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="What happened?"
              className="w-full px-2.5 py-2 border border-[#2e2e2e] bg-[#111] text-sm outline-none focus:border-[#ededed] resize-none"
            />
          </Field>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={busy}
            className="w-full dark:bg-[#ededed] dark:text-[#0a0a0a]"
          >
            {busy ? "Working…" : "File report →"}
          </Button>
        </form>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#a1a1a1]">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
