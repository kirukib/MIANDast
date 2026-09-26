# MIAN DAST — UI spec

> **Audience:** the agent/engineer implementing the site (Next.js App Router + Tailwind v4 + shadcn/ui).
> **Scope:** aesthetics, tokens, components, landing IA, and page templates. Data, auth, payments, and
> scanning logic are out of scope.
> **Files:** [`tokens.css`](./tokens.css) (paste into `app/globals.css`) ·
> [`references.md`](./references.md) (what each reference contributes) · [`inspo/`](./inspo/) (Inspo
> DESIGN.md extracts) · [`tasks/`](./tasks/) (open change tasks, starting with
> [`001-inspo-review-updates.md`](./tasks/001-inspo-review-updates.md)).
> **Precedence:** this spec, then `tokens.css`, then the references. If something is ambiguous, pick the
> quieter option.

---

## 0. Direction in one paragraph
**Instrument-grade monochrome.** MIAN DAST sells *restraint*: it tests production without breaking it, so the
UI should look like a precision instrument, not a hacker movie.
- Near-white paper and black ink, with grey for the second half of every headline.
- 1px hairlines and vertical rails, corner-bracket frames, and mono uppercase labels.
- Line-art technical drawings instead of 3D renders or glows.
- The page alternates light sections with a few **inverted ink bands**, and everything is built from the same
  tokens so the dark theme is a straight flip.
- No brand accent colour. Colour exists only to report status (critical/high/medium/low, success, error).

**Never:** neon glows, gradients on UI, pill buttons, emoji, 3D shields, hooded hackers, matrix rain, stock
"cyber" blue.

---

## 1. Visual language

| Element | Spec |
|---|---|
| **Paper / ink** | Page `--background`, raised `--card`, text `--foreground`. Light-first. |
| **Two-tone headline** | First clause `--foreground`, second clause `--subtle`, same weight and size. Markup: `<h2 class="two-tone">Test production <span class="tone-2">without breaking it.</span></h2>`. Every H1/H2 on marketing pages uses it. |
| **Rails** | The container has 1px `border-inline` (`.container-rail`) running the full page height; each section starts with a 1px top hairline (`.section`). Rails pass *behind* bands (the band background is full-bleed, the rails continue in `--border` of the band). Hidden below `md`. |
| **Corner brackets** | 8px L-ticks at the four corners in `--border-strong` (`.bracket`, drawn on a `::before` overlay so it works alongside the element's own background or `--glow`). Used on the nav bar, hero visual, console preview frame, audit tool, quote card, and step dial. **Not** on ordinary cards (hairline border only). At most 3 bracketed things per viewport. |
| **Eyebrow chip** | `.eyebrow`: 1px border, 4×8px padding, 6px filled square, Geist Mono 11px uppercase with 0.08em tracking, `--muted-foreground`. One per section, above the heading. |
| **Geometry** | Controls: `--radius` = 2px. Cards: 4px. Images: 0. No pills anywhere (except the 6px status dot, which is round). |
| **Shadows** | None on cards. Buttons get one 1px "press" shadow on hover (`0 1px 0 var(--border-strong)`). Popovers: `0 8px 24px rgb(0 0 0 / .08)` light, `/.4` dark. |
| **Illustration** | Line-art SVG only, no fills except tiny 4–6px squares for "nodes/probes". Every illustration draws a real concept (scope fence, probes, canary, topology), never decoration. Two stroke weights by role: **hero and in-section visuals** use 1.5px `--foreground` primary strokes with 1px `--muted-foreground` detail, so the drawing carries the fold (Inspo `anytype-io`: ink line art holds a light hero; grey-on-paper washes out). **Only the footer drawing** stays in quiet 1px `--border-strong`/`--border` (Etched). |
| **Photography** | Only the founder portrait (and customer logos). Grayscale (`filter: grayscale(1) contrast(1.05)`), 0 radius. |
| **Glow** | One soft radial *white* light (`--glow`) behind the hero visual and the console-preview screenshot. That's the only gradient on the site. |

---

## 2. Tokens
All values live in [`tokens.css`](./tokens.css) and are mapped onto shadcn names, so shadcn components
inherit the theme without edits. Summary:

| Role | Light | Dark | Notes |
|---|---|---|---|
| `--background` | `#FAFAFA` | `#0A0A0A` | page |
| `--card` | `#FFFFFF` | `#111111` | raised surface |
| `--secondary` / `--muted` | `#F0F0F0` | `#1A1A1A` | secondary button, tiles |
| `--foreground` | `#0A0A0A` | `#EDEDED` | ink |
| `--muted-foreground` | `#666666` | `#A1A1A1` | body-secondary (≥ 4.5:1 on every surface) |
| `--subtle` | `#858585` | `#6E6E6E` | **display text ≥ 24px only** (≥ 3.2:1) |
| `--border` / `--border-strong` | `#E6E6E6` / `#D4D4D4` | `#1F1F1F` / `#2E2E2E` | hairlines / brackets, inputs |
| `--primary` / `-foreground` | `#0A0A0A` / `#FFF` | `#EDEDED` / `#0A0A0A` | primary button = ink |
| `--ring` | ink | ink | 2px focus ring, 2px offset |
| `--sev-critical` | `#DC2626` | `#EF4444` | status only |
| `--sev-high` | `#C2410C` | `#F97316` | status only |
| `--sev-medium` | `#A16207` | `#EAB308` | status only |
| `--sev-low` | `#666666` | `#A1A1A1` | neutral on purpose |
| `--success` | `#15803D` | `#22C55E` | status dots/badges only |
| `--code` | `#0A0A0A` | `#0A0A0A` | code blocks and console are dark in **both** themes |

**Contrast:** verified AA for every text/surface pair in light, dark, and dark-band-in-dark (script in the
handoff notes). Status colours reach at least 4.3:1 as text on light surfaces; still pair them with a label,
never colour alone.

**Bands:** add `.band-invert` to a `<section>` and all tokens inside flip to the dark set. In dark mode,
`.dark .band-invert` becomes a raised `#111` surface instead of flipping to light.

**Theme:** `next-themes` with `attribute="class"`, default `light`, and `enableSystem`. Console routes force
`dark` (§6.2). The toggle is a mono `LIGHT / DARK` text switch in the footer and console top bar, not a
sun/moon icon.

---

## 3. Typography
Fonts: **Geist Sans** plus **Geist Mono** (`npm i geist`, then `import { GeistSans } from "geist/font/sans"`
and `GeistMono` from `geist/font/mono`, applied as `className` variables on `<html>`). Tokens reference
`--font-geist-sans` and `--font-geist-mono`.

| Token / use | Font | Size | Weight | Line-height | Tracking |
|---|---|---|---|---|---|
| `text-statement` footer line | Sans | `clamp(44px, 5.5vw, 80px)` | 400 | 1.0 | -0.04em |
| `text-display` H1 | Sans | `clamp(40px, 5vw, 64px)` | 400 | 1.05 | -0.03em |
| `text-h2` section title | Sans | `clamp(32px, 4vw, 44px)` | 400 | 1.1 | -0.02em |
| H3 card title | Sans | 20px | 500 | 1.3 | -0.01em |
| Stat number | Sans | `clamp(32px, 3.5vw, 40px)` | 400 | 1 | -0.02em, `tabular-nums` |
| Body L (hero sub) | Sans | 18px | 400 | 1.55 | 0 |
| Body | Sans | 16px | 400 | 1.6 | 0 |
| Small / caption | Sans | 14px | 400 | 1.5 | 0 |
| **Label** (eyebrow, button, nav, tag, table head) | **Mono** | 11–12px | 400–500 | 1.2 | 0.08em, UPPERCASE |
| Code | Mono | 13px | 400 | 1.6 | 0 |

- Headings are **regular weight** and never bold, following Cybrix, Primer, and Etched. Hierarchy comes from
  size and the two-tone split.
- Max measure: headings `max-w-[18ch]` to `max-w-[22ch]` with `text-balance`; body `max-w-[60ch]` with
  `text-pretty`.
- A mono code token may appear *inside* a headline as a device (Inspo `novu-co`), at most once on the page,
  e.g. `Every probe needs a <signed/> scope.`

---

## 4. Layout and grid
- **Container:** `max-width: 1200px`, `padding-inline: var(--gutter)` (16 / 24 / 32px at base / `md` /
  `lg`), with rails. Always use **`padding-inline` only** on containers. A `padding` shorthand on the same
  element as `.section` silently zeroes the vertical rhythm (Inspo gotcha). Check that a mid-page section's
  computed `padding-block` is not 0.
- **Grid:** 12 columns, 24px gap (16px under `md`).
- **Vertical rhythm:** every section uses `padding-block: var(--section-y)` = `clamp(72px, 10vw, 128px)`. Use
  one rhythm and don't vary it per section. Heading block to content: 48px (`md`: 64px).
- **Hero** must be complete in the first viewport at 1280×800 (`min-h-[100svh]` minus nav, content centred):
  nav, eyebrow, H1 (2–3 lines), sub, CTAs, and stat strip all above the fold.
- **Breakpoints:** Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). Design at 390 / 768 / 1280
  / 1440.
