import React, { useState, useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { extractCleanDomain, getLogoCandidates, getInitials } from '../utils/assetHelper';

export const BrandLogo = ({
  url,
  name = '',
  size = 40,
  borderRadius = '8px',
  primaryColor = '#2563EB',
  sx = {},
}) => {
  const candidates = useMemo(() => getLogoCandidates(url), [url]);
  const [candidateOffset, setCandidateOffset] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [trackedKey, setTrackedKey] = useState(`${url}-${name}`);

  if (trackedKey !== `${url}-${name}`) {
    setTrackedKey(`${url}-${name}`);
    setCandidateOffset(0);
    setLoaded(false);
  }

  const handleImageError = () => {
    setCandidateOffset((prev) => prev + 1);
  };

  const handleImageLoad = () => {
    setLoaded(true);
  };

  const hasError = candidateOffset >= candidates.length;
  const currentSrc = !hasError ? candidates[candidateOffset] : null;
  const initials = getInitials(name || extractCleanDomain(url));

  return (
    <Box
      sx={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius,
        backgroundColor: '#FFFFFF',
        border: '1px solid #E6E6E6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        ...sx,
      }}
    >
      {!hasError && currentSrc ? (
        <Box
          component="img"
          src={currentSrc}
          alt={`${name} brand logo`}
          onError={handleImageError}
          onLoad={handleImageLoad}
          sx={{
            width: '72%',
            height: '72%',
            objectFit: 'contain',
            transition: 'opacity 0.2s ease',
            opacity: loaded ? 1 : 0,
          }}
        />
      ) : null}

      {/* Fallback Initials Badge if all image sources fail or while loading */}
      {(hasError || !loaded) && (
        <Box
          sx={{
            position: hasError ? 'static' : 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: hasError ? `${primaryColor}14` : '#F8FAFC',
          }}
        >
          <Typography
            sx={{
              fontSize: `${Math.max(10, Math.floor(size * 0.36))}px`,
              fontWeight: 700,
              fontFamily: 'JetBrains Mono, monospace',
              color: hasError ? primaryColor : '#94A3B8',
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            {initials}
          </Typography>
        </Box>
      )}
    </Box>
  );
};
