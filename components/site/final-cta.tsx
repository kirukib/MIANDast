"use client";

import Link from "next/link";
import { useState } from "react";
import { TwoTone } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import { requestDemo, type DemoRequest } from "@/lib/integrations";

const EMPTY: DemoRequest = {
  email: "",
  name: "",
  company: "",
  teamSize: "",
  country: "",
  message: "",
};

export function FinalCta() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof DemoRequest, string>>>({});
  const [ref, setRef] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function set<K extends keyof DemoRequest>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!form.email.includes("@")) next.email = "Work email required";
    if (!form.name.trim()) next.name = "Name required";
    if (!form.company.trim()) next.company = "Company required";
    setErrors(next);
    if (Object.keys(next).length) return;
    setBusy(true);
    try {
      const res = await requestDemo(form);
      setRef(res.reference);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="band-invert bg-background text-foreground section border-t border-border">
      <div className="container-rail text-center">
        <TwoTone
          a="Run your first safe scan"
          b="before your next deploy."
          className="text-h2 mx-auto"
        />
        <Button variant="primary" size="lg" className="mt-8" asChild>
          <Link href="/#audit">Run free audit</Link>
        </Button>

        <div className="bracket bg-card text-left mt-16 max-w-3xl mx-auto p-6">
          {ref ? (
            <p className="font-mono text-sm" aria-live="polite">
              Request received · reference {ref}
            </p>
          ) : (
            <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(
                [
                  ["email", "Work email *", "email"],
                  ["name", "Full name *", "text"],
                  ["company", "Company *", "text"],
                ] as const
              ).map(([key, label, type]) => (
                <Field
                  key={key}
                  label={label}
                  error={errors[key]}
                >
                  <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    className="w-full h-10 px-3 border border-input bg-transparent outline-none focus:border-foreground"
                    aria-invalid={!!errors[key]}
                  />
                </Field>
              ))}
              <Field label="Team size">
                <select
                  value={form.teamSize}
                  onChange={(e) => set("teamSize", e.target.value)}
                  className="w-full h-10 px-3 border border-input bg-transparent"
                >
                  <option value="">Select</option>
                  <option>1–10</option>
                  <option>11–50</option>
                  <option>51–200</option>
                  <option>200+</option>
                </select>
              </Field>
              <Field label="Country">
                <select
                  value={form.country}
                  onChange={(e) => set("country", e.target.value)}
                  className="w-full h-10 px-3 border border-input bg-transparent"
                >
                  <option value="">Select</option>
                  <option>United Arab Emirates</option>
                  <option>United States</option>
                  <option>Ethiopia</option>
                  <option>United Kingdom</option>
                  <option>Other</option>
                </select>
              </Field>
              <Field label="Message" className="sm:col-span-2">
                <textarea
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-input bg-transparent outline-none focus:border-foreground"
                />
              </Field>
              <div className="sm:col-span-2">
                <Button type="submit" variant="primary" size="md" disabled={busy}>
                  {busy ? "Working…" : "Request demo →"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={className}>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </span>
      <div className="mt-1">{children}</div>
      {error ? (
        <span className="mt-1 block font-mono text-[11px] text-destructive">{error}</span>
      ) : null}
    </label>
  );
}
