"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow, TwoTone } from "@/components/site/primitives";

const STATS = [
  { value: "1.48M+", label: "probes run" },
  { value: "0", label: "collateral outages" },
  { value: "26", label: "detection engines" },
  { value: "<2s", label: "canary check" },
] as const;

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="container-rail min-h-[calc(100svh-4rem)] flex flex-col justify-center pt-28 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <ScopeFenceVisual />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <Eyebrow>Safe-by-default DAST</Eyebrow>
          <TwoTone
            as="h1"
            a="Continuous security testing"
            b="with zero collateral outages."
            className="text-display mt-6"
          />
          <p className="mt-5 text-[18px] leading-[1.55] text-muted-foreground max-w-[60ch] text-pretty">
            Scanners that hammer production blindly take it down. MIAN DAST signs every scope,
            fences every host, and throttles on the first sign of strain.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" asChild>
              <Link href="/#audit">Run free audit</Link>
            </Button>
            <Button variant="secondary" size="lg" onClick={() => setDemoOpen(true)}>
              ▶ Watch demo
            </Button>
          </div>
          <StatStrip />
        </div>
      </div>

      {demoOpen ? (
        <div
          role="dialog"
          aria-modal
          aria-label="Product demo"
          className="fixed inset-0 z-[70] bg-foreground/40 flex items-center justify-center p-4"
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="bracket bg-card w-full max-w-3xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-3">
              <span className="label-mono text-muted-foreground">Demo · 18s showcase</span>
              <button type="button" className="label-mono" onClick={() => setDemoOpen(false)}>
                Close
              </button>
            </div>
            <div className="aspect-video bg-code text-code-foreground flex items-center justify-center font-mono text-sm border border-code-border">
              Wire video asset — SAMPLE
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["0:00 Threat", "0:03 Zero downtime", "0:07 AI guardrail", "0:11 Fix-as-code"].map(
                (c) => (
                  <span key={c} className="eyebrow !py-1">
                    {c}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function StatStrip() {
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 border-t border-border">
      {STATS.map((s, i) => (
        <div
          key={s.label}
          className={
            i > 0 ? "md:border-l border-border pt-4 md:pl-4" : "pt-4"
          }
        >
          <div className="text-[clamp(32px,3.5vw,40px)] leading-none tracking-[-0.02em] nums">
            {s.value}
          </div>
          <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScopeFenceVisual() {
  const ref = useRef<SVGSVGElement>(null);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      className="bracket relative aspect-square max-h-[420px] mx-auto w-full max-w-[420px] p-6"
      style={{ background: "var(--glow)" }}
    >
      <span className="sr-only">
        Line-art scope fence: a target box inside a dashed fence ring with probe nodes on orbiting
        paths.
      </span>
      <svg
        ref={ref}
        viewBox="0 0 320 320"
        className="w-full h-full"
        aria-hidden
        style={reduced ? undefined : { animation: "none" }}
      >
        <rect
          x="118"
          y="130"
          width="84"
          height="60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border-strong"
        />
        <text
          x="160"
          y="164"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontSize: 10, fontFamily: "var(--font-mono)" }}
        >
          target
        </text>
        <ellipse
          cx="160"
          cy="160"
          rx="110"
          ry="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          className="text-border-strong"
        />
        <ellipse
          cx="160"
          cy="160"
          rx="78"
          ry="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-border"
        >
          {!reduced ? (
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 160 160"
              to="360 160 160"
              dur="60s"
              repeatCount="indefinite"
            />
          ) : null}
        </ellipse>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const r = i % 2 === 0 ? 110 : 78;
          const rad = (deg * Math.PI) / 180;
          const x = 160 + Math.cos(rad) * r;
          const y = 160 + Math.sin(rad) * (r * 0.64);
          return (
            <rect
              key={deg}
              x={x - 3}
              y={y - 3}
              width="6"
              height="6"
              className="fill-foreground"
              opacity={reduced ? 1 : undefined}
            >
              {!reduced ? (
                <animate
                  attributeName="opacity"
                  values="0.4;1;0.4"
                  dur="2.4s"
                  begin={`${i * 0.3}s`}
                  repeatCount="indefinite"
                />
              ) : null}
            </rect>
          );
        })}
        <text
          x="160"
          y="292"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}
        >
          FENCE · PROBES
        </text>
      </svg>
    </div>
  );
}
