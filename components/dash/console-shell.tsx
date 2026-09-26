"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { BrandLogo } from "@/components/site/brand-logo";
import { cn } from "@/lib/utils";

const NAV = [
  {
    group: "Overview",
    items: [
      {
        href: "/dash",
        label: "Dashboard",
        match: (p: string) => p === "/dash" || p === "/dash/",
      },
    ],
  },
  {
    group: "Fleet",
    items: [
      {
        href: "/dash/scans",
        label: "Scans",
        match: (p: string) => p.startsWith("/dash/scans"),
      },
      {
        href: "/dash/targets",
        label: "Targets",
        match: (p: string) => p.startsWith("/dash/targets"),
      },
      {
        href: "/sandbox",
        label: "Sandbox",
        match: (p: string) => p.startsWith("/sandbox"),
      },
    ],
  },
  {
    group: "Governance",
    items: [
      {
        href: "/dash/reports",
        label: "Reports",
        match: (p: string) => p === "/dash/reports" || p.startsWith("/dash/reports/"),
      },
      {
        href: "/dash/attestations",
        label: "Attestations",
        match: (p: string) => p.startsWith("/dash/attestations"),
      },
      {
        href: "/dash/embed",
        label: "Embed",
        match: (p: string) => p.startsWith("/dash/embed"),
      },
    ],
  },
  {
    group: "Admin",
    items: [
      {
        href: "/dash/team",
        label: "Team",
        match: (p: string) => p.startsWith("/dash/team"),
      },
      {
        href: "/dash/billing",
        label: "Billing",
        match: (p: string) => p.startsWith("/dash/billing"),
      },
      {
        href: "/dash/settings",
        label: "Settings",
        match: (p: string) => p.startsWith("/dash/settings"),
      },
    ],
  },
];

export function ConsoleShell({
  crumb,
  pathname,
  children,
  actions,
}: {
  crumb: string;
  pathname: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="dark min-h-svh bg-code text-code-foreground flex">
      <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r border-code-border p-4">
        <BrandLogo href="/" className="!h-6 mb-2" />
        <nav className="flex-1 overflow-y-auto pb-4" aria-label="Admin">
          {NAV.map((g) => (
            <div key={g.group} className="mt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#a1a1a1]">
                {g.group}
              </p>
              <ul className="mt-2 space-y-0.5">
                {g.items.map((item) => {
                  const active = item.match(pathname);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block pl-2 py-1.5 text-sm",
                          active
                            ? "bg-[#1a1a1a] border-l-2 border-[#ededed]"
                            : "text-[#a1a1a1] hover:text-code-foreground border-l-2 border-transparent",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-code-border flex items-center gap-3 px-4">
          <span className="text-sm text-[#a1a1a1] truncate">{crumb}</span>
          <span className="eyebrow !border-[#2e2e2e] !text-[#a1a1a1] ml-auto hidden sm:inline-flex">
            ● Control plane
          </span>
          {actions}
          <ThemeToggle className="!text-[#a1a1a1]" />
          <Link href="/" className="label-mono text-[#a1a1a1] hover:text-code-foreground">
            Exit
          </Link>
        </header>
        <div className="p-4 md:p-6 overflow-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
