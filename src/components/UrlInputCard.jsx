import React, { useState } from 'react';
import {
  Box,
  Paper,
  InputBase,
  Button,
  Chip,
  Typography,
  Stack,
  IconButton,
} from '@mui/material';
import { Globe, ArrowRight, X } from 'lucide-react';
import { PRESETS } from '../data/presets';
import { BrandLogo } from './BrandLogo';

export const UrlInputCard = ({ onGenerate, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!url.trim() || isLoading) return;
    onGenerate(url.trim()); // Keep current URL in textfield on submit
  };

  const handlePresetClick = (preset) => {
    setUrl(''); // Only clear value when user clicks on a new URL preset
    onGenerate(preset.url);
  };

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto', px: 2, mb: 6 }}>
      {/* 56px Height Pill Input exactly matching Design.md */}
      <Paper
        elevation={0}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          height: 56,
          px: '18px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
          borderRadius: '9999px',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          '&:hover': {
            borderColor: '#CCCCCC',
          },
          '&:focus-within': {
            borderColor: '#2563EB',
            boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.12)',
          },
        }}
      >
        {/* URL Icon */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pr: 1.5,
            color: '#4D4D4D',
          }}
        >
          <Globe size={18} />
        </Box>

        {/* Text Input */}
        <InputBase
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={(e) => {
            if (e.target.value) e.target.select();
          }}
          placeholder="Enter website URL (e.g. stripe.com or https://linear.app)"
          disabled={isLoading}
          sx={{
            flex: 1,
            color: '#000000',
            fontSize: '14.4px',
            fontFamily: '"Rethink Sans", sans-serif',
            '& input::placeholder': {
              color: '#737373',
              opacity: 1,
            },
          }}
        />

        {/* Quick Clear Icon when input is not empty */}
        {url && !isLoading && (
          <IconButton
            size="small"
            onClick={() => setUrl('')}
            sx={{
              p: 0.6,
              mr: 1,
              color: '#94A3B8',
              '&:hover': { color: '#0F172A', backgroundColor: '#F1F5F9' },
            }}
          >
            <X size={15} />
          </IconButton>
        )}

        {/* Primary Pill Button (42px height, #2563EB, rounded.full) */}
        <Button
          type="submit"
          variant="contained"
          disabled={!url.trim() || isLoading}
          sx={{
            height: 42,
            borderRadius: '9999px',
            px: '18px',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            fontSize: '14.4px',
            fontWeight: 400,
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            '&:hover': {
              backgroundColor: '#1D4ED8',
            },
          }}
        >
          <span>Generate Context</span>
          <ArrowRight size={15} />
        </Button>
      </Paper>

      {/* Preset Chips (rounded.full, #F5F5F5 muted background, #4D4D4D text) */}
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#4D4D4D',
            fontSize: '12px',
            fontWeight: 400,
            fontFamily: '"Rethink Sans", sans-serif',
            mr: 0.5,
          }}
        >
          Try an example:
        </Typography>

        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {PRESETS.map((preset) => (
            <Chip
              key={preset.id}
              label={preset.name}
              icon={
                <BrandLogo
                  url={preset.url}
                  name={preset.name}
                  size={16}
                  borderRadius="3px"
                  primaryColor={preset.tokens?.colors?.[0]?.hex || '#2563EB'}
                  sx={{ border: 'none', boxShadow: 'none', backgroundColor: 'transparent', mr: -0.5 }}
                />
              }
              onClick={() => handlePresetClick(preset)}
              disabled={isLoading}
              size="small"
              sx={{
                backgroundColor: '#F5F5F5',
                border: '1px solid #E6E6E6',
                color: '#4D4D4D',
                borderRadius: '9999px',
                height: 32,
                fontSize: '12.6px',
                fontFamily: '"Rethink Sans", sans-serif',
                px: '8px',
                '&:hover': {
                  backgroundColor: '#E2E8F0',
                  color: '#0F172A',
                  borderColor: '#94A3B8',
                },
              }}
            />
          ))}
        </Stack>
      </Box>
    </Box>
  );
};
