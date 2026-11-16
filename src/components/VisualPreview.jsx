import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  Stack,
  Button,
} from '@mui/material';
import {
  Check,
  Palette,
  Type,
  Layers,
} from 'lucide-react';

export const VisualPreview = ({ tokens }) => {
  const [copiedHex, setCopiedHex] = useState(null);

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const { colors = [], typography = {}, spacingAndRadius = {}, components = {} } = tokens || {};

  const primaryColor = colors[0]?.hex || '#2563EB';
  const primaryContrast = colors[0]?.contrast || '#FFFFFF';
  const primaryRadius = spacingAndRadius.radii?.[0]?.value || '6px';
  const cardRadius = spacingAndRadius.radii?.[1]?.value || '8px';

  const headingFamily = typography.headingFont?.split(',')[0]?.replace(/['"]/g, '') || 'System';
  const bodyFamily = typography.bodyFont?.split(',')[0]?.replace(/['"]/g, '') || 'System';
  const monoFamily = typography.monoFont?.split(',')[0]?.replace(/['"]/g, '') || 'Monospace';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* 1. Color Palette Tokens */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Palette size={18} color={primaryColor} />
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px', color: '#000000' }}>
              Extracted Color Tokens
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#4D4D4D', fontSize: '12px' }}>
            Click swatch to copy hex code
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 2,
          }}
        >
          {colors.map((color, index) => {
            const isCopied = copiedHex === color.hex;
            return (
              <Paper
                key={index}
                onClick={() => handleCopyColor(color.hex)}
                sx={{
                  p: '16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E6E6E6',
                  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
                  '&:hover': {
                    borderColor: primaryColor,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {/* Swatch preview box */}
                <Box
                  sx={{
                    height: 64,
                    borderRadius: '6px',
                    backgroundColor: color.hex,
                    mb: 1.5,
                    border: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {isCopied && (
                    <Box
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        px: 1.2,
                        py: 0.4,
                        borderRadius: '9999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                      }}
                    >
                      <Check size={12} color="#FFFFFF" />
                      <Typography variant="caption" sx={{ color: '#FFFFFF', fontWeight: 500, fontSize: '11px' }}>
                        Copied
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Token Details */}
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#000000', mb: 0.3, fontSize: '14px' }}>
                  {color.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#0F172A',
                      fontWeight: 600,
                      fontSize: '12px',
                    }}
                  >
                    {color.hex}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#4D4D4D',
                      fontSize: '11px',
                    }}
                  >
                    {color.role}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#E6E6E6' }} />

      {/* 2. Typography Hierarchy (Dynamic to website!) */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Type size={18} color={primaryColor} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px', color: '#000000' }}>
            Typography Hierarchy: {headingFamily}
          </Typography>
        </Box>

        {/* Font Families */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
          <Chip
            size="small"
            label={`Headlines: ${headingFamily}`}
            sx={{ backgroundColor: '#F5F5F5', color: '#000000', border: '1px solid #E6E6E6', borderRadius: '9999px', fontSize: '12px', fontWeight: 500 }}
          />
          <Chip
            size="small"
            label={`Body: ${bodyFamily}`}
            sx={{ backgroundColor: '#F5F5F5', color: '#4D4D4D', border: '1px solid #E6E6E6', borderRadius: '9999px', fontSize: '12px' }}
          />
          <Chip
            size="small"
            label={`Code: ${monoFamily}`}
            sx={{ backgroundColor: '#F5F5F5', color: '#4D4D4D', border: '1px solid #E6E6E6', borderRadius: '9999px', fontSize: '12px' }}
          />
        </Box>

        {/* Scale Samples */}
        <Paper
          sx={{
            p: '28px',
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E6E6E6',
          }}
        >
          <Stack spacing={2.5}>
            {typography.scale?.map((item, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  justifyContent: 'space-between',
                  pb: 2,
                  borderBottom: idx < typography.scale.length - 1 ? '1px solid #E6E6E6' : 'none',
                }}
              >
                <Box sx={{ maxWidth: { xs: '100%', sm: '65%' }, mb: { xs: 0.5, sm: 0 } }}>
                  <Typography
                    sx={{
                      fontSize: `clamp(14px, ${parseInt(item.size, 10) * 0.55}px, ${item.size})`,
                      fontWeight: parseInt(item.weight, 10) || 400,
                      lineHeight: item.lineHeight || 1.3,
                      color: '#000000',
                      fontFamily: typography.headingFont || 'inherit',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    The quick brown fox jumps over the lazy dog
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    size="small"
                    label={item.level}
                    sx={{
                      backgroundColor: '#F5F5F5',
                      color: '#4D4D4D',
                      fontSize: '11px',
                      height: 22,
                      borderRadius: '9999px',
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      fontFamily: 'JetBrains Mono, monospace',
                      color: '#0F172A',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {item.size} / w{item.weight}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        </Paper>
      </Box>

      <Divider sx={{ borderColor: '#E6E6E6' }} />

      {/* 3. Spacing & Geometric Radii */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Layers size={18} color={primaryColor} />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '18px', color: '#000000' }}>
            Spacing, Radii & Component Guidelines
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2.5,
          }}
        >
          {/* Radii Breakdown */}
          <Paper
            sx={{
              p: '28px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E6E6E6',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#000000', fontWeight: 600, mb: 2, fontSize: '14.4px' }}>
              Extracted Corner Radii
            </Typography>
            <Stack spacing={2}>
              {spacingAndRadius.radii?.map((r, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: r.value,
                        backgroundColor: '#F5F5F5',
                        border: `1.5px solid ${primaryColor}`,
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#000000', fontWeight: 400, fontSize: '14px' }}>
                      {r.name}
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ fontFamily: 'JetBrains Mono, monospace', color: '#0F172A', fontSize: '12px', fontWeight: 600 }}>
                    {r.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Paper>

          {/* Component Preview Card */}
          <Paper
            sx={{
              p: '28px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E6E6E6',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="subtitle2" sx={{ color: '#000000', fontWeight: 600, mb: 2, fontSize: '14.4px' }}>
              Extracted UI Component Anatomy
            </Typography>

            <Box
              sx={{
                p: '20px',
                borderRadius: cardRadius,
                backgroundColor: '#F5F5F5',
                border: '1px solid #E6E6E6',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              {/* Primary & Secondary Action Button Preview with actual extracted styles! */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: primaryColor,
                    color: primaryContrast,
                    borderRadius: primaryRadius,
                    height: 42,
                    px: '20px',
                    fontSize: '14px',
                    fontWeight: 500,
                    boxShadow: 'none',
                    textTransform: 'none',
                    fontFamily: typography.bodyFont || 'inherit',
                    '&:hover': {
                      backgroundColor: primaryColor,
                      filter: 'brightness(1.1)',
                    },
                  }}
                >
                  Primary Action
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: primaryRadius,
                    height: 42,
                    px: '20px',
                    backgroundColor: '#FFFFFF',
                    borderColor: '#E6E6E6',
                    color: primaryColor,
                    fontSize: '14px',
                    fontWeight: 500,
                    textTransform: 'none',
                    fontFamily: typography.bodyFont || 'inherit',
                    '&:hover': {
                      backgroundColor: '#FFFFFF',
                      borderColor: primaryColor,
                    },
                  }}
                >
                  Secondary
                </Button>
              </Box>

              {/* Status Chips */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Chip
                  size="small"
                  label="Primary Accent"
                  sx={{
                    backgroundColor: '#FFFFFF',
                    color: primaryColor,
                    border: `1px solid ${primaryColor}`,
                    borderRadius: primaryRadius,
                    fontSize: '12px',
                    fontWeight: 500,
                  }}
                />
                <Chip
                  size="small"
                  label="Surface Contrast"
                  sx={{
                    backgroundColor: '#FFFFFF',
                    color: '#4D4D4D',
                    border: '1px solid #E6E6E6',
                    borderRadius: primaryRadius,
                    fontSize: '12px',
                  }}
                />
              </Box>

              {components.buttonPrimary && (
                <Box sx={{ mt: 0.5, p: 1.2, borderRadius: '4px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                  <Typography variant="caption" sx={{ color: '#0F172A', fontFamily: 'JetBrains Mono, monospace', fontSize: '11.5px', fontWeight: 500, display: 'block' }}>
                    /* Button Rule */ {components.buttonPrimary}
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};
