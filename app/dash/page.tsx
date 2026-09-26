"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { ConsoleShell } from "@/components/dash/console-shell";
import { Button } from "@/components/ui/button";
import {
  archiveReport,
  deleteReport,
  listReports,
  subscribeReports,
  type Report,
  type ReportStatus,
} from "@/lib/reports";
import { cn } from "@/lib/utils";
import { motion, transitions } from "@/components/motion";

const FILTERS: Array<ReportStatus | "all"> = [
  "all",
  "ready",
  "generating",
  "shared",
  "draft",
  "archived",
];

export default function DashPage() {
  const pathname = usePathname();
  const [reports, setReports] = useState<Report[]>([]);
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [q, setQ] = useState("");

  function refresh() {
    setReports(listReports());
  }

  useEffect(() => {
    refresh();
    return subscribeReports(refresh);
  }, []);

  const visible = useMemo(() => {
    return reports.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (!q.trim()) return true;
      const hay = `${r.title} ${r.target} ${r.id}`.toLowerCase();
      return hay.includes(q.trim().toLowerCase());
    });
  }, [reports, filter, q]);

  const stats = {
    total: reports.length,
    ready: reports.filter((r) => r.status === "ready" || r.status === "shared").length,
    openFindings: reports.reduce((n, r) => n + (r.status === "archived" ? 0 : r.findings), 0),
  };

  return (
    <ConsoleShell crumb="Dash / Reports" pathname={pathname}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-normal tracking-[-0.02em]">Reports</h1>
          <p className="mt-1 text-sm text-[#a1a1a1] max-w-[60ch]">
            Manage reports created from the embed iframe. Local SAMPLE store — wire{" "}
            <code className="font-mono text-xs">lib/reports.ts</code> to your API.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/dash/embed">Embed code</Link>
          </Button>
          <Button variant="primary" size="sm" asChild className="dark:bg-[#ededed] dark:text-[#0a0a0a]">
            <Link href="/embed/report" target="_blank">
              Open iframe →
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-px bg-[#1f1f1f] border border-code-border">
        {[
          [String(stats.total), "Reports"],
          [String(stats.ready), "Ready / shared"],
          [String(stats.openFindings), "Open findings"],
        ].map(([n, l]) => (
          <div key={l} className="bg-code p-3">
            <div className="text-2xl nums">{n}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
              {l}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title, target, id…"
          className="h-9 flex-1 max-w-md px-3 border border-code-border bg-[#111] text-sm outline-none focus:border-[#ededed]"
        />
        <div className="flex flex-wrap gap-1">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "px-2 h-8 font-mono text-[11px] uppercase tracking-[0.08em] border border-code-border",
                filter === f ? "bg-[#ededed] text-[#0a0a0a]" : "text-[#a1a1a1]",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 border border-code-border overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-code-border font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
              <th className="px-3 py-2 font-normal">Report</th>
              <th className="px-3 py-2 font-normal">Status</th>
              <th className="px-3 py-2 font-normal">Grade</th>
              <th className="px-3 py-2 font-normal">Findings</th>
              <th className="px-3 py-2 font-normal">Updated</th>
              <th className="px-3 py-2 font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-10 text-center text-[#a1a1a1]">
                  No reports yet — open the embed iframe and submit one.
                </td>
              </tr>
            ) : (
              visible.map((r, i) => (
                <motion.tr
                  key={r.id}
                  className="border-b border-code-border h-9 hover:bg-[#111]"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...transitions.reveal, delay: Math.min(i, 4) * 0.04 }}
                >
                  <td className="px-3 py-2">
                    <Link href={`/dash/reports/${r.id}`} className="hover:underline underline-offset-2">
                      {r.title}
                    </Link>
                    <p className="font-mono text-[11px] text-[#6e6e6e]">{r.target}</p>
                  </td>
                  <td className="px-3 py-2">
                    <StatusPill status={r.status} />
                  </td>
                  <td className="px-3 py-2 font-mono text-xs nums">
                    {r.grade ?? "—"} {r.score != null ? `· ${r.score}` : ""}
                  </td>
                  <td className="px-3 py-2 nums">{r.findings}</td>
                  <td className="px-3 py-2 font-mono text-[11px] text-[#a1a1a1]">
                    {new Date(r.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Link
                        href={`/dash/reports/${r.id}`}
                        className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1] hover:text-code-foreground"
                      >
                        View
                      </Link>
                      {r.status !== "archived" ? (
                        <button
                          type="button"
                          className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1] hover:text-code-foreground"
                          onClick={() => {
                            archiveReport(r.id);
                            refresh();
                          }}
                        >
                          Archive
                        </button>
                      ) : null}
                      <button
                        type="button"
                        className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#ef4444]"
                        onClick={() => {
                          if (confirm(`Delete ${r.id}?`)) {
                            deleteReport(r.id);
                            refresh();
                          }
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </ConsoleShell>
  );
}

function StatusPill({ status }: { status: ReportStatus }) {
  const color =
    status === "ready" || status === "shared"
      ? "text-[#22c55e] border-[#22c55e]/40"
      : status === "generating"
        ? "text-[#eab308] border-[#eab308]/40"
        : status === "archived"
          ? "text-[#a1a1a1] border-[#a1a1a1]/40"
          : "text-[#ededed] border-[#2e2e2e]";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em]",
        color,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
