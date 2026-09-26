import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Eyebrow, TwoTone } from "@/components/site/primitives";

export function MarketingShell({
  children,
  eyebrow,
  title,
  sub,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: { a: string; b: string };
  sub?: string;
}) {
  return (
    <>
      <SiteNav />
      <main id="main" className="pt-28">
        <header className="container-rail section !border-t-0 !pt-8">
          <Eyebrow>{eyebrow}</Eyebrow>
          <TwoTone as="h1" a={title.a} b={title.b} className="text-display mt-6" />
          {sub ? (
            <p className="mt-4 text-muted-foreground max-w-[60ch] text-pretty">{sub}</p>
          ) : null}
        </header>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
