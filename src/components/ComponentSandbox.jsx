import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  InputBase,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Switch,
  FormControlLabel,
  Paper,
  Divider,
} from '@mui/material';
import { Sparkles, Sun, Moon, X, Send, Heart, Share2, Layers } from 'lucide-react';

export const ComponentSandbox = ({ tokens, name = 'Website' }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [inputText, setInputText] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const buttonText = 'Get Started Now';

  const { colors = [], typography = {}, spacingAndRadius = {} } = tokens || {};

  const primaryColor = colors[0]?.hex || '#2563EB';
  const primaryContrast = colors[0]?.contrast || '#FFFFFF';
  const primaryRadius = spacingAndRadius.radii?.[0]?.value || '6px';
  const cardRadius = spacingAndRadius.radii?.[1]?.value || '12px';

  // Surface colors depending on Sandbox light/dark toggle
  const canvasBg = isDarkMode ? '#0F172A' : '#FFFFFF';
  const cardBg = isDarkMode ? '#1E293B' : '#F8FAFC';
  const textColor = isDarkMode ? '#F8FAFC' : '#0F172A';
  const textMuted = isDarkMode ? '#94A3B8' : '#64748B';
  const borderColor = isDarkMode ? '#334155' : '#E2E8F0';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Sandbox Controls Bar */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          p: 2,
          borderRadius: '8px',
          backgroundColor: '#F8FAFC',
          border: '1px solid #E2E8F0',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Layers size={18} color="#0F172A" />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '14px' }}>
              Interactive UI Sandbox
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontSize: '12px' }}>
              Test live extracted tokens, button variants, and modal dialogs in real-time.
            </Typography>
          </Box>
        </Box>

        {/* Light/Dark Mode Switcher */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Sun size={15} color={isDarkMode ? '#94A3B8' : '#D97706'} />
          <FormControlLabel
            control={
              <Switch
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                size="small"
              />
            }
            label={
              <Typography variant="caption" sx={{ fontWeight: 600, color: '#0F172A', fontSize: '12.5px' }}>
                {isDarkMode ? 'Dark Canvas' : 'Light Canvas'}
              </Typography>
            }
            sx={{ m: 0 }}
          />
          <Moon size={15} color={isDarkMode ? '#38BDF8' : '#94A3B8'} />
        </Box>
      </Box>

      {/* The Live Interactive Sandbox Canvas */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, sm: 4 },
          // borderRadius: cardRadius,
          backgroundColor: canvasBg,
          border: `1px solid ${borderColor}`,
          transition: 'all 0.25s ease',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {/* Section 1: Button Variants */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 700,
              color: textMuted,
              display: 'block',
              mb: 2,
              fontSize: '11.5px',
            }}
          >
            Button Hierarchy & States
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            {/* Primary Action Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: primaryColor,
                color: primaryContrast,
                borderRadius: primaryRadius,
                height: 42,
                px: '20px',
                fontWeight: 500,
                fontSize: '14px',
                boxShadow: 'none',
                textTransform: 'none',
                fontFamily: typography.bodyFont || 'inherit',
                '&:hover': {
                  backgroundColor: primaryColor,
                  filter: 'brightness(1.1)',
                },
              }}
            >
              {buttonText}
            </Button>

            {/* Secondary Action Button */}
            <Button
              variant="outlined"
              sx={{
                borderRadius: primaryRadius,
                height: 42,
                px: '20px',
                backgroundColor: cardBg,
                borderColor: borderColor,
                color: isDarkMode ? '#F8FAFC' : primaryColor,
                fontSize: '14px',
                fontWeight: 500,
                textTransform: 'none',
                fontFamily: typography.bodyFont || 'inherit',
                '&:hover': {
                  borderColor: primaryColor,
                },
              }}
            >
              Secondary Action
            </Button>

            {/* Icon Toggle Button */}
            <Button
              variant="outlined"
              onClick={() => setLiked(!liked)}
              startIcon={<Heart size={16} fill={liked ? primaryColor : 'none'} color={liked ? primaryColor : textMuted} />}
              sx={{
                borderRadius: primaryRadius,
                height: 42,
                px: '16px',
                borderColor: borderColor,
                color: textMuted,
                textTransform: 'none',
                fontSize: '13px',
              }}
            >
              {liked ? 'Liked' : 'Like'}
            </Button>

            {/* Modal Dialog Trigger Button */}
            <Button
              variant="text"
              onClick={() => setDialogOpen(true)}
              startIcon={<Sparkles size={16} color={primaryColor} />}
              sx={{
                color: primaryColor,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              Preview Modal Dialog →
            </Button>
          </Box>
        </Box>

        <Divider sx={{ borderColor: borderColor }} />

        {/* Section 2: Interactive Form Input & Chips */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 700,
              color: textMuted,
              display: 'block',
              mb: 2,
              fontSize: '11.5px',
            }}
          >
            Form Inputs & Filter Chips
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.2fr 1fr' },
              gap: 3,
            }}
          >
            {/* Live Input Field */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: 48,
                px: 2,
                borderRadius: primaryRadius,
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                '&:focus-within': {
                  borderColor: primaryColor,
                },
              }}
            >
              <InputBase
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type here to test interactive input..."
                sx={{
                  flex: 1,
                  color: textColor,
                  fontSize: '14px',
                  fontFamily: typography.bodyFont || 'inherit',
                  '& input::placeholder': { color: textMuted },
                }}
              />
              <IconButton size="small" sx={{ color: primaryColor }}>
                <Send size={16} />
              </IconButton>
            </Box>

            {/* Filter Chips */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label="Selected Token"
                sx={{
                  backgroundColor: isDarkMode ? '#1E293B' : '#FFFFFF',
                  color: primaryColor,
                  border: `1.5px solid ${primaryColor}`,
                  borderRadius: primaryRadius,
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              />
              <Chip
                label="Default Filter"
                sx={{
                  backgroundColor: cardBg,
                  color: textMuted,
                  border: `1px solid ${borderColor}`,
                  borderRadius: primaryRadius,
                  fontSize: '12px',
                }}
              />
              <Chip
                label="Status Badge"
                sx={{
                  backgroundColor: `${colors[3]?.hex || '#10B981'}20`,
                  color: colors[3]?.hex || '#10B981',
                  border: `1px solid ${colors[3]?.hex || '#10B981'}50`,
                  borderRadius: primaryRadius,
                  fontSize: '12px',
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: borderColor }} />

        {/* Section 3: Interactive Card Component */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 700,
              color: textMuted,
              display: 'block',
              mb: 2,
              fontSize: '11.5px',
            }}
          >
            Container & Card Surface Anatomy
          </Typography>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              // borderRadius: cardRadius,
              backgroundColor: cardBg,
              border: `1px solid ${borderColor}`,
              maxWidth: 580,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    color: textColor,
                    fontWeight: 600,
                    fontSize: '16px',
                    fontFamily: typography.headingFont || 'inherit',
                  }}
                >
                  {name} Feature Card
                </Typography>
                <Typography variant="body2" sx={{ color: textMuted, fontSize: '13.5px', mt: 0.5 }}>
                  This card dynamically inherits {name}'s corner radius ({cardRadius}), typography stack, and surface contrast.
                </Typography>
              </Box>

              <IconButton size="small" sx={{ color: textMuted }}>
                <Share2 size={16} />
              </IconButton>
            </Box>

            <Box sx={{ mt: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: primaryColor, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
                radius: {cardRadius}
              </Typography>
              <Button
                size="small"
                variant="contained"
                sx={{
                  backgroundColor: primaryColor,
                  color: primaryContrast,
                  borderRadius: primaryRadius,
                  textTransform: 'none',
                  fontSize: '12.5px',
                  px: 2,
                  boxShadow: 'none',
                }}
              >
                Learn More
              </Button>
            </Box>
          </Paper>
        </Box>
      </Paper>

      {/* Interactive Modal Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: cardRadius,
            p: 1,
            backgroundColor: canvasBg,
            border: `1px solid ${borderColor}`,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            maxWidth: 460,
            width: '100%',
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              fontSize: '17px',
              color: textColor,
              fontFamily: typography.headingFont || 'inherit',
            }}
          >
            {name} Modal Dialog
          </Typography>
          <IconButton size="small" onClick={() => setDialogOpen(false)} sx={{ color: textMuted }}>
            <X size={18} />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ color: textMuted, fontSize: '14px', lineHeight: 1.6 }}>
            This modal dialog demonstrates how modal surfaces, corner radii ({cardRadius}), and primary action buttons render together using {name}'s design tokens.
          </Typography>
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => setDialogOpen(false)}
            sx={{
              borderRadius: primaryRadius,
              borderColor: borderColor,
              color: textMuted,
              textTransform: 'none',
              px: 2,
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setDialogOpen(false)}
            sx={{
              backgroundColor: primaryColor,
              color: primaryContrast,
              borderRadius: primaryRadius,
              textTransform: 'none',
              px: 2.5,
              boxShadow: 'none',
            }}
          >
            Confirm Action
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
