import React from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Stack,
} from '@mui/material';
import {
  Globe,
  FileCode2,
  Palette,
  Type,
  CheckCircle2,
  Loader2,
  Layers,
} from 'lucide-react';
import { STEPS } from '../services/aiGenerator';

const STEP_ICONS = [
  <Globe size={16} key="globe" />,
  <FileCode2 size={16} key="code" />,
  <Palette size={16} key="palette" />,
  <Type size={16} key="type" />,
  <Layers size={16} key="layers" />,
];

export const LoadingStepper = ({ currentStep, url }) => {
  const activeIndex = Math.max(0, currentStep - 1);
  const currentStepData = STEPS[activeIndex] || STEPS[0];
  const progressPercent = Math.min(100, Math.round((currentStep / STEPS.length) * 100));

  return (
    <Box sx={{ maxWidth: 760, mx: 'auto', px: 2, my: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: '28px', // padding 28px as per card spec in Design.md
          borderRadius: '8px', // rounded.md
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Loader2 size={18} color="#2563EB" className="animate-spin" />
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: '#4D4D4D',
                  fontWeight: 400,
                  fontSize: '12px',
                  fontFamily: '"Rethink Sans", sans-serif',
                }}
              >
                Extracting Visual Identity
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#0F172A',
                  fontWeight: 600,
                  fontSize: '14px',
                  fontFamily: 'JetBrains Mono, monospace',
                }}
              >
                {url || 'Target Website'}
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: '#0F172A',
              fontWeight: 600,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '14px',
            }}
          >
            {progressPercent}%
          </Typography>
        </Box>

        {/* Progress Bar */}
        <LinearProgress
          variant="determinate"
          value={progressPercent}
          sx={{
            height: 4,
            borderRadius: '9999px',
            backgroundColor: '#F1F5F9',
            mb: 3,
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#0F172A',
              borderRadius: '9999px',
            },
          }}
        />

        {/* Active Step Panel */}
        <Box
          sx={{
            p: '18px',
            borderRadius: '8px',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            mb: 2.5,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0F172A',
              flexShrink: 0,
            }}
          >
            {STEP_ICONS[activeIndex] || <FileCode2 size={16} />}
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#000000', fontSize: '14.4px' }}>
              {currentStepData.title}
            </Typography>
            <Typography variant="caption" sx={{ color: '#4D4D4D', fontSize: '12.6px' }}>
              {currentStepData.desc}
            </Typography>
          </Box>
        </Box>

        {/* Steps List */}
        <Stack spacing={1}>
          {STEPS.map((step) => {
            const isDone = currentStep > step.id;
            const isCurrent = currentStep === step.id;

            return (
              <Box
                key={step.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 0.6,
                  px: 1,
                  borderRadius: '4px',
                  backgroundColor: isCurrent ? '#F5F5F5' : 'transparent',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                  {isDone ? (
                    <CheckCircle2 size={15} color="#2563EB" />
                  ) : isCurrent ? (
                    <Loader2 size={15} color="#2563EB" className="animate-spin" />
                  ) : (
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        border: '1px solid #E6E6E6',
                      }}
                    />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: '13px',
                      fontWeight: 400,
                      color: isDone ? '#4D4D4D' : isCurrent ? '#000000' : '#A3A3A3',
                    }}
                  >
                    {step.title}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'JetBrains Mono, monospace',
                    color: isDone ? '#10B981' : isCurrent ? '#0F172A' : '#94A3B8',
                    fontSize: '11px',
                    fontWeight: 600,
                  }}
                >
                  {isDone ? 'DONE' : isCurrent ? 'RUNNING' : `0${step.id}`}
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </Paper>
    </Box>
  );
};
