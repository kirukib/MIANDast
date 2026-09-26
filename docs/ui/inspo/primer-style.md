# Primer Style design system

> Extracted by [Inspo](https://github.com/Nutlope/inspo) (open source, MIT, powered by Together AI). Reference material for *intentional* design decisions: adapt, don't copy.

> Save this as `DESIGN.md` in your project and re-reference it as you build; re-fetch anytime at https://inspomcp.dev/d/primer-style/DESIGN.md

- **Source:** https://primer.style
- **Captured:** 2026-05-04
- **Mode:** light
- **Macrostructure:** Ecosystem Index

## Tone

The layout prioritizes clarity and modularity, presenting key features and branding elements in distinct, visually balanced blocks. The limited color palette and ample white space contribute to a clean, functional aesthetic.  ·  design system, ui kit, developer tools, primer style, github ui, minimalist design, swiss design, monochrome palette

## Colors

| Hex | Role (heuristic) |
|---|---|
| `#0716f6` | ink |
| `#0e2c9c` | ink |
| `#94b7ee` | accent |
| `#6eb184` | support |
| `#a4c6ac` | muted |

Color words: *muted*, *cool*, *pastel*

## Typography

Detected typefaces: **Mona Sans**, **-apple-system**, **Mona Sans VF**

| Role | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| h1 | Mona Sans | 56px | 440 | 1.1 | 0 |
| h2 | Mona Sans | 34px | 500 | 1.3 | 0 |
| h3 | Mona Sans | 22px | 480 | 1.4 | 0 |
| body | -apple-system | 16px | 400 | 1.5 | 0 |
| button | Mona Sans VF | 14px | 500 | 1.5 | 0 |

## Spacing scale

`16px` · `32px`

## Border radius

`0px` · `6px`

## Container

Max content width: **1440px**

## CSS variables exposed by the source

```css
:root {
  --brand-animation-variant-scaleInLeft-end: 1;
  --brand-text-weight-300: 400;
  --bgColor-black: #1f2328;
  --brand-control-radio-dot-checked-hover: color-mix(in srgb, #08872b, #000 26%);
  --brand-RiverBreakout-variant-gridline-spacing-outerBlock: 4rem;
  --brand-breakpoint-xlarge: 80rem;
  --brand-RiverAccordion-variant-gridline-spacing-outerInline: 4rem;
  --text-body-size-medium: .875rem;
  --brand-Label-color-green-blue-start: #08872b;
  --brand-Testimonial-quoteMarkBackground-teal: #daf9f5;
  --brand-color-text-muted: #58635b;
  --brand-SubNav-color-link-bgColor: #e4ebe6;
  --fontStack-sansSerif: "Mona Sans VF", -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --brand-Icon-color-coral: #e13f1b;
  --brand-control-checkbox-fg-checked-disabled: #fff;
  --brand-control-radio-border-disabled: #b6bfb8;
  --brand-breakpoint-large: 63.25rem;
  --brand-Tabs-list-borderWidth-active: max(1px, .0625rem);
  --brand-IDE-playPauseControl-rest: #d2d9d4;
  --brand-Tabs-item-underline-rest: #000;
  --brand-breakpoint-xsmall: 20rem;
  --text-codeBlock-size: .8125rem;
  --brand-Prose-blockquote-spacing: 1.5rem;
  --brand-control-medium-lineBoxHeight: 1rem;
  --brand-text-weight-normal: 400;
  --brand-VideoPlayer-closedCaption-text-padding: .625rem;
  --brand-Testimonial-quoteMarkColor-pink-blue-end: #0377ff;
  --brand-text-letterSpacing-100: .21px;
  --brand-body-fontFamily: "Mona Sans", "MonaSansFallback", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --brand-Icon-color-lemon: #a98906;
  --brand-Eyebrowbanner-fgColor-green-blue-end: #0377ff;
  --fgColor-success: #1a7f37;
  --brand-Grid-spacing-margin: 1rem;
  --border-severe-muted: .0625rem solid #fb8f4466;
  --brand-videoPlayer-title-fgColor: #f2f5f3;
  --brand-Eyebrowbanner-icon-background-teal: #daf9f5;
  --brand-text-size-700: 2.5rem;
  --brand-animation-variant-scaleInRight-distance: -1.25rem;
  --brand-videoPlayer-playButton-bgColor-rest: #0377ff;
  --brand-Testimonial-quote-color-default: #000;
  --text-body-shorthand-small: 400 .75rem / 1.625 "Mona Sans VF", -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
  --color-prettylights-syntax-meta-diff-range: #8250df;
  --brand-PricingOptions-item-bgColor-solid: #f2f5f3;
  --brand-Icon-background-coral: #fff0eb;
  --color-ansi-yellow-bright: #633c01;
  --brand-Testimonial-quoteMarkColor-indigo: #4956e5;
  --brand-box-spacing-normal: 1.5rem;
  --bgColor-open-muted: #dafbe1;
  --brand-Eyebrowbanner-fgColor-purple: #8534f3;
  --bgColor-white: #fff;
  --brand-borderRadius-small: .25rem;
  --brand-CTABanner-shadow-color-start: #08872b;
  --brand-Eyebrowbanner-fgColor-purple-red-end: #cf2230;
  --brand-color-text-emphasized: #08872b;
  --text-title-size-large: 2rem;
  --brand-River-label-margin: 1rem;
  --bgColor-open-emphasis: #1f883d;
  --brand-Accordion-toggle-color-end: #0d6731;
  --brand-stack-gap-spacious: 3rem;
  --color-prettylights-syntax-variable: #953800;
}
```

## Components present

- hero with cta
- logo cloud
- bento grid

## Notes for the agent

- **Adapt, don't copy.** The type ramp is a *starting point*. Scale it to your project's base size; preserve the *ratio*, not the literal pixels.
- **Color roles are heuristic** (luminance + dominance). Verify against the source URL before committing tokens.
- **Spacing** assumes a constant base step; round detected values to your project's scale (4 / 8 / 16) when implementing.
- **CSS variables** dumped above (when present) are the source's *actual* tokens - those are higher signal than guesses.
- This page's macrostructure is **Ecosystem Index**.

---

*Generated by Inspo. Open source under MIT, owned and operated by [Together AI](https://www.together.ai). Original site copyright remains with its authors.*
