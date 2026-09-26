"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/site/primitives";

const FAQS = [
  {
    q: "How does MIAN DAST avoid production outages?",
    a: "Three pillars: mandatory named attestation gates, boundary proxy fencing that hard-blocks third-party hosts, and an adaptive canary that throttles or halts when latency rises over 300% or returns HTTP 5xx.",
  },
  {
    q: "How does Purchasing Power Parity (PPP) pricing work?",
    a: "Emerging-market teams can use coupon GLOBAL60 for 60% off. Ethiopia has additional Telebirr and CBE Birr paths. Starter remains available from $19/mo.",
  },
  {
    q: "What is Safe-by-Default vs Destructive mode?",
    a: "Safe-by-Default is passive and tokenized — zero state mutations, safe for live production. Destructive mode requires explicit staging classification and still runs under the canary breaker.",
  },
  {
    q: "How do false positives get eliminated?",
    a: "Proof-Based Scanning™ attaches request traces and OAST callbacks so findings are verified before they hit your backlog.",
  },
  {
    q: "Can I run MIAN DAST in CI/CD?",
    a: "Yes. GitHub Actions, GitLab, and curl/Python SDKs are supported. Fail the build on critical findings without touching the database.",
  },
  {
    q: "What does the free audit check?",
    a: "A passive pass over TLS, security headers, CORS, and cookies. Nothing is fuzzed. Results are SAMPLE until you wire runQuickAudit() to your edge.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section container-rail">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <SectionHeader eyebrow="FAQ" title={{ a: "Straight answers", b: "before you scan." }} />
        </div>
        <div className="lg:col-span-8">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <details
                key={f.q}
                open={isOpen}
                className="border-b border-border py-4 group"
                onToggle={(e) => {
                  const el = e.currentTarget;
                  if (el.open) setOpen(i);
                  else if (open === i) setOpen(null);
                }}
              >
                <summary className="flex items-start gap-3 cursor-pointer list-none">
                  <span className="font-mono text-[11px] text-muted-foreground pt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[20px] font-medium tracking-[-0.01em]">{f.q}</span>
                  <span className="font-mono text-lg leading-none">{isOpen ? "−" : "+"}</span>
                </summary>
                <p className="mt-3 pl-8 text-[16px] text-muted-foreground max-w-[60ch] text-pretty">
                  {f.a}
                </p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
