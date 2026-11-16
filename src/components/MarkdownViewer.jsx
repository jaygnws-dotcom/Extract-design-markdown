import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Copy, Check, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const MarkdownViewer = ({ markdown }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E6E6E6',
        overflow: 'hidden',
      }}
    >
      {/* File Bar */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          backgroundColor: '#F5F5F5',
          borderBottom: '1px solid #E6E6E6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FileText size={15} color="#0F172A" />
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'JetBrains Mono, monospace',
              color: '#0F172A',
              fontWeight: 600,
              fontSize: '13px',
              letterSpacing: '0.02em',
            }}
          >
            DESIGN.md
          </Typography>
        </Box>

        <Tooltip title={copied ? 'Copied' : 'Copy markdown'}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
              color: copied ? '#2563EB' : '#4D4D4D',
              p: 0.6,
              '&:hover': {
                color: '#000000',
                backgroundColor: '#E6E6E6',
              },
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Content Area */}
      <Box
        sx={{
          p: { xs: 2.5, sm: 4 },
          maxHeight: 650,
          overflowY: 'auto',
          fontSize: '14.4px',
          lineHeight: '22px',
          color: '#4D4D4D',
          fontFamily: '"Rethink Sans", sans-serif',
          '& h1, & h2, & h3, & h4': {
            fontFamily: '"Rethink Sans", sans-serif',
            color: '#000000',
            fontWeight: 400,
            mt: 3,
            mb: 1.5,
          },
          '& h1': {
            fontSize: '30px',
            lineHeight: '34.56px',
            borderBottom: '1px solid #E6E6E6',
            pb: 1,
            color: '#000000',
          },
          '& h2': {
            fontSize: '22px',
            lineHeight: '26px',
            color: '#2563EB',
          },
          '& h3': {
            fontSize: '18px',
            color: '#000000',
          },
          '& hr': {
            borderColor: '#E6E6E6',
            my: 3,
          },
          '& pre': {
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            p: 2,
            my: 2,
            overflowX: 'auto',
            fontSize: '13px',
            fontFamily: 'JetBrains Mono, monospace',
          },
          '& code': {
            fontFamily: 'JetBrains Mono, monospace',
            backgroundColor: '#F1F5F9',
            color: '#0F172A',
            px: 0.8,
            py: 0.2,
            borderRadius: '4px',
            fontSize: '12.6px',
            fontWeight: 500,
            border: '1px solid #CBD5E1',
          },
          '& pre code': {
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
            color: '#0F172A',
            fontSize: '13px',
          },
          '& blockquote': {
            borderLeft: '3px solid #0F172A',
            backgroundColor: '#F8FAFC',
            pl: 2,
            py: 1,
            my: 2,
            color: '#334155',
            fontSize: '14.4px',
          },
          '& table': {
            width: '100%',
            borderCollapse: 'collapse',
            my: 2.5,
            fontSize: '13.5px',
          },
          '& th': {
            backgroundColor: '#F5F5F5',
            borderBottom: '1px solid #E6E6E6',
            p: 1.2,
            textAlign: 'left',
            color: '#000000',
            fontWeight: 500,
          },
          '& td': {
            borderBottom: '1px solid #E6E6E6',
            p: 1.2,
            color: '#4D4D4D',
          },
          '& ul, & ol': {
            pl: 3,
            my: 1.5,
          },
          '& li': {
            mb: 0.5,
          },
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {markdown}
        </ReactMarkdown>
      </Box>
    </Box>
  );
};
