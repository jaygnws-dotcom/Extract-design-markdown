---
version: alpha
name: Context.dev
description: A bright, minimalist SaaS system with crisp blue accents, rounded pills, and spacious editorial hierarchy.
colors:
  primary: "#2563EB"
  secondary: "#4D4D4D"
  tertiary: "#E6E6E6"
  neutral: "#FFFFFF"
  surface: "#FFFFFF"
  on-surface: "#000000"
  error: "#D92D20"
  border: "#E6E6E6"
  muted: "#F5F5F5"
  accent-soft: "#EAF1FF"
typography:
  headline-display:
    fontFamily: Rethink Sans
    fontSize: 56px
    fontWeight: 400
    lineHeight: 60.48px
    letterSpacing: -1.96px
  headline-lg:
    fontFamily: Rethink Sans
    fontSize: 41px
    fontWeight: 400
    lineHeight: 49px
    letterSpacing: 0px
  headline-md:
    fontFamily: Rethink Sans
    fontSize: 30px
    fontWeight: 400
    lineHeight: 34.56px
    letterSpacing: 0px
  headline-sm:
    fontFamily: Rethink Sans
    fontSize: 22px
    fontWeight: 400
    lineHeight: 26px
    letterSpacing: 0px
  body-lg:
    fontFamily: Rethink Sans
    fontSize: 16.2px
    fontWeight: 400
    lineHeight: 26.325px
    letterSpacing: 0px
  body-md:
    fontFamily: Rethink Sans
    fontSize: 14.4px
    fontWeight: 400
    lineHeight: 22px
    letterSpacing: 0px
  body-sm:
    fontFamily: Rethink Sans
    fontSize: 12.6px
    fontWeight: 400
    lineHeight: 18px
    letterSpacing: 0px
  label-lg:
    fontFamily: Rethink Sans
    fontSize: 14.4px
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: 0px
  label-md:
    fontFamily: Rethink Sans
    fontSize: 12px
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: 0px
  label-sm:
    fontFamily: Rethink Sans
    fontSize: 10.8px
    fontWeight: 400
    lineHeight: 14px
    letterSpacing: 0px
  mono-sm:
    fontFamily: Doto
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.04em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 24px
  full: 9999px
spacing:
  xs: 6px
  sm: 14px
  md: 28px
  lg: 44px
  xl: 72px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 11px 18px
    size: 42px
  button-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 11px 18px
    size: 42px
  button-tertiary:
    backgroundColor: "transparent"
    textColor: "{colors.secondary}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 0px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 28px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    padding: 14px 18px
    height: 56px
  chip:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.full}"
    padding: 8px 12px
  hero-panel:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.xl}"
    padding: 28px
---

# Context.dev

## Overview

Context.dev presents itself as a modern, technical SaaS brand: clean, confident, and product-led. The tone is professional but approachable, with a strong emphasis on clarity, speed, and utility rather than ornament. The layout feels airy and centered, with ample white space and a precise blue accent that keeps the interface feeling engineered and trustworthy.

## Colors

