// Utility to generate comprehensive, production-grade DESIGN.md specifications
// for AI coding agents (Cursor, Claude, Windsurf, Antigravity).

import { getSiteMotionTokens } from './motionHelper.js';

export const generateFullMarkdown = ({
  name = 'Website',
  url = '',
  badge = 'Design System',
  tagline = '',
  tokens = {},
  extractedAt = null,
  description = '',
}) => {
  const dateStr = extractedAt
    ? new Date(extractedAt).toISOString().split('T')[0]
    : new Date().toISOString().split('T')[0];

  const colors = tokens?.colors || [];
  const typography = tokens?.typography || {};
  const spacingAndRadius = tokens?.spacingAndRadius || {};
  const components = tokens?.components || {};
  const radii = spacingAndRadius?.radii || [];
  const shadows = spacingAndRadius?.shadows || [];
  const typoScale = typography?.scale || [];

  const headingFont = typography?.headingFont || '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const bodyFont = typography?.bodyFont || '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const monoFont = typography?.monoFont || 'ui-monospace, Menlo, monospace';
  const baseUnit = spacingAndRadius?.baseUnit || '4px / 8px scale';

  const brandDesc =
    description ||
    tagline ||
    `${name}'s visual design system engineered for high legibility, cohesive brand recognition, and seamless component composition.`;

  const motion = getSiteMotionTokens(url, name, colors[0]?.hex || '#2563EB');

  return `# DESIGN SYSTEM SPECIFICATION: ${name}
> Target Domain: ${url || 'https://' + name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com'}
> System Classification: ${badge}
> Extracted Date: ${dateStr}
> Specification Standard: Context.dev System RFC v2

---

## 1. Brand Identity & Principles
${brandDesc}

### Design Pillars
- **Visual Discipline**: Strict chromatic hierarchy centered around brand identity and high contrast ratios.
- **Utilitarian Density**: Balanced whitespace engineered for frictionless content navigation and task efficiency.
- **Component Consistency**: Predictable interactive control states and geometric corner radii.

---

## 2. Color Palette & Semantic Tokens
| Token | Hex Value | Role | Contrast | Recommended Usage |
| :--- | :--- | :--- | :--- | :--- |
${colors
  .map(
    (c) =>
      `| \`--${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\` | \`${c.hex}\` | ${c.role} | \`${c.contrast || '#FFFFFF'}\` | UI elements matching ${c.role.toLowerCase()} |`
  )
  .join('\n')}

### CSS Variables Definition (:root)
\`\`\`css
:root {
${colors
  .map(
    (c) =>
      `  --${c.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}: ${c.hex}; /* ${c.role} */`
  )
  .join('\n')}
}
\`\`\`

---

## 3. Typography Hierarchy & Font Stacks
- **Heading Stack**: \`${headingFont}\`
- **Body / Interface Stack**: \`${bodyFont}\`
- **Code / Monospace Stack**: \`${monoFont}\`

### Typographic Scale
| Hierarchy Level | Font Size | Weight | Line Height | Usage Context |
| :--- | :--- | :--- | :--- | :--- |
${typoScale
  .map(
    (t) =>
      `| **${t.level}** | \`${t.size}\` | \`${t.weight}\` | \`${t.lineHeight}\` | ${t.level} typographic roles |`
  )
  .join('\n')}

### CSS Typography Mixins
\`\`\`css
${typoScale
  .map((t) => {
    const varName = t.level.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return `--type-${varName}: ${t.weight} ${t.size}/${t.lineHeight} ${t.level.toLowerCase().includes('hero') || t.level.toLowerCase().includes('title') || t.level.toLowerCase().includes('heading') ? headingFont.split(',')[0] : bodyFont.split(',')[0]}, sans-serif;`;
  })
  .join('\n')}
\`\`\`

---

## 4. Spacing Grid, Radii & Depth Tokens
- **Base Spacing Unit**: \`${baseUnit}\`

### Geometric Corner Radii
| Token Name | Radius Value | Target Controls & Containers |
| :--- | :--- | :--- |
${radii
  .map(
    (r) =>
      `| \`--radius-${r.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\` | \`${r.value}\` | ${r.name} controls & elements |`
  )
  .join('\n')}

### Elevation & Box Shadows
| Shadow Token | CSS Box-Shadow Value | Elevation Role |
| :--- | :--- | :--- |
${shadows
  .map(
    (s) =>
      `| \`--shadow-${s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}\` | \`${s.value}\` | ${s.name} depth layer |`
  )
  .join('\n')}

---

## 5. Core Component Anatomy & CSS Specifications

### Primary Action Button
\`\`\`css
/* Primary interactive call-to-action */
.btn-primary {
  ${components.buttonPrimary || `background: ${colors[0]?.hex || '#2563EB'}; color: #FFFFFF; border-radius: ${radii[0]?.value || '6px'}; padding: 8px 16px;`}
}
\`\`\`

### Card Container
\`\`\`css
/* Elevated content panel */
.card-surface {
  ${components.card || `background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: ${radii[1]?.value || '12px'}; padding: 20px;`}
}
\`\`\`

### Form Input Field
\`\`\`css
/* Standard interactive text input */
.input-control {
  ${components.input || `background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: ${radii[0]?.value || '6px'}; height: 40px; padding: 0 12px;`}
}
\`\`\`

---

## 6. Motion Tokens & Micro-Interactions
The motion system for **${name}** is engineered with strict timing scales and deceleration curves.

### Easing Functions
| Curve Name | Cubic Bezier Definition | Interaction Role |
| :--- | :--- | :--- |
| **Standard** | \`${motion.easings.standard}\` | Button hovers, micro-interactions |
| **Entrance** | \`${motion.easings.entrance}\` | Viewport reveals, modal dialog entries |
| **Hover** | \`${motion.easings.hover}\` | State shifts, tooltip appearances |
| **Bounce** | \`${motion.easings.bounce}\` | Spring physics, playful tactile feedback |

### Timing Durations
- **Instant**: \`${motion.durations.instant}\` (checkboxes, radio buttons, icons)
- **Fast**: \`${motion.durations.fast}\` (button hover, chip selection, tooltips)
- **Normal**: \`${motion.durations.normal}\` (card elevation, dropdown menus)
- **Slow**: \`${motion.durations.slow}\` (page transitions, complex modal reveals)

### Keyframe Animation Snippets
\`\`\`css
/* Shimmer Loading Skeleton */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* Scroll Entrance Fade & Slide */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
\`\`\`

---

## 7. AI Agent Implementation Directives
When implementing features or refactoring UI for **${name}**, AI coding agents (Cursor, Claude, Copilot, Antigravity) MUST obey these constraints:
1. **Never introduce arbitrary hex codes**: Use solely the extracted semantic tokens defined in Section 2.
2. **Preserve Font Pairings**: Ensure headings strictly use \`${headingFont.split(',')[0]}\` and body copy uses \`${bodyFont.split(',')[0]}\`.
3. **Respect Corner Geometry**: Apply \`${radii[0]?.value || '6px'}\` for interactive controls and \`${radii[1]?.value || '12px'}\` for cards and modals.
4. **Contrast Compliance**: Ensure text contrast meets WCAG AA standards using the contrast pairings defined in Section 2.
5. **Honor Motion Physics**: Use \`${motion.easings.standard}\` for all hover transitions and \`${motion.durations.fast}\` for button micro-interactions.
`;
};
