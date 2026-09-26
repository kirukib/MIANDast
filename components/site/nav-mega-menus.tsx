"use client";

import Link from "next/link";
import { BrandLogo } from "@/components/site/brand-logo";
import { cn } from "@/lib/utils";
import {
  CASES_MEGA_LINKS,
  DOCS_MEGA_LINKS,
  PRODUCT_MEGA_LINKS,
  type MegaLink,
} from "@/lib/nav-mega";

export const MEGA_MENU_WRAPPER =
  "absolute left-1/2 top-full z-50 w-[min(920px,calc(100vw-1.5rem))] -translate-x-1/2 pt-2";

const PANEL =
  "w-full border border-border bg-card shadow-[0_8px_24px_rgb(0_0_0/0.08)] dark:shadow-[0_8px_24px_rgb(0_0_0/0.4)]";

const GRID = "grid gap-0 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)_minmax(0,0.9fr)]";

function MegaArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "font-mono text-[11px] opacity-0 translate-x-[-2px] transition-[opacity,transform] duration-150 group-hover:opacity-100 group-hover:translate-x-0",
        className,
      )}
    >
      →
    </span>
  );
}

function MegaLinkRow({ item, onNavigate }: { item: MegaLink; onNavigate?: () => void }) {
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="group flex items-start justify-between gap-3 px-3 py-2.5 transition-colors duration-150 hover:bg-secondary"
    >
      <span className="min-w-0">
        <span className="flex items-center gap-2">
          <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-foreground">
            {item.label}
          </span>
          {item.badge ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] border border-border-strong px-1.5 py-0.5 text-muted-foreground">
              {item.badge}
            </span>
          ) : null}
        </span>
        {item.description ? (
          <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">
            {item.description}
          </span>
        ) : null}
      </span>
      <MegaArrow className="mt-0.5 shrink-0" />
    </Link>
  );
}

function FeaturedCard({
  title,
  body,
  href,
  label,
  onNavigate,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex h-full min-h-[220px] flex-col border-t md:border-t-0 md:border-l border-border p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        Featured
      </p>
      <h3 className="mt-3 text-[18px] leading-snug tracking-[-0.01em]">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground text-pretty">{body}</p>
      <div className="flex flex-1 items-center justify-center py-6">
        <BrandLogo linked={false} variant="mark" className="!h-10" />
      </div>
      <Link
        href={href}
        onClick={onNavigate}
        className="mt-auto inline-flex w-fit items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-foreground hover:underline underline-offset-4"
      >
        {label} <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function CtaStack({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full min-h-[220px] flex-col gap-0 border-t md:border-t-0 md:border-l border-border">
      <Link
        href="/#audit"
        onClick={onNavigate}
        className="group flex flex-1 flex-col justify-between bg-primary text-primary-foreground p-5 transition-colors duration-150 hover:bg-[#262626] dark:hover:bg-[#d4d4d4]"
      >
        <p className="max-w-[18ch] text-[15px] leading-snug tracking-[-0.01em]">
          Probe a host without collateral risk.
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em]">
          Run free audit
          <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>
      <Link
        href="/demo"
        onClick={onNavigate}
        className="group flex flex-1 flex-col justify-between bg-secondary text-foreground border-t border-border p-5 transition-colors duration-150 hover:bg-muted"
      >
        <div>
          <p className="text-[15px] leading-snug tracking-[-0.01em]">Talk through your scope.</p>
          <p className="mt-2 text-sm text-muted-foreground">Demo with attestation walkthrough.</p>
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em]">
          Request demo
          <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </Link>
    </div>
  );
}

function LinkColumn({
  label,
  items,
  footerHref,
  footerLabel,
  onNavigate,
}: {
  label: string;
  items: MegaLink[];
  footerHref: string;
  footerLabel: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="flex flex-col p-3 md:p-4">
      <p className="px-3 pb-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </p>
      <nav className="flex flex-col" aria-label={label}>
        {items.map((item) => (
          <MegaLinkRow key={`${item.href}-${item.label}`} item={item} onNavigate={onNavigate} />
        ))}
      </nav>
      <div className="mt-auto border-t border-border pt-3 px-3">
        <Link
          href={footerHref}
          onClick={onNavigate}
          className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.08em] text-foreground hover:underline underline-offset-4"
        >
          {footerLabel} <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}

export function ProductMegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className={PANEL}>
      <div className={GRID}>
        <LinkColumn
          label="Product"
          items={PRODUCT_MEGA_LINKS}
          footerHref="/#safety"
          footerLabel="See the platform"
          onNavigate={onNavigate}
        />
        <FeaturedCard
          title="Safe-by-default DAST"
          body="Mandatory attestation gates, boundary fences, and canaries that throttle on strain."
          href="/#how-it-works"
          label="How it works"
          onNavigate={onNavigate}
        />
        <CtaStack onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export function CasesMegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className={PANEL}>
      <div className={GRID}>
        <LinkColumn
          label="Case studies"
          items={CASES_MEGA_LINKS}
          footerHref="/case-studies"
          footerLabel="View all cases"
          onNavigate={onNavigate}
        />
        <FeaturedCard
          title="Proof auditors accept"
          body="Signed timestamps, SARIF export, and findings mapped to SOC 2 CC7."
          href="/demo"
          label="Request a sample"
          onNavigate={onNavigate}
        />
        <CtaStack onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export function DocsMegaMenu({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className={PANEL}>
      <div className={GRID}>
        <LinkColumn
          label="Resources"
          items={DOCS_MEGA_LINKS}
          footerHref="/docs"
          footerLabel="Open docs"
          onNavigate={onNavigate}
        />
        <FeaturedCard
          title="Embed reports"
          body="Drop the iframe on any host page. postMessage wires findings into your dash."
          href="/dash/embed"
          label="Embed guide"
          onNavigate={onNavigate}
        />
        <CtaStack onNavigate={onNavigate} />
      </div>
    </div>
  );
}
