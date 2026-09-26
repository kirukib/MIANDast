"use client";

import { useEffect, useState } from "react";
import { SectionHeader } from "@/components/site/primitives";
import { cn, r2 } from "@/lib/utils";

const STEPS = [
  { id: "01", title: "Attest", body: "Sign the target with a named engineer, ticket and hash before probes arm.", status: "Attestation signed", clock: "0:00:04" },
  { id: "02", title: "Fence", body: "The boundary proxy hard-blocks every host outside the signed scope.", status: "Fence locked", clock: "0:00:11" },
  { id: "03", title: "Fuzz", body: "26 engines run under canary telemetry, backing off the moment latency climbs.", status: "p95 84ms · healthy", clock: "0:01:32" },
  { id: "04", title: "Prove", body: "Each finding carries a request trace and an OAST callback, not a guess.", status: "Proof captured", clock: "0:03:47" },
  { id: "05", title: "Report", body: "An auditor-ready PDF and SARIF export with signed timestamps.", status: "Report sealed", clock: "0:04:12" },
];

const MONO = "font-mono text-[11px] uppercase tracking-[0.08em]";

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (paused || locked) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % STEPS.length), 6000);
    return () => clearTimeout(t);
  }, [active, paused, locked]);

  return (
    <section id="how-it-works" className="band-invert bg-background text-foreground section scroll-mt-16">
      <div className="container-rail">
        <SectionHeader eyebrow="How it works" title={{ a: "From signed scope", b: "to signed report." }} />

        <div className="mt-12 md:mt-16 hidden md:grid md:grid-cols-12 gap-6 lg:gap-8">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Scan steps"
            className="md:col-span-5 border-t border-border"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {STEPS.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`step-tab-${i}`}
                  aria-selected={on}
                  aria-controls="step-panel"
                  tabIndex={on ? 0 : -1}
                  className={cn(
                    "relative w-full text-left px-4 py-4 border-b border-border transition-colors duration-150",
                    on ? "bg-card" : "hover:bg-card/60",
                  )}
                  onClick={() => {
                    setLocked(true);
                    setActive(i);
                  }}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                    e.preventDefault();
                    const next = (i + (e.key === "ArrowDown" ? 1 : STEPS.length - 1)) % STEPS.length;
                    setLocked(true);
                    setActive(next);
                    document.getElementById(`step-tab-${next}`)?.focus();
                  }}
                >
                  {on ? <span aria-hidden className="absolute left-0 top-0 bottom-0 w-0.5 bg-foreground" /> : null}
                  <div className="flex items-baseline gap-4">
                    <span className={cn(MONO, on ? "text-foreground" : "text-muted-foreground")}>{s.id}</span>
                    <span className={cn("text-[20px] tracking-[-0.01em]", on ? "font-medium" : "text-muted-foreground")}>
                      {s.title}
                    </span>
                  </div>
                  {on ? (
                    <>
                      <p className="mt-2 pl-9 text-[15px] text-muted-foreground max-w-[42ch] text-pretty">{s.body}</p>
                      <div className="mt-4 ml-9 h-px bg-border overflow-hidden">
                        <div
                          key={`${active}-${locked}`}
                          className={cn(
                            "h-full bg-foreground origin-left",
                            locked ? "scale-x-100" : "animate-[fill_6s_linear_forwards] motion-reduce:animate-none motion-reduce:scale-x-100",
                            paused && "[animation-play-state:paused]",
                          )}
                        />
                      </div>
                    </>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            id="step-panel"
            role="tabpanel"
            aria-labelledby={`step-tab-${active}`}
            className="md:col-span-7 bracket bg-card border border-border"
          >
            <div className="flex items-center justify-between h-11 px-4 border-b border-border">
              <span className={cn(MONO, "text-muted-foreground")}>
                Step {STEPS[active].id} / 05 · {STEPS[active].title}
              </span>
              <span className={cn(MONO, "text-muted-foreground flex items-center gap-2")}>
                <span className="size-1.5 rounded-full bg-success" /> Live
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] min-h-[340px]">
              <div className="flex flex-col items-center justify-center p-6 lg:border-r border-b lg:border-b-0 border-border">
                <PipelineDial step={active} />
                <p className="mt-4 font-mono text-[15px] nums">{STEPS[active].clock}</p>
                <p className={cn(MONO, "mt-1 text-muted-foreground text-center")}>{STEPS[active].status}</p>
              </div>
              <div key={active} className="p-5 md:p-6 flex items-center animate-[fadein_200ms_var(--ease-out)]">
                <StepArtifact step={active} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: numbered snap cards, no auto-advance */}
        <ol className="md:hidden mt-10 -mx-[var(--gutter)] px-[var(--gutter)] flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
          {STEPS.map((s, i) => (
            <li key={s.id} className="snap-start shrink-0 w-[85%] border border-border bg-card p-5">
              <p className={cn(MONO, "text-muted-foreground")}>#{i + 1}</p>
              <h3 className="mt-3 text-[20px] font-medium tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">{s.body}</p>
              <p className={cn(MONO, "mt-4 pt-3 border-t border-border text-muted-foreground")}>{s.status}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** 60-tick dial; filled ticks = progress through the five steps. */
function PipelineDial({ step }: { step: number }) {
  const filledUpTo = Math.round(((step + 1) / STEPS.length) * 60);
  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 text-foreground" aria-hidden>
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const filled = i < filledUpTo;
        const major = i % 12 === 0;
        const r1 = major ? 70 : 74;
        return (
          <line
            key={i}
            x1={r2(100 + Math.cos(a) * r1)}
            y1={r2(100 + Math.sin(a) * r1)}
            x2={r2(100 + Math.cos(a) * 88)}
            y2={r2(100 + Math.sin(a) * 88)}
            stroke="currentColor"
            strokeWidth={filled ? 1.5 : 1}
            opacity={filled ? 1 : 0.22}
            className="transition-opacity duration-200"
          />
        );
      })}
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" opacity="0.18" />
      <rect x="93" y="93" width="14" height="14" fill="currentColor" />
    </svg>
  );
}

