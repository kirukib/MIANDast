import type { Metadata } from "next";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { BulletList, Eyebrow, TwoTone } from "@/components/site/primitives";
import { DemoForm } from "@/components/site/demo-form";

export const metadata: Metadata = {
  title: "Request a demo · MIAN DAST",
  description: "See a safe-by-default DAST scan run against your own stack.",
};

export default function DemoPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28">
        <section className="container-rail section !border-t-0 !pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6">
            <div className="lg:col-span-5 lg:pr-10">
              <Eyebrow>Request a demo</Eyebrow>
              <TwoTone as="h1" a="See a safe scan" b="on your own stack." className="text-display mt-6" />
              <p className="mt-5 text-[18px] leading-[1.55] text-muted-foreground max-w-[44ch] text-pretty">
                Thirty minutes with an engineer. We sign a scope with you, run the safe engine pack
                against a target you choose, and walk through the evidence.
              </p>
              <BulletList
                className="mt-8"
                items={[
                  "Scoped and attested before anything runs",
                  "Third-party hosts fenced off by default",
                  "Keep the sample report afterwards",
                ]}
              />
            </div>
            <div className="lg:col-span-7">
              <DemoForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
