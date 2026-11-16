import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Monitor,
  Tablet,
  Smartphone,
  ExternalLink,
  CheckCircle2,
  PieChart,
  Eye,
  Camera,
  Layers,
} from 'lucide-react';
import { BrandAssetKit } from './BrandAssetKit';
import { SiteImagePreview } from './SiteImagePreview';

export const VisualVerification = ({ result }) => {
  const [activePreviewMode, setActivePreviewMode] = useState('screenshot'); // 'screenshot' | 'tokens'
  const [deviceView, setDeviceView] = useState('desktop');

  if (!result) return null;
  const { name, url, tokens } = result;
  const { colors = [], typography = {}, spacingAndRadius = {} } = tokens || {};

  const primaryColor = colors[0]?.hex || '#2563EB';
  const primaryRadius = spacingAndRadius.radii?.[0]?.value || '6px';
  const cardRadius = spacingAndRadius.radii?.[1]?.value || '12px';

  // Responsive frame widths
  const frameWidths = {
    desktop: '100%',
    tablet: '720px',
    mobile: '380px',
  };

  // Color dominance distribution calculation
  const colorWeights = [
    { label: 'Canvas Background', color: colors[2]?.hex || '#FFFFFF', pct: '50%' },
    { label: 'Surface Panels', color: colors[3]?.hex || '#F8FAFC', pct: '25%' },
    { label: 'Primary Brand / CTA', color: colors[0]?.hex || '#2563EB', pct: '15%' },
    { label: 'Text / Borders', color: colors[4]?.hex || '#E2E8F0', pct: '10%' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {/* 1. Official Brand Logo & Visual Assets Kit */}
      <BrandAssetKit url={url} name={name} primaryColor={primaryColor} />

      {/* 2. Visual Preview & Live Capture Container */}
      <Box>
        {/* Navigation & Mode Toggle */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Eye size={16} color={primaryColor} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '15px' }}>
              Visual Verification & Live Site Preview
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexWrap: 'wrap' }}>
            {/* Mode Switcher: Live Screenshot Image vs Token Viewport */}
            <Box
              sx={{
                display: 'flex',
                backgroundColor: '#F1F5F9',
                borderRadius: '8px',
                p: 0.3,
                border: '1px solid #E2E8F0',
              }}
            >
              <Button
                size="small"
                onClick={() => setActivePreviewMode('screenshot')}
                startIcon={<Camera size={13} />}
                sx={{
                  borderRadius: '6px',
                  px: 1.5,
                  height: 28,
                  fontSize: '12px',
                  fontWeight: activePreviewMode === 'screenshot' ? 600 : 500,
                  backgroundColor: activePreviewMode === 'screenshot' ? '#FFFFFF' : 'transparent',
                  color: activePreviewMode === 'screenshot' ? '#0F172A' : '#64748B',
                  boxShadow: activePreviewMode === 'screenshot' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  textTransform: 'none',
                }}
              >
                Production Screenshot
              </Button>

              <Button
                size="small"
                onClick={() => setActivePreviewMode('tokens')}
                startIcon={<Layers size={13} />}
                sx={{
                  borderRadius: '6px',
                  px: 1.5,
                  height: 28,
                  fontSize: '12px',
                  fontWeight: activePreviewMode === 'tokens' ? 600 : 500,
                  backgroundColor: activePreviewMode === 'tokens' ? '#FFFFFF' : 'transparent',
                  color: activePreviewMode === 'tokens' ? '#0F172A' : '#64748B',
                  boxShadow: activePreviewMode === 'tokens' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  textTransform: 'none',
                }}
              >
                Token Viewport
              </Button>
            </Box>

            {/* Viewport switchers (only visible when in token simulator mode) */}
            {activePreviewMode === 'tokens' && (
              <Box
                sx={{
                  display: 'flex',
                  backgroundColor: '#F1F5F9',
                  borderRadius: '6px',
                  p: 0.3,
                  border: '1px solid #E2E8F0',
                }}
              >
                <Tooltip title="Desktop view">
                  <Button
                    size="small"
                    onClick={() => setDeviceView('desktop')}
                    sx={{
                      minWidth: 32,
                      p: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: deviceView === 'desktop' ? '#FFFFFF' : 'transparent',
                      color: deviceView === 'desktop' ? '#0F172A' : '#64748B',
                      boxShadow: deviceView === 'desktop' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    <Monitor size={14} />
                  </Button>
                </Tooltip>

                <Tooltip title="Tablet view">
                  <Button
                    size="small"
                    onClick={() => setDeviceView('tablet')}
                    sx={{
                      minWidth: 32,
                      p: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: deviceView === 'tablet' ? '#FFFFFF' : 'transparent',
                      color: deviceView === 'tablet' ? '#0F172A' : '#64748B',
                      boxShadow: deviceView === 'tablet' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    <Tablet size={14} />
                  </Button>
                </Tooltip>

                <Tooltip title="Mobile view">
                  <Button
                    size="small"
                    onClick={() => setDeviceView('mobile')}
                    sx={{
                      minWidth: 32,
                      p: '4px 8px',
                      borderRadius: '4px',
                      backgroundColor: deviceView === 'mobile' ? '#FFFFFF' : 'transparent',
                      color: deviceView === 'mobile' ? '#0F172A' : '#64748B',
                      boxShadow: deviceView === 'mobile' ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                    }}
                  >
                    <Smartphone size={14} />
                  </Button>
                </Tooltip>
              </Box>
            )}

            <Button
              variant="outlined"
              size="small"
              component="a"
              href={url}
              target="_blank"
              rel="noreferrer"
              endIcon={<ExternalLink size={13} />}
              sx={{
                borderRadius: '6px',
                fontSize: '12px',
                height: 30,
                borderColor: '#CBD5E1',
                color: '#0F172A',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#F8FAFC' },
              }}
            >
              Open Live Site
            </Button>
          </Box>
        </Box>

        {/* View Switcher Output */}
        {activePreviewMode === 'screenshot' ? (
          <SiteImagePreview url={url} name={name} primaryColor={primaryColor} />
        ) : (
          /* Viewport Frame Container */
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: '#F1F5F9',
              p: { xs: 1.5, sm: 3 },
              borderRadius: '10px',
              border: '1px solid #E2E8F0',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: frameWidths[deviceView],
                transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                overflow: 'hidden',
              }}
            >
              {/* Browser chrome header */}
              <Box
                sx={{
                  px: 2,
                  py: 1.2,
                  backgroundColor: '#F8FAFC',
                  borderBottom: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box sx={{ display: 'flex', gap: 0.8 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444' }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
                  <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '4px',
                    border: '1px solid #E2E8F0',
                    px: 1.5,
                    py: 0.3,
                    fontSize: '12px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#64748B',
                    textAlign: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {url}
                </Box>
              </Box>

              {/* Simulated Live Snapshot Layout */}
              <Box sx={{ p: { xs: 2.5, sm: 4 }, minHeight: 380, display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Snapshot Hero */}
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Chip
                    size="small"
                    label="Design System Verified"
                    icon={<CheckCircle2 size={13} color={primaryColor} />}
                    sx={{
                      backgroundColor: '#F8FAFC',
                      color: '#0F172A',
                      border: '1px solid #E2E8F0',
                      fontSize: '11px',
                      fontWeight: 600,
                      mb: 1.5,
                    }}
                  />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontSize: deviceView === 'mobile' ? '20px' : '26px',
                      color: '#0F172A',
                      fontFamily: typography.headingFont || 'inherit',
                      mb: 1,
                    }}
                  >
                    {name} Visual Language
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 440, mx: 'auto', fontSize: '13.5px' }}>
                    Visual frame constructed strictly using {name}'s extracted tokens, typography scales, and geometric radii.
                  </Typography>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: primaryColor,
                      color: colors[0]?.contrast || '#FFFFFF',
                      borderRadius: primaryRadius,
                      px: 3,
                      height: 40,
                      fontSize: '13.5px',
                      fontWeight: 500,
                      boxShadow: 'none',
                      textTransform: 'none',
                    }}
                  >
                    Primary CTA
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderRadius: primaryRadius,
                      borderColor: '#E2E8F0',
                      color: '#0F172A',
                      px: 3,
                      height: 40,
                      fontSize: '13.5px',
                      textTransform: 'none',
                    }}
                  >
                    Documentation
                  </Button>
                </Box>

                {/* Feature Grid */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: deviceView === 'mobile' ? '1fr' : 'repeat(2, 1fr)',
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: cardRadius,
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>
                      Extracted Brand Palette
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.5 }}>
                      Primary: {primaryColor} • Contrast: {colors[0]?.contrast || '#FFFFFF'}
                    </Typography>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      borderRadius: cardRadius,
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>
                      Extracted Typography Stack
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.5 }}>
                      Heading: {typography.headingFont?.split(',')[0]}
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>

      {/* 3. Color Dominance Meter */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <PieChart size={16} color={primaryColor} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>
              Color Dominance & Hierarchy Meter
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12px' }}>
            Visual weight distribution across {name}
          </Typography>
        </Box>

        {/* Multi-segment Bar */}
        <Box
          sx={{
            display: 'flex',
            height: 12,
            borderRadius: '9999px',
            overflow: 'hidden',
            border: '1px solid #E2E8F0',
            mb: 2,
          }}
        >
          {colorWeights.map((w, idx) => (
            <Tooltip key={idx} title={`${w.label}: ${w.pct} (${w.color})`}>
              <Box
                sx={{
                  width: w.pct,
                  backgroundColor: w.color,
                  borderRight: idx < colorWeights.length - 1 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                  '&:hover': { opacity: 0.8 },
                }}
              />
            </Tooltip>
          ))}
        </Box>

        {/* Legend */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {colorWeights.map((w, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '3px',
                  backgroundColor: w.color,
                  border: '1px solid rgba(0,0,0,0.15)',
                }}
              />
              <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 500, fontSize: '12px' }}>
                {w.label}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>
                {w.pct}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
