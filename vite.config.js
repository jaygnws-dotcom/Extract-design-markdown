import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { execFile } from 'child_process';

const antigravityPlugin = () => ({
  name: 'antigravity-ai-extractor',
  configureServer(server) {
    server.middlewares.use('/api/ai-extract', async (req, res) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        return;
      }

      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        try {
          const { url } = JSON.parse(body || '{}');
          if (!url) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'URL is required' }));
            return;
          }

          const exe = process.env.ANTIGRAVITY_AGENTAPI_EXE || 'C:\\Users\\offic\\AppData\\Local\\agy\\bin\\agy.exe';
          const prompt = `Analyze the website "${url}" and extract its exact design tokens. Return ONLY a single raw JSON object (strictly no markdown code fences, no extra text) with this exact schema:
{
  "name": "Site Name",
  "url": "${url}",
  "badge": "Category",
  "tagline": "Brief summary",
  "tokens": {
    "colors": [
      { "name": "Color Name", "hex": "#HEX", "role": "Role description", "contrast": "#HEX" }
    ],
    "typography": {
      "headingFont": "Font Name, sans-serif",
      "bodyFont": "Font Name, sans-serif",
      "monoFont": "Font Name, monospace",
      "scale": [
        { "level": "Hero Title", "size": "48px", "weight": "700", "lineHeight": "1.2" },
        { "level": "Heading 1", "size": "32px", "weight": "600", "lineHeight": "1.25" },
        { "level": "Body Regular", "size": "14px", "weight": "400", "lineHeight": "1.5" },
        { "level": "Caption", "size": "12px", "weight": "500", "lineHeight": "1.3" }
      ]
    },
    "spacingAndRadius": {
      "baseUnit": "4px / 8px scale",
      "radii": [
        { "name": "Control Radius", "value": "6px" },
        { "name": "Card Radius", "value": "12px" }
      ],
      "shadows": [
        { "name": "Card Shadow", "value": "0 2px 8px rgba(0, 0, 0, 0.08)" }
      ]
    },
    "components": {
      "buttonPrimary": "background: #HEX; color: #HEX; border-radius: 6px; padding: 8px 16px;",
      "card": "background: #HEX; border-radius: 12px; padding: 20px;",
      "input": "background: #HEX; border-radius: 6px; height: 40px;"
    }
  },
  "markdown": "# DESIGN SYSTEM SPECIFICATION: Site Name\\n..."
}`;

          execFile(
            exe,
            ['--dangerously-skip-permissions', '--print', prompt],
            { timeout: 35000 },
            (error, stdout, stderr) => {
              if (error) {
                console.error('[Antigravity API] Execution Error:', error, stderr);
                res.statusCode = 502;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'AI Agent query timed out or failed', details: error.message }));
                return;
              }

              try {
                // Strip markdown code fences if present
                let cleanOutput = stdout.trim();
                if (cleanOutput.startsWith('```')) {
                  cleanOutput = cleanOutput.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
                }

                const parsed = JSON.parse(cleanOutput);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(parsed));
              } catch (parseError) {
                console.error('[Antigravity API] Parse error on output:', parseError, stdout);
                res.statusCode = 502;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to parse AI output as JSON', raw: stdout }));
              }
            }
          );
        } catch (e) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    });
  },
});

export default defineConfig({
  plugins: [react(), antigravityPlugin()],
});
