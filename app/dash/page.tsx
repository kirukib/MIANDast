"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ConsoleShell } from "@/components/dash/console-shell";
import { Button } from "@/components/ui/button";
import { listReports, subscribeReports, type Report } from "@/lib/reports";

const SAMPLE_SCANS = [
  { id: "scn_01", target: "api.cloudpay.sample", status: "complete", findings: 12 },
  { id: "scn_02", target: "fhir.omni.sample", status: "running", findings: 0 },
  { id: "scn_03", target: "app.cartflow.sample", status: "queued", findings: 0 },
];

export default function DashboardPage() {
  const pathname = usePathname();
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const refresh = () => setReports(listReports());
    refresh();
    return subscribeReports(refresh);
  }, []);

  const openFindings = reports.reduce(
    (n, r) => n + (r.status === "archived" ? 0 : r.findings),
    0,
  );
  const ready = reports.filter((r) => r.status === "ready" || r.status === "shared").length;

  return (
    <ConsoleShell crumb="Dash / Dashboard" pathname={pathname}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-normal tracking-[-0.02em]">Dashboard</h1>
          <p className="mt-1 text-sm text-[#a1a1a1] max-w-[60ch]">
            Fleet pulse for scans, targets, and reports. SAMPLE data until APIs are wired.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" asChild>
            <Link href="/dash/scans">View scans</Link>
          </Button>
          <Button
            variant="primary"
            size="sm"
            asChild
            className="dark:bg-[#ededed] dark:text-[#0a0a0a]"
          >
            <Link href="/sandbox">Run sandbox →</Link>
          </Button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#1f1f1f] border border-code-border">
        {[
          [String(reports.length), "Reports"],
          [String(ready), "Ready / shared"],
          [String(openFindings), "Open findings"],
          ["3", "Active targets"],
        ].map(([n, l]) => (
          <div key={l} className="bg-code p-4">
            <div className="text-2xl nums">{n}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
              {l}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="border border-code-border">
          <header className="flex items-center justify-between px-4 h-11 border-b border-code-border">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.08em]">Recent scans</h2>
            <Link href="/dash/scans" className="font-mono text-[11px] uppercase text-[#a1a1a1] hover:text-code-foreground">
              All →
            </Link>
          </header>
          <ul>
            {SAMPLE_SCANS.map((s) => (
              <li
                key={s.id}
                className="flex items-center gap-3 px-4 h-11 border-b border-code-border last:border-0 text-sm"
              >
                <span className="font-mono text-[11px] text-[#6e6e6e] w-16">{s.id}</span>
                <span className="flex-1 truncate">{s.target}</span>
                <StatusWord status={s.status} />
              </li>
            ))}
          </ul>
        </section>

        <section className="border border-code-border">
          <header className="flex items-center justify-between px-4 h-11 border-b border-code-border">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.08em]">Recent reports</h2>
            <Link href="/dash/reports" className="font-mono text-[11px] uppercase text-[#a1a1a1] hover:text-code-foreground">
              All →
            </Link>
          </header>
          <ul>
            {reports.slice(0, 5).map((r) => (
              <li
                key={r.id}
                className="flex items-center gap-3 px-4 h-11 border-b border-code-border last:border-0 text-sm"
              >
                <Link href={`/dash/reports/${r.id}`} className="flex-1 truncate hover:underline">
                  {r.title}
                </Link>
                <span className="font-mono text-[11px] uppercase text-[#a1a1a1]">{r.status}</span>
              </li>
            ))}
            {reports.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-[#a1a1a1]">No reports yet</li>
            ) : null}
          </ul>
        </section>
      </div>

      <section className="mt-4 border border-code-border p-4">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
          Quick links
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            ["/dash/targets", "Targets"],
            ["/dash/attestations", "Attestations"],
            ["/dash/embed", "Embed iframe"],
            ["/dash/team", "Team"],
            ["/dash/billing", "Billing"],
            ["/dash/settings", "Settings"],
          ].map(([href, label]) => (
            <Button key={href} variant="secondary" size="sm" asChild>
              <Link href={href}>{label}</Link>
            </Button>
          ))}
        </div>
      </section>
    </ConsoleShell>
  );
}

function StatusWord({ status }: { status: string }) {
  const color =
    status === "complete"
      ? "text-[#22c55e]"
      : status === "running"
        ? "text-[#eab308]"
        : "text-[#a1a1a1]";
  return (
    <span className={`font-mono text-[11px] uppercase tracking-[0.08em] ${color}`}>{status}</span>
  );
}
