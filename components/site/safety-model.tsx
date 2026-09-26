import Link from "next/link";
import { SectionHeader } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";

const GATES = [
  {
    id: "01",
    title: "Attestation gate",
    body: "Named engineer signs scope before a single probe fires. Ticket + hash on every run.",
    href: "/#how-it-works",
    mini: (
      <div className="font-mono text-[11px] leading-relaxed text-muted-foreground border border-border p-2">
        ✓ SIGNED · J. Doe (CTO) · JIRA-SEC-214 · sha256:9f3a…
      </div>
    ),
  },
  {
    id: "02",
    title: "Boundary fence",
    body: "Hard-blocks third-party hosts. Stripe, SendGrid, and CDN origins stay out of scope.",
    href: "/#how-it-works",
    mini: (
      <ul className="font-mono text-[11px] space-y-1 text-muted-foreground">
        {["stripe.com", "sendgrid.net", "cdn.*"].map((h) => (
          <li key={h} className="flex justify-between border-b border-border py-1">
            <span className="line-through">{h}</span>
            <span className="text-destructive">BLOCKED</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "03",
    title: "Adaptive canary",
    body: "Live latency probe. At +300% strain the pack throttles or halts automatically.",
    href: "/#how-it-works",
    span: true,
    mini: (
      <div>
        <svg viewBox="0 0 200 40" className="w-full h-10 text-border-strong" aria-hidden>
          <polyline
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            points="0,28 20,26 40,24 60,22 80,20 100,18 120,10 140,8 160,22 180,24 200,25"
          />
          <line x1="0" y1="12" x2="200" y2="12" stroke="currentColor" strokeDasharray="3 3" opacity="0.5" />
          <rect x="118" y="6" width="6" height="6" fill="currentColor" className="text-foreground" />
        </svg>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          Throttled +300% · 85ms backoff
        </p>
      </div>
    ),
  },
];

export function SafetyModel() {
  return (
    <section id="safety" className="section container-rail">
      <SectionHeader
        eyebrow="Safe by default"
        title={{ a: "Three gates before a single probe", b: "fires at your production." }}
      />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
        {GATES.map((g) => (
          <Link
            key={g.id}
            href={g.href}
            className={`group bg-background hover:bg-card p-6 transition-colors ${g.span ? "md:col-span-2" : ""}`}
          >
            <div className="mb-4">{g.mini}</div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              {g.id}
            </p>
            <h3 className="mt-2 text-[20px] font-medium tracking-[-0.01em]">{g.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-[50ch]">{g.body}</p>
            <Button
              variant="secondary"
              size="sm"
              className="mt-4 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary"
              tabIndex={-1}
            >
              View more
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
}
