# Design.md Generator — AI Context Design Token Extractor

A modern design system extraction and documentation platform built to analyze any website URL and generate structured, production-grade `DESIGN.md` specifications for AI coding agents (Cursor, Claude, Windsurf, Copilot).

Built strictly in accordance with the **Context.dev System Specification** (pure white canvas `#FFFFFF`, Rethink Sans typography, 400 base font weights, pill controls, and high-contrast charcoal accents).

---

## Features

- **Automated `DESIGN.md` Synthesis**: Complete 7-section design token specifications with color tables, CSS variables, typography scales, corner radii, component anatomy, motion tokens, and AI agent implementation directives.
- **Visual Tokens Explorer**: Chromatic swatches with HEX and contrast ratios, font hierarchy inspector, and interactive button mockups.
- **Interactive Component Sandbox**: Live test buttons, inputs, cards, and modal dialogs with a Light/Dark canvas switcher.
- **Motion & Animations Lab**: Interactive hover physics (magnetic lift, media zoom, spring bounce, neon glow), scroll entrance simulator with replay controls, and brand shimmer skeleton loaders.
- **Framework & Code Exports**: One-click copy and download for:
  - `tailwind.config.js`
  - `theme.css` (`:root` variables)
  - `.cursorrules` (AI agent system prompt)
  - `tokens.json` (W3C DTCG format)
- **Visual Verification & Brand Assets**:
  - Live production screenshot (1280×800) with full-resolution lightbox viewer.
  - Multi-resolution favicon scale (128px, 64px, 32px, 16px).
  - Light vs Dark logo contrast preview.
  - Color dominance hierarchy meter.
  - Responsive viewport frame simulator (Desktop, Tablet, Mobile).
- **Multi-Site Compare & Diff Tool**: Side-by-side token matrix comparing any two design systems.
- **Extraction History**: LocalStorage-backed history drawer with fixed 400px width.
- **Interactive Cursor Follower**: Ambient cursor spotlight and halo trailing effect.

---

## Tech Stack

- **Framework**: React 19 + Vite 8
- **UI Components & Styling**: Material-UI (MUI v9) + Emotion
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Markdown & Code**: `react-markdown` + `remark-gfm`
- **Linter**: Oxlint (0 errors, 0 warnings)

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/<your-username>/design-md-generator.git

# Navigate to project folder
cd design-md-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

---

## Deploy to Vercel

### Option 1: Vercel Web Dashboard (Recommended)
1. Push this repository to **GitHub**.
2. Go to [vercel.com](https://vercel.com) and log in.
3. Click **"Add New..."** &rarr; **"Project"**.
4. Import your GitHub repository.
5. Vercel automatically detects Vite:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **"Deploy"**.

### Option 2: Vercel CLI
```bash
npm install -g vercel
vercel
```
