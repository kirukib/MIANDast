"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { SectionHeader } from "@/components/site/primitives";
import { cn, r2 } from "@/lib/utils";

const STEP_MS = 6000;

const STEPS = [
  { id: "01", title: "Attest", body: "Sign the scope first.", status: "Signed", at: 4 },
  { id: "02", title: "Fence", body: "Block every host outside it.", status: "Fenced", at: 11 },
  { id: "03", title: "Fuzz", body: "Test under a live canary.", status: "p95 84ms", at: 92 },
  { id: "04", title: "Prove", body: "Attach evidence to each finding.", status: "Proven", at: 227 },
  { id: "05", title: "Report", body: "Export a signed report.", status: "Sealed", at: 252 },
];

const MONO = "font-mono text-[11px] uppercase tracking-[0.08em]";

/* ---------- small motion hooks ---------- */

function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** Visibility plus a count of how many times the element has entered the viewport. */
function useInView<T extends Element>(ref: React.RefObject<T | null>) {
  const [state, setState] = useState({ inView: false, views: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) =>
        setState((s) =>
          e.isIntersecting === s.inView ? s : { inView: e.isIntersecting, views: s.views + (e.isIntersecting ? 1 : 0) },
        ),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return state;
}

/** Counts from 0 to `to` once mounted; jumps straight to `to` under reduced motion. */
function useCountUp(to: number, ms = 900, delay = 0) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (t: number) => {
      const p = Math.min(1, Math.max(0, (t - start) / ms));
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, ms, delay, reduced]);
  return reduced ? to : n;
}

/** Reveals `text` one character at a time after `delay`. */
function useTyped(text: string, delay = 0, speed = 28) {
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let i = 0;
    let iv: ReturnType<typeof setInterval> | undefined;
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length && iv) clearInterval(iv);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(t);
      if (iv) clearInterval(iv);
    };
  }, [text, delay, speed, reduced]);
  return reduced ? text : text.slice(0, n);
}

