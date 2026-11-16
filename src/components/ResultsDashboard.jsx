import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Tabs,
  Tab,
  Chip,
  Container,
} from '@mui/material';
import { FileCode, Eye, Globe, Clock, Sliders, Monitor, Code2, Sparkles } from 'lucide-react';
import { MarkdownViewer } from './MarkdownViewer';
import { VisualPreview } from './VisualPreview';
import { ComponentSandbox } from './ComponentSandbox';
import { FrameworkExports } from './FrameworkExports';
import { VisualVerification } from './VisualVerification';
import { MotionLab } from './MotionLab';
import { ExportActions } from './ExportActions';
import { BrandLogo } from './BrandLogo';
import { generateFullMarkdown } from '../utils/markdownGenerator';

export const ResultsDashboard = ({ result, onReset }) => {
  const [tabIndex, setTabIndex] = useState(0);

  if (!result) return null;

  const { name, url, badge, tagline, tokens, markdown, extractedAt } = result;
  const formattedDate = extractedAt ? new Date(extractedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now';

  // Ensure markdown always has full token specifications
  const activeMarkdown =
    markdown && markdown.split('\n').length >= 15
      ? markdown
      : generateFullMarkdown(result);

  const tabItems = [
    { label: 'Markdown (DESIGN.md)', icon: <FileCode size={15} /> },
    { label: 'Visual Tokens', icon: <Eye size={15} /> },
    { label: 'Interactive Sandbox', icon: <Sliders size={15} /> },
    { label: 'Motion & Animations', icon: <Sparkles size={15} /> },
    { label: 'Framework Exports', icon: <Code2 size={15} /> },
    { label: 'Visual Assets & Preview', icon: <Monitor size={15} /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ my: 4, px: { xs: 2, md: 3 } }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
          overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
        }}
      >
        {/* Meta Header */}
        <Box
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderBottom: '1px solid #E6E6E6',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 2,
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Left Metadata */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            <BrandLogo
              url={url}
              name={name}
              size={48}
              borderRadius="10px"
              primaryColor={tokens?.colors?.[0]?.hex || '#2563EB'}
            />
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.5, flexWrap: 'wrap' }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#000000', fontSize: '24px', fontFamily: '"Rethink Sans", sans-serif' }}>
                  {name}
                </Typography>
                <Chip
                  label={badge || 'Extracted System'}
                  size="small"
                  sx={{
                    backgroundColor: '#F1F5F9',
                    color: '#0F172A',
                    border: '1px solid #CBD5E1',
                    borderRadius: '9999px',
                    fontWeight: 600,
                    fontSize: '11px',
                    height: 24,
                  }}
                />
              </Box>

              {tagline && (
                <Typography variant="body2" sx={{ color: '#4D4D4D', mb: 1, fontSize: '14px', fontFamily: '"Rethink Sans", sans-serif' }}>
                  {tagline}
                </Typography>
              )}

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, color: '#4D4D4D' }}>
                  <Globe size={14} color="#0F172A" />
                  <Typography
                    variant="caption"
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: '#0F172A',
                      textDecoration: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '12px',
                      fontWeight: 500,
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    {url}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, color: '#4D4D4D' }}>
                  <Clock size={13} />
                  <Typography variant="caption" sx={{ fontSize: '12px', fontFamily: '"Rethink Sans", sans-serif' }}>
                    {formattedDate}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Right Export Actions */}
          <ExportActions
            markdown={activeMarkdown}
            filename={`${name.toLowerCase()}-DESIGN.md`}
            onReset={onReset}
          />
        </Box>

        {/* Tab Navigation (5 Segmented Pill Tabs) */}
        <Box
          sx={{
            px: { xs: 1.5, sm: 2.5 },
            py: 1,
            borderBottom: '1px solid #E6E6E6',
            backgroundColor: '#F8FAFC',
            overflowX: 'auto',
          }}
        >
          <Tabs
            value={tabIndex}
            onChange={(_, val) => setTabIndex(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ minHeight: 38 }}
          >
            {tabItems.map((tab, idx) => (
              <Tab
                key={idx}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                sx={{
                  borderRadius: '9999px',
                  mr: 1,
                  fontSize: '13px',
                  minHeight: 36,
                  fontWeight: tabIndex === idx ? 600 : 500,
                  backgroundColor: tabIndex === idx ? '#FFFFFF' : 'transparent',
                  color: tabIndex === idx ? '#0F172A' : '#64748B',
                  boxShadow: tabIndex === idx ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  whiteSpace: 'nowrap',
                }}
              />
            ))}
          </Tabs>
        </Box>

        {/* Tab Content Panels */}
        <Box sx={{ p: { xs: 2.5, sm: 3.5 } }}>
          {tabIndex === 0 && (
            <MarkdownViewer markdown={activeMarkdown} />
          )}

          {tabIndex === 1 && (
            <VisualPreview tokens={tokens} />
          )}

          {tabIndex === 2 && (
            <ComponentSandbox tokens={tokens} name={name} />
          )}

          {tabIndex === 3 && (
            <MotionLab result={result} />
          )}

          {tabIndex === 4 && (
            <FrameworkExports tokens={tokens} name={name} />
          )}

          {tabIndex === 5 && (
            <VisualVerification result={result} />
          )}
        </Box>
      </Paper>
    </Container>
  );
};
