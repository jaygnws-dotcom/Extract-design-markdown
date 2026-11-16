import { createTheme } from '@mui/material/styles';

// Design tokens exactly from D:\New Jay\AI Project\Design.md (Context.dev System)
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB',      // Vivid Cobalt Blue
      light: '#3B82F6',
      dark: '#1D4ED8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4D4D4D',      // Restrained graphite gray
      light: '#737373',
      dark: '#262626',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',   // Pure white canvas
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',   // On-surface strong black
      secondary: '#4D4D4D', // Restrained graphite gray
      disabled: '#A3A3A3',
    },
    divider: '#E6E6E6',     // Tertiary soft neutral border
    action: {
      hover: '#F5F5F5',
      selected: '#EAF1FF',
    },
    error: {
      main: '#D92D20',
    },
  },
  typography: {
    fontFamily: [
      '"Rethink Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    // Specific scales from Design.md
    h1: {
      fontSize: '56px',
      fontWeight: 400,
      lineHeight: '60.48px',
      letterSpacing: '-1.96px',
      color: '#000000',
    },
    h2: {
      fontSize: '41px',
      fontWeight: 400,
      lineHeight: '49px',
      letterSpacing: '0px',
      color: '#000000',
    },
    h3: {
      fontSize: '30px',
      fontWeight: 400,
      lineHeight: '34.56px',
      letterSpacing: '0px',
      color: '#000000',
    },
    h4: {
      fontSize: '22px',
      fontWeight: 400,
      lineHeight: '26px',
      letterSpacing: '0px',
      color: '#000000',
    },
    body1: {
      fontSize: '16.2px',
      fontWeight: 400,
      lineHeight: '26.325px',
      color: '#4D4D4D',
    },
    body2: {
      fontSize: '14.4px',
      fontWeight: 400,
      lineHeight: '22px',
      color: '#4D4D4D',
    },
    button: {
      textTransform: 'none',
      fontSize: '14.4px',
      fontWeight: 400,
      lineHeight: '20px',
      letterSpacing: '0px',
    },
  },
  shape: {
    borderRadius: 8, // rounded.md
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#FFFFFF',
          minHeight: '100vh',
          color: '#000000',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#FFFFFF',
          border: '1px solid #E6E6E6',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 9999, // rounded.full
          padding: '11px 18px',
          boxShadow: 'none',
          height: 42,
          fontWeight: 400,
          fontSize: '14.4px',
          transition: 'all 0.15s ease-in-out',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#2563EB',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#1D4ED8',
          },
        },
        outlined: {
          backgroundColor: '#FFFFFF',
          borderColor: '#E6E6E6',
          color: '#2563EB',
          '&:hover': {
            backgroundColor: '#F5F5F5',
            borderColor: '#D4D4D4',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999, // rounded.full
          backgroundColor: '#F5F5F5',
          color: '#4D4D4D',
          border: '1px solid #E6E6E6',
          padding: '8px 12px',
          height: 34,
          fontSize: '13px',
          fontWeight: 400,
          '&:hover': {
            backgroundColor: '#EAF1FF',
            color: '#2563EB',
            borderColor: '#2563EB',
            cursor: 'pointer',
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 400,
          fontSize: '14px',
          minHeight: 40,
          color: '#4D4D4D',
          borderRadius: 9999,
          padding: '6px 16px',
          margin: '2px',
          '&.Mui-selected': {
            color: '#2563EB',
            backgroundColor: '#EAF1FF',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          display: 'none', // Segmented pill tab style
        },
      },
    },
  },
});
