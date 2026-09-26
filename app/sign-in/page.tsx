"use client";

import Link from "next/link";
import { useState } from "react";
import { MarketingShell } from "@/components/site/marketing-shell";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/integrations";
import { toast } from "sonner";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await signIn(email);
    setBusy(false);
    toast("Sign-in stubbed — replace signIn() in lib/integrations.ts");
  }

  return (
    <MarketingShell
      eyebrow="Account"
      title={{ a: "Sign in", b: "to the control plane." }}
    >
      <section className="container-rail pb-[var(--section-y)]">
        <form onSubmit={submit} className="max-w-[420px] space-y-4">
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Work email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full h-10 border border-input px-3 bg-transparent outline-none focus:border-foreground"
            />
          </label>
          <Button type="submit" variant="primary" size="md" disabled={busy} className="w-full">
            {busy ? "Working…" : "Continue"}
          </Button>
          <p className="text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/#pricing" className="underline underline-offset-4">
              Start a trial
            </Link>
          </p>
        </form>
      </section>
    </MarketingShell>
  );
}
