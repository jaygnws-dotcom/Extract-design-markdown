// Generates tailwind.config.js from extracted tokens
export const generateTailwindConfig = (tokens, name = 'designSystem') => {
  const { colors = [], typography = {}, spacingAndRadius = {} } = tokens || {};

  const colorsObj = {};
  colors.forEach((c) => {
    const key = c.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    colorsObj[key] = c.hex;
  });

  const headingFont = typography.headingFont?.split(',')[0]?.replace(/['"]/g, '') || 'sans-serif';
  const bodyFont = typography.bodyFont?.split(',')[0]?.replace(/['"]/g, '') || 'sans-serif';
  const monoFont = typography.monoFont?.split(',')[0]?.replace(/['"]/g, '') || 'monospace';

  const radiiObj = {};
  spacingAndRadius.radii?.forEach((r) => {
    const key = r.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    radiiObj[key] = r.value;
  });

  return `/** @type {import('tailwindcss').Config} */
// Extracted theme for ${name}
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: ${JSON.stringify(colorsObj, null, 8).replace(/^ {6}/gm, '      ')},
      fontFamily: {
        heading: ['${headingFont}', 'sans-serif'],
        body: ['${bodyFont}', 'sans-serif'],
        mono: ['${monoFont}', 'monospace'],
      },
      borderRadius: ${JSON.stringify(radiiObj, null, 8).replace(/^ {6}/gm, '      ')},
    },
  },
  plugins: [],
};
`;
};

// Generates CSS variables / Shadcn compatible theme
export const generateCssVariables = (tokens) => {
  const { colors = [], spacingAndRadius = {} } = tokens || {};

  const primary = colors[0]?.hex || '#2563EB';
  const surface = colors[3]?.hex || '#FFFFFF';
  const text = colors[5]?.hex || '#000000';
  const border = colors[4]?.hex || '#E6E6E6';
  const radius = spacingAndRadius.radii?.[0]?.value || '6px';

  let vars = `/* Design Token CSS Variables */
:root {
  --background: ${colors.find(c => c.role.includes('Canvas'))?.hex || '#FFFFFF'};
  --foreground: ${text};
  --primary: ${primary};
  --primary-foreground: ${colors[0]?.contrast || '#FFFFFF'};
  --card: ${surface};
  --card-foreground: ${text};
  --border: ${border};
  --radius: ${radius};

  /* Semantic Color Scale */
`;

  colors.forEach((c) => {
    const slug = c.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    vars += `  --color-${slug}: ${c.hex};\n`;
  });

  vars += `}

/* Component Utility Classes */
.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border-radius: var(--radius);
  padding: 8px 16px;
  font-weight: 500;
}

.card-surface {
  background-color: var(--card);
  color: var(--card-foreground);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
}
`;

  return vars;
};

// Generates .cursorrules / AI prompt context
export const generateCursorRules = (tokens, name = 'Website') => {
  const { colors = [], typography = {}, spacingAndRadius = {} } = tokens || {};
  const primary = colors[0]?.hex || '#2563EB';
  const heading = typography.headingFont || 'sans-serif';
  const body = typography.bodyFont || 'sans-serif';
  const radii = spacingAndRadius.radii?.map(r => `${r.name}: ${r.value}`).join(', ') || '6px';

  return `# Cursor AI Rules & Context: ${name} Design System
You are an expert frontend engineer tasked with implementing UI matching ${name}.
Always adhere to these design constraints strictly:

## 1. Visual Theme & Colors
- Primary Interactive / CTA: ${primary}
- Accent Highlights: ${colors[1]?.hex || '#3B82F6'}
- Main Canvas: ${colors.find(c => c.role.includes('Canvas'))?.hex || '#FFFFFF'}
- Surface Cards: ${colors[3]?.hex || '#F5F5F5'}
- Borders: ${colors[4]?.hex || '#E6E6E6'}

## 2. Typography Guidelines
- Headings: Use ${heading} with light/clean weights (400 to 600). Avoid overly aggressive bolding.
- Body Copy: Use ${body} with relaxed line-heights (1.5 to 1.6).
- Monospace / Data: Use ${typography.monoFont || 'JetBrains Mono, monospace'}.

## 3. Geometric Radii & Spacing
- Scale: Follow an 8px rhythmic grid (4px, 8px, 16px, 24px, 32px, 48px).
- Radii: ${radii}.
- Do NOT introduce heavy solid drop shadows or unverified gradients. Use crisp 1px borders and subtle elevation.
`;
};

// Generates W3C Design Tokens JSON format
export const generateW3cTokens = (tokens, name = 'DesignSystem') => {
  const { colors = [], typography = {}, spacingAndRadius = {} } = tokens || {};

  const tokenObj = {
    $name: name,
    $version: '1.0.0',
    color: {},
    font: {
      heading: { $type: 'fontFamily', $value: typography.headingFont || 'sans-serif' },
      body: { $type: 'fontFamily', $value: typography.bodyFont || 'sans-serif' },
      mono: { $type: 'fontFamily', $value: typography.monoFont || 'monospace' },
    },
    radii: {},
  };

  colors.forEach((c) => {
    const slug = c.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    tokenObj.color[slug] = {
      $type: 'color',
      $value: c.hex,
      $description: c.role,
    };
  });

  spacingAndRadius.radii?.forEach((r) => {
    const slug = r.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    tokenObj.radii[slug] = {
      $type: 'dimension',
      $value: r.value,
    };
  });

  return JSON.stringify(tokenObj, null, 2);
};
