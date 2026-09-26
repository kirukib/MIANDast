"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { SectionHeader } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import {
  PLANS,
  type Billing,
  type Currency,
  formatPrice,
} from "@/lib/pricing";
import { startCheckout } from "@/lib/integrations";
import { cn } from "@/lib/utils";

export function Pricing({ showCompareLink = true }: { showCompareLink?: boolean }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [currency, setCurrency] = useState<Currency>("USD");
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function checkout(planId: string) {
    setBusy(planId);
    const { url } = await startCheckout(planId);
    setBusy(null);
    router.push(url);
  }

  return (
    <section id="pricing" className="section container-rail">
      <SectionHeader
        eyebrow="Pricing"
        title={{ a: "Predictable pricing", b: "for teams that ship daily." }}
      />

      <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-4">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="inline-flex border border-border p-0.5"
        >
          {(
            [
              ["monthly", "Monthly"],
              ["annual", "Annual −20%"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={billing === id}
              className={cn(
                "px-3 h-8 font-mono text-[11px] uppercase tracking-[0.08em]",
                billing === id ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )}
              onClick={() => setBilling(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          Currency
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="h-8 border border-input bg-background px-2 text-foreground"
          >
            {(["USD", "EUR", "GBP", "ETB"] as Currency[]).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-4 border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        PPP · 60% off in 70+ countries with code GLOBAL60 · Ethiopia · 50% off, Telebirr & CBE Birr
        supported
      </div>

      <div className="mt-8 flex md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 overflow-x-auto snap-x md:overflow-visible">
        {PLANS.map((plan) => {
          const price = plan.prices[currency][billing];
          const monthly = plan.prices[currency].monthly;
          const featured = "featured" in plan && plan.featured;
          return (
            <div
              key={plan.id}
              className={cn(
                "snap-start shrink-0 w-[85%] md:w-auto border border-border bg-background p-5 md:p-6 flex flex-col",
                featured && "band-invert bg-background text-foreground lg:-translate-y-3 relative",
              )}
            >
              {featured ? (
                <span className="absolute -top-2.5 left-4 font-mono text-[10px] uppercase tracking-[0.08em] bg-primary text-primary-foreground px-2 py-0.5">
                  Recommended
                </span>
              ) : null}
              <p className="font-mono text-[12px] uppercase tracking-[0.08em]">{plan.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{plan.segment}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-[40px] leading-none tracking-[-0.02em] nums">
                  {formatPrice(currency, price)}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">/mo</span>
              </div>
              {billing === "annual" ? (
                <p className="mt-1 text-sm text-subtle line-through nums">
                  {formatPrice(currency, monthly)}
                </p>
              ) : (
                <p className="mt-1 text-sm text-transparent">—</p>
              )}
              <p className="mt-3 text-sm text-muted-foreground min-h-[48px]">{plan.description}</p>
              <div className="my-4 h-px bg-border" />
              <ul className="space-y-2 text-sm flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="font-mono text-muted-foreground">+</span>
                    {f}
                  </li>
                ))}
              </ul>
              {plan.id === "enterprise" ? (
                <Button variant="secondary" size="md" className="mt-6 w-full" asChild>
                  <Link href="/demo">Talk to sales →</Link>
                </Button>
              ) : (
                <Button
                  variant={featured ? "primary" : "secondary"}
                  size="md"
                  className="mt-6 w-full"
                  disabled={busy === plan.id}
                  onClick={() => checkout(plan.id)}
                >
                  {busy === plan.id ? "Working…" : "Start 14-day trial"}
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {showCompareLink ? (
        <Link
          href="/pricing"
          className="mt-8 inline-flex label-mono text-muted-foreground hover:text-foreground"
        >
          Compare all features →
        </Link>
      ) : null}
    </section>
  );
}
