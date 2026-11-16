import React from 'react';
import {
  Box,
  Typography,
  Button,
  Badge,
  Tooltip,
  Paper,
} from '@mui/material';
import { History, FileCode2, GitCompare } from 'lucide-react';

export const Navbar = ({ historyCount, onOpenHistory, onOpenCompare }) => {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: { xs: 12, sm: 18 },
        zIndex: 1100,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: { xs: 1.5, sm: 3 },
        pointerEvents: 'none',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: { xs: '100%', md: '980px', lg: '1080px' },
          borderRadius: '9999px',
          backgroundColor: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(226, 232, 240, 0.9)',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
          px: { xs: 2, sm: 2.8 },
          py: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            borderColor: '#CBD5E1',
            boxShadow: '0 12px 36px -6px rgba(0, 0, 0, 0.07), 0 2px 8px -1px rgba(0, 0, 0, 0.03)',
          },
        }}
      >
        {/* Brand Section */}
        <Box
          component="a"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              width: 34,
              height: 34,
              borderRadius: '9999px',
              backgroundColor: '#0F172A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.2)',
            }}
          >
            <FileCode2 size={17} strokeWidth={2.2} />
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '-0.02em',
              color: '#000000',
              fontFamily: '"Rethink Sans", sans-serif',
            }}
          >
            Design.md
          </Typography>
        </Box>

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Tooltip title="Compare two design systems side-by-side">
            <Button
              variant="outlined"
              size="small"
              onClick={onOpenCompare}
              startIcon={<GitCompare size={14} />}
              sx={{
                borderRadius: '9999px',
                px: { xs: 1.5, sm: 2 },
                py: 0.7,
                fontSize: '12.5px',
                backgroundColor: '#FFFFFF',
                borderColor: '#CBD5E1',
                color: '#0F172A',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                '&:hover': {
                  backgroundColor: '#F8FAFC',
                  borderColor: '#94A3B8',
                },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>Compare Systems</Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>Compare</Box>
            </Button>
          </Tooltip>

          <Tooltip title="View saved extraction history">
            <Button
              variant="outlined"
              size="small"
              onClick={onOpenHistory}
              startIcon={
                <Badge
                  badgeContent={historyCount}
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#0F172A',
                      color: '#FFFFFF',
                      fontSize: '0.65rem',
                      height: 16,
                      minWidth: 16,
                    },
                  }}
                >
                  <History size={14} />
                </Badge>
              }
              sx={{
                borderRadius: '9999px',
                px: { xs: 1.5, sm: 2 },
                py: 0.7,
                fontSize: '12.5px',
                backgroundColor: '#FFFFFF',
                borderColor: '#CBD5E1',
                color: '#0F172A',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                '&:hover': {
                  backgroundColor: '#F8FAFC',
                  borderColor: '#94A3B8',
                },
              }}
            >
              History
            </Button>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};
