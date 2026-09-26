"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/site/primitives";
import { CanaryLatencyChart } from "@/components/site/canary-latency-chart";
import { cn } from "@/lib/utils";

const MONO = "font-mono text-[11px] uppercase tracking-[0.08em]";

export function SafetyModel() {
  return (
    <section id="safety" className="section container-rail">
      <SectionHeader
        eyebrow="Safe by default"
        title={{ a: "Three gates before a single probe", b: "fires at your production." }}
      />

      {/* Bento: lead tile spans two columns, the canary runs full width (spec §5.5). */}
      <div data-reveal-stagger className="mt-12 md:mt-16 hairline-grid grid-cols-1 md:grid-cols-3">
        <GateTile
          id="01"
          title="Attestation gate"
          body="A named engineer signs every scope."
          className="md:col-span-2"
        >
          <AttestationMini />
        </GateTile>
        <GateTile
          id="02"
          title="Boundary fence"
          body="Third-party hosts never see a payload."
        >
          <FenceMini />
        </GateTile>
        <GateTile
          id="03"
          title="Adaptive canary"
          body="Throttles at +300% strain, then halts."
          className="md:col-span-3"
          wide
        >
          <CanaryLatencyChart />
        </GateTile>
      </div>

      <BeforeWith />
    </section>
  );
}

function GateTile({
  id,
  title,
  body,
  children,
  className,
  wide,
}: {
  id: string;
  title: string;
  body: string;
  children: React.ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <Link
      href="/#how-it-works"
      className={cn(
        "group flex flex-col gap-6 p-5 md:p-6 transition-colors duration-150 hover:!bg-card",
        wide && "md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-center md:gap-10",
        className,
      )}
    >
      <div
        className={cn(
          "dot-grid border border-border p-4 flex flex-col justify-center",
          wide ? "md:order-2 min-h-[184px] h-auto" : "h-[168px]",
        )}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <div className={cn(wide && "md:order-1")}>
        <p className={cn(MONO, "text-muted-foreground")}>{id}</p>
        <h3 className="mt-2 text-[20px] leading-[1.3] font-medium tracking-[-0.01em]">{title}</h3>
        <p className="mt-2 text-[15px] text-muted-foreground max-w-[48ch] text-pretty">{body}</p>
        <span
          className={cn(
            MONO,
            "mt-5 inline-flex h-8 items-center gap-2 px-3 border border-border bg-secondary transition-colors duration-150",
            "group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary",
          )}
        >
          View more <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}

function AttestationMini() {
  const rows = [
    ["Scope", "api.example.com/*"],
    ["Signed by", "J. Doe · CTO"],
    ["Ticket", "JIRA-SEC-214"],
    ["Hash", "sha256:9f3a…c21e"],
  ];
  return (
    <div aria-hidden className="bg-card border border-border-strong max-w-[420px] w-full">
      <div className="flex items-center justify-between border-b border-border px-3 h-8">
        <span className={cn(MONO, "text-[10px] text-muted-foreground")}>Attestation · #0214</span>
        <span className={cn(MONO, "text-[10px] text-success flex items-center gap-1.5")}>
          <span className="size-1.5 rounded-full bg-success" /> Signed
        </span>
      </div>
      <dl className="grid grid-cols-[88px_1fr] gap-y-1.5 px-3 py-2.5 font-mono text-[11px]">
        {rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted-foreground uppercase tracking-[0.08em] text-[10px] pt-px">{k}</dt>
            <dd className="truncate">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function FenceMini() {
  const blocked = ["stripe.com", "sendgrid.net", "cdn.*"];
  return (
    <ul aria-hidden className="font-mono text-[11px] w-full">
      <li className="flex justify-between items-center border border-border-strong bg-card px-2.5 h-7">
        <span>api.example.com</span>
        <span className="text-[10px] uppercase tracking-[0.08em] text-success">Allow</span>
      </li>
      {blocked.map((h) => (
        <li key={h} className="flex justify-between items-center border-x border-b border-border bg-card px-2.5 h-7 text-muted-foreground">
          <span className="line-through decoration-[1px]">{h}</span>
          <span className="text-[10px] uppercase tracking-[0.08em] text-destructive">Blocked</span>
        </li>
      ))}
    </ul>
  );
}

/** "Before / with" strip — the old legacy-vs-MIAN section, merged here (task 001 §6). */
function BeforeWith() {
  const rows = [
    ["Exhausts threads and databases", "Backs off in under 85ms"],
    ["Spiders third-party hosts", "Blocks everything out of scope"],
    ["~40% false positives", "Every finding is proven"],
  ];
  return (
    <div data-reveal className="mt-6 border-x border-t border-border">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="order-0 flex items-center gap-3 px-5 md:px-6 h-12 border-b border-border">
          <span className={cn(MONO, "text-muted-foreground")}>Traditional scanners · outage risk</span>
          <span className={cn(MONO, "text-sev-critical border border-sev-critical/30 px-1.5 py-0.5 text-[10px]")}>High</span>
        </div>
        <div className="order-2 md:order-none flex items-center gap-3 px-5 md:px-6 h-12 border-b border-border bg-card md:border-l">
          <span className={cn(MONO, "text-muted-foreground")}>MIAN DAST · outage risk</span>
          <span className={cn(MONO, "text-success border border-success/30 px-1.5 py-0.5 text-[10px]")}>Zero</span>
        </div>
        {rows.map(([before, after], i) => (
          <div key={i} className="contents">
            <p className="order-1 md:order-none px-5 md:px-6 py-4 text-[15px] text-muted-foreground border-b border-border flex gap-3">
              <span aria-hidden className="font-mono text-subtle">—</span>
              {before}
            </p>
            <p className="order-3 md:order-none px-5 md:px-6 py-4 text-[15px] bg-card border-b border-border md:border-l flex gap-3">
              <span aria-hidden className="font-mono">+</span>
              {after}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
