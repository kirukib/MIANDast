# MIAN DAST — visual references

Companion to [`ui-spec.md`](./ui-spec.md). The reference images were shared in chat and are not stored in the
repo, so each one is described below with what we **take** and what we **reject**.

**Rule:** if a reference and the spec disagree, the spec wins. We take composition from references, never
colour. The palette is strictly monochrome (see spec §2).

---

## User-supplied references

### 1. Cybrix (primary): light, minimal cybersecurity landing
A near-white page with a centered floating nav bar (logo · Home · Advantages · Features · Documentation ·
LOGIN), framed by thin corner brackets.
- **Hero:** abstract line-art on the left (a sphere of thin rings with small blue square "nodes" on orbits and
  a shield at the centre). On the right, a mono eyebrow chip `■ TOP 1 CYBER SECURITY WITH AI`, then an H1 in
  regular-weight grotesk set in two tones: "Drive growth confidently with" in black and "AI security" in grey.
  Below that, a sub, a black `GET STARTED` button and a grey `▶ PLAY VIDEO` button (mono uppercase), and a
  3-stat row (8.7k+ Threats Blocked · 120+ · 4.8k+).
- **"About us":** a split with a text card on the left and a photo on the right, with a bracket-framed quote
  card (avatar, name, role, quote) laid over the photo.
- **"Advantages":** three hairline cards, each with an outlined circular icon, a title, a two-line body, and a
  grey `VIEW MORE` button that turns black on hover.
- **"Step by step":** a vertical tab list on the left; the active tab is expanded with a progress underline.
  On the right, a circular dial of tick marks around a ⚡ icon and a mono timer `0:01:32`.
- **"Documentation":** doc cards with coloured mono tags (INTEGRATION / FEATURES / SUPPORT), a date, and a
  title.

**Take:**
- the whole base language: hairlines, vertical rails, bracket frames, mono eyebrows with a square bullet,
  two-tone regular-weight headings, mono uppercase buttons, near-square radii
- the hero split, stat row, advantage cards, step tabs plus dial, and doc cards

**Reject:** the blue accent (we use ink), the coloured doc tags (ours are mono outline tags), and the generic
"AI security" copy.

### 2. Hack The Box: dark, green-glow training platform
Near-black with neon-green glows.
- **Hero:** a centered two-line H1 with a small announcement chip above, a green primary and ghost secondary
  CTA, and 3D shapes framing the sides.
- **Product UI:** directly under the hero, a **full product dashboard screenshot** in a rounded frame
  (sidebar, cards, leaderboard, progress), followed by a greyscale **logo strip**.
- **Bento cards:** each card holds a **miniature UI** (a learning-path node map, a scenario tag grid, a
  certification stack).
- **Further sections:**
  - a hiring/stat bento ("648k+")
  - a success-story card
  - a big single-stat community band ("2.9m+ Members" + one CTA)
  - a **testimonial wall** (two offset rows of cards)
  - a blog card carousel
  - a **"Join our team for an exclusive full demo" form band** (email, names, company, size, country,
    message) before a compact footer

**Take:**
- the product-UI preview framed right under the hero (our §5.3 console band)
- mini UIs inside the feature cards (§5.5)
- the grayscale logo strip, the testimonial wall, and the demo-request form band

**Reject:** the neon-green glow (it becomes a white radial light), 3D renders, the hooded-hacker imagery, and
the pill buttons.