- **Mobile:** splits stack text first, then the visual. Rails are hidden, and brackets shrink to 6px.
  Horizontal snap scrollers (`snap-x`, 85% card width) replace multi-column card rows where noted. There is
  never any horizontal page scroll.

---

## 5. Landing page (`/`): information architecture
**Rhythm:** light, light, **INK** (5.3), light …, **INK** (5.7), light …, **INK** (5.15), then the light
footer. There are three ink bands and never two adjacent.

Each block lists: purpose · layout · content · components · source reference.

### 5.1 Nav (sticky)
```
        ┌╴                                                                   ╶┐
        │ ■ MIAN DAST │ Product  How it works  Pricing  Docs  Cases │ SIGN IN  [RUN FREE AUDIT] │
        └╴                                                                   ╶┘
```
- A floating framed bar, centred, `max-w-[880px]`, 12px from the top, with `--card` fill (with backdrop
  blur 8px at 90% opacity once scrolled), a 1px border, and brackets. After Cybrix and Inspo
  `nav/floating-pill` (but square-cornered).
- Logo: a 14px filled square plus the "MIAN DAST" wordmark in Geist Mono 13px/500 uppercase. There is no
  logo artwork yet, and the square mark is intentional.
- Links: Mono 12px uppercase, `--muted-foreground`, turning to `--foreground` on hover. The active section is
  shown by a 1px underline (scroll-spy).
- Right side: `SIGN IN` (ghost sm) and `RUN FREE AUDIT` (primary sm).
- Mobile: logo plus `MENU` text button, opening a full-screen sheet (shadcn `Sheet`, side top) with links at
  28px Sans, CTAs pinned at the bottom.
- **Removed from the current site:** the "Edge Telemetry Gate: Cryptographic Attestation Active" badge in the
  nav. It moves to the hero eyebrow and console top bar.

### 5.2 Hero
```
│ ┌╴                    ╶┐                                                       │
│    ◯ ─ ─ ▪ ─ ─ ◯          ■ SAFE-BY-DEFAULT DAST                              │
│   ╱  ┌────────┐   ╲       Continuous security testing                         │
│  ▪   │ target │    ▪      with zero collateral outages.   ← grey              │
│   ╲  └────────┘   ╱       Scanners that hammer production blindly take it     │
│    ◯ ─ ─ ▪ ─ ─ ◯          down. MIAN DAST signs every scope, fences every     │
│ └╴  fence · probes     ╶┘  host and throttles on the first sign of strain.     │
│                           [RUN FREE AUDIT]  [▶ WATCH DEMO]                     │
│                           1.48M+        0              26          <2s         │
│                           probes run    outages        engines     canary check│
```
- **Layout:** `lg`: visual in columns 1–5 and text in columns 7–12, following Cybrix. Mobile: text first, then
  the visual at 280px.
