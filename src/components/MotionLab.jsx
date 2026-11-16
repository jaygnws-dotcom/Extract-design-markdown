import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  RotateCw,
  Play,
  Copy,
  Check,
  MousePointer,
  ArrowUpRight,
  Activity,
  Layers,
  Clock,
  Radio,
  Zap,
} from 'lucide-react';
import { getSiteMotionTokens } from '../utils/motionHelper.js';

export const MotionLab = ({ result }) => {
  const [copiedKey, setCopiedKey] = useState(null);
  const [replayKey, setReplayKey] = useState(0);
  const [loadingActive, setLoadingActive] = useState(true);
  const [progressRunning, setProgressRunning] = useState(false);

  if (!result) return null;
  const { name, url, tokens } = result;
  const primaryColor = tokens?.colors?.[0]?.hex || '#2563EB';
  const contrastText = tokens?.colors?.[0]?.contrast || '#FFFFFF';
  const primaryRadius = tokens?.spacingAndRadius?.radii?.[0]?.value || '8px';
  const cardRadius = tokens?.spacingAndRadius?.radii?.[1]?.value || '12px';

  const motion = getSiteMotionTokens(url, name, primaryColor);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTriggerProgress = () => {
    setProgressRunning(true);
    setTimeout(() => setProgressRunning(false), 1400);
  };

  const buttonHoverTransform = motion.buttonHover.transform || 'none';
  const cardHoverTransform = motion.cardHover.transform || 'none';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
      {/* Dynamic Keyframe Injections tailored to this specific website */}
      <style>{`
        ${motion.keyframes}
        @keyframes topProgressRun {
          0% { width: 0%; left: 0; }
          50% { width: 70%; left: 0; }
          100% { width: 100%; left: 0; }
        }
        @keyframes brandSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* 1. Header Overview Banner */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 0.5, flexWrap: 'wrap' }}>
            <Activity size={18} color={primaryColor} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '18px' }}>
              {name} Motion & Interaction System
            </Typography>
            <Chip
              size="small"
              label={motion.badgeText}
              icon={<Zap size={11} color="#2563EB" />}
              sx={{
                height: 24,
                fontSize: '11px',
                fontWeight: 600,
                backgroundColor: '#EFF6FF',
                color: '#1D4ED8',
                border: '1px solid #BFDBFE',
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: '#475569', fontSize: '13.5px', maxWidth: 720 }}>
            {motion.personality}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            label={`Curve: ${motion.easings.standard}`}
            size="small"
            sx={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '11px',
              backgroundColor: '#F1F5F9',
              color: '#0F172A',
              border: '1px solid #E2E8F0',
            }}
          />
        </Box>
      </Paper>

      {/* 2. Interactive Hover Micro-Interactions */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MousePointer size={16} color={primaryColor} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '15px' }}>
              1. Interactive Hover & Press States ({name} Physics)
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12px' }}>
            Hover and click components below to feel {name}'s custom physics
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2.5,
          }}
        >
          {/* A. Button Hover Swatch */}
          <Box
            sx={{
              p: 3,
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              minHeight: 180,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748B', textTransform: 'uppercase', fontSize: '11px' }}>
              Button Hover Behavior
            </Typography>

            <Button
              variant="contained"
              sx={{
                backgroundColor: primaryColor,
                color: contrastText,
                borderRadius: primaryRadius,
                px: 3,
                py: 1.2,
                fontSize: '13.5px',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: `0 2px 8px ${primaryColor}30`,
                transition: `all ${motion.durations.fast} ${motion.easings.standard}`,
                '&:hover': {
                  ...motion.buttonHover,
                  transition: `all ${motion.durations.fast} ${motion.easings.standard}`,
                },
                '&:active': {
                  ...motion.buttonActive,
                  transition: `all ${motion.durations.instant} ease`,
                },
              }}
            >
              Hover / Click Me
            </Button>

            <Typography
              variant="caption"
              sx={{
                color: '#64748B',
                fontSize: '11px',
                fontFamily: 'JetBrains Mono, monospace',
                textAlign: 'center',
                px: 1,
              }}
            >
              {buttonHoverTransform !== 'none' ? `transform: ${buttonHoverTransform}` : 'zero vertical lift • border/glow'}
            </Typography>
          </Box>

          {/* B. Card Hover Swatch */}
          <Box
            sx={{
              p: 3,
              borderRadius: cardRadius,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 180,
              transition: `all ${motion.durations.normal} ${motion.easings.standard}`,
              '&:hover': {
                ...motion.cardHover,
                transition: `all ${motion.durations.normal} ${motion.easings.standard}`,
              },
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748B', textTransform: 'uppercase', fontSize: '11px' }}>
                  Card Elevation / Zoom
                </Typography>
                <ArrowUpRight size={14} color="#64748B" />
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>
                {name} Card Hover Physics
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 0.5 }}>
                Notice the deceleration curve and timing on mouse enter/exit.
              </Typography>
            </Box>

            <Typography variant="caption" sx={{ color: '#64748B', fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', mt: 1 }}>
              {cardHoverTransform !== 'none' ? `transform: ${cardHoverTransform}` : 'zero vertical jump • perimeter lighting'}
            </Typography>
          </Box>

          {/* C. Pill Chip & Animated Link */}
          <Box
            sx={{
              p: 3,
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              minHeight: 180,
            }}
          >
            <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748B', textTransform: 'uppercase', fontSize: '11px' }}>
              Chip & Link Micro-Interactions
            </Typography>

            <Chip
              label="Hover Filter Chip"
              clickable
              size="small"
              sx={{
                height: 32,
                px: 1,
                fontSize: '12.5px',
                fontWeight: 600,
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
                borderRadius: '9999px',
                transition: `all ${motion.durations.fast} ${motion.easings.standard}`,
                '&:hover': {
                  ...motion.chipHover,
                  transition: `all ${motion.durations.fast} ${motion.easings.standard}`,
                },
              }}
            />

            <Box
              component="a"
              href="#link"
              onClick={(e) => e.preventDefault()}
              sx={{
                color: primaryColor,
                fontWeight: 600,
                fontSize: '13px',
                textDecoration: 'none',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '0%',
                  height: '2px',
                  bottom: -2,
                  left: 0,
                  backgroundColor: primaryColor,
                  transition: `width ${motion.durations.fast} ${motion.easings.standard}`,
                },
                '&:hover::after': {
                  width: '100%',
                },
              }}
            >
              Interactive Underline Expand &rarr;
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* 3. Scroll & Entrance Reveal Simulator */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Layers size={16} color={primaryColor} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '15px' }}>
                2. Scroll & Viewport Entrance Animation ({motion.scroll.name})
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12px' }}>
                {motion.scroll.description} • Stagger: {motion.scroll.stagger}
              </Typography>
            </Box>
          </Box>

          <Button
            size="small"
            variant="contained"
            onClick={() => setReplayKey((k) => k + 1)}
            startIcon={<RotateCw size={13} />}
            sx={{
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '9999px',
              height: 32,
              px: 2,
              fontSize: '12px',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': { backgroundColor: '#1E293B', boxShadow: 'none' },
            }}
          >
            Replay Entrance
          </Button>
        </Box>

        {/* Live Staggered Stage */}
        <Box
          key={replayKey}
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
            p: 2.5,
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
          }}
        >
          {[1, 2, 3].map((cardNum) => (
            <Box
              key={cardNum}
              sx={{
                p: 2.5,
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                animation: `siteEntrance ${motion.durations.normal} ${motion.easings.entrance} forwards`,
                animationDelay: `${(cardNum - 1) * parseInt(motion.scroll.stagger, 10)}ms`,
                opacity: 0,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: `${primaryColor}18`,
                    color: primaryColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '11px',
                    fontWeight: 700,
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {cardNum}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '13.5px' }}>
                  Staggered Element 0{cardNum}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#64748B', fontSize: '12.5px', lineHeight: 1.5 }}>
                Animated with {motion.easings.entrance} at {(cardNum - 1) * parseInt(motion.scroll.stagger, 10)}ms stagger.
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* 4. Loading Shimmer & State Feedback */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top Progress Runner Simulator */}
        {progressRunning && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: 3,
              backgroundColor: motion.loading.progressColor,
              animation: 'topProgressRun 1.4s ease-in-out forwards',
              boxShadow: `0 0 10px ${motion.loading.progressColor}`,
              zIndex: 10,
            }}
          />
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Radio size={16} color={primaryColor} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '15px' }}>
                3. Loading Feedback & Shimmer Skeleton ({motion.loading.name})
              </Typography>
              <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12px' }}>
                {motion.loading.description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleTriggerProgress}
              disabled={progressRunning}
              startIcon={<Play size={12} />}
              sx={{
                borderRadius: '6px',
                height: 30,
                fontSize: '12px',
                textTransform: 'none',
                borderColor: '#CBD5E1',
                color: '#0F172A',
              }}
            >
              Trigger Top Progress Bar
            </Button>

            <Button
              size="small"
              variant="outlined"
              onClick={() => setLoadingActive(!loadingActive)}
              sx={{
                borderRadius: '6px',
                height: 30,
                fontSize: '12px',
                textTransform: 'none',
                borderColor: loadingActive ? primaryColor : '#CBD5E1',
                color: loadingActive ? primaryColor : '#0F172A',
                fontWeight: 600,
              }}
            >
              {loadingActive ? 'Switch to Loaded View' : 'Switch to Skeleton View'}
            </Button>
          </Box>
        </Box>

        {/* Shimmer Preview Area */}
        <Box
          sx={{
            p: 3,
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
            gap: 3,
            alignItems: 'center',
          }}
        >
          {/* Skeleton vs Loaded Card */}
          <Box
            sx={{
              p: 2.5,
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
            }}
          >
            {loadingActive ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {/* Header Skeleton */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: motion.loading.shimmerGradient,
                      backgroundSize: '200% 100%',
                      animation: motion.loading.shimmerAnimation,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        width: '60%',
                        height: 14,
                        borderRadius: '4px',
                        mb: 0.8,
                        background: motion.loading.shimmerGradient,
                        backgroundSize: '200% 100%',
                        animation: motion.loading.shimmerAnimation,
                      }}
                    />
                    <Box
                      sx={{
                        width: '35%',
                        height: 10,
                        borderRadius: '4px',
                        background: motion.loading.shimmerGradient,
                        backgroundSize: '200% 100%',
                        animation: motion.loading.shimmerAnimation,
                      }}
                    />
                  </Box>
                </Box>
                {/* Body skeleton bars */}
                <Box
                  sx={{
                    width: '100%',
                    height: 12,
                    borderRadius: '4px',
                    background: motion.loading.shimmerGradient,
                    backgroundSize: '200% 100%',
                    animation: motion.loading.shimmerAnimation,
                  }}
                />
                <Box
                  sx={{
                    width: '80%',
                    height: 12,
                    borderRadius: '4px',
                    background: motion.loading.shimmerGradient,
                    backgroundSize: '200% 100%',
                    animation: motion.loading.shimmerAnimation,
                  }}
                />
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      backgroundColor: `${primaryColor}14`,
                      color: primaryColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '14px',
                    }}
                  >
                    UI
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>
                      {name} Loaded Content State
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B' }}>
                      Rendered in {motion.durations.normal}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: '#334155', fontSize: '13px', lineHeight: 1.5 }}>
                  Data loaded successfully with {name}'s transition curve.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Spinner and Pulse Indicator */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: `3px solid ${primaryColor}25`,
                  borderTopColor: primaryColor,
                  animation: `brandSpin ${motion.durations.slow} linear infinite`,
                }}
              />
              <Box>
                <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', display: 'block', fontSize: '12px' }}>
                  Brand Spinner Pulse
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}>
                  {motion.durations.slow} • {primaryColor}
                </Typography>
              </Box>
            </Box>

            <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12px' }}>
              Used during asynchronous fetches, pagination requests, and dialog loading transitions.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 5. Motion System Tokens & Easing Inspector */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2.5, sm: 3 },
          borderRadius: '8px',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Clock size={16} color={primaryColor} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '15px' }}>
              4. Motion Architecture Tokens & Easing Formulas
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' },
            gap: 2,
            mb: 2.5,
          }}
        >
          {Object.entries(motion.easings).map(([curveName, curveVal]) => (
            <Paper
              key={curveName}
              elevation={0}
              sx={{
                p: 2,
                borderRadius: '8px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', textTransform: 'capitalize', fontSize: '12px' }}>
                    {curveName} Easing
                  </Typography>
                  <Tooltip title="Copy cubic-bezier">
                    <IconButton
                      size="small"
                      onClick={() => handleCopy(curveVal, curveName)}
                      sx={{ p: 0.3, color: copiedKey === curveName ? '#059669' : '#64748B' }}
                    >
                      {copiedKey === curveName ? <Check size={12} /> : <Copy size={12} />}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="caption" sx={{ color: '#64748B', fontFamily: 'JetBrains Mono, monospace', fontSize: '11px', wordBreak: 'break-all' }}>
                  {curveVal}
                </Typography>
              </Box>

              {/* Curve Preview Bar */}
              <Box
                sx={{
                  mt: 1.5,
                  height: 4,
                  borderRadius: '9999px',
                  backgroundColor: '#E2E8F0',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: '60%',
                    backgroundColor: primaryColor,
                    borderRadius: '9999px',
                  }}
                />
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Durations scale */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', pt: 1, borderTop: '1px solid #F1F5F9' }}>
          <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '12px' }}>
            Duration Scale:
          </Typography>
          {Object.entries(motion.durations).map(([durKey, durVal]) => (
            <Chip
              key={durKey}
              label={`${durKey}: ${durVal}`}
              size="small"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '11px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                color: '#0F172A',
              }}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
