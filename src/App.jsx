import React, { useState, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UrlInputCard } from './components/UrlInputCard';
import { LoadingStepper } from './components/LoadingStepper';
import { ResultsDashboard } from './components/ResultsDashboard';
import { HistoryDrawer } from './components/HistoryDrawer';
import { CompareModal } from './components/CompareModal';
import { InteractiveBackground } from './components/InteractiveBackground';
import { generateDesignTokens } from './services/aiGenerator';
import { useDesignHistory } from './hooks/useDesignHistory';
import { Terminal, Layers, FileCode2 } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [result, setResult] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const { history, saveItem, removeItem, clearHistory } = useDesignHistory();
  const resultsRef = useRef(null);

  const handleGenerate = async (targetUrl) => {
    setUrl(targetUrl);
    setIsLoading(true);
    setCurrentStep(1);
    setResult(null);

    try {
      const designResult = await generateDesignTokens(targetUrl, (step) => {
        setCurrentStep(step);
      });
      setResult(designResult);
      saveItem(designResult);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } catch (err) {
      console.error('Failed to generate design specification', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectHistoryItem = (item) => {
    setUrl(item.url);
    setResult(item);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleReset = () => {
    setResult(null);
    setUrl('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FFFFFF', position: 'relative' }}>
      {/* Interactive Cursor Follower Background Animation */}
      <InteractiveBackground />

      {/* Centered Floating Island Navbar */}
      <Navbar
        historyCount={history.length}
        onOpenHistory={() => setHistoryOpen(true)}
        onOpenCompare={() => setCompareOpen(true)}
      />

      {/* Main Content Area with generous vertical rhythm */}
      <Box component="main" sx={{ flex: 1, pb: '72px', position: 'relative', zIndex: 1 }}>
        <HeroSection />

        <UrlInputCard
          onGenerate={handleGenerate}
          isLoading={isLoading}
        />

        {isLoading && (
          <LoadingStepper currentStep={currentStep} url={url} />
        )}

        <div ref={resultsRef}>
          {result && !isLoading && (
            <ResultsDashboard
              result={result}
              onReset={handleReset}
            />
          )}
        </div>

        {/* 3 Step Workflow Cards (28px padding, 8px radius, pure white, 1px solid #E6E6E6) */}
        {!result && !isLoading && (
          <Container maxWidth="md" sx={{ mt: '28px' }}>
            <Box
              sx={{
                p: '28px',
                borderRadius: '8px', // rounded.md
                backgroundColor: '#FFFFFF',
                border: '1px solid #E6E6E6',
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                gap: '28px',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.02)',
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#2563EB' }}>
                  <Terminal size={18} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#000000', fontSize: '14.4px' }}>
                    1. Scrape Visual Tokens
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#4D4D4D', fontSize: '13px', lineHeight: '20px' }}>
                  Extracts color values, typography scales, layout spacing, and CSS rules from any live target.
                </Typography>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#2563EB' }}>
                  <FileCode2 size={18} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#000000', fontSize: '14.4px' }}>
                    2. Structured DESIGN.md
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#4D4D4D', fontSize: '13px', lineHeight: '20px' }}>
                  Compiles a clean markdown context file conforming to modern design system standards.
                </Typography>
              </Box>

              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: '#2563EB' }}>
                  <Layers size={18} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 500, color: '#000000', fontSize: '14.4px' }}>
                    3. AI Agent Context
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: '#4D4D4D', fontSize: '13px', lineHeight: '20px' }}>
                  Drop `DESIGN.md` into repository root so Cursor, Claude, or Antigravity build consistent UI.
                </Typography>
              </Box>
            </Box>
          </Container>
        )}
      </Box>

      {/* History Drawer */}
      <HistoryDrawer
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onSelect={handleSelectHistoryItem}
        onDelete={removeItem}
        onClear={clearHistory}
      />

      {/* Compare Systems Modal */}
      <CompareModal
        open={compareOpen}
        onClose={() => setCompareOpen(false)}
      />

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: '28px',
          px: 2,
          borderTop: '1px solid #E6E6E6',
          backgroundColor: '#FFFFFF',
          textAlign: 'center',
        }}
      >
        <Typography variant="caption" sx={{ color: '#4D4D4D', fontSize: '12.6px', fontFamily: '"Rethink Sans", sans-serif' }}>
          Design.md Generator • Modern Technical SaaS Design System Extractor
        </Typography>
      </Box>
    </Box>
  );
}