- **Visual:** the "scope fence" SVG in a bracket frame with `--glow` behind it. It shows a centred target box,
  a dashed fence ring around it, 6–8 probe squares on two orbit ellipses, and small tick marks where the
  orbits meet the fence.
  - Motion: the orbits rotate once every 60s, and probes pulse in opacity (0.4 → 1, 2.4s, staggered).
  - `aria-hidden`, with a visually hidden text equivalent.
- **Copy:**
  - Eyebrow `SAFE-BY-DEFAULT DAST`
  - H1 two-tone: "Continuous security testing" / "with zero collateral outages."
  - Sub: 18px `--muted-foreground`, 2–3 lines
  - CTAs: `RUN FREE AUDIT` (primary lg, scrolls to 5.6) and `WATCH DEMO` (secondary lg, with a ▶ glyph,
    opens a `Dialog` holding the video with chapter chips)
- **Hero frame:** the hero sits inside a full-container 1px hairline box (it joins the rails). The stat strip
  is the box's **bottom row of cells with shared borders** rather than a floating row, after Inspo
  `anytype-io` (the hero box runs straight into a hairline cell row). Visually the hero reads as one instrument
  panel.
- **Stat strip** (`StatStrip`): four cells separated by 1px vertical rules, each a number over a Mono 11px
  label. Values: `1.48M+` probes run · `0` collateral outages · `26` detection engines · `<2s` canary check.
  - **Sourced figures** (Inspo `stat/annotated`): each number carries a mono superscript marker (`¹`–`⁴`)
    linking to a FAQ entry "Where do these numbers come from?" (§5.14) that states the source and date. A
    security buyer asks "according to what?", so answer it. Any figure without a source is cut, not shipped.
  - Numbers count up once when scrolled into view (600ms). Under reduced motion, show the final value
    immediately.
  - **Never render the pre-animation 0**; server-render the final value and animate from it. This fixes the
    live site's "0 / 26", "< 0 ms", "0 %" bug.
- **Alternative** (the spec allows it; pick one, not both): a Fortanara-style hero bento where the stat strip
  becomes four stat tiles to the right of the visual.

### 5.3 Console preview (**INK band**)
- `.band-invert`, full-bleed. The top 120px of the band is pulled up (negative margin) so the frame overlaps
  the hero/band seam, after Hack The Box.
- A bracketed frame (`max-w-[1080px]`, `--card` fill, 1px border) holds a **screenshot of the Control Plane**
  at 16:10, with `--glow` behind it.
- Until the console exists, render a **static monochrome mock** built from the §6.2 shell: a sidebar, a top
  bar with an attestation chip, three stat tiles, a findings table with severity badges, and a canary
  sparkline. Use real-looking but clearly sample data.
- Under the frame: three mono captions in a row: `CONTROL PLANE` · `26/26 ENGINES` · `ATTESTATION LOG`.
- **No faux window chrome** (traffic-light dots, fake URL bar, fake browser tabs) around the frame. The
  bracket frame *is* the chrome (Inspo `features/workbench` "re-drawn chrome forbidden" rule). A mono
  `SAMPLE DATA` tag sits top-right inside the frame while it is a mock.

### 5.4 Logos and compliance
- **Logo marquee:** Inspo `logo-cloud/marquee`. Grayscale wordmarks at 40% opacity (100% on hover), 24px
  tall, with mask-faded edges; it pauses on hover and is static under reduced motion.
  - **Only real customers or integrations.** If there are none, use an integrations row instead (GitHub
    Actions, GitLab CI, Bitbucket, Jira, Slack, Cloudflare, AWS, GCP) labelled `■ INTEGRATES WITH`. Never
    use invented "trusted by".
- **Compliance row** below it: a mono 12px row separated by `·`: `SOC 2 TYPE II · ISO/IEC 27001 · PCI-DSS L1
  · OWASP TOP 10`, in `--muted-foreground`. Text only, no badge images.
  - **Verify before shipping.** List only certifications MIAN DAST actually holds, backed by a report or
    certificate. A framework the product *maps findings to* is labelled as such: `MAPS TO · OWASP TOP 10 ·
    PCI-DSS 11.3`, never presented as a certification. Drive it from a config array; an unverified item is
    removed.

### 5.5 Safety model (the core pitch)
```
■ SAFE BY DEFAULT
Three gates before a single probe  / fires at your production.   ← grey
┌──────────────────────────────┬───────────────┐
│ 01 ATTESTATION GATE          │ 02 BOUNDARY    │
│ [mini: signed attestation    │ FENCE          │
│  row · name · ticket · hash] │ [mini: fence   │
│ Title / 2 lines / VIEW MORE  │  + blocked     │
│                              │  hosts list]   │
├──────────────────────────────┼───────────────┤
│ 03 ADAPTIVE CANARY [mini: latency sparkline  │
│    with throttle marker at +300%]           │
└──────────────────────────────────────────────┘
```
- Inspo `features/bento` with Hack The Box's mini-UI cards: irregular spans (lead tile spans 2 columns). Each
  tile holds a **mini UI** rendered in HTML/SVG, not images:
  1. **Attestation gate:** a mono row: `✓ SIGNED · J. Doe (CTO) · JIRA-SEC-214 · sha256:9f3a…`
  2. **Boundary fence:** a small fence diagram with `stripe.com`, `sendgrid.net`, `cdn.*` struck through and
     marked `BLOCKED`.
  3. **Adaptive canary:** a 1px sparkline of latency, with a dashed threshold line and a filled square where
     throttling kicks in, labelled `THROTTLED +300% · 85ms backoff`.
- Each tile: mono ordinal `01`, an H3, two lines of body, and a `VIEW MORE` secondary sm button that becomes
  primary (ink) on tile hover, after Cybrix. The whole tile is a link.
- Mobile: a single column, in the order 01, 02, 03.
- **Before / with strip** (absorbs the old §5.8, per Inspo `features/compare`: framed by category, no
  competitor names). Directly under the bento, a `SplitCompare` in one hairline frame, three rows:
  thread/DB exhaustion vs sub-85ms backoff · third-party spidering vs fenced hosts · 40% false positives vs
  verified proofs. Column heads: `TRADITIONAL SCANNERS · OUTAGE RISK HIGH` (HIGH as a critical badge) and
  `MIAN DAST · OUTAGE RISK ZERO` (success badge). The MIAN column sits on `--card`; the legacy column sits on
  `--background` with `--muted-foreground` text. Mobile: two stacked blocks. It makes the case for the three
  gates right where the gates are shown, and removes a whole section from the scroll.