### 3. Fortanara: red-on-dark hero, alternating light and dark sections
- **Hero:** dark with a red glow, a centered two-tone H1 ("Solusi Cyber Security" in white, "Terintegrasi
  untuk Keamanan" in grey), a red CTA, and an outline "Upload sample" button.
- **Hero bento:** below the hero, a row of mixed tiles (a portrait photo, a white "100+" stat tile, a
  "Monitoring & Dukungan Teknis" tile, a "95,5%" chart tile, and a "300+" tile over a shield render).
- **Light sections:** each has a dot-bullet eyebrow chip and a two-tone heading, plus split text/CTA layouts,
  a gauge card ("Recovery System 84%") next to a numbered list, and a four-up impact card row.
- **Dark band:** a bento ("Global Standards", "24/7", "Proactive Defense", "Human Intelligence") followed by
  **numbered process cards #1–#4** in a horizontal row with arrows, and a glowing horizon arc at the bottom.
- **Remaining sections:**
  - a portfolio carousel
  - a testimonial row that mixes a stat tile ("98%"), a quote card, and a chart tile ("−93%")
  - an FAQ

**Take:**
- **the page rhythm: light sections broken up by inverted dark bands**
- dot/square eyebrow chips with two-tone headings everywhere
- the optional hero stat-tile bento, the numbered process cards (mobile form of §5.7), and the gauge card
  beside a step list
- the testimonial row that mixes quotes with stat tiles

**Reject:** the red hue, glossy 3D renders, and the saturated gradient tiles.

### 4. Etched: footer (user asked "I want my footer to look like this")
A light grey page (`#EEE`-ish).
- **Drawing:** a very large, very detailed **monochrome line-art technical drawing** (a PCB/chip board:
  capacitors, chip grids, traces, connectors) in thin grey strokes, centered at about 70% of the page width.
  It sits directly on a full-width 1px hairline, as if the drawing rests on the baseline.
- **Link row:** under the line, four mono uppercase links **spread across the full width** with
  `justify-between`: LEGAL · MEDIA · CAREERS · JOIN US.
- **Bottom row:**
  - a huge regular-weight grotesk statement on the left ("Etched is faster.", about 112px, tight tracking)
  - a mono uppercase address block in the middle ("ETCHED HQ / 3155 OLSEN DR / SAN JOSE, CA 95117")
  - on the right, a wide **solid black rectangular CTA** with a mono uppercase label and arrow
    ("GET ACCESS →")

**Take:** all of it. It is the footer spec (§5.16) and matches Inspo's `footer/statement` archetype. Our
drawing is a line-art **scan-topology schematic** (see spec §5.16).

---

## Inspo MCP references (https://inspomcp.dev)

The first `recommend` pass for the brief returned the macrostructure shortlist **Feature Stack** (picked) /
Marquee Hero / Bento Grid.
- Category gravity: 83% grotesk-sans display, 54% dark paper, split warm/cool accents.
- Our position: grotesk display (with the category), light paper (against it), no accent (against it).
  Light paper with no accent is the differentiator.

| Slug | Mode | What we take | What we reject | DESIGN.md |
|---|---|---|---|---|
| `primer-style` | light | Light hairline dev-tools layout, 0/6px radii, regular-weight display (h1 56/440, h2 34/500), card-index composition | Blue links, green gradients | [inspo/primer-style.md](./inspo/primer-style.md) |
| `deno-com` | light | Negative-tracked display (h1 72/-1.8px), 4px spacing base, 128px big step, calm low density | Bold 700 display (ours is 400–500), mint accent | [inspo/deno-com.md](./inspo/deno-com.md) |
| `novu-co` | dark | Dark "code-cave" band look for §5.3 / §5.7; mono code syntax used as a typographic device inside headlines; UI cards bento under the hero | Cyan/purple accents, pill CTAs | [inspo/novu-co.md](./inspo/novu-co.md) |
| `digitalocean-com` | dark | **Wireframe line-art as the hero element with stat cards laid over its edge**, which confirms our line-art hero and footer drawing; logo bar between text and visual | Teal ground, heavy 800 display | [inspo/digitalocean-com.md](./inspo/digitalocean-com.md) |
| `anytype-io` | light | **Ink line-art hero illustration** beside a two-tone headline inside a hairline hero box, running straight into a row of hairline cells with shared borders (our hero frame plus stat cells, §5.2); proof that full-ink strokes carry a light hero | Pink serif second tone, warm gradient wash, floating pill tab bar | capture only |
| `nextjs-org` | light | Same stack and faces (Geist); neutral near-black palette with no accent, radii 0/2/4, 80–96px section rhythm. It confirms our tokens are in the category's neutral register | Pill buttons, card-grid-everything, sitemap footer | capture only |

Full-page captures (for viewing):
`https://0nme3pk5am3urwa9.public.blob.vercel-storage.com/captures/<slug>/full.1440.webp`

### Review pass (2026-09-26)
A second pass (`recommend` with light / technical / monochrome, then one `search_screens` for neutral-accent
light paper, then `get_screen` + `compare` on `anytype-io`, `nextjs-org`, `ui-shadcn-com`, `primer-style`) against
the spec.
- **Evidence (24 light technical sites):** 79% light paper, 96% grotesk display, and accent split cool 42% /
  other 38% / warm 21%. With the light filter applied, light paper is the category norm, so the
  differentiator is the **absence of an accent**, not the light ground. Grotesk display stays with the
  category.
- The resulting changes are tracked in [`tasks/001-inspo-review-updates.md`](./tasks/001-inspo-review-updates.md).

### Inspo reference components used by the spec
We record structural notes only; the source is fetched with `get_reference_jsx({type, id})`.

| Spec section | Inspo `type/id` | Structure note we adopt |
|---|---|---|
| §5.1 Nav | `nav/floating-pill` | Centred bar that doesn't span the full width. Ours is square-cornered and bracket-framed, not a pill |
| §5.4 Logos | `logo-cloud/marquee` | Auto-scrolling wordmark loop, mask-faded edges, pauses on hover, static under reduced-motion |
| §5.5 Safety model | `features/bento` | Irregular spans beat the 3×2 default. The lead tile spans 2 columns; typography provides the variety |
| §5.5 Audit tool | `features/workbench` | Copy on the left, a **working** demo on the right, real strings, no faux chrome |
| §5.2 Stats | `stat/row` + `stat/annotated` | Four real numbers in tabular figures, each with a footnote marker to its source (`#methodology`). **No invented stats** |
| §5.5 Before/with | `features/compare` | Capability comparison framed by category ("traditional scanners"), never competitor names |
| §5.12b Proof wall | `testimonial/mosaic` | Four cards that lift on hover. **Placeholder slots only, never invented quotes** |
| §5.13 Pricing | `pricing/toggle` | Monthly/annual segmented control with radio semantics |
| `/pricing` compare | `pricing/table` | Spec-sheet table: thin rules, mono labels, **no zebra stripes**, row hover lift |
| §5.14 FAQ | `faq/accordion` | Native `<details>/<summary>`, single-open enforced by closing siblings, typographic `+ / −` |
| §5.15 CTA | `cta/inverted` | Ink ground, paper button; contrast does the work; one action only |
| `/demo` form | (`cta/form-led`, success state only) | form-led is a **single-field** archetype, so the six-field demo form borrows only its success collapse and mono error captions. It lives on `/demo`, not in the §5.15 band |
| §5.16 Footer | `footer/statement` | One big sentence as the brand's last word, then a quiet sign-off row |

**Gotcha from Inspo sources:** they reference role-named variables (`--color-bg`, `--color-fg`,
`--color-fg-muted`, `--color-accent`, `.rule`). When porting one, map them to our tokens: bg → `--background`,
fg → `--foreground`, fg-muted → `--muted-foreground`, `rule` → `border-border`, and accent → `--foreground`
(we have no accent). An undefined custom property fails silently.

---

## Inspo MCP setup (for the implementing agent)
It is hosted, free, and needs no auth. It is already in the user-scope `~/.claude.json` as `inspo`. To give
project-scoped access, add this to `.mcp.json` at the repo root **after** the Next.js scaffold exists
(`create-next-app` may refuse a non-empty directory):

```json
{ "mcpServers": { "inspo": { "type": "http", "url": "https://inspomcp.dev/api/mcp" } } }
```

If the tools don't appear in a session, run `/mcp` to reconnect or restart Claude Code.
- Start with `recommend(brief)`, then `search_screens`.
- Use `get_screen` / `get_design_system` on 3–5 keepers and `get_reference_jsx` for components.
- Keep to that budget; Inspo asks for it.
