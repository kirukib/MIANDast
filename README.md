# MIAN DAST

UI skeleton for the MIAN DAST marketing site and integration surfaces.

**Design source of truth:** [`docs/ui/ui-spec.md`](docs/ui/ui-spec.md) → [`docs/ui/tokens.css`](docs/ui/tokens.css) → [`docs/ui/references.md`](docs/ui/references.md).

## Stack

- Next.js App Router + TypeScript + Tailwind v4
- Geist Sans / Mono · `next-themes` (light default)
- Instrument-grade monochrome (no brand accent)

## Run

```bash
npm install
npm run dev
```

## Integration stubs

Replace bodies in [`lib/integrations.ts`](lib/integrations.ts):

| Function | Used by |
|---|---|
| `runQuickAudit` | Landing `#audit` |
| `requestDemo` | Final CTA form |
| `startCheckout` | Pricing CTAs → `/checkout` |
| `signIn` | `/sign-in` |
| `runSandboxScan` | `/sandbox` |

## Routes

| Path | Notes |
|---|---|
| `/` | Full landing (§5) |
| `/pricing` | Cards + compare table |
| `/sandbox` | Forced-dark 26-engine console shell |
| `/checkout`, `/checkout/verify` | Payment skeleton |
| `/sign-in`, `/privacy`, `/about`, `/case-studies`, `/docs` | Marketing shells |

## Deploy / git

Remote: `https://github.com/kirukib/MIANDast.git`
