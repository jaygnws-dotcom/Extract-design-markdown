import React, { useState } from 'react';
import {
  Box,
  Button,
  Tooltip,
} from '@mui/material';
import { Copy, Check, Download, RotateCcw } from 'lucide-react';

export const ExportActions = ({ markdown, filename = 'DESIGN.md', onReset }) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 2000);
    } catch (err) {
      console.error('Failed to download file', err);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5 }}>
      {/* Copy Button: button-secondary (white background, blue text, rounded.full) */}
      <Tooltip title="Copy markdown specification">
        <Button
          variant="outlined"
          onClick={handleCopy}
          startIcon={copied ? <Check size={14} color="#2563EB" /> : <Copy size={14} />}
          size="small"
          sx={{
            borderRadius: '9999px',
            height: 42,
            px: '18px',
            fontWeight: 400,
            fontSize: '14.4px',
            backgroundColor: '#FFFFFF',
            borderColor: copied ? '#2563EB' : '#E6E6E6',
            color: '#2563EB',
            '&:hover': {
              backgroundColor: '#F5F5F5',
              borderColor: '#D4D4D4',
            },
          }}
        >
          {copied ? 'Copied Context' : 'Copy to Clipboard'}
        </Button>
      </Tooltip>

      {/* Download Button: button-primary (filled blue #2563EB, white text, rounded.full) */}
      <Tooltip title="Download DESIGN.md file">
        <Button
          variant="contained"
          onClick={handleDownload}
          startIcon={downloaded ? <Check size={14} /> : <Download size={14} />}
          size="small"
          sx={{
            borderRadius: '9999px',
            height: 42,
            px: '18px',
            fontWeight: 400,
            fontSize: '14.4px',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#1D4ED8',
            },
          }}
        >
          {downloaded ? 'Saved!' : 'Download .md'}
        </Button>
      </Tooltip>

      {/* Reset Button: button-tertiary (transparent, #4D4D4D) */}
      {onReset && (
        <Tooltip title="Clear and extract new URL">
          <Button
            variant="text"
            onClick={onReset}
            startIcon={<RotateCcw size={13} />}
            size="small"
            sx={{
              color: '#4D4D4D',
              fontSize: '12.6px',
              fontWeight: 400,
              padding: '0 8px',
              height: 42,
              '&:hover': {
                color: '#000000',
                backgroundColor: 'transparent',
              },
            }}
          >
            New URL
          </Button>
        </Tooltip>
      )}
    </Box>
  );
};