### 5.6 Instant passive audit (`#audit`, the primary CTA target)
- Inspo `features/workbench`: copy on the left (columns 1–5), a **working** tool on the right (columns 6–12)
  in a bracketed frame.
- **Tool:**
  - Input with a `TARGET DOMAIN` mono label, then a large 48px field and an `AUDIT →` primary button joined
    to it.
  - Example chips: `example.com` `github.com` `cloudflare.com` (mono outline tags).
  - Line under the input: `100% passive · headers, TLS, CORS, cookies · nothing is fuzzed`.
- **States:**
  - **Empty:** a ghost checklist skeleton with a note.
  - **Loading:** a mono log that streams line by line (`› resolving host…`, `› TLS 1.3 ✓`…) with a
    1px progress bar.
  - **Result:** a grade tile (96px Sans letter `A` in a bordered square), a score, and a checklist of
    header/TLS rows (status dot, name, value in mono, pass/fail word). Then `DOWNLOAD PDF REPORT` (secondary)
    and `START 14-DAY TRIAL` (primary).
  - **Error:** an inline mono caption in `--destructive` under the input, and the input border turns
    destructive.
- Left copy: eyebrow `■ FREE · NO SIGN-UP`, two-tone H2 "Check your headers / in ten seconds.", and three
  small bullet facts.

### 5.7 How it works (**INK band**)
```
■ HOW IT WORKS
From signed scope / to signed report.
┌ tabs ───────────────────────┐  ┌╴            ╶┐
│ 01 Attest                   │     ╭ ticks ╮
│    Sign the target…  ▔▔▔▔▔▔ │    │  ▪  0:01:32│   canary dial
│ 02 Fence                    │     ╰───────╯
│ 03 Fuzz                     │    p95 84ms · OK
│ 04 Prove                    │  └╴            ╶┘
│ 05 Report                   │
└─────────────────────────────┘
```
- `StepTabs` (shadcn `Tabs`, vertical orientation, `activationMode="manual"`), after Cybrix "Step by step"
  plus Fortanara's gauge card.
- Left: five rows, each a mono ordinal with a 20px title. The active row expands to show a two-line
  description and a 1px **progress underline** that fills over 6s, then auto-advances. Auto-advance pauses on
  hover or focus and stops permanently after any user click. It is off under reduced motion.
- Right: a bracketed `StepVisual` that changes per step.
  - The default is the **canary dial**: 60 radial ticks, with filled ticks = current load, a centre icon
    square, a mono timer `0:01:32` (elapsed scan time), and a caption `p95 84ms · HEALTHY`.
  - Other steps swap in a signed-attestation card, a fence diagram, a proof trace (a `curl` line plus OAST
    callback), and a report thumbnail. Crossfade 200ms.
- Mobile: becomes a horizontal snap row of **numbered cards** `#1`–`#5` (Fortanara), each with a title,
  description, and a small visual. No auto-advance.

### 5.8 Legacy vs MIAN: merged into §5.5
- No longer a standalone section; it is the "before / with" strip under the safety bento (§5.5). It replaces
  the live site's drag slider (a slider is allowed later as progressive enhancement). The section number is
  kept so the cross-references stay stable.

### 5.9 Coverage
- A `HairlineGrid` of 3×2 **cells, not cards** (shared 1px borders, no gaps, no radius). Each cell: a
  mono tag, a 20px title, and 2–3 lines of body. Categories: SQL/NoSQL injection · BOLA/IDOR · XSS · SSRF
  and cloud metadata · exposed secrets · headers and CORS.
- Cell hover: `--card` fill plus an `→` in the corner.
- Below it, a link-button: `EXPLORE ALL 26 ENGINES →` to `/sandbox`. Mobile: one column.

### 5.10 Developer first
- Split layout: copy on the left (two-tone H2 "Fail the build, / not the database.", three bullets), code on
  the right.
- `CodeTabs`: tabs `GITHUB ACTIONS` · `CURL` · `PYTHON` in mono, over a `--code` surface (dark in both
  themes), 1px `--code-border`, 13px mono, line numbers in `--subtle`, and a `COPY` button top-right that
  shows `COPIED ✓` for 1.5s.
- Syntax colours are monochrome: keywords in `--code-foreground`, strings in `#A1A1A1`, comments in `#6E6E6E`.

### 5.11 Audit reports
- Split layout. Left: a `ReportPreview`, a "paper" document mock (always white, even in dark mode, with a 1px
  border and a slight -2° rotation on `lg`). It carries a header, an `AUDIT VERIFIED` stamp as a mono boxed
  label, a field list in mono, and a mini coverage matrix.
- Right: two-tone H2 "Proof your auditors / will actually accept.", three bullets (SOC 2 CC7.1/7.2 ·
  signed timestamps · SARIF export), and `PREVIEW SAMPLE REPORT` (secondary).

### 5.12 Case studies
- Three `DocCard`s (Cybrix doc cards): a 1px border, a 16px folded top-right corner (a CSS clip triangle
  drawn in `--border`), a mono outline tag (`FINTECH` / `HEALTHTECH` / `SAAS`), a mono date, a 20px title,
  a one-line result, and `READ →`.
- Content: CloudPay (BOLA), OmniHealth (42 FHIR endpoints), CartFlow (race condition). Mobile: snap row.

### 5.12a Founder
- Cybrix "About us" split. Left, on `--card`: eyebrow `■ FOUNDER`, a two-tone H2 "Built to test production /
  without collateral damage.", two lines of bio, and `ABOUT MIAN →`.
- Right: the grayscale founder portrait, with a bracketed `QuoteCard` overlapping its lower-left: name, role,
  location (Abu Dhabi, UAE) in mono, and a short quote at 20px.

