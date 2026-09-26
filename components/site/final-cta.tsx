import Link from "next/link";
import { TwoTone } from "@/components/site/primitives";
import { Button } from "@/components/ui/button";

/** Final CTA band (spec §5.15, Inspo cta/inverted): ink ground, one action only. */
export function FinalCta() {
  return (
    <section className="band-invert bg-background text-foreground section">
      <div data-reveal className="container-rail flex flex-col items-center text-center">
        <TwoTone
          a="Run your first safe scan"
          b="before your next deploy."
          className="text-display mx-auto max-w-[20ch]"
        />
        <Button variant="primary" size="lg" className="mt-10 px-8" asChild>
          <Link href="/#audit">Run free audit</Link>
        </Button>
      </div>
    </section>
  );
}
