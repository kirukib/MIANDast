"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/site/brand-logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import {
  CasesMegaMenu,
  DocsMegaMenu,
  MEGA_MENU_WRAPPER,
  ProductMegaMenu,
} from "@/components/site/nav-mega-menus";
import { CASES_MEGA_LINKS, DOCS_MEGA_LINKS, PRODUCT_MEGA_LINKS } from "@/lib/nav-mega";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, transitions } from "@/components/motion";

type MegaKey = "product" | "cases" | "docs";

const DROPDOWN_CLOSE_DELAY_MS = 280;

const PLAIN_LINKS = [{ href: "/#pricing", label: "Pricing" }] as const;

const MEGA_TRIGGERS: { key: MegaKey; label: string; href: string }[] = [
  { key: "product", label: "Product", href: "/#safety" },
  { key: "cases", label: "Cases", href: "/#case-studies" },
  { key: "docs", label: "Docs", href: "/docs" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<MegaKey | null>(null);
  const [mobileMega, setMobileMega] = useState<MegaKey | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) setMobileMega(null);
  }, [open]);

  function clearCloseTimeout() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }

  function scheduleClose(key: MegaKey) {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown((prev) => (prev === key ? null : prev));
      closeTimeoutRef.current = null;
    }, DROPDOWN_CLOSE_DELAY_MS);
  }

  function openMega(key: MegaKey) {
    clearCloseTimeout();
    setOpenDropdown(key);
  }

  function closeMega() {
    clearCloseTimeout();
    setOpenDropdown(null);
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
        <motion.nav
          className={cn(
            "bracket relative flex w-full max-w-[960px] items-center gap-3 px-3 py-2",
            scrolled
              ? "bg-card/90 backdrop-blur-[8px] border border-border"
              : "bg-card border border-border",
          )}
          aria-label="Primary"
          transition={transitions.base}
          onMouseLeave={() => {
            if (openDropdown) scheduleClose(openDropdown);
          }}
        >
          <BrandLogo shine />

          <ul className="hidden md:flex flex-1 items-center justify-center gap-0.5">
            {MEGA_TRIGGERS.map((item) => {
              const active = openDropdown === item.key;
              return (
                <li
                  key={item.key}
                  className="relative"
                  onMouseEnter={() => openMega(item.key)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "label-mono inline-flex items-center gap-1 px-2 py-1.5 transition-colors",
                      active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                    aria-expanded={active}
                    aria-haspopup="menu"
                    onFocus={() => openMega(item.key)}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "text-[9px] transition-transform duration-150",
                        active && "rotate-180",
                      )}
                    >
                      ▾
                    </span>
                  </Link>
                </li>
              );
            })}
            {PLAIN_LINKS.map((l) => (
              <li key={l.href} onMouseEnter={closeMega}>
                <Link
                  href={l.href}
                  className="label-mono text-muted-foreground hover:text-foreground px-2 py-1.5 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {(openDropdown === "product" ||
            openDropdown === "cases" ||
            openDropdown === "docs") && (
            <div
              className={MEGA_MENU_WRAPPER}
              onMouseEnter={clearCloseTimeout}
              role="menu"
            >
              {openDropdown === "product" ? <ProductMegaMenu onNavigate={closeMega} /> : null}
              {openDropdown === "cases" ? <CasesMegaMenu onNavigate={closeMega} /> : null}
              {openDropdown === "docs" ? <DocsMegaMenu onNavigate={closeMega} /> : null}
            </div>
          )}

          <div className="ml-auto hidden md:flex items-center gap-2" onMouseEnter={closeMega}>
            <ThemeToggle />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dash">Sign in</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/#audit">Run free audit</Link>
            </Button>
          </div>

          <div className="md:hidden ml-auto flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="label-mono text-muted-foreground"
              onClick={() => setOpen(true)}
              aria-expanded={open}
            >
              Menu
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] bg-background flex flex-col p-6 md:hidden overflow-y-auto"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={transitions.base}
          >
            <div className="flex justify-between items-center gap-3">
              <BrandLogo href="/" shine />
              <button type="button" className="label-mono" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            <ul className="mt-10 flex flex-col gap-1">
              {MEGA_TRIGGERS.map((item, i) => {
                const links =
                  item.key === "product"
                    ? PRODUCT_MEGA_LINKS
                    : item.key === "cases"
                      ? CASES_MEGA_LINKS
                      : DOCS_MEGA_LINKS;
                const expanded = mobileMega === item.key;
                return (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...transitions.reveal, delay: i * 0.04 }}
                  >
                    <button
                      type="button"
                      className="flex w-full items-baseline justify-between gap-3 py-2 text-left text-[28px] font-normal"
                      aria-expanded={expanded}
                      onClick={() => setMobileMega(expanded ? null : item.key)}
                    >
                      {item.label}
                      <span aria-hidden className="label-mono text-muted-foreground">
                        {expanded ? "—" : "+"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {expanded ? (
                        <motion.ul
                          className="mb-4 border border-border divide-y divide-border"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={transitions.base}
                        >
                          {links.map((l) => (
                            <li key={`${l.href}-${l.label}`}>
                              <Link
                                href={l.href}
                                className="block px-3 py-3"
                                onClick={() => setOpen(false)}
                              >
                                <span className="font-mono text-[12px] uppercase tracking-[0.08em]">
                                  {l.label}
                                </span>
                                {l.description ? (
                                  <span className="mt-1 block text-sm text-muted-foreground">
                                    {l.description}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
              {PLAIN_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...transitions.reveal, delay: (MEGA_TRIGGERS.length + i) * 0.04 }}
                >
                  <Link
                    href={l.href}
                    className="block py-2 text-[28px] font-normal"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <div className="flex justify-between items-center border border-border px-3 py-3">
                <span className="label-mono text-muted-foreground">Appearance</span>
                <ThemeToggle />
              </div>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/dash" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button variant="primary" size="lg" asChild>
                <Link href="/#audit" onClick={() => setOpen(false)}>
                  Run free audit
                </Link>
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