### 5.12b Proof wall (**conditional**)
- Inspo `testimonial/mosaic` plus Fortanara's mixed row: quote cards alternate with stat tiles (`0 outages`,
  `−88% risk in 14 days`).
- **Render only when real, attributable quotes exist.** Ship the component, but hide the section by default
  (feature flag / empty-array check). Never use invented testimonials.

### 5.13 Pricing (`#pricing`)
- Header: eyebrow `■ PRICING`, two-tone H2 "Predictable pricing / for teams that ship daily."
- Controls row: a `SegmentedToggle` `MONTHLY | ANNUAL −20%` (Inspo `pricing/toggle`, radio semantics), a
  `CurrencySelect` `USD / EUR / GBP / ETB`, and a thin **PPP note bar**. The note bar is a full-width 1px
  frame with mono text: `PPP · 60% off in 70+ countries with code GLOBAL60` and `ETHIOPIA · 50% off,
  Telebirr & CBE Birr supported`.
- Four `PricingCard`s: Starter $19 · Developer $99 · **Growth $299 (featured)** · Enterprise $899.
  - Each card: tier name in mono, a segment line, a price (40px Sans with a `/mo` mono suffix), a two-line
    description, a hairline, five feature rows (a `+` mono bullet, 14px), and a full-width CTA. The CTA is
    `START 14-DAY TRIAL` on Starter, Developer, and Growth, and `TALK TO SALES →` (to `/demo`) on Enterprise.
  - **Featured** card: `.band-invert` (ink card on the light page), raised 12px on `lg`, and a mono label
    `RECOMMENDED` in its top border. No "Most popular" ribbon.
- Price switches crossfade digits (150ms). Annual shows the struck-through monthly price in `--subtle`.
- Below the cards: `COMPARE ALL FEATURES →` to `/pricing`. Mobile: a snap row, starting scrolled to the
  Growth card.

### 5.14 FAQ
- Inspo `faq/accordion`: native `<details>`/`<summary>`, single-open (close siblings on toggle). Layout: the
  header in columns 1–4 (sticky on `lg`), the list in columns 5–12.
- Rows: a mono ordinal `01`, the question at 20px, and a typographic `+`/`−` affordance on the right (no
  chevrons). Answers are 16px `--muted-foreground`, `max-w-[60ch]`. Rows are separated by hairlines.
- Content: the six existing questions, plus a seventh, **"Where do these numbers come from?"**
  (`id="methodology"`), which is the target of the hero stat footnotes (§5.2). For each figure it gives the
  source and the as-of date.

### 5.15 Final CTA (**INK band**)
- Inspo `cta/inverted`: a `.band-invert` band with a two-tone H2 "Run your first safe scan / before your next
  deploy." and **one** primary button, `RUN FREE AUDIT` (paper button on ink).
- The band holds **only** that heading and button (Inspo `cta/inverted`: "one action only"). The demo form
  **no longer lives here**. Stacking a six-field form under the final CTA gave the band two competing asks.
  Also, Inspo `cta/form-led` is a *single-field* archetype, which a six-field sales form is not.
- **Demo request moves to `/demo`** (§6.1 marketing template). Entry points: the Enterprise pricing card CTA
  `TALK TO SALES →`, the footer `CONTACT` link, and the `/pricing` page. Page layout: a Hack The Box demo-band
  split, with a two-tone H1 "See a safe scan / on your own stack." and three bullet facts on the left, and a
  bracketed `DemoForm` on the right.
  - Fields in a 2-column grid: work email*, full name*, company*, team size (select), country (select),
    message (textarea).
  - Submit `REQUEST DEMO →`. Labels are mono 11px above the inputs.
  - **Success:** the form collapses to a single confirmation line with a mono reference number (the form-led
    success behaviour is kept).
  - **Error:** mono captions in `--destructive` under each field.

### 5.16 Footer (after Etched; Inspo `footer/statement`)
```
                 ┌ line-art scan-topology schematic, ~70% width, thin grey strokes ┐
                 │  racks · routers · API gateway · fence ring · probe traces      │
─────────────────┴─────────────────────────────────────────────────────────────────┴── (1px baseline, full-bleed)

PLATFORM               PRICING               DOCS               LEGAL               CONTACT

Test production.                      MIAN DAST HQ                       ┌──────────────────────┐
Break nothing.                        CYBER SECURITY TOWER               │   RUN FREE AUDIT →   │
                                      AL MARYAH ISLAND, ABU DHABI, UAE   └──────────────────────┘

© 2026 MIAN DAST · 26/26 ENGINES ONLINE ●         PRIVACY · SITEMAP · LLMS.TXT · SECURITY@ASKMIAN.COM · LIGHT/DARK
```
- The footer stays **light** (on `--background`, as in Etched) even though the band above is ink. That
  contrast is what closes the page.
- **Drawing:** a large inline SVG **line-art technical drawing** of MIAN's world, drawn as a precise
  engineering schematic rather than an illustration: server racks, a load balancer, an API gateway, a DB
  cylinder, and a dashed scope-fence rectangle around them. Probe traces route in from outside with right
  angles, rounded 4px corners, and parallel bus lines like PCB traces; out-of-scope hosts sit outside the fence
  with an `×`.
  - Strokes: 1px `--border-strong`, detail strokes in `--border`, no fills. About 70% of the container width,
    centred, 360–420px tall on desktop.
  - It **sits exactly on** a full-bleed 1px `--border-strong` baseline: the bottom of the drawing is
    clipped by the line.
  - Density should match Etched's PCB: many small components, dotted grids, pad arrays.
  - `aria-hidden`. Optional: traces "draw on" once (stroke-dashoffset, 1.2s) when scrolled into view; static
    under reduced motion.
  - Mobile: scaled to 100% width, cropped to its central 60%.
