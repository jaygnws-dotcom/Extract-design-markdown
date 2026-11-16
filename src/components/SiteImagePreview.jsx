import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import {
  ExternalLink,
  Maximize2,
  RotateCw,
  Lock,
  Globe,
  Image as ImageIcon,
  X,
  Sparkles,
} from 'lucide-react';
import { getScreenshotUrl, extractCleanDomain } from '../utils/assetHelper';
import { BrandLogo } from './BrandLogo';

export const SiteImagePreview = ({ url, name, primaryColor = '#2563EB' }) => {
  const [cacheBuster, setCacheBuster] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const cleanDomain = extractCleanDomain(url);
  const screenshotSrc = `${getScreenshotUrl(url, 1280, 800)}${cacheBuster ? `&t=${cacheBuster}` : ''}`;

  const handleRefresh = () => {
    setImageLoaded(false);
    setImageError(false);
    setCacheBuster(Date.now());
  };

  return (
    <Box>
      {/* Browser Chrome Container */}
      <Box
        sx={{
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* Browser Top Navigation Bar */}
        <Box
          sx={{
            px: { xs: 1.5, sm: 2 },
            py: 1.2,
            backgroundColor: '#F8FAFC',
            borderBottom: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1.5,
            flexWrap: 'wrap',
          }}
        >
          {/* Traffic light dots + Domain Badge */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', gap: 0.8 }}>
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#EF4444' }} />
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#F59E0B' }} />
              <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10B981' }} />
            </Box>

            <Chip
              size="small"
              icon={<Sparkles size={11} color="#059669" />}
              label="Live Production Capture"
              sx={{
                height: 22,
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: '#ECFDF5',
                color: '#065F46',
                border: '1px solid #A7F3D0',
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            />
          </Box>

          {/* URL Bar */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 480,
              minWidth: 180,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '6px',
              px: 1.5,
              py: 0.4,
            }}
          >
            <Lock size={12} color="#059669" />
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11.5px',
                color: '#0F172A',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {url}
            </Typography>
          </Box>

          {/* Action buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <Tooltip title="Refresh snapshot">
              <IconButton
                size="small"
                onClick={handleRefresh}
                sx={{
                  color: '#64748B',
                  borderRadius: '6px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  p: '5px',
                  '&:hover': { color: '#0F172A', backgroundColor: '#F1F5F9' },
                }}
              >
                <RotateCw size={13} />
              </IconButton>
            </Tooltip>

            <Tooltip title="View full-size screenshot in lightbox">
              <Button
                size="small"
                variant="outlined"
                onClick={() => setLightboxOpen(true)}
                disabled={!imageLoaded || imageError}
                startIcon={<Maximize2 size={13} />}
                sx={{
                  height: 28,
                  fontSize: '11.5px',
                  borderRadius: '6px',
                  borderColor: '#E2E8F0',
                  color: '#0F172A',
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': { backgroundColor: '#F8FAFC', borderColor: '#CBD5E1' },
                }}
              >
                Full View
              </Button>
            </Tooltip>

            <Button
              size="small"
              variant="contained"
              component="a"
              href={url}
              target="_blank"
              rel="noreferrer"
              endIcon={<ExternalLink size={13} />}
              sx={{
                height: 28,
                fontSize: '11.5px',
                borderRadius: '6px',
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#1E293B', boxShadow: 'none' },
              }}
            >
              Visit
            </Button>
          </Box>
        </Box>

        {/* Screenshot Viewport Container */}
        <Box
          sx={{
            position: 'relative',
            backgroundColor: '#F1F5F9',
            minHeight: { xs: 260, sm: 420 },
            maxHeight: 560,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: imageLoaded ? 'zoom-in' : 'default',
          }}
          onClick={() => {
            if (imageLoaded && !imageError) setLightboxOpen(true);
          }}
        >
          {/* Loading Shimmer State */}
          {!imageLoaded && !imageError && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                backgroundColor: '#F8FAFC',
                zIndex: 2,
              }}
            >
              <CircularProgress size={26} thickness={4} sx={{ color: primaryColor }} />
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 500, fontSize: '13px' }}>
                Fetching live website screenshot for {cleanDomain}...
              </Typography>
            </Box>
          )}

          {/* Screenshot Image */}
          {!imageError ? (
            <Box
              component="img"
              src={screenshotSrc}
              alt={`${name} live website screenshot`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                objectPosition: 'top',
                transition: 'opacity 0.3s ease',
                opacity: imageLoaded ? 1 : 0,
              }}
            />
          ) : (
            /* Fallback if screenshot provider times out */
            <Box
              sx={{
                p: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <BrandLogo url={url} name={name} size={64} borderRadius="16px" primaryColor={primaryColor} />
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', mt: 1 }}>
                Live Website Preview: {name}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', maxWidth: 380, fontSize: '13px' }}>
                Automated screenshot renderer was unable to cache this URL directly. You can inspect the live site directly in a new window.
              </Typography>
              <Button
                variant="outlined"
                size="small"
                component="a"
                href={url}
                target="_blank"
                rel="noreferrer"
                startIcon={<Globe size={14} />}
                sx={{
                  mt: 1,
                  borderRadius: '9999px',
                  borderColor: '#CBD5E1',
                  color: '#0F172A',
                  textTransform: 'none',
                }}
              >
                Open {cleanDomain}
              </Button>
            </Box>
          )}
        </Box>

        {/* Footer info bar */}
        <Box
          sx={{
            px: 2,
            py: 1,
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ImageIcon size={13} color="#64748B" />
            <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12px' }}>
              Standard Viewport: <strong style={{ color: '#0F172A' }}>1280 × 800 px</strong>
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace' }}>
            Click image to open full-resolution lightbox
          </Typography>
        </Box>
      </Box>

      {/* Lightbox Modal Dialog */}
      <Dialog
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#0F172A',
          },
        }}
      >
        <Box
          sx={{
            p: 1.5,
            px: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #1E293B',
            backgroundColor: '#0A0F1D',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BrandLogo url={url} name={name} size={28} borderRadius="6px" primaryColor={primaryColor} />
            <Typography sx={{ color: '#FFFFFF', fontWeight: 600, fontSize: '14px', fontFamily: '"Rethink Sans", sans-serif' }}>
              {name} — High-Resolution Screenshot
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => setLightboxOpen(false)} sx={{ color: '#94A3B8', '&:hover': { color: '#FFFFFF' } }}>
            <X size={18} />
          </IconButton>
        </Box>
        <DialogContent sx={{ p: 0, backgroundColor: '#0F172A', maxHeight: '82vh', overflowY: 'auto' }}>
          <Box
            component="img"
            src={screenshotSrc}
            alt={`${name} full resolution screenshot`}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};
