import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export const HeroSection = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', pt: { xs: 6, md: 10 }, pb: 4 }}>
      {/* Accent Soft Pill Badge with high contrast and legible typography */}
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          px: 2,
          py: 0.6,
          borderRadius: '9999px',
          backgroundColor: '#F1F5F9',
          border: '1px solid #CBD5E1',
          mb: 3,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#0F172A',
            fontWeight: 600,
            fontSize: '12.5px',
            lineHeight: '16px',
            fontFamily: '"Rethink Sans", sans-serif',
            letterSpacing: '0.01em',
          }}
        >
          Automated Visual Identity & Style Token Extractor
        </Typography>
      </Box>

      {/* Headline Display */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '36px', sm: '48px', md: '56px' },
          fontWeight: 400,
          lineHeight: { xs: '42px', sm: '52px', md: '60.48px' },
          letterSpacing: '-1.96px',
          color: '#000000',
          mb: 3,
          fontFamily: '"Rethink Sans", sans-serif',
        }}
      >
        Extract visual identity and tokens into{' '}
        <Box
          component="span"
          sx={{
            color: '#2563EB',
            display: 'inline-block',
          }}
        >
          DESIGN.md
        </Box>
      </Typography>

      {/* Body Large Subtitle */}
      <Typography
        sx={{
          fontSize: { xs: '15px', md: '16.2px' },
          fontWeight: 400,
          lineHeight: '26.325px',
          color: '#4D4D4D',
          maxWidth: 620,
          mx: 'auto',
          fontFamily: '"Rethink Sans", sans-serif',
        }}
      >
        Input any website URL to extract color palettes, Rethink Sans typography, spacing hierarchies, and UI component specifications for AI coding agents.
      </Typography>
    </Container>
  );
};
