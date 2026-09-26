"use client";

import Link from "next/link";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Eyebrow, TwoTone } from "@/components/site/primitives";
import { useReducedMotion } from "@/components/motion";
import { HERO_STATS } from "@/lib/trust";
import { cn, r2 } from "@/lib/utils";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const CHAPTERS = ["0:00 Threat", "0:03 Zero downtime", "0:07 AI guardrail", "0:11 Fix-as-code"];

export function Hero() {
  return (
    <section className="container-rail pt-[76px] md:pt-[88px]">
      {/* Hero frame: text left, animated scope fence on the right (spec §5.2). */}
      <div className="md:-mx-[var(--gutter)] md:border-y border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center py-10 md:px-[var(--gutter)] lg:py-10 lg:min-h-[560px]">
          <div className="order-1 lg:col-span-7 lg:pr-4">
            <Eyebrow className="anim-rise">Safe-by-default DAST</Eyebrow>
            <TwoTone
              as="h1"
              a="Continuous security testing"
              b="with zero collateral outages."
              className="text-display mt-6 max-w-[18ch] anim-rise"
              style={d(80)}
            />
            <p
              style={d(160)}
              className="anim-rise mt-5 text-[18px] leading-[1.55] text-muted-foreground max-w-[52ch] text-pretty"
            >
              Blind scanners take production down. MIAN DAST signs every scope, fences every host
              and backs off at the first sign of strain.
            </p>
            <div className="anim-rise mt-8 flex flex-wrap gap-3" style={d(240)}>
              <Button variant="primary" size="lg" asChild>
                <Link href="/#audit">Run free audit</Link>
              </Button>
              <DemoDialog />
            </div>
          </div>

          <div className="order-2 lg:col-span-5 anim-rise" style={d(280)}>
            <ScopeFenceVisual />
          </div>
        </div>

        <StatStrip />
      </div>
    </section>
  );
}

function DemoDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="secondary" size="lg">
          <span aria-hidden className="text-[9px]">
            ▶
          </span>
          Watch demo
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-foreground/50" />
        <Dialog.Content className="bracket fixed left-1/2 top-1/2 z-[71] w-[calc(100%-32px)] max-w-3xl -translate-x-1/2 -translate-y-1/2 bg-card border border-border p-4 focus:outline-none">
          <div className="flex justify-between items-center mb-3">
            <Dialog.Title className="label-mono text-muted-foreground">Product demo · 18s</Dialog.Title>
            <Dialog.Close className="label-mono text-muted-foreground hover:text-foreground">
              Close
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Eighteen-second walkthrough of a safe MIAN DAST scan.
          </Dialog.Description>
          <div className="aspect-video bg-code text-code-foreground border border-code-border flex flex-col items-center justify-center gap-3">
            <span className="size-12 border border-code-border flex items-center justify-center text-sm">
              ▶
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] opacity-60">
              Video asset pending
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {CHAPTERS.map((c) => (
              <span key={c} className="eyebrow !py-1">
                {c}
              </span>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function StatStrip() {
  return (
    <dl className="anim-rise grid grid-cols-2 md:grid-cols-4 border-t border-border" style={d(360)}>
      {HERO_STATS.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            "flex flex-col-reverse justify-end py-5 md:py-6 px-4 md:px-[var(--gutter)]",
            i % 2 === 1 && "border-l border-border",
            i === 2 && "md:border-l",
            i >= 2 && "border-t md:border-t-0 border-border",
            i % 2 === 0 && "pl-0",
          )}
        >
          <dt className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            {s.label}
            {s.source ? (
              <Link href="/#methodology" className="ml-0.5 hover:text-foreground" aria-label="Source">
                <sup>{i + 1}</sup>
              </Link>
            ) : null}
          </dt>
          <dd className="text-[clamp(32px,3.5vw,40px)] leading-none tracking-[-0.02em] nums">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Scope-fence line drawing (ink strokes, spec §1 / §5.2) ---------- */

const C = 200;
const FENCE_R = 146;

function polar(r: number, deg: number, ry = r) {
  const a = (deg * Math.PI) / 180;
  return { x: r2(C + Math.cos(a) * r), y: r2(C + Math.sin(a) * ry) };
}

const MONO = { fontFamily: "var(--font-mono)", letterSpacing: "0.08em" } as const;

function ScopeFenceVisual() {
  const reduce = useReducedMotion();
  const [hot, setHot] = useState(false);
  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
  const motion = !reduce;

  return (
    <div
      className={cn(
        "hero-scope bracket relative mx-auto w-full max-w-[300px] sm:max-w-[420px] aspect-square",
        motion && "is-live",
        hot && motion && "is-hot",
      )}
      style={{ background: "var(--glow)" }}
      onMouseEnter={() => setHot(true)}
      onMouseLeave={() => setHot(false)}
      onFocus={() => setHot(true)}
      onBlur={() => setHot(false)}
      tabIndex={0}
    >
      <span className="sr-only">
        Line drawing: a target service inside a dashed scope fence, probes orbiting inside the
        fence, and two third-party hosts outside it marked as blocked. Hover intensifies the scan.
      </span>
      <svg viewBox="0 0 400 400" className="w-full h-full text-foreground" aria-hidden fill="none">
        {/* soft scan wash */}
        <circle
          cx={C}
          cy={C}
          r={FENCE_R + 8}
          className="hero-scope-wash"
          fill="currentColor"
          stroke="none"
          opacity="0"
        />

        {/* registration marks */}
        <g className="text-muted-foreground" stroke="currentColor">
          {[
            [22, 22],
            [378, 22],
            [22, 378],
            [378, 378],
          ].map(([x, y]) => (
            <path key={`${x}-${y}`} d={`M${x - 5} ${y}H${x + 5}M${x} ${y - 5}V${y + 5}`} />
          ))}
        </g>

        {/* fence + graduated scale */}
        <circle
          className="hero-fence"
          cx={C}
          cy={C}
          r={FENCE_R}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 5"
          pathLength={1}
        />
        <g className="text-muted-foreground hero-ticks" stroke="currentColor">
          {ticks.map((deg) => {
            const long = deg % 30 === 0;
            const a = polar(FENCE_R + 6, deg);
            const b = polar(FENCE_R + (long ? 15 : 10), deg);
            return (
              <line
                key={deg}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                strokeWidth={long ? 1 : 0.6}
                style={{ "--ft-i": deg / 5 } as React.CSSProperties}
              />
            );
          })}
        </g>

        {/* outer orbit */}
        <g className={cn("hero-orbit hero-orbit-a", motion && "spin-hero")}>
          <ellipse cx={C} cy={C} rx="116" ry="62" stroke="currentColor" opacity="0.4" />
          {[65, 155, 245, 335].map((deg, i) => {
            const p = polar(116, deg, 62);
            return (
              <g key={deg} className="hero-probe" style={{ "--ft-i": i } as React.CSSProperties}>
                <circle cx={p.x} cy={p.y} r="7" className="hero-probe-halo" fill="currentColor" stroke="none" />
                <rect x={p.x - 3} y={p.y - 3} width="6" height="6" fill="currentColor" />
              </g>
            );
          })}
        </g>

        {/* inner orbit — opposite direction */}
        <g className={cn("hero-orbit hero-orbit-b", motion && "spin-hero-rev")}>
          <ellipse cx={C} cy={C} rx="62" ry="104" stroke="currentColor" opacity="0.4" />
          {[20, 110, 200, 290].map((deg, i) => {
            const p = polar(62, deg, 104);
            return (
              <g key={deg} className="hero-probe" style={{ "--ft-i": i } as React.CSSProperties}>
                <circle cx={p.x} cy={p.y} r="5.5" className="hero-probe-halo" fill="currentColor" stroke="none" />
                <rect x={p.x - 2.5} y={p.y - 2.5} width="5" height="5" fill="currentColor" />
              </g>
            );
          })}
        </g>

        {/* target service */}
        <g className="hero-target">
          <rect
            x="150"
            y="172"
            width="100"
            height="58"
            fill="var(--card)"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line x1="150" y1="188" x2="250" y2="188" stroke="currentColor" />
          <rect x="156" y="178" width="4" height="4" className="hero-target-led" fill="currentColor" />
          <rect x="164" y="178" width="4" height="4" stroke="currentColor" />
          {[200, 210, 220].map((y, i) => (
            <line
              key={y}
              x1="158"
              y1={y}
              x2={i === 1 ? 212 : 238}
              y2={y}
              stroke="currentColor"
              opacity="0.45"
              className="hero-target-line"
              style={{ "--ft-i": i } as React.CSSProperties}
            />
          ))}
          <text x={C} y="250" textAnchor="middle" fill="currentColor" style={{ ...MONO, fontSize: 8.5 }}>
            TARGET · SIGNED
          </text>
        </g>

        {/* blocked third-party hosts */}
        <g className="hero-blocked">
          <path d="M292 116 L318 66" stroke="currentColor" strokeDasharray="2 3" className="hero-block-link" />
          <path d="M287 110 l10 5" stroke="currentColor" strokeWidth="1.5" />
          <rect x="296" y="42" width="86" height="22" fill="var(--card)" stroke="currentColor" />
          <text x="304" y="56.5" fill="currentColor" style={{ ...MONO, fontSize: 8.5 }}>
            STRIPE.COM
          </text>
          <path d="M366 49l8 8M374 49l-8 8" stroke="currentColor" strokeWidth="1.2" className="hero-block-x" />

          <path d="M104 306 L74 336" stroke="currentColor" strokeDasharray="2 3" className="hero-block-link" />
          <path d="M100 300 l8 9" stroke="currentColor" strokeWidth="1.5" />
          <rect x="18" y="338" width="86" height="22" fill="var(--card)" stroke="currentColor" />
          <text x="26" y="352.5" fill="currentColor" style={{ ...MONO, fontSize: 8.5 }}>
            CDN.*
          </text>
          <path d="M88 345l8 8M96 345l-8 8" stroke="currentColor" strokeWidth="1.2" className="hero-block-x" />
        </g>

        {/* dimension: scope radius */}
        <g className="text-muted-foreground" stroke="currentColor">
          <path d={`M${C} 262V${C + FENCE_R}`} strokeDasharray="1 3" className="hero-dim" />
          <path d={`M${C - 4} ${C + FENCE_R}h8`} />
        </g>
        <text
          x="206"
          y="318"
          fill="currentColor"
          className="text-muted-foreground hero-dim-label"
          style={{ ...MONO, fontSize: 8 }}
        >
          R · SCOPE
        </text>
      </svg>
    </div>
  );
}