- **Primary (#2563EB):** A vivid cobalt blue used for the brand mark, key actions, active states, and the large product shell. It signals momentum and technical credibility.
- **Secondary (#4D4D4D):** A restrained graphite gray for supporting navigation, secondary copy, and low-emphasis UI text.
- **Tertiary (#E6E6E6):** A soft neutral border tone used to separate controls and define subtle outlines without adding visual weight.
- **Neutral / Surface (#FFFFFF):** The main canvas color. The system relies on pure white space to create openness and let content breathe.
- **On-surface (#000000):** Strong black used for the hero headline and highest-emphasis text, giving the page a crisp editorial contrast.
- **Muted (#F5F5F5):** A light wash for inactive pills, segmented controls, and subdued surfaces.
- **Accent-soft (#EAF1FF):** A pale blue tint used in decorative or supportive contexts where the primary blue needs a lighter echo.
- **Error (#D92D20):** Reserved for destructive or invalid states; it does not appear prominently in the screenshot but should stay warm and clearly legible.

## Typography

The system is built on Rethink Sans, which gives the interface a contemporary, geometric, and slightly humanist feel. Headlines use a light 400 weight rather than a bold style, creating an elegant and modern tone; the largest headline is very large, tight, and compact with negative tracking for a polished landing-page look. Body and labels stay similarly light and consistent, with no aggressive weight changes, while the code-like or decorative data treatment can borrow from Doto for special machine/technical moments.

Headings should be used as follows:

- **headline-display:** Hero statements and the primary page message.
- **headline-lg / headline-md / headline-sm:** Section titles and product callouts, maintaining a clean hierarchy without heaviness.
- **body-lg / body-md / body-sm:** Paragraphs, nav items, and small supporting UI text.
- **label-lg / label-md / label-sm:** Pills, tabs, helper text, and small CTA labels.

Uppercase is not a dominant pattern here. Instead, the typography stays sentence-case and highly legible, with letter spacing mostly neutral except for the main hero where tighter tracking helps the oversized text feel balanced.

## Layout

The layout is fluid and centered, with a strong hero composition anchored in the middle of the viewport. Content spans wide but remains restrained by generous margins, creating a premium feel that favors whitespace over density. Vertical spacing is ample and rhythmic, using a scale that cleanly steps through 6px, 14px, 28px, 44px, and 72px to separate navigation, hero text, CTAs, and the product mockup.

Section padding should feel open, not crowded. Cards and framed product elements should use comfortable internal padding around 28px, while pill controls and button groups remain compact and horizontally aligned. The page should generally avoid cramped grids; instead, use centered alignment, broad breathing room, and generous inter-component spacing.

## Elevation & Depth

Depth is very subtle. The system relies more on contrast, borders, and tonal layering than on dramatic shadows. Buttons and panels feel tactile because of rounded forms and thin outlines rather than heavy elevation. Where shadows appear, they are soft and restrained, functioning as hairline separation rather than dramatic lift.

The main product panel uses a vivid blue surface with an inset-like, bordered feel. Secondary cards should remain mostly flat, with a 1px border or quiet shadow to distinguish them from the white background. Avoid stacking multiple shadow layers unless the component is meant to feel physically inset or floating very lightly above the page.

## Shapes

The shape language is soft and highly rounded. Buttons, chips, and interactive inputs favor pill geometry with `rounded.full`, while larger panels use gentle radii such as `rounded.md` or `rounded.xl`. The overall impression is friendly and modern, with rounded forms counterbalancing the technical nature of the product.

Use small radii sparingly for structural containers and reserve full rounding for primary controls and compact UI elements. Sharp corners are uncommon and should only appear where a deliberately minimal utility treatment is needed.

## Components

### Buttons

- **Primary buttons (`button-primary`)** are the most prominent CTA style: filled blue with white text, pill-shaped, and sized to around 42px high. They should be used for the main conversion action such as “Start for free.”
- **Secondary buttons (`button-secondary`)** are inverse or outlined companions: white background, blue text, and full rounding. They support secondary actions like “Book demo.”
- **Tertiary buttons (`button-tertiary`)** are low-emphasis text buttons with no visible container, used for navigation or subtle actions.
- Button padding should stay compact and balanced, with horizontal emphasis over vertical bulk. Hover states should brighten or slightly deepen the blue rather than introducing new shapes.

### Cards

Cards are clean white surfaces with a subtle border or hairline shadow. Use `card` for product summaries, content blocks, or info containers where clear structure matters more than depth. Internal padding should be generous enough to keep content airy but not wasteful.

### Inputs

Inputs should feel integrated with the hero and product shell: white surfaces, soft borders, and pill rounding where possible. The main search input treatment should remain spacious, with clear placeholder text and a visible action affordance on the right. Focus states should emphasize the blue accent without turning the control into a heavy frame.

### Chips and Tabs

Chips and segmented tabs are important in this design language. Active chips use white or blue-on-white emphasis inside a muted container, while inactive chips stay subdued and low contrast. Keep labels short, compact, and horizontally aligned, with minimal chrome.

### Navigation

Navigation items are lightweight and text-first. They should read as quiet supporting controls rather than dominant UI elements. Dropdown indicators and compact spacing should preserve the refined, uncluttered header feel.

### Decorative/Technical Elements

The dotted corner motifs and the product mockup framing are part of the visual identity. Use them sparingly as atmosphere or structure, not as primary UI decoration. If using technical text treatments, reserve `mono-sm` for machine-like, data-oriented moments only.

## Do's and Don'ts

- Do keep the interface airy, centered, and restrained, with generous whitespace around primary content.
- Do use the blue primary color sparingly but consistently for key actions, active states, and hero emphasis.
- Do favor rounded pills and soft corners for controls, especially buttons and search surfaces.
- Do keep typography light and modern; the system depends on scale and spacing more than heavy weight changes.
- Don't introduce large shadows, dark surfaces, or dense gradients that fight the minimalist feel.
- Don't use multiple competing accent colors; the system should remain anchored in white, black, gray, and blue.
- Don't make navigation or secondary actions visually louder than the main CTA.
- Don't crowd the layout with tight spacing or boxed sections that reduce the sense of openness.