function useClock(startAt: number, running: boolean) {
  const [s, setS] = useState(startAt);
  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => setS((v) => v + 1), 1000);
    return () => clearInterval(iv);
  }, [running]);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return `${h}:${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/* ---------- section ---------- */

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [locked, setLocked] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  // artifacts replay each time the panel scrolls back into view (keyed on `views`)
  const { inView, views } = useInView(panelRef);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (paused || locked || !inView || reduced) return;
    const t = setTimeout(() => setActive((i) => (i + 1) % STEPS.length), STEP_MS);
    return () => clearTimeout(t);
  }, [active, paused, locked, inView, reduced]);

  const running = inView && !paused && !locked && !reduced;

  function select(i: number) {
    setLocked(true);
    setActive(i);
  }

  return (
    <section id="how-it-works" className="band-invert bg-background text-foreground section scroll-mt-16">
      <div className="container-rail">
        <SectionHeader eyebrow="How it works" title={{ a: "From signed scope", b: "to signed report." }} />

        <div
          ref={panelRef}
          data-reveal
          className="mt-12 md:mt-16 hidden md:grid md:grid-cols-12 gap-6 lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div role="tablist" aria-orientation="vertical" aria-label="Scan steps" className="md:col-span-5 border-t border-border">
            {STEPS.map((s, i) => {
              const on = i === active;
              const done = i < active;
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
                    "relative w-full text-left px-4 py-4 border-b border-border transition-colors duration-200",
                    on ? "bg-card" : "hover:bg-card/60",
                  )}
                  onClick={() => select(i)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                  onKeyDown={(e) => {
                    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
                    e.preventDefault();
                    const next = (i + (e.key === "ArrowDown" ? 1 : STEPS.length - 1)) % STEPS.length;
                    select(next);
                    document.getElementById(`step-tab-${next}`)?.focus();
                  }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-0.5 bg-foreground origin-top transition-transform duration-300 ease-[var(--ease-out)]",
                      on ? "scale-y-100" : "scale-y-0",
                    )}
                  />
                  <div className="flex items-center gap-4">
                    <span
                      className={cn(
                        "grid place-items-center size-5 border font-mono text-[10px] transition-colors duration-200",
                        on && "border-foreground bg-foreground text-background",
                        done && "border-foreground text-foreground",
                        !on && !done && "border-border-strong text-muted-foreground",
                      )}
                    >
                      {done ? "✓" : i + 1}
                    </span>
                    <span className={cn("text-[20px] tracking-[-0.01em] transition-colors", on ? "font-medium" : "text-muted-foreground")}>
                      {s.title}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)]",
                      on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-2 pl-9 text-[15px] text-muted-foreground">{s.body}</p>
                      <div className="mt-4 ml-9 h-px bg-border overflow-hidden">
                        {on ? (
                          <div
                            key={`${active}-${locked}-${views}`}
                            className={cn(
                              "h-full bg-foreground origin-left",
                              locked || reduced ? "scale-x-100" : "animate-[fill_6s_linear_forwards]",
                              !running && !locked && "[animation-play-state:paused]",
                            )}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${active}`} className="md:col-span-7 bracket bg-card border border-border overflow-hidden">
            <div className="flex items-center gap-4 h-11 px-4 border-b border-border">
              <span className={cn(MONO, "text-muted-foreground nums")}>{STEPS[active].id} / 05</span>
              <div className="flex-1 grid grid-cols-5 gap-1" aria-hidden>
                {STEPS.map((s, i) => (
                  <span key={s.id} className="h-0.5 bg-border overflow-hidden">
                    <span
                      className={cn(
                        "block h-full bg-foreground origin-left transition-transform duration-500 ease-[var(--ease-out)]",
                        i <= active ? "scale-x-100" : "scale-x-0",
                      )}
                    />
                  </span>
                ))}
              </div>
              <span aria-hidden className="live-dot size-1.5 rounded-full bg-success" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-[210px_1fr] min-h-[340px]">
              <div className="flex flex-col items-center justify-center p-6 lg:border-r border-b lg:border-b-0 border-border">
                <PipelineDial step={active} spinning={running} />
                <Clock key={active} startAt={STEPS[active].at} running={running} />
                <p key={`st-${active}`} className={cn(MONO, "anim-rise mt-1 text-muted-foreground")} style={d(150)}>
                  {STEPS[active].status}
                </p>
              </div>
              <div key={`${active}-${views}`} className="relative p-5 md:p-6 flex items-center">
                <StepArtifact step={active} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: numbered snap cards, no auto-advance */}
        <ol data-reveal-stagger className="md:hidden mt-10 -mx-[var(--gutter)] px-[var(--gutter)] flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">
          {STEPS.map((s, i) => (
            <li key={s.id} className="snap-start shrink-0 w-[80%] border border-border bg-card p-5">
              <span className="grid place-items-center size-6 border border-foreground font-mono text-[11px]">{i + 1}</span>
              <h3 className="mt-6 text-[20px] font-medium tracking-[-0.01em]">{s.title}</h3>
              <p className="mt-1 text-[15px] text-muted-foreground">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Clock({ startAt, running }: { startAt: number; running: boolean }) {
  const t = useClock(startAt, running);
  return <p className="mt-4 font-mono text-[15px] nums">{t}</p>;
}

/** 60-tick dial: ticks fill in a sweep as the pipeline advances; a scan hand turns while live. */
function PipelineDial({ step, spinning }: { step: number; spinning: boolean }) {
  const filledUpTo = Math.round(((step + 1) / STEPS.length) * 60);
  // remember where the last sweep ended so only newly filled ticks animate
  const [shown, setShown] = useState(filledUpTo);
  const [from, setFrom] = useState(filledUpTo);
  if (shown !== filledUpTo) {
    setFrom(shown);
    setShown(filledUpTo);
  }

  return (
    <svg viewBox="0 0 200 200" className="w-40 h-40 text-foreground" aria-hidden>
      {Array.from({ length: 60 }, (_, i) => {
        const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
        const filled = i < filledUpTo;
        const major = i % 12 === 0;
        const r1 = major ? 70 : 75;
        const delay = filled && i >= from ? (i - from) * 14 : 0;
        return (
          <line
            key={i}
            x1={r2(100 + Math.cos(a) * r1)}
            y1={r2(100 + Math.sin(a) * r1)}
            x2={r2(100 + Math.cos(a) * 88)}
            y2={r2(100 + Math.sin(a) * 88)}
            stroke="currentColor"
            strokeWidth={filled ? 1.6 : 1}
            style={{ opacity: filled ? 1 : 0.2, transition: `opacity 240ms ${delay}ms` }}
          />
        );
      })}
      <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" opacity="0.15" />
      <g className="spin-slow" style={{ animationDuration: "4s", animationPlayState: spinning ? "running" : "paused" }}>
        <line x1="100" y1="100" x2="100" y2="46" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="100" cy="46" r="2" fill="currentColor" />
      </g>
      <rect x="93" y="93" width="14" height="14" fill="currentColor" />
    </svg>
  );
}

/* ---------- per-step artifacts (plain, animated on mount) ---------- */

function StepArtifact({ step }: { step: number }) {
  switch (step) {
    case 0:
      return <AttestArtifact />;
    case 1:
      return <FenceArtifact />;
    case 2:
      return <FuzzArtifact />;
    case 3:
      return <ProveArtifact />;
    default:
      return <ReportArtifact />;
  }
}

const ROW = "flex justify-between items-center gap-4 h-10 border-b border-border font-mono text-[12px]";

function AttestArtifact() {
  const hash = useTyped("sha256:9f3a…c21e", 560, 45);
  const rows: [string, React.ReactNode][] = [
    ["Scope", "api.example.com/*"],
    ["Signer", "J. Doe · CTO"],
    ["Ticket", "JIRA-SEC-214"],
    ["Hash", <span key="h" className={hash.length < 16 ? "caret" : undefined}>{hash}</span>],
  ];
  return (
    <div className="w-full relative">
      {rows.map(([k, v], i) => (
        <div key={k} className={cn(ROW, "anim-rise")} style={d(i * 110)}>
          <span className={cn(MONO, "text-muted-foreground")}>{k}</span>
          <span className="truncate">{v}</span>
        </div>
      ))}
      <span className={cn(MONO, "anim-stamp absolute -bottom-10 right-0 border-2 border-success text-success px-2 py-1")} style={d(1400)}>
        Signed
      </span>
    </div>
  );
}

function FenceArtifact() {
  const blocked = ["stripe.com", "sendgrid.net", "cdn.*", "*.amazonaws.com"];
  return (
    <ul className="w-full">
      <li className={cn(ROW, "anim-rise")}>
        <span>api.example.com</span>
        <span className={cn(MONO, "text-success")}>Allow</span>
      </li>
      {blocked.map((h, i) => {
        const t = 250 + i * 260;
        return (
          <li key={h} className={cn(ROW, "anim-rise text-muted-foreground")} style={d(t)}>
            <span className="relative">
              {h}
              <span aria-hidden className="anim-grow absolute left-0 right-0 top-1/2 h-px bg-current" style={d(t + 220)} />
            </span>
            <span className={cn(MONO, "anim-pop text-destructive")} style={d(t + 380)}>
              Blocked
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function FuzzArtifact() {
  const engines = useCountUp(26, 1100);
  const probes = useCountUp(1522, 1600, 200);
  const W = 300;
  const H = 56;
  const pts = [20, 22, 21, 24, 23, 26, 31, 42, 36, 28, 25, 24, 23, 24, 22, 23, 22, 24];
  const line = pts.map((v, i) => `${r2((i / (pts.length - 1)) * W)},${r2(H - (v / 50) * H)}`).join(" ");
  return (
    <div className="w-full">
      <div className="grid grid-cols-[repeat(13,1fr)] gap-1">
        {Array.from({ length: 26 }, (_, i) => (
          <span key={i} className="anim-pop aspect-square bg-foreground" style={d(i * 38)} />
        ))}
      </div>
      <div className="mt-4 flex justify-between font-mono text-[12px]">
        <span className="nums">
          {engines}/26 <span className="text-muted-foreground">engines</span>
        </span>
        <span className="nums">
          {probes.toLocaleString("en-US")} <span className="text-muted-foreground">probes</span>
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-4 w-full h-14 text-foreground" fill="none" preserveAspectRatio="none">
        <line x1="0" x2={W} y1={r2(H - (40 / 50) * H)} y2={r2(H - (40 / 50) * H)} stroke="currentColor" strokeDasharray="3 4" opacity="0.35" />
        <polyline points={line} stroke="currentColor" strokeWidth="1.5" pathLength={400} className="anim-draw" style={d(300)} vectorEffect="non-scaling-stroke" />
      </svg>
      <p className={cn(MONO, "anim-rise mt-2 text-muted-foreground")} style={d(1400)}>
        Canary +40% · backoff 85ms
      </p>
    </div>
  );
}

function ProveArtifact() {
  const lines: [string, string][] = [
    ["req", "GET /orders/1042 · as user_B"],
    ["res", "200 OK · owner user_A"],
    ["oast", "callback 7f2c.oast.mian"],
  ];
  return (
    <div className="w-full bg-code text-code-foreground border border-code-border p-4 font-mono text-[12px] leading-[1.8]">
      {lines.map(([k, v], i) => (
        <div key={k} className="anim-rise flex gap-4" style={d(i * 420)}>
          <span className="w-8 opacity-40">{k}</span>
          <span className={i === lines.length - 1 ? "caret" : undefined}>{v}</span>
        </div>
      ))}
      <div className="anim-pop mt-3 pt-3 border-t border-code-border flex items-center gap-2" style={d(1500)}>
        <span className="size-1.5 rounded-full bg-success" />
        <span className="uppercase tracking-[0.08em] text-[11px]">Proven · BOLA</span>
      </div>
    </div>
  );
}

function ReportArtifact() {
  return (
    <div className="anim-rise paper relative w-full max-w-[300px] mx-auto border border-border p-4 shadow-[0_8px_24px_rgb(0_0_0/0.3)]">
      <p className={cn(MONO, "text-[10px]")}>MIAN DAST · Audit</p>
      <div className="mt-4 space-y-1.5">
        {[90, 70, 82, 56].map((w, i) => (
          <div key={w} className="anim-grow h-1.5 bg-secondary" style={{ width: `${w}%`, ...d(250 + i * 90) }} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-8 gap-0.5">
        {Array.from({ length: 24 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "anim-pop aspect-square border",
              i === 9 || i === 19
                ? "border-sev-high bg-[repeating-linear-gradient(45deg,var(--sev-high)_0_1px,transparent_1px_3px)]"
                : "bg-secondary border-border-strong",
            )}
            style={d(650 + i * 28)}
          />
        ))}
      </div>
      <span className={cn(MONO, "anim-stamp absolute top-3 right-3 text-[10px] border-2 border-foreground px-1.5 py-0.5")} style={d(1500)}>
        Verified
      </span>
    </div>
  );
}
