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
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { extractCleanDomain, getLogoCandidates, getFaviconVariants } from '../utils/assetHelper';
import { BrandLogo } from './BrandLogo';

export const BrandAssetKit = ({ url, name, primaryColor = '#2563EB' }) => {
  const [copied, setCopied] = useState(false);
  const cleanDomain = extractCleanDomain(url);
  const candidates = getLogoCandidates(url, name);
  const primaryLogoUrl = candidates[0] || `https://unavatar.io/${cleanDomain}`;
  const favicons = getFaviconVariants(url);

  const handleCopyLogo = async () => {
    try {
      await navigator.clipboard.writeText(primaryLogoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E6E6E6',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Sparkles size={16} color={primaryColor} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '15px' }}>
            Brand Identity & Logo Assets
          </Typography>
          <Chip
            size="small"
            label="Verified Assets"
            icon={<ShieldCheck size={12} color="#059669" />}
            sx={{
              backgroundColor: '#ECFDF5',
              color: '#065F46',
              border: '1px solid #A7F3D0',
              fontWeight: 600,
              fontSize: '11px',
              height: 22,
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={copied ? 'Copied to clipboard!' : 'Copy primary logo URL'}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleCopyLogo}
              startIcon={copied ? <Check size={13} color="#059669" /> : <Copy size={13} />}
              sx={{
                borderRadius: '6px',
                height: 30,
                fontSize: '12px',
                borderColor: copied ? '#059669' : '#CBD5E1',
                color: copied ? '#059669' : '#0F172A',
                textTransform: 'none',
              }}
            >
              {copied ? 'Copied' : 'Copy Logo URL'}
            </Button>
          </Tooltip>

          <Button
            size="small"
            variant="outlined"
            component="a"
            href={primaryLogoUrl}
            target="_blank"
            rel="noreferrer"
            endIcon={<ExternalLink size={13} />}
            sx={{
              borderRadius: '6px',
              height: 30,
              fontSize: '12px',
              borderColor: '#CBD5E1',
              color: '#0F172A',
              textTransform: 'none',
            }}
          >
            Open HD Icon
          </Button>
        </Box>
      </Box>

      {/* Dual Canvas Cards: Light vs Dark Logo Presentation */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1.2fr' },
          gap: 2,
        }}
      >
        {/* Light Backdrop Card */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            minHeight: 140,
          }}
        >
          <BrandLogo url={url} name={name} size={64} borderRadius="12px" primaryColor={primaryColor} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', display: 'block', fontSize: '12px' }}>
              Light Surface Canvas
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}>
              #FFFFFF
            </Typography>
          </Box>
        </Box>

        {/* Dark Backdrop Card */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: '8px',
            backgroundColor: '#0F172A',
            border: '1px solid #1E293B',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.5,
            minHeight: 140,
          }}
        >
          <BrandLogo url={url} name={name} size={64} borderRadius="12px" primaryColor={primaryColor} />
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#FFFFFF', display: 'block', fontSize: '12px' }}>
              Dark Surface Canvas
            </Typography>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}>
              #0F172A
            </Typography>
          </Box>
        </Box>

        {/* Favicon Spectrum & Resolution Details */}
        <Box
          sx={{
            p: 2.5,
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', display: 'block', mb: 0.5, fontSize: '12px' }}>
              Multi-Resolution Favicon Scale
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontSize: '11.5px' }}>
              Standard icon sizes detected for application packaging and browser tabs.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: 1 }}>
            {favicons.map((fav, i) => (
              <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.8 }}>
                <Box
                  component="img"
                  src={fav.url}
                  alt={`${name} ${fav.label}`}
                  sx={{
                    width: i === 0 ? 32 : i === 1 ? 26 : i === 2 ? 20 : 16,
                    height: i === 0 ? 32 : i === 1 ? 26 : i === 2 ? 20 : 16,
                    borderRadius: '4px',
                    objectFit: 'contain',
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <Typography variant="caption" sx={{ fontSize: '10.5px', fontFamily: 'JetBrains Mono, monospace', color: '#64748B' }}>
                  {fav.size}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