function StepArtifact({ step }: { step: number }) {
  const row = "flex justify-between gap-4 py-2 border-b border-border font-mono text-[12px]";
  switch (step) {
    case 0:
      return (
        <dl className="w-full">
          {[
            ["Scope", "api.example.com/*"],
            ["Signed by", "J. Doe · CTO"],
            ["Ticket", "JIRA-SEC-214"],
            ["Hash", "sha256:9f3a…c21e"],
          ].map(([k, v]) => (
            <div key={k} className={row}>
              <dt className="text-muted-foreground uppercase tracking-[0.08em] text-[11px]">{k}</dt>
              <dd className="truncate">{v}</dd>
            </div>
          ))}
          <p className={cn(MONO, "mt-4 text-success flex items-center gap-2")}>
            <span className="size-1.5 rounded-full bg-success" /> Signature valid
          </p>
        </dl>
      );
    case 1:
      return (
        <ul className="w-full">
          <li className={row}>
            <span>api.example.com</span>
            <span className="text-success uppercase tracking-[0.08em] text-[11px]">Allow</span>
          </li>
          {["stripe.com", "sendgrid.net", "cdn.*", "*.amazonaws.com"].map((h) => (
            <li key={h} className={cn(row, "text-muted-foreground")}>
              <span className="line-through">{h}</span>
              <span className="text-destructive uppercase tracking-[0.08em] text-[11px]">Blocked</span>
            </li>
          ))}
        </ul>
      );
    case 2:
      return (
        <div className="w-full">
          <div className="hairline-grid grid-cols-3 [&>*]:bg-card">
            {[
              ["26/26", "Engines"],
              ["84ms", "p95"],
              ["0", "5xx"],
            ].map(([n, l]) => (
              <div key={l} className="p-3">
                <p className="text-[22px] leading-none nums">{n}</p>
                <p className={cn(MONO, "mt-2 text-muted-foreground")}>{l}</p>
              </div>
            ))}
          </div>
          <ul className="mt-4 font-mono text-[12px] space-y-1.5 text-muted-foreground">
            <li>› sqli.time-based · 1,204 probes · ok</li>
            <li>› bola.object-swap · 318 probes · ok</li>
            <li className="text-foreground">› canary +40% · backoff 85ms</li>
          </ul>
        </div>
      );
    case 3:
      return (
        <pre className="w-full overflow-x-auto bg-code text-code-foreground border border-code-border p-4 font-mono text-[12px] leading-[1.7]">
          <span className="opacity-50"># request</span>
          {"\n"}GET /orders/1042 HTTP/1.1{"\n"}Authorization: Bearer user_B{"\n\n"}
          <span className="opacity-50"># response</span>
          {"\n"}200 OK · order owned by user_A{"\n\n"}
          <span className="opacity-50"># oast</span>
          {"\n"}callback 7f2c.oast.mian · 10:43:18Z ✓
        </pre>
      );
    default:
      return (
        <div className="paper w-full max-w-[320px] mx-auto border border-border p-4 shadow-[0_8px_24px_rgb(0_0_0/0.25)]">
          <div className="flex justify-between items-center">
            <span className={cn(MONO, "text-[10px]")}>MIAN DAST · Audit</span>
            <span className={cn(MONO, "text-[10px] border border-foreground px-1")}>Verified</span>
          </div>
          <div className="mt-4 space-y-1.5">
            {[90, 70, 80, 55].map((w) => (
              <div key={w} className="h-1.5 bg-secondary" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-8 gap-0.5">
            {Array.from({ length: 24 }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "aspect-square border",
                  i === 9 || i === 19
                    ? "border-sev-high bg-[repeating-linear-gradient(45deg,var(--sev-high)_0_1px,transparent_1px_3px)]"
                    : "bg-secondary border-border-strong",
                )}
              />
            ))}
          </div>
          <p className={cn(MONO, "mt-4 text-[10px] text-muted-foreground")}>Signed 2026-09-12T10:44Z</p>
        </div>
      );
  }
}
