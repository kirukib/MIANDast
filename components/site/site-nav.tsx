"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/#safety", label: "Product" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/#case-studies", label: "Cases" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
        <nav
          className={cn(
            "bracket relative flex w-full max-w-[880px] items-center gap-3 px-3 py-2 transition-[background,backdrop-filter] duration-200",
            scrolled
              ? "bg-card/90 backdrop-blur-[8px] border border-border"
              : "bg-card border border-border",
          )}
          aria-label="Primary"
        >
          <Link
            href="/"
            className="flex items-center gap-2 font-mono text-[13px] font-medium uppercase tracking-[0.08em] shrink-0"
          >
            <span className="inline-block size-3.5 bg-foreground" aria-hidden />
            MIAN DAST
          </Link>

          <ul className="hidden md:flex flex-1 items-center justify-center gap-1">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="label-mono text-muted-foreground hover:text-foreground px-2 py-1.5 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/#audit">Run free audit</Link>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden ml-auto label-mono text-muted-foreground"
            onClick={() => setOpen(true)}
            aria-expanded={open}
          >
            Menu
          </button>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-0 z-[60] bg-background flex flex-col p-6 md:hidden">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[13px] uppercase tracking-[0.08em]">MIAN DAST</span>
            <button type="button" className="label-mono" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
          <ul className="mt-10 flex flex-col gap-4">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[28px] font-normal"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-col gap-3">
            <Button variant="secondary" size="lg" asChild>
              <Link href="/sign-in" onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </Button>
            <Button variant="primary" size="lg" asChild>
              <Link href="/#audit" onClick={() => setOpen(false)}>
                Run free audit
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
