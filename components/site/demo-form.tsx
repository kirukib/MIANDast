"use client";

import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { requestDemo, type DemoRequest } from "@/lib/integrations";
import { cn } from "@/lib/utils";

const EMPTY: DemoRequest = { email: "", name: "", company: "", teamSize: "", country: "", message: "" };

const INPUT =
  "w-full h-10 px-3 border border-input bg-transparent text-[15px] outline-none focus:border-foreground transition-colors aria-[invalid=true]:border-destructive";

/** Demo request form (spec §5.15) — lives on /demo only. */
export function DemoForm() {
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
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a work email.";
    if (!form.name.trim()) next.name = "Enter your name.";
    if (!form.company.trim()) next.company = "Enter your company.";
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
    <div className="bracket bg-card border border-border p-5 md:p-8">
      <div aria-live="polite">
        {ref ? (
          <div className="py-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-success flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" /> Request received
            </p>
            <p className="mt-3 text-[20px] tracking-[-0.01em]">We&apos;ll reply within one business day.</p>
            <p className="mt-2 font-mono text-[12px] text-muted-foreground">Reference {ref}</p>
          </div>
        ) : null}
      </div>
      {ref ? null : (
        <form onSubmit={submit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
          <Field label="Work email" required error={errors.email}>
            {(p) => <input {...p} type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={INPUT} />}
          </Field>
          <Field label="Full name" required error={errors.name}>
            {(p) => <input {...p} autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} className={INPUT} />}
          </Field>
          <Field label="Company" required error={errors.company}>
            {(p) => <input {...p} autoComplete="organization" value={form.company} onChange={(e) => set("company", e.target.value)} className={INPUT} />}
          </Field>
          <Field label="Team size">
            {(p) => (
              <select {...p} value={form.teamSize} onChange={(e) => set("teamSize", e.target.value)} className={cn(INPUT, "bg-card")}>
                <option value="">Select</option>
                <option>1–10</option>
                <option>11–50</option>
                <option>51–200</option>
                <option>200+</option>
              </select>
            )}
          </Field>
          <Field label="Country" className="sm:col-span-2">
            {(p) => (
              <select {...p} value={form.country} onChange={(e) => set("country", e.target.value)} className={cn(INPUT, "bg-card")}>
                <option value="">Select</option>
                <option>United Arab Emirates</option>
                <option>United States</option>
                <option>Ethiopia</option>
                <option>United Kingdom</option>
                <option>Other</option>
              </select>
            )}
          </Field>
          <Field label="What do you want to test?" className="sm:col-span-2">
            {(p) => (
              <textarea
                {...p}
                rows={4}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                className={cn(INPUT, "h-auto py-2 resize-y")}
              />
            )}
          </Field>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-4 pt-1">
            <Button type="submit" variant="primary" size="lg" disabled={busy}>
              {busy ? "Working…" : "Request demo →"}
            </Button>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              * Required
            </span>
          </div>
        </form>
      )}
    </div>
  );
}

type ControlProps = { id: string; "aria-invalid"?: boolean; "aria-describedby"?: string; required?: boolean };

function Field({
  label,
  required,
  error,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: (props: ControlProps) => React.ReactNode;
}) {
  const id = useId();
  const errId = `${id}-err`;
  return (
    <div className={className}>
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
        {required ? " *" : ""}
      </label>
      <div className="mt-1.5">
        {children({ id, required, "aria-invalid": error ? true : undefined, "aria-describedby": error ? errId : undefined })}
      </div>
      {error ? (
        <p id={errId} className="mt-1.5 font-mono text-[11px] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
