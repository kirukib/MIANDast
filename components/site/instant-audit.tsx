"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eyebrow, TwoTone } from "@/components/site/primitives";
import { runQuickAudit, type AuditResult } from "@/lib/integrations";

const EXAMPLES = ["example.com", "github.com", "cloudflare.com"];

type State = "empty" | "loading" | "result" | "error";

export function InstantAudit() {
  const [host, setHost] = useState("");
  const [state, setState] = useState<State>("empty");
  const [error, setError] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<AuditResult | null>(null);

  async function run(target = host) {
    setError("");
    setResult(null);
    setState("loading");
    setLog(["› resolving host…"]);
    const steps = ["› TLS handshake…", "› reading security headers…", "› CORS boundaries…", "› cookie flags…"];
    steps.forEach((s, i) => {
      setTimeout(() => setLog((prev) => [...prev, s]), 300 * (i + 1));
    });
    try {
      const res = await runQuickAudit(target);
      setResult(res);
      setState("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Audit failed");
      setState("error");
    }
  }

  return (
    <section id="audit" className="section container-rail">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>Free · no sign-up</Eyebrow>
          <TwoTone
            a="Check your headers"
            b="in ten seconds."
            className="text-h2 mt-6"
          />
          <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
            <li>· Passive only — nothing is fuzzed</li>
            <li>· TLS, HSTS, CSP, CORS, cookies</li>
            <li>· Grade + checklist you can share</li>
          </ul>
        </div>

        <div className="lg:col-span-7 bracket bg-card p-4 md:p-6">
          <label className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            Target domain
          </label>
          <div className="mt-2 flex flex-col sm:flex-row gap-0 border border-input focus-within:border-foreground">
            <input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="https://yourdomain.com"
              className="flex-1 h-12 px-3 bg-transparent text-[16px] outline-none placeholder:text-subtle"
              aria-invalid={state === "error"}
              aria-describedby={error ? "audit-error" : undefined}
            />
            <Button
              variant="primary"
              size="lg"
              className="rounded-none sm:min-w-[140px]"
              onClick={() => run()}
              disabled={state === "loading"}
            >
              {state === "loading" ? "Working…" : "Audit →"}
            </Button>
          </div>
          {error ? (
            <p id="audit-error" className="mt-2 font-mono text-[12px] text-destructive">
              {error}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                type="button"
                className="eyebrow !py-1 hover:border-foreground"
                onClick={() => {
                  setHost(ex);
                  void run(ex);
                }}
              >
                {ex}
              </button>
            ))}
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
            100% passive · headers, TLS, CORS, cookies · nothing is fuzzed
          </p>

          <div className="mt-6 min-h-[180px] border border-border p-4">
            {state === "empty" ? (
              <p className="text-sm text-muted-foreground">
                Ghost checklist — enter a domain to run a SAMPLE passive audit via{" "}
                <code className="font-mono text-xs">runQuickAudit()</code>.
              </p>
            ) : null}
            {state === "loading" ? (
              <div>
                <div className="h-px bg-border mb-3 overflow-hidden">
                  <div className="h-full w-2/3 bg-foreground animate-pulse" />
                </div>
                <ul className="font-mono text-[12px] space-y-1 text-muted-foreground">
                  {log.map((l) => (
                    <li key={l}>{l}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {state === "result" && result ? (
              <div>
                <div className="flex items-end gap-4">
                  <div className="size-24 border border-border flex items-center justify-center text-[64px] leading-none">
                    {result.grade}
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                      Sample score
                    </p>
                    <p className="text-3xl nums">{result.score}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {result.checks.map((c) => (
                    <li
                      key={c.name}
                      className="flex flex-wrap items-center gap-2 text-sm border-b border-border pb-2"
                    >
                      <span
                        className={`size-1.5 rounded-full ${c.pass ? "bg-success" : "bg-destructive"}`}
                      />
                      <span className="font-mono text-xs flex-1">{c.name}</span>
                      <span className="font-mono text-xs text-muted-foreground">{c.value}</span>
                      <span className="font-mono text-[11px] uppercase">
                        {c.pass ? "Pass" : "Fail"}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" disabled>
                    Download PDF report
                  </Button>
                  <Button variant="primary" size="sm" asChild>
                    <a href="/#pricing">Start 14-day trial</a>
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
