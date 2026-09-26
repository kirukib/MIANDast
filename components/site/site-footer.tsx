import Link from "next/link";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { BrandLogo } from "@/components/site/brand-logo";
import { FooterDrawing } from "@/components/site/footer-drawing";
import { Button } from "@/components/ui/button";

const FOOTER_LINKS = [
  { href: "/#safety", label: "Platform" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/privacy", label: "Legal" },
  { href: "/demo", label: "Contact" },
];

/** Footer after Etched (spec §5.16): drawing on a full-bleed baseline, spread links, statement row. */
export function SiteFooter() {
  return (
    <footer className="bg-background text-foreground border-t border-border">
      {/* the drawing rests on a full-bleed 1px baseline */}
      <div className="border-b border-border-strong overflow-hidden ft-footer-band">
        <div className="container-rail pt-16 md:pt-24">
          <FooterDrawing />
        </div>
      </div>

      <div className="container-rail pb-8">
        <div className="pt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <BrandLogo priority="footer" shine />
          <nav aria-label="Footer" className="grid grid-cols-2 gap-y-4 gap-x-6 md:flex md:justify-end md:gap-10">
            {FOOTER_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="font-mono text-[13px] uppercase tracking-[0.08em] hover:underline underline-offset-4 decoration-1 w-fit"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-end">
          <p className="lg:col-span-6 text-statement">
            Test production.
            <br />
            Break nothing.
          </p>
          <address className="lg:col-span-3 not-italic font-mono text-[13px] uppercase tracking-[0.08em] leading-[1.7]">
            MIAN DAST HQ
            <br />
            Cyber Security Tower
            <br />
            Al Maryah Island
            <br />
            Abu Dhabi, UAE
          </address>
          <div className="lg:col-span-3">
            <Button variant="block" size="block" className="group justify-between px-5" asChild>
              <Link href="/#audit">
                Run free audit
                <span aria-hidden className="transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row md:items-center gap-3 justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          <div className="flex flex-col gap-1.5">
            <p className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success" aria-hidden />© 2026 MIAN DAST · 26/26
              engines online
            </p>
            <p className="normal-case tracking-normal text-[11px]">
              Designed by{" "}
              <a
                href="https://www.yaltopiatech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/80 hover:text-foreground underline-offset-2 hover:underline"
              >
                Yaltopia Tech
              </a>
              <span aria-hidden className="mx-1.5 text-border-strong">
                ·
              </span>
              <a
                href="https://www.linkedin.com/company/yaltopiatech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline-offset-2 hover:underline"
              >
                LinkedIn
              </a>
            </p>
          </div>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/sitemap.xml" className="hover:text-foreground">
              Sitemap
            </Link>
            <span aria-hidden>·</span>
            <span>llms.txt</span>
            <span aria-hidden>·</span>
            <a
              href="mailto:security@askmian.com"
              className="hover:text-foreground normal-case tracking-normal"
            >
              security@askmian.com
            </a>
            <span aria-hidden>·</span>
            <ThemeToggle />
          </p>
        </div>
      </div>
    </footer>
  );
}
