"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/site/brand-logo";
import { Button } from "@/components/ui/button";
import {
  createReportFromEmbed,
  getReport,
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

  const [target, setTarget] = useState("");
  const [title, setTitle] = useState("");
  const [grade, setGrade] = useState("A");
  const [score, setScore] = useState("90");
  const [findings, setFindings] = useState("0");
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
    if (!target.trim()) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 600));
    const report = createReportFromEmbed({
      target,
      title: title || undefined,
      grade,
      score: Number(score) || 0,
      findings: Number(findings) || 0,
    });
    setCreated(report);
    setBusy(false);
  }

  const view = created ?? existing;

  return (
    <div className="dark min-h-svh bg-[#0a0a0a] text-[#ededed] p-4 md:p-5 font-sans">
      <header className="flex items-center gap-3 border-b border-[#1f1f1f] pb-3">
        <BrandLogo linked={false} className="!h-6" />
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
          Report embed
        </span>
        {isPreview ? (
          <span className="ml-auto font-mono text-[11px] uppercase text-[#6e6e6e]">Preview</span>
        ) : (
          <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-[#22c55e]">
            <span className="size-1.5 rounded-full bg-[#22c55e]" aria-hidden />
            Live
          </span>
        )}
      </header>

      {view ? (
        <div className="mt-5 space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#22c55e]">
            {created ? "Report filed → dash" : "Loaded report"}
          </p>
          <h1 className="text-xl tracking-[-0.02em]">{view.title}</h1>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <Item label="ID" value={view.id} />
            <Item label="Target" value={view.target} />
            <Item label="Grade" value={view.grade ?? "—"} />
            <Item label="Score" value={String(view.score ?? "—")} />
            <Item label="Findings" value={String(view.findings)} />
            <Item label="Status" value={view.status} />
          </dl>
          {!isPreview ? (
            <Button
              variant="secondary"
              size="sm"
              className="border-[#2e2e2e]"
              onClick={() => {
                setCreated(null);
                setTarget("");
                setTitle("");
              }}
            >
              File another
            </Button>
          ) : null}
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5 space-y-4 max-w-md">
          <p className="text-sm text-[#a1a1a1]">
            Generate a SAMPLE report. It appears instantly in{" "}
            <span className="text-[#ededed]">/dash</span>.
          </p>
          <Field label="Target *">
            <input
              required
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="api.example.com"
              className="w-full h-10 px-3 border border-[#2e2e2e] bg-[#111] outline-none focus:border-[#ededed]"
            />
          </Field>
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Optional title"
              className="w-full h-10 px-3 border border-[#2e2e2e] bg-[#111] outline-none focus:border-[#ededed]"
            />
          </Field>
          <div className="grid grid-cols-3 gap-2">
            <Field label="Grade">
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full h-10 px-2 border border-[#2e2e2e] bg-[#111]"
              >
                {["A", "B", "C", "D", "F"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </Field>
            <Field label="Score">
              <input
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="w-full h-10 px-3 border border-[#2e2e2e] bg-[#111] nums"
              />
            </Field>
            <Field label="Findings">
              <input
                value={findings}
                onChange={(e) => setFindings(e.target.value)}
                className="w-full h-10 px-3 border border-[#2e2e2e] bg-[#111] nums"
              />
            </Field>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
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
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
        {label}
      </span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-[#1f1f1f] p-3 transition-colors duration-150 hover:border-[#2e2e2e] hover:bg-[#111]">
      <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">{label}</dt>
      <dd className="mt-1 font-mono text-xs break-all">{value}</dd>
    </div>
  );
}
