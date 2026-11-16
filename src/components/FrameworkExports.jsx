import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Tooltip,
} from '@mui/material';
import { Copy, Check, Download, FileCode, Sliders, Bot, Braces } from 'lucide-react';
import {
  generateTailwindConfig,
  generateCssVariables,
  generateCursorRules,
  generateW3cTokens,
} from '../utils/exportGenerators';

export const FrameworkExports = ({ tokens, name = 'Website' }) => {
  const [subTab, setSubTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const configs = [
    {
      id: 'tailwind',
      label: 'tailwind.config.js',
      icon: <Sliders size={14} />,
      content: generateTailwindConfig(tokens, name),
      filename: 'tailwind.config.js',
      lang: 'javascript',
    },
    {
      id: 'css',
      label: 'theme.css (Variables)',
      icon: <FileCode size={14} />,
      content: generateCssVariables(tokens),
      filename: 'theme.css',
      lang: 'css',
    },
    {
      id: 'cursor',
      label: '.cursorrules (AI Rules)',
      icon: <Bot size={14} />,
      content: generateCursorRules(tokens, name),
      filename: '.cursorrules',
      lang: 'markdown',
    },
    {
      id: 'w3c',
      label: 'tokens.json (W3C)',
      icon: <Braces size={14} />,
      content: generateW3cTokens(tokens, name),
      filename: 'tokens.json',
      lang: 'json',
    },
  ];

  const current = configs[subTab];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(current.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([current.content], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = current.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      {/* Subtab Selector & Action Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 1.5,
          borderBottom: '1px solid #E6E6E6',
          pb: 1.5,
        }}
      >
        <Tabs
          value={subTab}
          onChange={(_, val) => setSubTab(val)}
          sx={{ minHeight: 36 }}
        >
          {configs.map((c) => (
            <Tab
              key={c.id}
              icon={c.icon}
              iconPosition="start"
              label={c.label}
              sx={{
                borderRadius: '9999px',
                minHeight: 34,
                fontSize: '12.5px',
                mr: 1,
                backgroundColor: current.id === c.id ? '#F1F5F9' : 'transparent',
                color: current.id === c.id ? '#0F172A' : '#4D4D4D',
                fontWeight: current.id === c.id ? 600 : 400,
              }}
            />
          ))}
        </Tabs>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={`Copy ${current.filename}`}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleCopy}
              startIcon={copied ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
              sx={{
                borderRadius: '9999px',
                fontSize: '12.5px',
                height: 32,
                px: 1.5,
                borderColor: '#CBD5E1',
                color: '#0F172A',
                '&:hover': { backgroundColor: '#F8FAFC', borderColor: '#94A3B8' },
              }}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </Tooltip>

          <Tooltip title={`Download ${current.filename}`}>
            <Button
              variant="contained"
              size="small"
              onClick={handleDownload}
              startIcon={<Download size={14} />}
              sx={{
                borderRadius: '9999px',
                fontSize: '12.5px',
                height: 32,
                px: 1.8,
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#1E293B' },
              }}
            >
              Download
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Code Container */}
      <Box
        sx={{
          borderRadius: '8px',
          backgroundColor: '#0F172A',
          border: '1px solid #1E293B',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            px: 2,
            py: 1,
            backgroundColor: '#090D16',
            borderBottom: '1px solid #1E293B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'JetBrains Mono, monospace',
              color: '#94A3B8',
              fontSize: '12px',
            }}
          >
            {current.filename}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: '#64748B',
              fontSize: '11px',
              textTransform: 'uppercase',
              fontFamily: 'JetBrains Mono, monospace',
            }}
          >
            {current.lang}
          </Typography>
        </Box>

        <Box
          component="pre"
          sx={{
            p: 2.5,
            m: 0,
            maxHeight: 480,
            overflowY: 'auto',
            color: '#F8FAFC',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '13px',
            lineHeight: 1.6,
          }}
        >
          <code>{current.content}</code>
        </Box>
      </Box>
    </Box>
  );
};
