/**
 * Integration stubs — replace bodies when wiring real APIs.
 * UI already calls these; toasts / sample states handle the empty path.
 */

export type AuditResult = {
  grade: string;
  score: number;
  checks: { name: string; value: string; pass: boolean }[];
};

export type DemoRequest = {
  email: string;
  name: string;
  company: string;
  teamSize: string;
  country: string;
  message: string;
};

// ponytail: stubs until real API wiring — swap for fetch/SDK calls
export async function runQuickAudit(host: string): Promise<AuditResult> {
  await delay(1800);
  if (!host.trim()) throw new Error("Enter a target domain.");
  const clean = host.replace(/^https?:\/\//, "").split("/")[0];
  return {
    grade: "A",
    score: 92,
    checks: [
      { name: "TLS", value: "1.3 · ECDHE", pass: true },
      { name: "HSTS", value: "max-age=31536000", pass: true },
      { name: "CSP", value: "missing", pass: false },
      { name: "CORS", value: "same-origin", pass: true },
      { name: "Cookies", value: "Secure; HttpOnly", pass: true },
    ].map((c) => ({ ...c, name: `${clean} · ${c.name}` })),
  };
}

export async function requestDemo(
  _payload: DemoRequest,
): Promise<{ reference: string }> {
  await delay(900);
  return { reference: `DEMO-${Date.now().toString(36).toUpperCase()}` };
}

export async function startCheckout(planId: string): Promise<{ url: string }> {
  await delay(400);
  return { url: `/checkout?plan=${encodeURIComponent(planId)}` };
}

export async function signIn(_email: string): Promise<{ ok: boolean }> {
  await delay(600);
  return { ok: true };
}

export async function runSandboxScan(_payload: {
  target: string;
  attested: boolean;
}): Promise<{ lines: string[] }> {
  await delay(1200);
  return {
    lines: [
      "› attestation gate verified",
      "› boundary fence applied",
      "› engine pack 26/26 armed",
      "› canary p95 84ms · HEALTHY",
      "› SAMPLE scan complete — wire runSandboxScan()",
    ],
  };
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
