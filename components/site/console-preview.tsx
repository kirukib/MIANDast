import { r2 } from "@/lib/utils";

const FINDINGS = [
  { id: "F-2141", title: "BOLA on /orders/{id}", sev: "High", target: "api.sample", state: "Proven" },
  { id: "F-2139", title: "SSRF metadata path", sev: "Critical", target: "api.sample", state: "Proven" },
  { id: "F-2133", title: "Missing CSP", sev: "Medium", target: "www.sample", state: "Open" },
  { id: "F-2127", title: "Cookie without SameSite", sev: "Low", target: "www.sample", state: "Open" },
] as const;

const LOG = [
  ["10:42:07", "attestation verified · JIRA-SEC-214"],
  ["10:42:08", "fence applied · 3 hosts blocked"],
  ["10:42:31", "canary p95 84ms · healthy"],
  ["10:43:02", "throttle +40% · backoff 85ms"],
] as const;

/**
 * Console preview (spec §5.3): the frame straddles the seam between the light hero and the ink band.
 * Static sample mock until the control plane can be screenshotted.
 */
export function ConsolePreview() {
  return (
    <section
      aria-label="Control plane preview"
      className="band-seam pt-12 md:pt-16 pb-[var(--section-y)] [--seam:168px] md:[--seam:200px]"
    >
      <div className="band-invert">
        <div className="mx-auto max-w-[var(--container)] px-[var(--gutter)]">
          <div
            className="bracket mx-auto max-w-[1080px] border border-border text-foreground"
            style={{ backgroundImage: "var(--glow)", backgroundColor: "var(--card)" }}
          >
            <span className="sr-only">
              Sample mock of the MIAN DAST control plane: sidebar, attestation status, four stat
              tiles, a findings table with severity labels, a canary latency chart and a telemetry
              log.
            </span>
            <div aria-hidden className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
              <Sidebar />
              <div className="min-w-0">
                <TopBar />
                <div className="p-4 md:p-5">
                  <StatTiles />
                  <div className="mt-4 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-4">
                    <FindingsTable />
                    <CanaryPanel />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            <span>Control plane</span>
            <span aria-hidden>·</span>
            <span>26/26 engines</span>
            <span aria-hidden>·</span>
            <span>Attestation log</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Sidebar() {
  const groups = [
    { label: "Fleet", items: ["Scans", "Queue", "Targets & scope"] },
    { label: "Findings", items: ["DAST", "Attack paths"] },
    { label: "Governance", items: ["Attestations", "Reports"] },
  ];
  return (
    <aside className="hidden md:block border-r border-border p-4">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em]">
        <span className="size-3 bg-foreground" /> MIAN DAST
      </div>
      {groups.map((g) => (
        <div key={g.label} className="mt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            {g.label}
          </p>
          <ul className="mt-2 space-y-0.5 text-[13px]">
            {g.items.map((i) => (
              <li
                key={i}
                className={
                  i === "Scans"
                    ? "bg-secondary border-l-2 border-foreground pl-2 py-1.5"
                    : "pl-2.5 py-1.5 text-muted-foreground"
                }
              >
                {i}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}

function TopBar() {
  return (
    <div className="flex items-center gap-3 border-b border-border px-4 md:px-5 h-12">
      <span className="text-[13px] text-muted-foreground">
        Fleet / <span className="text-foreground">Scans</span>
      </span>
      <span className="ml-auto hidden sm:inline-flex items-center gap-2 border border-border-strong px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
        <span className="size-1.5 rounded-full bg-success" /> Attestation gate active
      </span>
      <span className="hidden lg:inline font-mono text-[10px] text-muted-foreground border border-border px-2 py-1">
        ⌘K
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] border border-border px-2 py-1 text-muted-foreground">
        Sample data
      </span>
    </div>
  );
}

function StatTiles() {
  const tiles = [
    ["12", "Open findings"],
    ["3", "Targets in scope"],
    ["84ms", "Canary p95"],
    ["26/26", "Engines online"],
  ];
  return (
    <div className="hairline-grid grid-cols-2 lg:grid-cols-4 [&>*]:bg-card">
      {tiles.map(([n, l]) => (
        <div key={l} className="p-3">
          <div className="text-[22px] leading-none nums tracking-[-0.02em]">{n}</div>
          <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}

function FindingsTable() {
  return (
    <div className="border border-border overflow-hidden">
      <table className="w-full text-left text-[13px]">
        <thead>
          <tr className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground border-b border-border">
            <th className="py-2 px-3 font-normal hidden sm:table-cell">ID</th>
            <th className="py-2 px-3 font-normal">Finding</th>
            <th className="py-2 px-3 font-normal">Severity</th>
            <th className="py-2 px-3 font-normal hidden xl:table-cell">State</th>
          </tr>
        </thead>
        <tbody>
          {FINDINGS.map((f) => (
            <tr key={f.id} className="border-b border-border last:border-b-0 h-9">
              <td className="px-3 font-mono text-[11px] text-muted-foreground hidden sm:table-cell">{f.id}</td>
              <td className="px-3 truncate max-w-[200px]">{f.title}</td>
              <td className="px-3">
                <SeverityBadge level={f.sev} />
              </td>
              <td className="px-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground hidden xl:table-cell">
                {f.state}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CanaryPanel() {
  const pts = [22, 21, 23, 22, 24, 23, 26, 30, 44, 52, 38, 28, 25, 24, 23, 24, 22, 23];
  const w = 236;
  const h = 64;
  const line = pts
    .map((v, i) => `${r2((i / (pts.length - 1)) * w)},${r2(h - (v / 60) * h)}`)
    .join(" ");
  return (
    <div className="border border-border p-3 hidden lg:block">
      <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
        <span>Canary · latency</span>
        <span className="text-foreground">84ms</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-3 w-full h-16 text-foreground" fill="none">
        <line x1="0" y1={r2(h - (45 / 60) * h)} x2={w} y2={r2(h - (45 / 60) * h)} stroke="currentColor" strokeDasharray="2 3" opacity="0.4" />
        <polyline points={line} stroke="currentColor" strokeWidth="1.25" />
        <rect x={r2((9 / 17) * w) - 3} y={r2(h - (52 / 60) * h) - 3} width="6" height="6" fill="currentColor" />
      </svg>
      <ul className="mt-3 space-y-1 font-mono text-[10px] leading-[1.5]">
        {LOG.map(([t, msg]) => (
          <li key={t} className="flex gap-2 min-w-0">
            <span className="text-subtle shrink-0">{t}</span>
            <span className="truncate text-muted-foreground">{msg}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SeverityBadge({ level }: { level: "Critical" | "High" | "Medium" | "Low" }) {
  const color = {
    Critical: "text-sev-critical border-sev-critical/30",
    High: "text-sev-high border-sev-high/30",
    Medium: "text-sev-medium border-sev-medium/30",
    Low: "text-sev-low border-sev-low/30",
  }[level];
  return (
    <span
      className={`inline-flex items-center gap-1.5 border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.08em] ${color}`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}
