"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConsoleShell } from "@/components/dash/console-shell";
import { Button } from "@/components/ui/button";
import { PLANS, formatPrice } from "@/lib/pricing";

export default function BillingPage() {
  const pathname = usePathname();
  const plan = PLANS.find((p) => p.id === "growth")!;

  return (
    <ConsoleShell crumb="Dash / Billing" pathname={pathname}>
      <h1 className="text-2xl font-normal tracking-[-0.02em]">Billing</h1>
      <p className="mt-1 text-sm text-[#a1a1a1] max-w-[60ch]">
        Subscription skeleton — wire Stripe / Telebirr / CBE in checkout.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 border border-code-border p-5 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
            Current plan
          </p>
          <p className="text-xl">{plan.name}</p>
          <p className="text-sm text-[#a1a1a1]">{plan.description}</p>
          <p className="text-[32px] nums tracking-[-0.02em]">
            {formatPrice("USD", plan.prices.USD.monthly)}
            <span className="text-sm font-mono text-[#a1a1a1]">/mo</span>
          </p>
          <Button variant="secondary" size="sm" asChild>
            <Link href="/checkout?plan=growth">Change plan</Link>
          </Button>
        </div>
        <div className="border border-code-border p-5 space-y-2 text-sm">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
            Payment method
          </p>
          <p className="font-mono text-xs">Card · •••• 4242</p>
          <p className="font-mono text-xs text-[#a1a1a1]">Next invoice · SAMPLE</p>
          <Button variant="ghost" size="sm" className="mt-4 !text-[#a1a1a1]" asChild>
            <Link href="/checkout/verify">Verify payment →</Link>
          </Button>
        </div>
      </div>
    </ConsoleShell>
  );
}
