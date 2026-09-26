"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConsoleShell } from "@/components/dash/console-shell";
import { Button } from "@/components/ui/button";

type Col = { key: string; label: string };
type Row = Record<string, string>;

export function AdminTablePage({
  crumb,
  title,
  description,
  columns,
  rows,
  primaryHref,
  primaryLabel,
}: {
  crumb: string;
  title: string;
  description: string;
  columns: Col[];
  rows: Row[];
  primaryHref?: string;
  primaryLabel?: string;
}) {
  const pathname = usePathname();

  return (
    <ConsoleShell crumb={crumb} pathname={pathname}>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-normal tracking-[-0.02em]">{title}</h1>
          <p className="mt-1 text-sm text-[#a1a1a1] max-w-[60ch]">{description}</p>
        </div>
        {primaryHref && primaryLabel ? (
          <Button
            variant="primary"
            size="sm"
            asChild
            className="dark:bg-[#ededed] dark:text-[#0a0a0a]"
          >
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
        ) : null}
      </div>

      <div className="mt-6 border border-code-border overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-code-border font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
              {columns.map((c) => (
                <th key={c.key} className="px-3 py-2 font-normal">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-code-border h-10 hover:bg-[#111]">
                {columns.map((c) => (
                  <td key={c.key} className="px-3 py-2 font-mono text-xs text-[#ededed]/80">
                    {row[c.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-[#6e6e6e]">
        Skeleton admin surface — replace rows with API data
      </p>
    </ConsoleShell>
  );
}