- **Link row:** five mono 13px uppercase links in `flex justify-between` across the full container width
  (Etched's LEGAL · MEDIA · CAREERS · JOIN US spacing), 48px below the baseline. Hover: 1px underline.
  Mobile: a 2-column grid.
- **Bottom row** (`lg`: grid columns 1–6, 7–9, 10–12, aligned on the baseline; stacked on mobile, CTA full-width last):
  - **Statement:** `text-statement` (up to 80px, so each line fits on one line in 6/12 columns; verified at 1280px) regular Sans in `--foreground`, one sentence in two lines:
    "Test production. / Break nothing." It is **not** two-tone; the one-colour statement is the point.
  - **Address:** mono 13px uppercase, three lines, `--foreground`.
  - **CTA:** a full-column-width **solid ink rectangle**, 56px tall, radius 0, mono 13px uppercase label
    `RUN FREE AUDIT →`. Hover: the arrow shifts 4px right.
- **Colophon row:** mono 11px `--muted-foreground`, 32px below, with a top hairline: `© 2026 MIAN DAST ·
  26/26 ENGINES ONLINE` plus a `--success` status dot on the left; on the right, `PRIVACY · SITEMAP ·
  LLMS.TXT · security@askmian.com · LIGHT / DARK`.
- **Dropped from the live footer:** the lat/long coordinates, the "404 Error Page" and "robots.txt" links as
  headline items (robots and sitemap stay in the colophon), the duplicate badges, and the long tagline.

---

## 6. Page templates (other routes)

### 6.1 Marketing template: `/pricing`, `/case-studies`, `/case-studies/[slug]`, `/about`, `/demo`
- Nav, then a page header (eyebrow, two-tone H1 at `text-display`, a sub, optional CTA; `padding-block:
  var(--section-y)`), then sections from §5, then the footer.
- `/pricing`: §5.13 cards, then a **comparison table** (Inspo `pricing/table`): sticky tier header row, mono
  11px group labels ("SCANNING", "INTEGRATIONS", "COMPLIANCE", "SUPPORT"), 1px rules, **no zebra stripes**,
  row hover `--card` fill, a `+` / `—` glyph for booleans, and mono text for quantities. Then FAQ (billing
  questions) and the footer.
- `/demo`: the demo-request split described in §5.15 (a copy column plus a bracketed `DemoForm`), then the
  footer. No other sections.
- `/case-studies/[slug]`: a document layout (§6.4) with a metadata sidebar (industry, target, compliance,
  result) in mono.

### 6.2 Console shell: `/sandbox`, `/control-plane/*`, `/verify`
Forced **dark**, with `--code` as the page background.
```
┌ 240 sidebar ┬ 56 top bar: breadcrumb · ● ATTESTATION GATE ACTIVE · search ⌘K · LIGHT/DARK · avatar ┐
│ ■ MIAN DAST │                                                                                      │
│ FLEET       │  page header (h1 24px, actions right)                                               │
│  Scans      │  stat tiles row                                                                     │
│  Targets    │  DataTable (36px rows, mono cells for ids/hashes, SeverityBadge, row actions)       │
│ GOVERNANCE  │                                                                                      │
│  Attest.    │                                                                                      │
│ BILLING …   │                                                                                      │
└─────────────┴──────────────────────────────────────────────────────────────────────────────────────┘
```
- **Sidebar:** mono 11px group labels in `--muted-foreground`, 14px Sans items at 32px height, active item
  with `--secondary` fill and a 2px left ink bar. Collapses to a 56px icon rail under `lg` and becomes a
  `Sheet` on mobile.
- Groups follow the live site's control plane: Fleet (Scans, Queue, Targets & Scope, EASM), Findings (DAST,
  SAST, AI/LLM, Attack paths), Governance (Attestations, RBAC & seats, Reports & evidence), Integrations
  (CI/CD, Badges, Notifications, API), Billing (Subscription, Payments, Verification), and Admin (Tenants,
  White-label, Edge health).
- **Density:** 14px body, 36px table rows, 12px mono for ids, hashes, timestamps, and IPs. Page padding 24px.
- **Telemetry/log stream:** mono 12px lines prefixed by a timestamp in `--subtle`; severity words coloured,
  with the rest in `--foreground`. It auto-scrolls with a "pause" toggle.
- **Empty state:** a bracketed frame, a small line-art glyph, a 20px title, one line, and one primary action.
- `/sandbox` is the 26-engine console: target input, an attestation checkbox that must be signed before
  `RUN`, an engine grid (26 cells in a hairline grid, each a status dot plus mono name), and a live log.

### 6.3 Checkout flow: `/checkout`, `/checkout/verify`
- A centred `max-w-[720px]` column on the marketing template, with a `Stepper` at the top: `01 PLAN · 02
  BILLING · 03 PAYMENT` (mono, active step in ink, completed steps marked `✓`).
  1. **Plan:** four compact radio rows (tier, targets, price).
  2. **Billing:** `SegmentedToggle` monthly/annual plus a currency select, with the PPP notice bar when it
     applies.
  3. **Payment:** a segmented tab row `CARD · CRYPTO · TELEBIRR · CBE BIRR`, whose panel changes per method.
     - Card fields.
     - Crypto: a network select, then a `CopyField` for the address and another for the reference, then a
       TxID field.
     - Telebirr and CBE: payee details as `CopyField`s, then the TxID/FT field.
- A summary panel sits on the right on `lg` (sticky) and at the bottom on mobile: plan, billing, discount
  lines, and the total in 32px `tabular-nums`.
- **`CopyField`:** a mono value in a 1px frame with a `COPY` button that switches to `COPIED ✓`.
- `/checkout/verify` has three states:
  - **Reconciling:** a mono log and 1px progress, with "usually under 10 minutes".
  - **Activated:** credentials shown in `CopyField`s and `LAUNCH CONTROL PLANE →`.
  - **Failed:** a destructive caption and a support link.

### 6.4 Document template: `/privacy`, legal pages, case-study detail
- A 680px prose column. A sticky table of contents on the left on `lg` (mono 12px, active item in ink with a
  1px left bar).
- Prose: 17px/1.7, H2 at 28px, H3 at 20px, links underlined 1px with a 3px offset. The "Last updated" date in
  mono sits under the H1.

---

## 7. Components
All are built on shadcn primitives, restyled **through tokens only**. Don't fork a primitive's internals;
wrap it instead. Files go in `components/ui` (primitives) and `components/site` (compositions).

