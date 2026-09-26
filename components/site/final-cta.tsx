import Link from "next/link";
import { TwoTone } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";

const GATES = ["Attested", "Fenced", "Canary-guarded"];

/** Final CTA band (spec §5.15, Inspo cta/inverted): ink ground, one action only. */
export function FinalCta() {
  return (
    <section className="band-invert bg-background text-foreground section">
      <div className="container-rail flex flex-col items-center text-center">
        <p className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          {GATES.map((g) => (
            <span key={g} className="flex items-center gap-2">
              <span aria-hidden className="size-1.5 bg-foreground" /> {g}
            </span>
          ))}
        </p>
        <TwoTone
          a="Run your first safe scan"
          b="before your next deploy."
          className="text-display mt-8 mx-auto max-w-[20ch]"
        />
        <Button variant="primary" size="lg" className="mt-10 px-8" asChild>
          <Link href="/#audit">Run free audit</Link>
        </Button>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
          100% passive · no sign-up · about ten seconds
        </p>
      </div>
    </section>
  );
}
