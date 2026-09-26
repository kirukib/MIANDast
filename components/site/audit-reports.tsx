import Link from "next/link";
import { BulletList, SectionHeader } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MONO = "font-mono uppercase tracking-[0.08em]";

// coverage matrix: rows = attack classes, cols = targets; 1 = tested clean, 2 = finding, 0 = n/a
const MATRIX = [
  [1, 1, 1, 1, 1, 1],
  [1, 2, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 0, 2, 1, 1],
  [1, 1, 1, 1, 1, 0],
];
const ROW_LABELS = ["INJ", "AUTH", "XSS", "SSRF", "HDR"];

export function AuditReports() {
  return (
    <section className="section container-rail">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
        <div data-reveal className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-start">
          <ReportPreview />
        </div>
        <div className="lg:col-span-5 lg:col-start-8 order-1 lg:order-2">
          <SectionHeader eyebrow="Evidence" title={{ a: "Proof your auditors", b: "will actually accept." }} />
          <BulletList
            className="mt-8"
            items={[
              "Mapped to SOC 2 CC7.1 / 7.2.",
              "Signed timestamps.",
              "SARIF export.",
            ]}
          />
          <Button variant="secondary" size="md" className="mt-8" asChild>
            <Link href="/demo">Request a sample report →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

/** Printed-paper mock: always light, even in dark mode (spec §5.11). Decorative. */
function ReportPreview() {
  return (
    <figure className="relative w-full max-w-[460px]">
      {/* second sheet peeking out underneath */}
      <div aria-hidden className="paper absolute inset-0 translate-x-3 translate-y-3 border border-border lg:rotate-[-0.5deg]" />
      <div aria-hidden className="paper relative border border-border p-6 md:p-7 lg:-rotate-2 shadow-[0_1px_0_var(--border-strong),0_12px_32px_rgb(0_0_0/0.06)]">
        <header className="flex items-start justify-between gap-4 pb-4 border-b border-foreground">
          <div>
            <p className={cn(MONO, "text-[10px] flex items-center gap-2")}>
              <span className="size-2 bg-foreground" /> MIAN DAST
            </p>
            <p className="mt-2 text-[18px] leading-tight tracking-[-0.01em]">Executive security audit</p>
          </div>
          <span className={cn(MONO, "text-[10px] border-2 border-foreground px-2 py-1 rotate-[4deg] shrink-0")}>
            Audit verified
          </span>
        </header>

        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[11px]">
          {[
            ["Target", "api.sample.corp"],
            ["Window", "2026-09-10 → 12"],
            ["Scope hash", "sha256:9f3a…c21e"],
            ["Outages", "0"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className={cn(MONO, "text-[9px] text-muted-foreground")}>{k}</dt>
              <dd className="mt-0.5 font-mono">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-5 grid grid-cols-4 border border-border">
          {[
            ["0", "Critical", "text-sev-critical"],
            ["1", "High", "text-sev-high"],
            ["3", "Medium", "text-sev-medium"],
            ["5", "Low", "text-sev-low"],
          ].map(([n, l, c], i) => (
            <div key={l} className={cn("px-2.5 py-2", i > 0 && "border-l border-border")}>
              <p className="text-[20px] leading-none nums">{n}</p>
              <p className={cn(MONO, "mt-1 text-[9px]", c)}>{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="flex justify-between gap-2">
            <p className={cn(MONO, "text-[9px] text-muted-foreground")}>Coverage matrix</p>
            <p className={cn(MONO, "text-[9px] text-muted-foreground flex items-center gap-3")}>
              <span className="flex items-center gap-1"><span className="size-2 bg-secondary border border-border-strong" /> Clean</span>
              <span className="flex items-center gap-1"><span className="size-2 border border-sev-high bg-[repeating-linear-gradient(45deg,var(--sev-high)_0_1px,transparent_1px_3px)]" /> Finding</span>
            </p>
          </div>
          <div className="mt-2 grid grid-cols-[36px_repeat(6,1fr)] gap-[3px] items-center">
            {MATRIX.map((row, r) => (
              <div key={r} className="contents">
                <span className={cn(MONO, "text-[8px] text-muted-foreground")}>{ROW_LABELS[r]}</span>
                {row.map((v, c) => (
                  <span
                    key={c}
                    className={cn(
                      "h-3.5 border",
                      v === 1 && "bg-secondary border-border-strong",
                      v === 2 && "border-sev-high bg-[repeating-linear-gradient(45deg,var(--sev-high)_0_1px,transparent_1px_4px)]",
                      v === 0 && "border-border",
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <footer className="mt-5 pt-3 border-t border-border flex justify-between gap-4 font-mono text-[9px] text-muted-foreground">
          <span>SIGNED 2026-09-12T10:44Z</span>
          <span>PAGE 1 / 14</span>
        </footer>
      </div>
      <figcaption className="sr-only">Sample page of an auditor-ready MIAN DAST report.</figcaption>
    </figure>
  );
}
