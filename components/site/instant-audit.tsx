"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BulletList, Eyebrow, TwoTone } from "@/components/site/primitives";
import { runQuickAudit, type AuditResult } from "@/lib/integrations";
import { cn } from "@/lib/utils";

const EXAMPLES = ["example.com", "github.com", "cloudflare.com"];
const CHECKS = ["TLS", "HSTS", "CSP", "CORS", "Cookies"];
const STEPS = ["› TLS handshake…", "› reading security headers…", "› CORS boundaries…", "› cookie flags…"];

type State = "empty" | "loading" | "result" | "error";

export function InstantAudit() {
  const [host, setHost] = useState("");
  const [state, setState] = useState<State>("empty");
  const [error, setError] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<AuditResult | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  async function run(target = host) {
    timers.current.forEach(clearTimeout);
    setError("");
    setResult(null);
    if (!target.trim()) {
      setError("Enter a target domain.");
      setState("error");
      return;
    }
    setState("loading");
    setLog(["› resolving host…"]);
    timers.current = STEPS.map((s, i) => setTimeout(() => setLog((prev) => [...prev, s]), 320 * (i + 1)));
    try {
      setResult(await runQuickAudit(target));
      setState("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Audit failed");
      setState("error");
    }
  }

  return (
    <section id="audit" className="section container-rail scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6">
        <div className="lg:col-span-5 lg:pr-10">
          <Eyebrow>Free · no sign-up</Eyebrow>
          <TwoTone a="Check your headers" b="in ten seconds." className="text-h2 mt-6" />
          <p className="mt-4 text-muted-foreground max-w-[44ch] text-pretty">
            A passive read of the security posture your edge already exposes. Nothing is sent that a
            browser wouldn&apos;t send.
          </p>
          <BulletList
            className="mt-8"
            items={[
              "Passive only: nothing is fuzzed",
              "TLS, HSTS, CSP, CORS and cookie flags",
              "A letter grade and checklist you can share",
            ]}
          />
        </div>

        <div className="lg:col-span-7 bracket bg-card border border-border p-4 md:p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void run();
            }}
          >
            <label htmlFor="audit-host" className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Target domain
            </label>
            <div
              className={cn(
                "mt-2 flex flex-col sm:flex-row border focus-within:border-foreground transition-colors",
                state === "error" ? "border-destructive" : "border-input",
              )}
            >
              <input
                id="audit-host"
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="yourdomain.com"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 h-12 px-3 bg-transparent text-[16px] font-mono outline-none placeholder:text-subtle"
                aria-invalid={state === "error"}
                aria-describedby={error ? "audit-error" : "audit-note"}
              />
              <Button type="submit" variant="primary" size="lg" className="rounded-none sm:min-w-[140px]" disabled={state === "loading"}>
                {state === "loading" ? "Working…" : "Audit →"}
              </Button>
            </div>
          </form>
          {error ? (
            <p id="audit-error" className="mt-2 font-mono text-[12px] text-destructive">
              {error}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground mr-1">Try</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                className="border border-border px-2 h-7 font-mono text-[11px] text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                onClick={() => {
                  setHost(ex);
                  void run(ex);
                }}
              >
                {ex}
              </button>
            ))}
          </div>

          <div className="mt-6 border border-border min-h-[260px]" aria-live="polite">
            {state === "loading" ? <Loading log={log} /> : null}
            {state === "result" && result ? <Result result={result} /> : null}
            {state === "empty" || state === "error" ? <Ghost /> : null}
          </div>
          <p id="audit-note" className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            100% passive · headers, TLS, CORS, cookies · nothing is fuzzed
          </p>
        </div>
      </div>
    </section>
  );
}

function ReportHead({ grade, host, score }: { grade?: string; host?: string; score?: number }) {
  return (
    <div className="flex items-stretch border-b border-border">
      <div
        className={cn(
          "size-24 shrink-0 border-r border-border flex items-center justify-center text-[64px] leading-none tracking-[-0.03em]",
          !grade && "text-subtle",
        )}
      >
        {grade ?? "–"}
      </div>
      <div className="flex-1 px-4 py-3 flex flex-col justify-center min-w-0">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          {host ? "Sample result" : "Awaiting target"}
        </p>
        <p className="mt-1 font-mono text-[15px] truncate">{host ?? "—"}</p>
        {score !== undefined ? (
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground nums">
            Score {score} / 100
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Ghost() {
  return (
    <div>
      <ReportHead />
      <ul aria-label="Checks that will run">
        {CHECKS.map((c, i) => (
          <li key={c} className="flex items-center gap-3 px-4 h-10 border-b border-border last:border-b-0">
            <span className="size-1.5 rounded-full border border-border-strong" />
            <span className="font-mono text-[12px] w-16 text-muted-foreground">{c}</span>
            <span className="h-1.5 bg-secondary" style={{ width: `${[38, 52, 30, 44, 36][i]}%` }} />
            <span className="ml-auto font-mono text-[11px] uppercase tracking-[0.08em] text-subtle">Pending</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Loading({ log }: { log: string[] }) {
  return (
    <div>
      <div className="h-px bg-border overflow-hidden">
        <div className="h-full bg-foreground origin-left animate-[fill_1.8s_var(--ease-out)_forwards]" />
      </div>
      <ul className="p-4 font-mono text-[12px] space-y-1.5 text-muted-foreground">
        {log.map((l, i) => (
          <li key={l} className={i === log.length - 1 ? "text-foreground" : undefined}>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Result({ result }: { result: AuditResult }) {
  return (
    <div>
      <ReportHead grade={result.grade} host={result.host} score={result.score} />
      <ul>
        {result.checks.map((c) => (
          <li key={c.name} className="flex items-center gap-3 px-4 h-10 border-b border-border">
            <span className={cn("size-1.5 rounded-full shrink-0", c.pass ? "bg-success" : "bg-destructive")} />
            <span className="font-mono text-[12px] w-16">{c.name}</span>
            <span className="font-mono text-[12px] text-muted-foreground truncate">{c.value}</span>
            <span className={cn("ml-auto font-mono text-[11px] uppercase tracking-[0.08em]", c.pass ? "text-success" : "text-destructive")}>
              {c.pass ? "Pass" : "Fail"}
            </span>
          </li>
        ))}
      </ul>
      <div className="p-4 flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" disabled>
          Download PDF report
        </Button>
        <Button variant="primary" size="sm" asChild>
          <Link href="/#pricing">Start 14-day trial</Link>
        </Button>
      </div>
    </div>
  );
}