| Component | Base | Anatomy / variants | States | Notes |
|---|---|---|---|---|
| **Button** | shadcn `button` | Variants: `primary` (ink/paper), `secondary` (`--secondary` + 1px border), `ghost`, `link`, `outline-invert` (on bands). Sizes: `sm` 32px/12px label, `md` 40px, `lg` 48px, `block` 56px (footer). Label mono 12px uppercase 0.08em; optional leading ▶ or trailing → glyph | hover: 1px press shadow and bg shift (primary → `#262626` light / `#D4D4D4` dark); active: translateY(1px); focus: 2px ring at 2px offset; disabled: 40% opacity; loading: label swaps to mono `WORKING…` and the width is locked | Radius 2px (0 for `block`). Min 44px touch height on mobile (the `sm` hit area is padded) |
| **Eyebrow** | — | 6px square plus label | — | `.eyebrow`. One per section |
| **SectionHeader** | — | Eyebrow, two-tone H2, optional sub, optional right-side action | — | Left-aligned by default; centred only for 5.15 |
| **BracketFrame** | — | Wrapper with `.bracket` (ticks on `::before`; don't use `::before` for anything else on it); `fill` prop (none / card) | — | Max 3 per viewport |
| **StatStrip** | — | 2–4 cells, vertical 1px dividers; number, mono label, optional footnote marker | count-up on reveal | Inspo `stat/row` + `stat/annotated`: real, sourced numbers only; in the hero it is the bottom cell row of the hero frame |
| **FeatureTile** | — | Ordinal, mini-UI slot, H3, body, `VIEW MORE` | hover: button becomes primary, border becomes `--border-strong` | The whole tile is one link |
| **StepTabs** | shadcn `tabs` (vertical) | Rows (ordinal, title, description, progress line) plus a visual slot | active / inactive / focus; auto-advance paused on hover or focus | Snap cards on mobile |
| **HairlineGrid** | — | Cells sharing borders (`grid` with `-m-px` / `border`) | cell hover | No gaps, no radius |
| **CodeTabs** | shadcn `tabs` | Tab row, code pane, copy button | copied | Always the dark `--code` surface |
| **SplitCompare** | — | Two-column table, badge heads | — | Stacks on mobile |
| **ReportPreview** | — | Paper mock (always light) | — | Decorative; `aria-hidden` with a caption |
| **DocCard** | — | Folded corner, tag, date, title, result, `READ →` | hover: border-strong plus the arrow shifts | |
| **QuoteCard** | — | Bracketed; avatar 32px (grayscale), name, role, quote | — | |
| **PricingCard** | — | Tier, segment, price, description, features, CTA; `featured` → `.band-invert` | — | Price uses `tabular-nums` |
| **SegmentedToggle** | shadcn `toggle-group` (single) | 2–4 segments, mono labels, 1px frame, active = ink fill | focus / active | Radio semantics |
| **Select** | shadcn `select` | 40px, mono value | open / focus / disabled | |
| **Input / Textarea** | shadcn `input` / `textarea` | 40px (48px in the hero tool), 1px `--input` border, 2px radius, mono 11px label above | focus: ink border plus ring; error: destructive border plus a mono caption | Placeholder in `--subtle` |
| **Accordion** | native `<details>` (not the shadcn accordion) | Ordinal, question, `+`/`−` | open / hover / focus-visible | Single-open via JS enhancement |
| **CopyField** | — | Mono value, `COPY` button | copied (1.5s) | `navigator.clipboard` with a fallback |
| **SeverityBadge** | shadcn `badge` | `critical / high / medium / low / info`: a 6px dot plus a mono 11px word in the severity colour on a transparent background with a 1px border in the same colour at 30% | — | Never colour alone; always the word |
| **StatusDot** | — | 6px circle: success / warning / critical / idle; optional pulse | — | |
| **Toast** | shadcn `sonner` | 1px border, `--card`, mono title, body, optional action | — | Bottom-right, max 3 |
| **DataTable** | shadcn `table` + TanStack | Mono 11px uppercase head, 36px rows, hairlines, row hover `--secondary` | sorted / selected / empty / loading (skeleton rows) | Console only |
| **Stepper** | — | Mono steps with dividers | todo / active / done | Checkout |
| **AppShell** | shadcn `sidebar` | §6.2 | collapsed / expanded / mobile sheet | Forced dark |
| **Marquee** | — | Inspo `logo-cloud/marquee` | paused on hover | CSS animation, static under reduced motion |
| **DemoForm** | react-hook-form + zod | §5.15, on `/demo` only | idle / submitting / success / error | Success collapse borrowed from Inspo `cta/form-led`; not on the landing page |
| **FooterDrawing** | inline SVG | §5.16 | draw-on once | Hand-authored or generated SVG, under 60KB |

**Porting Inspo reference JSX:** its sources use `--color-bg`, `--color-fg`, `--color-fg-muted`,
`--color-accent`, and `.rule`. Map them to `--background`, `--foreground`, `--muted-foreground`,
`--foreground`, and `border-border`. Undefined custom properties fail silently.

---

## 8. Motion, iconography, and copy

**Motion**
- UI transitions: 150ms (hover, colour) or 200ms (panels, crossfade), `--ease-out`. Nothing bounces.
- Signature motion (at most one moving thing per viewport): the hero orbits rotate over 60s, probes pulse
  over 2.4s, stats count up once, the step progress runs 6s, the logo marquee scrolls at about 40px/s, and the
  footer traces draw on once.
- Reveal on scroll: sections fade from 8px below at 0 → 1 opacity over 300ms, **once**, no stagger chains
  longer than 4.
- `prefers-reduced-motion`: every animation above is off or shows its final state (the global rule in
  `tokens.css` handles this).

**Icons**
- `lucide-react`, stroke 1.5, 16px inline or 20px in tiles, `currentColor`. In feature tiles, icons sit in a
  40px **outlined circle** (Cybrix), the only circle besides the status dot.
- No filled or duotone icons and no emoji.

**Copy rules for the implementer**
- Keep the product's claims, but headlines stay under 8 words per clause and use the two-tone split.
- One primary CTA phrase site-wide: **`RUN FREE AUDIT`**. The secondary is `START 14-DAY TRIAL` (no card).
  Drop the other variants (Launch Live Sandbox, Test 26 Engines Sandbox, Run Attack Surface Recon…) from the
  landing page.
- Mono labels are UPPERCASE; body copy is sentence case. No Title Case Headlines.
- Numbers: `1.48M+`, `<2s`, `$299`, and `/mo` in mono. Use real figures only; mark samples as `SAMPLE`.
- **Fix the live bugs:** counters render as `0 / 26 Detection Engines`, `< 0 ms`, and `0 %` before hydrating.
  Render the final value on the server.
- There is an inconsistent product name on the live site ("SafeDAST" in the reports copy). Use **MIAN DAST**
  everywhere.

---

## 9. Accessibility
- [ ] Every text/surface pair meets AA (done at token level; recheck any new pairing). `--subtle` is only for
  text 24px and larger.
- [ ] Visible focus ring on every interactive element (2px `--ring`, 2px offset); never remove the outline.
- [ ] Tabs: arrow-key navigation (shadcn/Radix); auto-advance stops on focus. Accordion: native `<details>`.
- [ ] Touch targets at least 44×44px on mobile.
- [ ] Hero SVG, console mock, report preview, and footer drawing are `aria-hidden`, each with an `sr-only`
  sentence describing it.
- [ ] Severity is always a word plus colour, never colour alone.
- [ ] Marquee and auto-advance can be paused (hover or focus) and are off under reduced motion.
- [ ] Forms: `<label>` for every field, errors linked via `aria-describedby`, and success announced via
  `aria-live="polite"`.
- [ ] Headings in order (one H1 per page); landmarks (`header`, `nav`, `main`, `footer`); a skip link to
  `#main`.
- [ ] Theme toggle is a real `button` with `aria-pressed`.

---

## 10. Content mapping: live site to the redesign
Every section of the current https://dast.askmian.com is either kept, merged, or moved.

| # | Live section | Where it goes |
|---|---|---|
| 1 | Nav + telemetry badge | §5.1 (badge moved to the hero eyebrow and console top bar) |
| 2 | Hero + 4 CTAs + trust metrics | §5.2 (2 CTAs; trust metrics fold into the stat strip) |
| 3 | 4-pillar reliability + badges | §5.2 stat strip + §5.4 compliance row |
| 4 | Product demo video | §5.2 `WATCH DEMO` dialog |
| 5 | Instant passive audit | §5.6 |
| 6–7 | Trial recommender + tier preview | Moved to `/pricing` as a "Help me choose" block (optional) |
| 8 | 26-engine console | `/sandbox` (§6.2); teased in §5.9 |
| 9.x | Control plane (fleet, credentials, white-label, canary, revenue, payments, reports, edge, tenants, onboarding, queue, CI/CD, badges, notifications) | `/control-plane/*` (§6.2); previewed in §5.3 |
| 10–10.1 | EASM + drift | Control plane → Fleet/EASM; one row in §5.9 if wanted |
| 11 | Dark-web credential intel | Control plane → Findings |
| 12–14 | GenAI/LLM security, battleground, prompt arsenal | Control plane → Findings/AI; a future `/ai-security` marketing page (§6.1) |
| 15 | SAST | Control plane → Findings |
| 16 | Attack paths / CSPM | Control plane → Findings |
| 17 | RBAC seats | Control plane → Governance |
| 18–19 | Deep URL scanner, specialised engines | `/sandbox` engine grid |
| 20 | Safe-by-default framework | §5.5 |
| 21 | Legacy vs modern slider | §5.5 before/with strip (old §5.8) |
| 22 | Coverage | §5.9 |
| 23 | Architecture scenarios | §5.12 case studies |
| 24 | Executive audit reports | §5.11 |
| 25 | ROI calculator | `/pricing` (below the table) |
| 26 | Developer first | §5.10 |
| 27 | Founder | §5.12a |
| 28 | Pricing | §5.13 plus `/pricing` |
| 29–30 | Checkout and payment verification | `/checkout`, `/checkout/verify` (§6.3) |
| 31 | Toasts | `Toast` component (§7) |
| 32 | FAQ | §5.14 |
| 33 | Footer | §5.16 |
| 34 | Privacy policy | `/privacy` (§6.4) |
| 35 | Executive report sample | `/reports/sample` (document template) plus the §5.11 link |
| 36 | Demo request and sign-in forms | `/demo` (`DemoForm`, §5.15/§6.1); `/sign-in` uses the checkout column layout |

---

## 11. Acceptance checklist (for the implementing agent)
- [ ] `tokens.css` pasted into `app/globals.css`; Geist fonts wired; `next-themes` light default.
- [ ] No hex colours outside `globals.css` (`grep -rE '#[0-9a-fA-F]{3,6}' app components` shows only SVG
      assets).
- [ ] No brand hue anywhere; colour only in severity, success, and error.
- [ ] Hero complete above the fold at 1280×800 and 390×844.
- [ ] Every mid-page section has computed `padding-block` > 0 and the same value.
- [ ] Three ink bands (5.3, 5.7, 5.15), none adjacent; the footer is light.
- [ ] Footer matches §5.16: drawing on the baseline, spread link row, statement / address / block CTA.
- [ ] Lighthouse accessibility score of 95 or more; no axe violations on `/`, `/pricing`, `/checkout`.
- [ ] Reduced-motion run: nothing moves; all counters show their final values.
- [ ] Dark theme spot check: every section readable; the bands become a raised surface.
- [ ] The final CTA band (5.15) has exactly one button; `DemoForm` renders only on `/demo`.
- [ ] Every hero stat has a footnote that resolves to `#methodology`; the compliance row lists only verified
      certifications.
- [ ] Console preview has no faux browser chrome and shows a `SAMPLE DATA` tag while it is a mock.
- [ ] Hero illustration strokes use `--foreground`/`--muted-foreground` (not `--border-strong`).
