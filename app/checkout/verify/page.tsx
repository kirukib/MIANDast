"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MarketingShell } from "@/components/site/marketing-shell";
import { Button } from "@/components/ui/button";

type Phase = "reconciling" | "activated" | "failed";

export default function CheckoutVerifyPage() {
  const [phase, setPhase] = useState<Phase>("reconciling");
  const [log, setLog] = useState<string[]>(["› payment reference received"]);

  useEffect(() => {
    const t1 = setTimeout(() => setLog((l) => [...l, "› matching merchant ledger…"]), 800);
    const t2 = setTimeout(() => setLog((l) => [...l, "› SAMPLE reconcile complete"]), 1600);
    const t3 = setTimeout(() => setPhase("activated"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <MarketingShell
      eyebrow="Verification"
      title={{ a: "Payment", b: "reconciliation." }}
    >
      <section className="container-rail pb-[var(--section-y)] max-w-[720px]">
        {phase === "reconciling" ? (
          <div className="border border-border p-6">
            <div className="h-px bg-border mb-4 overflow-hidden">
              <div className="h-full w-1/2 bg-foreground animate-pulse" />
            </div>
            <ul className="font-mono text-[12px] space-y-1 text-muted-foreground">
              {log.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">Usually under 10 minutes.</p>
          </div>
        ) : null}

        {phase === "activated" ? (
          <div className="border border-border p-6 space-y-4">
            <p className="font-mono text-sm text-success">Activated · SAMPLE credentials</p>
            <CopyRow label="Org ID" value="org_sample_wire_me" />
            <CopyRow label="API token" value="mian_sample_token" />
            <Button variant="primary" asChild>
              <Link href="/sandbox">Launch control plane →</Link>
            </Button>
          </div>
        ) : null}

        {phase === "failed" ? (
          <p className="font-mono text-sm text-destructive">
            Verification failed · contact security@askmian.com
          </p>
        ) : null}
      </section>
    </MarketingShell>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase text-muted-foreground">{label}</p>
      <code className="mt-1 block border border-border px-3 py-2 font-mono text-xs">{value}</code>
    </div>
  );
}
