import Link from "next/link";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";

const FOOTER_LINKS = [
  { href: "/#safety", label: "Platform" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/privacy", label: "Legal" },
  { href: "mailto:security@askmian.com", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      <div className="container-rail pt-16 pb-8">
        <FooterDrawing />

        <div className="mt-12 flex flex-wrap justify-between gap-4">
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="font-mono text-[13px] uppercase tracking-[0.08em] text-foreground hover:underline underline-offset-4"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <p className="lg:col-span-6 text-statement text-foreground">
            Test production.
            <br />
            Break nothing.
          </p>
          <address className="lg:col-span-3 not-italic font-mono text-[13px] uppercase tracking-[0.08em] leading-relaxed">
            MIAN DAST HQ
            <br />
            Cyber Security Tower
            <br />
            Al Maryah Island, Abu Dhabi, UAE
          </address>
          <div className="lg:col-span-3">
            <Button variant="block" size="block" asChild>
              <Link href="/#audit">Run free audit →</Link>
            </Button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col md:flex-row md:items-center gap-3 justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          <p className="flex items-center gap-2">
            © 2026 MIAN DAST · 26/26 engines online
            <span className="size-1.5 rounded-full bg-success" aria-hidden />
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/sitemap.xml" className="hover:text-foreground">
              Sitemap
            </Link>
            <span>·</span>
            <span>llms.txt</span>
            <span>·</span>
            <a href="mailto:security@askmian.com" className="hover:text-foreground">
              security@askmian.com
            </a>
            <span>·</span>
            <ThemeToggle />
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterDrawing() {
  return (
    <div className="relative">
      <span className="sr-only">
        Line-art scan topology: racks, gateway, database, dashed scope fence, and blocked hosts.
      </span>
      <svg
        viewBox="0 0 900 220"
        className="mx-auto w-[70%] max-w-4xl h-auto text-border-strong"
        aria-hidden
      >
        <rect x="80" y="40" width="40" height="120" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="130" y="40" width="40" height="120" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="180" y="60" width="60" height="80" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="280" y="70" width="100" height="60" fill="none" stroke="currentColor" strokeWidth="1" rx="4" />
        <text x="330" y="105" textAnchor="middle" style={{ fontSize: 10, fontFamily: "var(--font-mono)" }} className="fill-muted-foreground">
          API GW
        </text>
        <ellipse cx="460" cy="100" rx="36" ry="50" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="424" y1="100" x2="496" y2="100" stroke="currentColor" strokeWidth="1" />
        <rect
          x="60"
          y="20"
          width="520"
          height="160"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 4"
          rx="4"
        />
        <path d="M580 100 H700 V60 H780" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M580 100 H700 V140 H780" fill="none" stroke="currentColor" strokeWidth="1" />
        <rect x="780" y="45" width="70" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
        <text x="815" y="64" textAnchor="middle" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }} className="fill-muted-foreground">
          stripe ×
        </text>
        <rect x="780" y="125" width="70" height="30" fill="none" stroke="currentColor" strokeWidth="1" />
        <text x="815" y="144" textAnchor="middle" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }} className="fill-muted-foreground">
          cdn ×
        </text>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={100 + i * 18} cy={180} r="2" className="fill-border-strong" />
        ))}
      </svg>
      <div className="absolute left-0 right-0 bottom-0 h-px bg-border-strong" />
    </div>
  );
}
