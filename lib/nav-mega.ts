/** Curated links for the primary nav mega menus. */

export type MegaLink = {
  href: string;
  label: string;
  description?: string;
  badge?: string;
};

export const PRODUCT_MEGA_LINKS: MegaLink[] = [
  {
    href: "/#safety",
    label: "Safety model",
    description: "Attestation, fences, adaptive canaries.",
  },
  {
    href: "/#how-it-works",
    label: "How it works",
    description: "Scope → probe → prove → ship.",
  },
  {
    href: "/#audit",
    label: "Instant audit",
    description: "Run a SAMPLE scan on any host.",
    badge: "Try",
  },
  {
    href: "/sandbox",
    label: "Sandbox",
    description: "Throw payloads without touching prod.",
  },
  {
    href: "/dash",
    label: "Control plane",
    description: "Fleet, reports, and embed desk.",
  },
];

export const CASES_MEGA_LINKS: MegaLink[] = [
  {
    href: "/case-studies",
    label: "CloudPay · Fintech",
    description: "BOLA closed on checkout in 48h.",
  },
  {
    href: "/case-studies",
    label: "OmniHealth · Healthtech",
    description: "42 FHIR endpoints, zero downtime.",
  },
  {
    href: "/case-studies",
    label: "CartFlow · SaaS",
    description: "Race caught before launch.",
  },
  {
    href: "/#case-studies",
    label: "All production stories",
    description: "Verified proofs, not slideware.",
  },
];

export const DOCS_MEGA_LINKS: MegaLink[] = [
  { href: "/docs", label: "Documentation", description: "Integrations and API stubs." },
  { href: "/privacy", label: "Privacy", description: "Data handling and retention." },
  { href: "/demo", label: "Request a demo", description: "Talk through your scope." },
  { href: "/pricing", label: "Compare plans", description: "Full feature matrix." },
];
