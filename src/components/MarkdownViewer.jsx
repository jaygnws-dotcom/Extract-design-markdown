import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Copy,
  Check,
  FileText,
  Eye,
  Code2,
  FileCheck2,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const MarkdownViewer = ({ markdown = '' }) => {
  const [viewMode, setViewMode] = useState('rendered'); // 'rendered' | 'raw'
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedSelection, setCopiedSelection] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const textareaRef = useRef(null);

  const lines = markdown.split('\n');
  const lineCount = lines.length;
  const wordCount = markdown.trim().split(/\s+/).filter(Boolean).length;

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopySelection = async () => {
    if (!selectedText) return;
    try {
      await navigator.clipboard.writeText(selectedText);
      setCopiedSelection(true);
      setTimeout(() => setCopiedSelection(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleTextareaSelect = (e) => {
    const start = e.target.selectionStart;
    const end = e.target.selectionEnd;
    if (start !== end) {
      setSelectedText(markdown.substring(start, end));
    } else {
      setSelectedText('');
    }
  };

  return (
    <Box
      sx={{
        borderRadius: '8px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #E6E6E6',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
      }}
    >
      {/* Top Utility Header Bar */}
      <Box
        sx={{
          px: { xs: 2, sm: 2.5 },
          py: 1.2,
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E6E6E6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1.5,
        }}
      >
        {/* Left: File Badge & View Mode Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FileText size={16} color="#0F172A" />
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'JetBrains Mono, monospace',
                color: '#0F172A',
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.02em',
              }}
            >
              DESIGN.md
            </Typography>
          </Box>

          {/* Segmented Mode Switcher: Rendered vs Raw */}
          <Box
            sx={{
              display: 'flex',
              backgroundColor: '#FFFFFF',
              borderRadius: '6px',
              p: 0.3,
              border: '1px solid #E2E8F0',
            }}
          >
            <Button
              size="small"
              onClick={() => setViewMode('rendered')}
              startIcon={<Eye size={13} />}
              sx={{
                borderRadius: '4px',
                px: 1.2,
                py: 0.4,
                fontSize: '12px',
                fontWeight: viewMode === 'rendered' ? 600 : 500,
                backgroundColor: viewMode === 'rendered' ? '#0F172A' : 'transparent',
                color: viewMode === 'rendered' ? '#FFFFFF' : '#64748B',
                textTransform: 'none',
                minWidth: 'auto',
                height: 26,
                '&:hover': {
                  backgroundColor: viewMode === 'rendered' ? '#1E293B' : '#F1F5F9',
                },
              }}
            >
              Preview
            </Button>

            <Button
              size="small"
              onClick={() => setViewMode('raw')}
              startIcon={<Code2 size={13} />}
              sx={{
                borderRadius: '4px',
                px: 1.2,
                py: 0.4,
                fontSize: '12px',
                fontWeight: viewMode === 'raw' ? 600 : 500,
                backgroundColor: viewMode === 'raw' ? '#0F172A' : 'transparent',
                color: viewMode === 'raw' ? '#FFFFFF' : '#64748B',
                textTransform: 'none',
                minWidth: 'auto',
                height: 26,
                '&:hover': {
                  backgroundColor: viewMode === 'raw' ? '#1E293B' : '#F1F5F9',
                },
              }}
            >
              Raw Markdown
            </Button>
          </Box>

          <Chip
            label={`${lineCount} lines • ${wordCount} words`}
            size="small"
            sx={{
              fontSize: '11px',
              fontFamily: 'JetBrains Mono, monospace',
              height: 22,
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              color: '#64748B',
              display: { xs: 'none', md: 'inline-flex' },
            }}
          />
        </Box>

        {/* Right Action Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Copy Selection Button (Highlights when user has selected text in raw mode) */}
          {viewMode === 'raw' && selectedText && (
            <Tooltip title="Copy only the highlighted selection">
              <Button
                size="small"
                variant="outlined"
                onClick={handleCopySelection}
                startIcon={copiedSelection ? <Check size={12} color="#059669" /> : <FileCheck2 size={12} />}
                sx={{
                  height: 28,
                  fontSize: '12px',
                  borderRadius: '6px',
                  borderColor: copiedSelection ? '#059669' : '#2563EB',
                  backgroundColor: copiedSelection ? '#ECFDF5' : '#EFF6FF',
                  color: copiedSelection ? '#065F46' : '#1D4ED8',
                  textTransform: 'none',
                  fontWeight: 600,
                }}
              >
                {copiedSelection ? 'Selection Copied' : `Copy Selection (${selectedText.length} chars)`}
              </Button>
            </Tooltip>
          )}

          {/* Copy Full File Button */}
          <Tooltip title={copiedAll ? 'Copied' : 'Copy entire DESIGN.md'}>
            <Button
              size="small"
              variant="outlined"
              onClick={handleCopyAll}
              startIcon={copiedAll ? <Check size={13} color="#059669" /> : <Copy size={13} />}
              sx={{
                height: 28,
                fontSize: '12px',
                borderRadius: '6px',
                borderColor: copiedAll ? '#059669' : '#CBD5E1',
                color: copiedAll ? '#059669' : '#0F172A',
                backgroundColor: '#FFFFFF',
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: '#F1F5F9',
                  borderColor: '#94A3B8',
                },
              }}
            >
              {copiedAll ? 'Copied All' : 'Copy All'}
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* View Mode 1: Rendered Formatted Markdown View */}
      {viewMode === 'rendered' ? (
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
              fontWeight: 600,
              mt: 3,
              mb: 1.5,
            },
            '& h1': {
              fontSize: '28px',
              lineHeight: '34px',
              borderBottom: '1px solid #E6E6E6',
              pb: 1.5,
              color: '#0F172A',
            },
            '& h2': {
              fontSize: '20px',
              lineHeight: '26px',
              color: '#2563EB',
              pt: 1,
            },
            '& h3': {
              fontSize: '16px',
              color: '#0F172A',
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
              fontSize: '12.5px',
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
              fontSize: '14px',
            },
            '& table': {
              width: '100%',
              borderCollapse: 'collapse',
              my: 2.5,
              fontSize: '13.5px',
            },
            '& th': {
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              p: 1.2,
              textAlign: 'left',
              color: '#0F172A',
              fontWeight: 600,
            },
            '& td': {
              borderBottom: '1px solid #E2E8F0',
              p: 1.2,
              color: '#334155',
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
      ) : (
        /* View Mode 2: Raw Markdown Source View with Line Numbers & Precision Text Selection */
        <Box
          sx={{
            display: 'flex',
            maxHeight: 650,
            backgroundColor: '#0F172A',
            color: '#F8FAFC',
            overflow: 'hidden',
          }}
        >
          {/* Line Numbers Gutter */}
          <Box
            sx={{
              py: 2,
              px: 1.5,
              minWidth: 48,
              textAlign: 'right',
              userSelect: 'none',
              color: '#475569',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12.5px',
              lineHeight: '22px',
              borderRight: '1px solid #1E293B',
              backgroundColor: '#0A0E1A',
              overflowY: 'hidden',
            }}
          >
            {lines.map((_, idx) => (
              <Box key={idx}>{idx + 1}</Box>
            ))}
          </Box>

          {/* Raw Text Selection Area (Textarea supporting native drag selection, copy, and cursor navigation) */}
          <Box
            component="textarea"
            ref={textareaRef}
            readOnly
            value={markdown}
            onSelect={handleTextareaSelect}
            onKeyUp={handleTextareaSelect}
            onMouseUp={handleTextareaSelect}
            sx={{
              flex: 1,
              p: 2,
              border: 'none',
              outline: 'none',
              resize: 'none',
              backgroundColor: '#0F172A',
              color: '#E2E8F0',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '12.5px',
              lineHeight: '22px',
              whiteSpace: 'pre',
              overflowX: 'auto',
              overflowY: 'auto',
              cursor: 'text',
              userSelect: 'text',
              '&::selection': {
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
              },
            }}
          />
        </Box>
      )}

      {/* Footer Instructions when in Raw Mode */}
      {viewMode === 'raw' && (
        <Box
          sx={{
            px: 2.5,
            py: 1,
            backgroundColor: '#0A0E1A',
            borderTop: '1px solid #1E293B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ color: '#94A3B8', fontSize: '11.5px', fontFamily: 'JetBrains Mono, monospace' }}>
            Tip: Highlight any section with your mouse to copy specific parts, or press <kbd style={{ background: '#1E293B', padding: '2px 5px', borderRadius: '4px' }}>Ctrl+C</kbd>
          </Typography>
          {selectedText && (
            <Typography variant="caption" sx={{ color: '#38BDF8', fontSize: '11.5px', fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
              Active selection: {selectedText.length} characters
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
