# Task 001: Apply the Inspo review updates to the UI spec

- **Status:** implemented on branch `ui/section-polish` (2026-09-26), except the two product-owner blockers
- **Created:** 2026-09-26
- **Owner:** implementing agent (Next.js + Tailwind v4 + shadcn)
- **Source:** Inspo MCP review pass. See [`../references.md`](../references.md) → "Review pass (2026-09-26)"
- **Spec:** [`../ui-spec.md`](../ui-spec.md) is already updated. This task implements those changes and
  closes the open questions.

## Why
The spec was re-checked against Inspo (`recommend` + `search_screens`, then `anytype-io`, `nextjs-org`,
`ui-shadcn-com`, `primer-style`, plus the reference-component index). Every Inspo `type/id` the spec cites
exists. The review found:
- one archetype misused (`cta/form-led` used for a six-field form);
- one CTA band with two competing asks;
- a hero illustration spec that would render too faint on light paper;
- trust claims (stats, certifications) with no source attached;
- one section that did not need to stand alone.

## Changes (implement all)

### 1. Hero illustration stroke weight (§1, §5.2)
- [x] The hero "scope fence" SVG and in-section visuals use **1.5px `--foreground`** primary strokes and **1px
      `--muted-foreground`** detail strokes. `--border-strong` is no longer used for hero strokes.
- [x] The footer drawing is unchanged: 1px `--border-strong`/`--border` (Etched).
- *Ref:* `anytype-io`: ink line art holds a light hero; grey-on-paper washes out.

### 2. Hero frame and stat cells (§5.2)
- [x] Wrap the hero in a full-container 1px hairline box joined to the rails.
- [x] Render `StatStrip` as the box's **bottom row of cells with shared borders**, not a floating row.
- [x] Recheck that the hero is still complete above the fold at 1280×800 and 390×844.

### 3. Sourced stats (§5.2, §5.14, §7)
- [x] Add a mono superscript marker (`¹`–`⁴`) to each hero stat, linking to `/#methodology`.
- [x] Add FAQ item 07, "Where do these numbers come from?" (`id="methodology"`), giving the source and as-of
      date for each figure.
- [ ] **Blocker, needs the product owner:** confirm the sources for `1.48M+ probes run`, `0 collateral
      outages`, `26 detection engines`, and `<2s canary check`. Remove any figure without a source.

### 4. Compliance row: verified only (§5.4)
- [x] Drive the row from a config array.
- [ ] **Blocker, needs the product owner:** confirm which of SOC 2 Type II, ISO/IEC 27001, and PCI-DSS L1 are
      certifications MIAN DAST actually holds.
- [x] Frameworks that findings only map to are shown as `MAPS TO · OWASP TOP 10 · …`, never as
      certifications.

### 5. Console preview: no faux chrome (§5.3)
- [x] No traffic-light dots, fake URL bar, or fake browser tabs; the bracket frame is the chrome.
- [x] Show a mono `SAMPLE DATA` tag top-right while the preview is a mock.

### 6. Merge "Legacy vs MIAN" into the safety model (§5.5, §5.8)
- [x] Remove §5.8 as a standalone section.
- [x] Render `SplitCompare` as a "before / with" strip directly under the §5.5 bento, using the same copy,
      badges, and mobile stacking.
- [x] Keep it categorical ("traditional scanners"), with no competitor names (`features/compare`).

### 7. Final CTA band: one action (§5.15)
- [x] The §5.15 ink band contains only the two-tone H2 and **one** `RUN FREE AUDIT` button.
- [x] Remove `DemoForm` from the landing page.

### 8. New `/demo` route (§5.15, §6.1)
- [x] Build `/demo` on the marketing template: a copy column on the left (two-tone H1 "See a safe scan / on
      your own stack.", three bullets) and a bracketed `DemoForm` on the right, then the footer.
- [x] Use the `DemoForm` spec as before: six fields, mono labels, success collapse with a reference number,
      and mono error captions.
- [x] Link to `/demo` from the Enterprise pricing CTA `TALK TO SALES →`, the footer `CONTACT` link, and
      `/pricing`.
- [x] Pricing CTAs: `START 14-DAY TRIAL` on Starter, Developer, and Growth; `TALK TO SALES →` on Enterprise.

## Resulting landing order
Nav · Hero (with stat cells) · **INK** console preview · Logos + compliance · Safety model (+ before/with) ·
Audit tool · **INK** how it works · Coverage · Developer first · Audit reports · Case studies · Founder ·
(Proof wall, if real quotes exist) · Pricing · FAQ · **INK** final CTA · Footer.
That is 16 sections, 17 with the conditional proof wall. There are three ink bands, none adjacent.

## Acceptance
All items in `ui-spec.md` §11, including the four new checks:
- [x] The §5.15 band has exactly one button, and `DemoForm` renders only on `/demo`.
- [x] Every hero stat footnote resolves to `#methodology`, and the compliance row lists only verified
      certifications.
- [x] The console preview has no faux chrome and shows a `SAMPLE DATA` tag.
- [x] Hero strokes use `--foreground`/`--muted-foreground`.

## Deliberately not changed
- **Footer link row and colophon.** Inspo's `footer/statement` says "no link map, no copyright noise", but the
  user explicitly asked for the Etched footer, which has both. The project wins.
- **No accent colour.** It is still held; ask the user before adding one.
- **Four pricing tiers with an ink featured card.** `pricing/three-card` suggests a thin rule, but the ink
  card is within the monochrome system and makes the recommended tier clear.

## Implementation notes (2026-09-26)
- Trust claims live in `lib/trust.ts`. Stat footnotes and the `#methodology` FAQ entry render only once a stat
  has a `source`. The `CERTIFIED` row renders only for certifications with `verified: true`. Until the product
  owner confirms them, the page shows no footnotes and no certifications, only `FINDINGS MAP TO`.
- The footer drawing uses `--foreground` at 30% for primary strokes and 15% for detail strokes; flat
  `--border-strong` was too faint to read on paper.
