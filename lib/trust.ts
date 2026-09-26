/**
 * Trust claims shown on the landing page (spec §5.2, §5.4, task 001 items 3–4).
 * Nothing here renders as a claim until it is backed: a stat footnote needs a `source`,
 * a certification needs `verified: true`. Fill these in once the product owner confirms them.
 */

export type Stat = {
  value: string;
  label: string;
  /** Where the number comes from, e.g. "Platform telemetry, 2026-09-01". Shown in the FAQ. */
  source?: string;
};

export const HERO_STATS: Stat[] = [
  { value: "1.48M+", label: "Probes run" },
  { value: "0", label: "Collateral outages" },
  { value: "26", label: "Detection engines" },
  { value: "<2s", label: "Canary check" },
];

export const SOURCED_STATS = HERO_STATS.filter((s) => s.source);

export type Certification = { label: string; verified: boolean };

// ponytail: all unverified until a certificate or report is on file — flip to true per item
export const CERTIFICATIONS: Certification[] = [
  { label: "SOC 2 Type II", verified: false },
  { label: "ISO/IEC 27001", verified: false },
  { label: "PCI-DSS L1", verified: false },
];

export const VERIFIED_CERTIFICATIONS = CERTIFICATIONS.filter((c) => c.verified);

/** Frameworks findings are mapped to. Not certifications, and never labelled as such. */
export const FRAMEWORKS = ["OWASP Top 10", "OWASP API Top 10", "SOC 2 CC7.1 / 7.2", "PCI-DSS 11.3"];

export const INTEGRATIONS = [
  "GitHub Actions",
  "GitLab CI",
  "Bitbucket",
  "Jira",
  "Slack",
  "Cloudflare",
  "AWS",
  "GCP",
];
