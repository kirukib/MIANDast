const INTEGRATIONS = [
  "GitHub Actions",
  "GitLab CI",
  "Bitbucket",
  "Jira",
  "Slack",
  "Cloudflare",
  "AWS",
  "GCP",
];

export function LogosCompliance() {
  return (
    <section className="section container-rail">
      <p className="eyebrow mb-8">Integrates with</p>
      <div className="relative overflow-hidden mask-[linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-10 animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] w-max motion-reduce:animate-none">
          {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-mono text-[13px] uppercase tracking-[0.08em] text-foreground/40 hover:text-foreground transition-colors whitespace-nowrap h-6 flex items-center"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-10 font-mono text-[12px] uppercase tracking-[0.08em] text-muted-foreground">
        SOC 2 Type II · ISO/IEC 27001 · PCI-DSS L1 · OWASP Top 10
      </p>
    </section>
  );
}
