"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { MarketingShell } from "@/components/site/marketing-shell";
import { Button } from "@/components/ui/button";
import { PLANS, formatPrice, type Currency } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutInner />
    </Suspense>
  );
}

function CheckoutInner() {
  const params = useSearchParams();
  const initial = params.get("plan") ?? "growth";
  const [step, setStep] = useState(0);
  const [planId, setPlanId] = useState(initial);
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [method, setMethod] = useState("card");

  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[2];
  const price = plan.prices[currency][billing];

  return (
    <MarketingShell
      eyebrow="Checkout"
      title={{ a: "Complete your", b: "safe scan plan." }}
      sub="Skeleton flow — replace panels with Stripe / Telebirr / crypto adapters."
    >
      <section className="container-rail pb-[var(--section-y)]">
        <ol className="flex flex-wrap gap-3 font-mono text-[11px] uppercase tracking-[0.08em]">
          {["01 Plan", "02 Billing", "03 Payment"].map((s, i) => (
            <li
              key={s}
              className={cn(i === step ? "text-foreground" : "text-muted-foreground", i < step && "text-success")}
            >
              {i < step ? `✓ ${s.slice(3)}` : s}
              {i < 2 ? <span className="mx-2 text-border-strong">·</span> : null}
            </li>
          ))}
        </ol>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-4">
            {step === 0
              ? PLANS.map((p) => (
                  <label
                    key={p.id}
                    className={cn(
                      "flex items-center gap-3 border p-4 cursor-pointer",
                      planId === p.id ? "border-foreground bg-card" : "border-border",
                    )}
                  >
                    <input
                      type="radio"
                      name="plan"
                      checked={planId === p.id}
                      onChange={() => setPlanId(p.id)}
                    />
                    <span className="flex-1 font-mono text-[12px] uppercase">{p.name}</span>
                    <span className="nums text-sm">{formatPrice(currency, p.prices[currency][billing])}/mo</span>
                  </label>
                ))
              : null}

            {step === 1 ? (
              <div className="space-y-4">
                <div role="radiogroup" className="inline-flex border border-border">
                  {(["monthly", "annual"] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      role="radio"
                      aria-checked={billing === b}
                      className={cn(
                        "px-3 h-8 font-mono text-[11px] uppercase",
                        billing === b ? "bg-primary text-primary-foreground" : "",
                      )}
                      onClick={() => setBilling(b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="h-10 border border-input px-2 bg-background"
                >
                  {(["USD", "EUR", "GBP", "ETB"] as Currency[]).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <p className="border border-border p-3 font-mono text-[11px] uppercase text-muted-foreground">
                  PPP note · GLOBAL60 · Ethiopia Telebirr / CBE
                </p>
              </div>
            ) : null}

            {step === 2 ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1 border border-border p-1">
                  {["card", "crypto", "telebirr", "cbe"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      className={cn(
                        "px-3 h-8 font-mono text-[11px] uppercase",
                        method === m ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                      )}
                      onClick={() => setMethod(m)}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                {method === "card" ? (
                  <div className="space-y-2">
                    <input placeholder="Card number" className="w-full h-10 border border-input px-3 bg-transparent" />
                    <div className="grid grid-cols-2 gap-2">
                      <input placeholder="MM/YY" className="h-10 border border-input px-3 bg-transparent" />
                      <input placeholder="CVC" className="h-10 border border-input px-3 bg-transparent" />
                    </div>
                  </div>
                ) : (
                  <CopyField label="Reference" value="SAMPLE-WIRE-ME" />
                )}
              </div>
            ) : null}

            <div className="flex gap-2 pt-4">
              {step > 0 ? (
                <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
                  Back
                </Button>
              ) : null}
              {step < 2 ? (
                <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
                  Continue
                </Button>
              ) : (
                <Button variant="primary" asChild>
                  <Link href="/checkout/verify">Pay · verify →</Link>
                </Button>
              )}
            </div>
          </div>

          <aside className="lg:col-span-5 lg:sticky lg:top-28 self-start border border-border p-5 bg-card">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Summary
            </p>
            <p className="mt-3 font-mono text-sm uppercase">{plan.name}</p>
            <p className="text-sm text-muted-foreground">{billing} · {currency}</p>
            <p className="mt-6 text-[32px] nums tracking-[-0.02em]">
              {formatPrice(currency, price)}
              <span className="text-sm font-mono text-muted-foreground">/mo</span>
            </p>
          </aside>
        </div>
      </section>
    </MarketingShell>
  );
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div>
      <p className="font-mono text-[11px] uppercase text-muted-foreground">{label}</p>
      <div className="mt-1 flex border border-border">
        <code className="flex-1 px-3 py-2 font-mono text-xs">{value}</code>
        <Button
          variant="ghost"
          size="sm"
          onClick={async () => {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
        >
          {copied ? "Copied ✓" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
