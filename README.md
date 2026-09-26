# MIAN DAST

UI skeleton for the MIAN DAST marketing site and integration surfaces.

**Design source of truth:** [`docs/ui/ui-spec.md`](docs/ui/ui-spec.md) → [`docs/ui/tokens.css`](docs/ui/tokens.css) → [`docs/ui/references.md`](docs/ui/references.md).

### Stack

- Next.js App Router + TypeScript + Tailwind v4
- Geist Sans / Mono · `next-themes` (light default)
- **Framer Motion** via [`components/motion`](components/motion/index.tsx) (`FadeIn`, `Stagger`, `motion`, `AnimatePresence`)
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
| `/dash` | Reports desk — manage reports from the embed iframe |
| `/dash/embed` | Copy-paste iframe snippet + `postMessage` contract |
| `/dash/reports/[id]` | Report detail + live iframe preview |
| `/embed/report` | Embeddable report form (iframe target) |
| `/checkout`, `/checkout/verify` | Payment skeleton |
| `/sign-in`, `/privacy`, `/about`, `/case-studies`, `/docs` | Marketing shells |

### Reports dash ↔ iframe

1. Open `/dash` to manage reports.
2. Embed `/embed/report` (snippet on `/dash/embed`).
3. Filing a report writes to `localStorage` via [`lib/reports.ts`](lib/reports.ts) and emits `postMessage` / `BroadcastChannel` events (`source: "mian-dast"`).
4. Replace the store helpers with your API when ready.

## Deploy / git

Remote: `https://github.com/kirukib/MIANDast.git`
