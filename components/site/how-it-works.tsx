"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: "01",
    title: "Attest",
    body: "Sign the target with a named engineer, ticket, and hash before probes arm.",
  },
  {
    id: "02",
    title: "Fence",
    body: "Boundary proxy hard-blocks third-party hosts outside the signed scope.",
  },
  {
    id: "03",
    title: "Fuzz",
    body: "26 engines run under canary telemetry with adaptive backoff on strain.",
  },
  {
    id: "04",
    title: "Prove",
    body: "Proof-based findings with request traces and OAST callbacks — not guesses.",
  },
  {
    id: "05",
    title: "Report",
    body: "Auditor-ready PDF and SARIF with signed timestamps for SOC 2 buyers.",
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const userLocked = useRef(false);

  useEffect(() => {
    if (paused || userLocked.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((i) => (i + 1) % STEPS.length), 6000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="how-it-works" className="band-invert bg-background text-foreground section border-t border-border">
      <div className="container-rail">
        <SectionHeader
          eyebrow="How it works"
          title={{ a: "From signed scope", b: "to signed report." }}
        />

        <div className="mt-12 hidden md:grid md:grid-cols-12 gap-8">
          <div
            className="md:col-span-5 space-y-1"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className={cn(
                  "w-full text-left p-3 border-b border-border transition-colors",
                  i === active ? "bg-secondary" : "hover:bg-secondary/50",
                )}
                onClick={() => {
                  userLocked.current = true;
                  setActive(i);
                }}
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-muted-foreground">{s.id}</span>
                  <span className="text-[20px] font-medium">{s.title}</span>
                </div>
                {i === active ? (
                  <>
                    <p className="mt-2 text-sm text-muted-foreground max-w-[40ch]">{s.body}</p>
                    <div className="mt-3 h-px bg-border overflow-hidden">
                        <div
                        key={active}
                        className="h-full bg-foreground origin-left animate-[fill_6s_linear_forwards] motion-reduce:animate-none motion-reduce:scale-x-100"
                      />
                    </div>
                  </>
                ) : null}
              </button>
            ))}
          </div>
          <div className="md:col-span-7">
            <CanaryDial step={active} />
          </div>
        </div>

        <div className="md:hidden mt-8 flex gap-3 overflow-x-auto snap-x pb-2">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className="snap-start shrink-0 w-[85%] border border-border bg-card p-4"
            >
              <p className="font-mono text-[11px] text-muted-foreground">#{i + 1}</p>
              <h3 className="mt-2 text-[20px] font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CanaryDial({ step }: { step: number }) {
  const labels = [
    "Attestation signed",
    "Fence locked",
    "Engines armed",
    "Proof captured",
    "Report sealed",
  ];
  return (
    <div className="bracket bg-card p-6 flex flex-col items-center justify-center min-h-[320px]">
      <svg viewBox="0 0 200 200" className="w-48 h-48 text-border-strong" aria-hidden>
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
          const filled = i < 20 + step * 8;
          const x1 = 100 + Math.cos(a) * 70;
          const y1 = 100 + Math.sin(a) * 70;
          const x2 = 100 + Math.cos(a) * (filled ? 88 : 82);
          const y2 = 100 + Math.sin(a) * (filled ? 88 : 82);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth={filled ? 1.5 : 1}
              opacity={filled ? 1 : 0.35}
            />
          );
        })}
        <rect x="94" y="94" width="12" height="12" className="fill-foreground" />
      </svg>
      <p className="mt-4 font-mono text-sm nums">0:01:32</p>
      <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        p95 84ms · {labels[step]}
      </p>
    </div>
  );
}
