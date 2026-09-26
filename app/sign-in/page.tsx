"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MarketingShell } from "@/components/site/marketing-shell";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/integrations";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function enterDash(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    // ponytail: no auth gate — stub session then open dash
    await signIn(email.trim() || "guest@local");
    try {
      localStorage.setItem("mian-dast-session", email.trim() || "guest");
    } catch {
      /* ignore */
    }
    router.push("/dash");
  }

  return (
    <MarketingShell
      eyebrow="Account"
      title={{ a: "Sign in", b: "to the control plane." }}
      sub="Auth is stubbed — continue enters the reports dash with no login."
    >
      <section className="container-rail pb-[var(--section-y)]">
        <form onSubmit={enterDash} className="max-w-[420px] space-y-4">
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Work email (optional)
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="guest@local"
              className="mt-1 w-full h-10 border border-input px-3 bg-transparent outline-none focus:border-foreground placeholder:text-subtle"
            />
          </label>
          <Button type="submit" variant="primary" size="md" disabled={busy} className="w-full">
            {busy ? "Working…" : "Enter dash →"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="w-full"
            disabled={busy}
            onClick={() => enterDash()}
          >
            Continue without login
          </Button>
          <p className="text-sm text-muted-foreground">
            No account?{" "}
            <Link href="/#pricing" className="underline underline-offset-4">
              Start a trial
            </Link>
            {" · "}
            <Link href="/dash" className="underline underline-offset-4">
              Open dash directly
            </Link>
          </p>
        </form>
      </section>
    </MarketingShell>
  );
}
