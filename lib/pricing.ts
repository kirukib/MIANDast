export type Currency = "USD" | "EUR" | "GBP" | "ETB";
export type Billing = "monthly" | "annual";

export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    segment: "Exposure defense",
    description: "Automated DAST for a single app and continuous perimeter checks.",
    features: [
      "26-engine DAST pack",
      "1–3 domains",
      "Telegram & webhook alerts",
      "Attested PDF reports",
      "Safe-by-default only",
    ],
    prices: {
      USD: { monthly: 19, annual: 15 },
      EUR: { monthly: 18, annual: 14 },
      GBP: { monthly: 15, annual: 12 },
      ETB: { monthly: 1199, annual: 999 },
    },
  },
  {
    id: "developer",
    name: "Developer",
    segment: "CI/CD ready",
    description: "Authenticated scans, API contracts, and headless CI hooks.",
    features: [
      "Everything in Starter",
      "Authenticated scanning",
      "GitHub Actions / GitLab",
      "OpenAPI import",
      "SARIF export",
    ],
    prices: {
      USD: { monthly: 99, annual: 79 },
      EUR: { monthly: 92, annual: 74 },
      GBP: { monthly: 79, annual: 63 },
      ETB: { monthly: 5999, annual: 4799 },
    },
  },
  {
    id: "growth",
    name: "Growth",
    segment: "Fleet multi-scan",
    description: "Recommended for teams shipping daily across a SaaS surface.",
    featured: true,
    features: [
      "Everything in Developer",
      "4–15 domains",
      "Fleet multi-scan",
      "Jira / Linear sync",
      "14-day free trial",
    ],
    prices: {
      USD: { monthly: 299, annual: 239 },
      EUR: { monthly: 275, annual: 220 },
      GBP: { monthly: 235, annual: 188 },
      ETB: { monthly: 17999, annual: 14399 },
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    segment: "MSP & compliance",
    description: "High-throughput scanning, seats, and auditor portals.",
    features: [
      "Everything in Growth",
      "16+ domains / MSP",
      "RBAC seats",
      "White-label reports",
      "Dedicated canary SLA",
    ],
    prices: {
      USD: { monthly: 899, annual: 719 },
      EUR: { monthly: 825, annual: 660 },
      GBP: { monthly: 705, annual: 564 },
      ETB: { monthly: 54999, annual: 43999 },
    },
  },
] as const;

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  ETB: "Br ",
};

export function formatPrice(currency: Currency, value: number) {
  const sym = CURRENCY_SYMBOL[currency];
  return `${sym}${value.toLocaleString()}`;
}
