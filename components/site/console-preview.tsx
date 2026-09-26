export function ConsolePreview() {
  return (
    <section className="band-invert bg-background text-foreground section border-t border-border -mt-[60px] md:-mt-[80px] relative z-10">
      <div className="container-rail">
        <div
          className="bracket mx-auto max-w-[1080px] bg-card border border-border overflow-hidden"
          style={{ backgroundImage: "var(--glow)", backgroundColor: "var(--card)" }}
        >
          <span className="sr-only">
            Static monochrome mock of the MIAN DAST control plane with sidebar, attestation chip,
            stats, and findings table.
          </span>
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] min-h-[320px]" aria-hidden>
            <aside className="border-b md:border-b-0 md:border-r border-border p-4 hidden md:block">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
                <span className="size-3 bg-foreground" /> MIAN DAST
              </div>
              <p className="mt-6 font-mono text-[11px] text-muted-foreground tracking-[0.08em]">
                Fleet
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {["Scans", "Targets", "EASM"].map((i) => (
                  <li
                    key={i}
                    className={
                      i === "Scans"
                        ? "bg-secondary pl-2 border-l-2 border-foreground py-1.5"
                        : "pl-2 py-1.5 text-muted-foreground"
                    }
                  >
                    {i}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-[11px] text-muted-foreground tracking-[0.08em]">
                Governance
              </p>
              <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                <li className="pl-2 py-1.5">Attestations</li>
                <li className="pl-2 py-1.5">Reports</li>
              </ul>
            </aside>
            <div className="p-4">
              <div className="flex flex-wrap items-center gap-3 border-b border-border pb-3">
                <span className="text-sm text-muted-foreground">Fleet / Scans</span>
                <span className="ml-auto eyebrow !border-border-strong">
                  ● Attestation gate active
                </span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-px bg-border border border-border">
                {[
                  ["12", "Open findings"],
                  ["3", "Targets"],
                  ["84ms", "Canary p95"],
                ].map(([n, l]) => (
                  <div key={l} className="bg-card p-3">
                    <div className="text-2xl nums">{n}</div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground mt-1">
                      {l}
                    </div>
                  </div>
                ))}
              </div>
              <table className="mt-4 w-full text-left text-sm">
                <thead>
                  <tr className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground border-b border-border">
                    <th className="py-2 font-normal">Finding</th>
                    <th className="py-2 font-normal">Severity</th>
                    <th className="py-2 font-normal hidden sm:table-cell">Target</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["BOLA on /orders/{id}", "High", "api.sample"],
                    ["Missing CSP", "Medium", "www.sample"],
                    ["SSRF metadata path", "Critical", "api.sample"],
                  ].map(([f, s, t]) => (
                    <tr key={f} className="border-b border-border h-9">
                      <td className="font-mono text-xs">{f}</td>
                      <td>
                        <SeverityBadge level={s as "Critical" | "High" | "Medium"} />
                      </td>
                      <td className="font-mono text-xs text-muted-foreground hidden sm:table-cell">
                        {t}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6 font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
          <span>Control plane</span>
          <span>26/26 engines</span>
          <span>Attestation log</span>
        </div>
      </div>
    </section>
  );
}

function SeverityBadge({ level }: { level: "Critical" | "High" | "Medium" | "Low" }) {
  const color =
    level === "Critical"
      ? "text-sev-critical border-sev-critical/30"
      : level === "High"
        ? "text-sev-high border-sev-high/30"
        : level === "Medium"
          ? "text-sev-medium border-sev-medium/30"
          : "text-sev-low border-sev-low/30";
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] ${color}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}
