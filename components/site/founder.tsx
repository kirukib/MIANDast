import Link from "next/link";
import { Eyebrow, TwoTone } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";

export function Founder() {
  return (
    <section id="team" className="section container-rail">
      <div data-reveal-stagger className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 bg-card border border-border p-6 md:p-10 flex flex-col">
          <Eyebrow>Founder</Eyebrow>
          <TwoTone a="Built to test production" b="without collateral damage." className="text-h2 mt-6" />
          <p className="mt-5 mb-10 text-muted-foreground max-w-[40ch] text-pretty">
            Dave Mian built MIAN DAST so teams can scan live systems without risking uptime.
          </p>
          <Button variant="secondary" size="sm" className="mt-auto w-fit" asChild>
            <Link href="/about">About MIAN →</Link>
          </Button>
        </div>

        <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-0 pb-24 sm:pb-0">
          <PortraitSlot />
          <figure className="bracket absolute bottom-0 sm:bottom-8 left-0 sm:left-8 right-0 sm:right-auto sm:max-w-[380px] bg-card border border-border p-5 md:p-6">
            <blockquote className="text-[20px] leading-[1.35] tracking-[-0.01em] text-pretty">
              “If a scanner can take production down, it does not belong in production.”
            </blockquote>
            <figcaption className="mt-5 pt-4 border-t border-border flex items-center gap-3">
              <span aria-hidden className="size-8 bg-secondary border border-border grid place-items-center font-mono text-[11px]">
                DM
              </span>
              <span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em]">Dave Mian</span>
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
                  Founder · MIAN DAST
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/** Grayscale portrait goes here (spec §1: 0 radius, grayscale). Until then: a quiet framed slot. */
function PortraitSlot() {
  return (
    <div aria-hidden className="absolute inset-0 dot-grid border border-border grayscale contrast-[1.05] overflow-hidden">
      <span className="absolute top-4 right-4 bg-card border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
        Portrait · pending
      </span>
    </div>
  );
}
