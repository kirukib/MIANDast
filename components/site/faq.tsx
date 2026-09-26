"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/site/primitives";
import { SOURCED_STATS } from "@/lib/trust";

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
    a: "A passive pass over TLS, security headers, CORS and cookies, the same things a browser sees. Nothing is fuzzed and nothing is stored beyond the report you choose to download.",
  },
];

// Target of the hero stat footnotes (spec §5.2); only rendered once a stat carries a source.
const METHODOLOGY = SOURCED_STATS.length
  ? [
      {
        id: "methodology",
        q: "Where do these numbers come from?",
        a: SOURCED_STATS.map((s) => `${s.value} ${s.label.toLowerCase()}: ${s.source}.`).join(" "),
      },
    ]
  : [];

const ITEMS: { q: string; a: string; id?: string }[] = [...FAQS, ...METHODOLOGY];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section container-rail">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
          <SectionHeader eyebrow="FAQ" title={{ a: "Straight answers", b: "before you scan." }} />
        </div>
        <div className="lg:col-span-8">
          {ITEMS.map((f, i) => {
            const isOpen = open === i;
            return (
              <details
                key={f.q}
                id={f.id}
                open={isOpen}
                className="border-b border-border first:border-t group scroll-mt-28"
                onToggle={(e) => {
                  const el = e.currentTarget;
                  if (el.open) setOpen(i);
                  else if (open === i) setOpen(null);
                }}
              >
                <summary className="flex items-baseline gap-5 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:text-foreground">
                  <span className="font-mono text-[11px] text-muted-foreground nums w-5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[20px] leading-[1.3] tracking-[-0.01em] text-pretty">{f.q}</span>
                  <span aria-hidden className="font-mono text-[18px] leading-none w-4 text-center text-muted-foreground group-hover:text-foreground">
                    {isOpen ? "−" : "+"}
                  </span>
                </summary>
                <p className="-mt-1 pb-6 pl-10 pr-9 text-[16px] text-muted-foreground max-w-[64ch] text-pretty">
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
