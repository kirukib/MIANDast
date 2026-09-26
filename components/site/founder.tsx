import { Eyebrow, TwoTone } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Founder() {
  return (
    <section id="team" className="section container-rail">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-5 bg-card border border-border p-6 md:p-8 flex flex-col">
          <Eyebrow>Founder</Eyebrow>
          <TwoTone
            a="Built to test production"
            b="without collateral damage."
            className="text-h2 mt-6"
          />
          <p className="mt-4 text-sm text-muted-foreground max-w-[50ch]">
            Dave Mian designs MIAN DAST around attestation gates, boundary fences, and adaptive
            canaries — so security teams can scan live systems without gambling uptime.
          </p>
          <Button variant="secondary" size="sm" className="mt-6 w-fit" asChild>
            <Link href="/about">About MIAN →</Link>
          </Button>
        </div>
        <div className="lg:col-span-7 relative min-h-[280px]">
          <div
            className="absolute inset-0 bg-secondary border border-border grayscale contrast-[1.05]"
            aria-hidden
          >
            <div className="h-full w-full flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
              Founder portrait · grayscale placeholder
            </div>
          </div>
          <div className="bracket absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm bg-card p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em]">
              Dave Mian · Founder & principal security architect
            </p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground uppercase tracking-[0.08em]">
              Abu Dhabi, UAE
            </p>
            <p className="mt-3 text-[20px] leading-snug tracking-[-0.01em]">
              “If a scanner can take production down, it does not belong in production.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
