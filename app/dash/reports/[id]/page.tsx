"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConsoleShell } from "@/components/dash/console-shell";
import { EmbedHostPreview } from "@/components/dash/embed-host-preview";
import { Button } from "@/components/ui/button";
import {
  archiveReport,
  deleteReport,
  getReport,
  subscribeReports,
  upsertReport,
  type Report,
} from "@/lib/reports";

export default function ReportDetailPage() {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();
  const router = useRouter();
  const [report, setReport] = useState<Report | undefined>();

  function refresh() {
    setReport(getReport(id));
  }

  useEffect(() => {
    refresh();
    return subscribeReports(refresh);
  }, [id]);

  if (!report) {
    return (
      <ConsoleShell crumb={`Dash / Reports / ${id}`} pathname={pathname}>
        <p className="text-[#a1a1a1]">Report not found.</p>
        <Button variant="secondary" size="sm" className="mt-4" asChild>
          <Link href="/dash">← Back</Link>
        </Button>
      </ConsoleShell>
    );
  }

  return (
    <ConsoleShell crumb={`Dash / Reports / ${report.id}`} pathname={pathname}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
            {report.id}
          </p>
          <h1 className="mt-1 text-2xl font-normal tracking-[-0.02em]">{report.title}</h1>
          <p className="mt-1 font-mono text-sm text-[#a1a1a1]">{report.target}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              upsertReport({
                ...report,
                status: "shared",
                updatedAt: new Date().toISOString(),
              });
              refresh();
            }}
          >
            Mark shared
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              archiveReport(report.id);
              refresh();
            }}
          >
            Archive
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#ef4444]"
            onClick={() => {
              if (confirm("Delete this report?")) {
                deleteReport(report.id);
                router.push("/dash");
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1f1f1f] border border-code-border">
        {[
          ["Status", report.status],
          ["Grade", report.grade ?? "—"],
          ["Score", report.score != null ? String(report.score) : "—"],
          ["Findings", String(report.findings)],
        ].map(([l, v]) => (
          <div key={l} className="bg-code p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">{l}</p>
            <p className="mt-2 text-xl nums capitalize">{v}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-code-border p-4 space-y-3 text-sm">
        <Row label="Created" value={new Date(report.createdAt).toLocaleString()} />
        <Row label="Updated" value={new Date(report.updatedAt).toLocaleString()} />
        <Row label="Embed origin" value={report.embedOrigin ?? "—"} />
        <Row label="Notes" value={report.notes ?? "—"} />
      </div>

      <div className="mt-8 space-y-2">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
          Host preview · hover the badge
        </p>
        <EmbedHostPreview
          src={`/embed/report?id=${encodeURIComponent(report.id)}&preview=1`}
          height={380}
        />
      </div>

      <Button variant="secondary" size="sm" className="mt-6" asChild>
        <Link href="/dash">← All reports</Link>
      </Button>
    </ConsoleShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4 border-b border-code-border pb-2 last:border-0">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1] sm:w-36 shrink-0">
        {label}
      </span>
      <span className="font-mono text-xs break-all">{value}</span>
    </div>
  );
}
