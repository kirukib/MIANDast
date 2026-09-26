import { cn } from "@/lib/utils";

export function TwoTone({
  a,
  b,
  as: Tag = "h2",
  className,
}: {
  a: string;
  b: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
}) {
  return (
    <Tag className={cn("two-tone text-balance max-w-[22ch]", className)}>
      {a} <span className="tone-2">{b}</span>
    </Tag>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

export function SectionHeader({
  eyebrow,
  title,
  sub,
  className,
  centered,
}: {
  eyebrow: string;
  title: { a: string; b: string };
  sub?: string;
  className?: string;
  centered?: boolean;
}) {
  return (
    <div className={cn(centered && "text-center mx-auto", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <TwoTone a={title.a} b={title.b} className="text-h2 mt-6" />
      {sub ? (
        <p className="mt-4 text-muted-foreground max-w-[60ch] text-pretty text-[16px] leading-[1.6]">
          {sub}
        </p>
      ) : null}
    </div>
  );
}

/** Mono-square bullet list used beside section headings. */
export function BulletList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3 text-[15px]", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-muted-foreground">
          <span aria-hidden className="mt-[9px] size-1.5 shrink-0 bg-foreground" />
          <span className="text-pretty">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function BracketFrame({
  children,
  className,
  fill,
}: {
  children: React.ReactNode;
  className?: string;
  fill?: boolean;
}) {
  return (
    <div className={cn("bracket p-4 md:p-6", fill && "bg-card", className)}>
      {children}
    </div>
  );
}
