import type { ComponentType } from "react";
import { Eyebrow } from "@/components/site/primitives";
import { FRAMEWORKS, INTEGRATIONS, VERIFIED_CERTIFICATIONS } from "@/lib/trust";
import {
  IconAws,
  IconBitbucket,
  IconCloudflare,
  IconGcp,
  IconGitHub,
  IconGitLab,
  IconJira,
  IconSlack,
} from "@/components/site/integration-icons";

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  "GitHub Actions": IconGitHub,
  "GitLab CI": IconGitLab,
  Bitbucket: IconBitbucket,
  Jira: IconJira,
  Slack: IconSlack,
  Cloudflare: IconCloudflare,
  AWS: IconAws,
  GCP: IconGcp,
};

export function LogosCompliance() {
  const row = [...INTEGRATIONS, ...INTEGRATIONS];

  return (
    <section aria-label="Integrations and compliance" className="section container-rail">
      <div data-reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
        <div className="lg:col-span-3">
          <Eyebrow>Integrates with</Eyebrow>
        </div>

        <div className="lg:col-span-9 border-y border-border">
          <div className="relative overflow-hidden mask-[linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <ul className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:animate-none">
              {row.map((name, i) => {
                const Icon = ICONS[name];
                return (
                  <li
                    key={`${name}-${i}`}
                    aria-hidden={i >= INTEGRATIONS.length || undefined}
                    className="group flex items-center gap-3 h-16 px-8 border-r border-border font-mono text-[13px] uppercase tracking-[0.08em] text-foreground/45 hover:text-foreground transition-colors whitespace-nowrap"
                  >
                    {Icon ? (
                      <Icon className="size-5 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <span aria-hidden className="size-1.5 bg-current" />
                    )}
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <dl data-reveal className="mt-12 hairline-grid grid-cols-1 md:grid-cols-[180px_1fr] font-mono text-[12px] uppercase tracking-[0.08em]">
        {VERIFIED_CERTIFICATIONS.length > 0 ? (
          <>
            <dt className="px-4 py-3 text-muted-foreground">Certified</dt>
            <dd className="px-4 py-3">{VERIFIED_CERTIFICATIONS.map((c) => c.label).join(" · ")}</dd>
          </>
        ) : null}
        <dt className="px-4 py-3 text-muted-foreground">Findings map to</dt>
        <dd className="px-4 py-3 flex flex-wrap gap-x-3 gap-y-1">
          {FRAMEWORKS.map((f, i) => (
            <span key={f} className="whitespace-nowrap">
              {i > 0 ? <span aria-hidden className="text-muted-foreground mr-3">·</span> : null}
              {f}
            </span>
          ))}
        </dd>
      </dl>
    </section>
  );
}
