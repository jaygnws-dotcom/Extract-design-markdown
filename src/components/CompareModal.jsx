import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Button,
  Chip,
  Divider,
} from '@mui/material';
import { X, GitCompare, Layers, Type, Palette } from 'lucide-react';
import { PRESETS } from '../data/presets';
import { BrandLogo } from './BrandLogo';

export const CompareModal = ({ open, onClose }) => {
  const [siteAId, setSiteAId] = useState(PRESETS[0]?.id || 'stripe');
  const [siteBId, setSiteBId] = useState(PRESETS[3]?.id || 'linear');

  const siteA = PRESETS.find((p) => p.id === siteAId) || PRESETS[0];
  const siteB = PRESETS.find((p) => p.id === siteBId) || PRESETS[1];

  const renderSideCard = (site, label) => {
    const { name, url, tokens } = site;
    const { colors = [], typography = {}, spacingAndRadius = {} } = tokens || {};
    const primary = colors[0]?.hex || '#2563EB';
    const primaryRadius = spacingAndRadius.radii?.[0]?.value || '6px';

    return (
      <Paper
        elevation={0}
        sx={{
          flex: 1,
          p: 3,
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          gap: 2.5,
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BrandLogo url={url} name={name} size={40} borderRadius="8px" primaryColor={primary} />
            <Box>
              <Chip
                size="small"
                label={label}
                sx={{
                  fontSize: '11px',
                  fontWeight: 600,
                  backgroundColor: '#F1F5F9',
                  color: '#0F172A',
                  borderRadius: '4px',
                  mb: 0.5,
                }}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '18px', color: '#0F172A' }}>
                {name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>
                {url}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: primaryRadius,
              backgroundColor: primary,
              boxShadow: `0 2px 8px ${primary}40`,
            }}
          />
        </Box>

        <Divider />

        {/* Color Palette Row */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1 }}>
            <Palette size={14} color="#0F172A" />
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', textTransform: 'uppercase', fontSize: '11px' }}>
              Extracted Color Palette
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 0.8, flexWrap: 'wrap' }}>
            {colors.slice(0, 5).map((c, i) => (
              <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.3 }}>
                <Box
                  sx={{
                    width: 28,
                    height: 28,
                    borderRadius: '4px',
                    backgroundColor: c.hex,
                    border: '1px solid rgba(0,0,0,0.1)',
                  }}
                />
                <Typography variant="caption" sx={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', color: '#64748B' }}>
                  {c.hex}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider />

        {/* Typography */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1 }}>
            <Type size={14} color="#0F172A" />
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', textTransform: 'uppercase', fontSize: '11px' }}>
              Typography Stack
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>
            Heading: {typography.headingFont?.split(',')[0]}
          </Typography>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.3, fontSize: '12px' }}>
            Body: {typography.bodyFont?.split(',')[0]}
          </Typography>
        </Box>

        <Divider />

        {/* Radii & Button Preview */}
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
            <Layers size={14} color="#0F172A" />
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', textTransform: 'uppercase', fontSize: '11px' }}>
              Corner Radius: {primaryRadius}
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: primary,
              color: colors[0]?.contrast || '#FFFFFF',
              borderRadius: primaryRadius,
              height: 38,
              fontSize: '13px',
              fontWeight: 500,
              boxShadow: 'none',
              textTransform: 'none',
              '&:hover': { backgroundColor: primary, filter: 'brightness(1.1)' },
            }}
          >
            {name} Action Button
          </Button>
        </Box>
      </Paper>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          p: { xs: 2, sm: 3 },
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
        },
      }}
    >
      <DialogTitle sx={{ p: 0, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '6px',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <GitCompare size={18} />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '18px', color: '#0F172A' }}>
              Design System Diff & Compare Tool
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12px' }}>
              Compare two extracted systems side-by-side to inspect palette contrast and geometry.
            </Typography>
          </Box>
        </Box>

        <IconButton size="small" onClick={onClose} sx={{ color: '#64748B' }}>
          <X size={18} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* Selectors Bar */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: 2,
            mb: 3,
            p: 2,
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
          }}
        >
          <FormControl fullWidth size="small">
            <InputLabel id="site-a-label" sx={{ fontSize: '13px' }}>Select System A</InputLabel>
            <Select
              labelId="site-a-label"
              value={siteAId}
              label="Select System A"
              onChange={(e) => setSiteAId(e.target.value)}
              sx={{ fontSize: '13px', borderRadius: '6px' }}
            >
              {PRESETS.map((p) => (
                <MenuItem key={p.id} value={p.id} sx={{ fontSize: '13px' }}>
                  {p.name} ({p.url.replace('https://', '')})
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="site-b-label" sx={{ fontSize: '13px' }}>Select System B</InputLabel>
            <Select
              labelId="site-b-label"
              value={siteBId}
              label="Select System B"
              onChange={(e) => setSiteBId(e.target.value)}
              sx={{ fontSize: '13px', borderRadius: '6px' }}
            >
              {PRESETS.map((p) => (
                <MenuItem key={p.id} value={p.id} sx={{ fontSize: '13px' }}>
                  {p.name} ({p.url.replace('https://', '')})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Side-by-Side Comparison Container */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2.5,
          }}
        >
          {renderSideCard(siteA, 'System A')}
          {renderSideCard(siteB, 'System B')}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
