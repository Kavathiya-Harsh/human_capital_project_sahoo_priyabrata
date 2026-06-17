import React, { useMemo, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './store/store';
import AppRoutes from './routes/AppRoutes';
import { fetchCurrentUser } from './features/authSlice';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ThemeContextProvider } from './context/ThemeContext';

const AppContent = () => {
  const dispatch = useDispatch();
  const { themeMode } = useSelector((state) => state.ui);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Auto-login: Validates JWT token and fetches user profile on initial mount
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  const theme = useMemo(() => {
    const isDark = themeMode === 'dark';

    /* ── Palette — Emerald & Space Black ──
       Dark  → #050505 bg / #121212 cards
       Light → #F5F5F5 bg / #FFFFFF cards
    ── */
    const bgDefault      = isDark ? '#050505'  : '#f5f5f5';
    const bgPaper        = isDark ? '#121212'  : '#ffffff';
    const textPrimary    = isDark ? '#f8fafc'  : '#0f172a';
    const textSecondary  = isDark ? '#94a3b8'  : '#64748b';
    
    // Premium accents (Emerald & Cyan)
    const primaryColor   = '#10B981'; // Emerald
    const secondaryColor = '#00E5FF'; // Cyan

    return createTheme({
      palette: {
        mode: themeMode,
        primary:    { main: primaryColor },
        secondary:  { main: secondaryColor },
        success:    { main: '#10b981' },
        warning:    { main: '#f59e0b' },
        error:      { main: '#ef4444' },
        info:       { main: '#3b82f6' },
        background: { default: bgDefault, paper: bgPaper },
        text:       { primary: textPrimary, secondary: textSecondary },
        divider:    isDark ? 'rgba(16,185,129,0.15)' : 'rgba(16,185,129,0.1)',
      },
      typography: {
        fontFamily: '"Inter", "Poppins", "Sora", sans-serif',
        h1: { fontWeight: 900, letterSpacing: '-0.04em' },
        h2: { fontWeight: 800, letterSpacing: '-0.03em' },
        h3: { fontWeight: 800, letterSpacing: '-0.025em' },
        h4: { fontWeight: 800, letterSpacing: '-0.02em' },
        h5: { fontWeight: 700, letterSpacing: '-0.015em' },
        h6: { fontWeight: 700, letterSpacing: '-0.01em' },
        subtitle1: { fontWeight: 600 },
        subtitle2: { fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', fontSize: '0.72rem' },
        body1: { fontWeight: 400, lineHeight: 1.65 },
        body2: { fontWeight: 400, lineHeight: 1.6 },
        caption: { fontWeight: 600, letterSpacing: '0.02em' },
        button: { textTransform: 'none', fontWeight: 700, letterSpacing: '0.02em' },
      },
      shape: { borderRadius: 12 },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: bgDefault,
              transition: 'background-color 0.4s ease, color 0.4s ease',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            },
          },
        },

        /* ── Paper (cards) ── */
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              backgroundColor: isDark ? 'rgba(18,18,18,0.8)' : 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(24px) saturate(120%)',
              border: isDark ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(16,185,129,0.15)',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            },
            elevation0: { boxShadow: 'none' },
            elevation1: { boxShadow: isDark ? '0 4px 12px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.05)' },
            elevation2: {
              boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.04)',
              '&:hover': {
                boxShadow: isDark ? '0 15px 40px rgba(0,0,0,0.8), 0 0 20px rgba(16,185,129,0.1)' : '0 12px 30px rgba(0,0,0,0.08), 0 0 15px rgba(16,185,129,0.1)',
                transform: 'translateY(-2px)',
                borderColor: isDark ? 'rgba(16,185,129,0.3)' : 'rgba(16,185,129,0.4)',
              },
            },
            elevation3: { boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.8)' : '0 12px 30px rgba(0,0,0,0.1)' },
          },
        },

        /* ── AppBar (topbar) ── */
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              backgroundColor: isDark ? 'rgba(5,5,5,0.8)' : 'rgba(245,245,245,0.8)',
              backdropFilter: 'blur(24px) saturate(180%)',
              borderBottom: isDark ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(16,185,129,0.15)',
              boxShadow: 'none',
            },
          },
        },

        /* ── Drawer (sidebar) ── */
        MuiDrawer: {
          styleOverrides: {
            paper: {
              backgroundImage: 'none',
              backgroundColor: isDark ? '#080808' : '#ffffff',
              borderRight: isDark ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(16,185,129,0.15)',
            },
          },
        },

        /* ── Buttons ── */
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              padding: '10px 24px',
              fontWeight: 700,
              transition: 'all 0.3s ease',
            },
            contained: {
              background: 'linear-gradient(135deg, #10B981 0%, #00E5FF 100%)',
              color: '#050505', // High contrast text on neon buttons
              boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #34D399 0%, #22D3EE 100%)',
                boxShadow: '0 8px 25px rgba(16,185,129,0.5)',
                transform: 'translateY(-1px)',
              },
            },
            outlined: {
              borderColor: isDark ? 'rgba(16,185,129,0.4)' : 'rgba(16,185,129,0.5)',
              color: isDark ? '#10B981' : '#059669',
              '&:hover': {
                borderColor: '#10B981',
                backgroundColor: 'rgba(16,185,129,0.1)',
              },
            },
          },
        },

        /* ── Icon Buttons ── */
        MuiIconButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(16,185,129,0.1)',
                transform: 'scale(1.05)',
              },
            },
          },
        },

        /* ── Chip ── */
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 6,
              fontWeight: 700,
              fontSize: '0.7rem',
            },
          },
        },

        /* ── Tooltip ── */
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              backgroundColor: isDark ? '#1a1a1a' : '#1e293b',
              color: '#f8fafc',
              borderRadius: 8,
              fontSize: '0.75rem',
              fontWeight: 600,
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              border: '1px solid rgba(16,185,129,0.2)',
            },
          },
        },

        /* ── Table ── */
        MuiTableCell: {
          styleOverrides: {
            root: {
              borderColor: isDark ? 'rgba(16,185,129,0.1)' : 'rgba(16,185,129,0.1)',
            },
            head: {
              fontWeight: 800,
              fontSize: '0.72rem',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: textSecondary,
            },
          },
        },
      },
    });
  }, [themeMode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={themeMode} style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <BrowserRouter>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: '8px',
                background: themeMode === 'dark' ? '#121212' : '#ffffff',
                color: themeMode === 'dark' ? '#f8fafc' : '#0f172a',
                boxShadow: themeMode === 'dark'
                  ? '0 10px 30px rgba(0,0,0,0.8)'
                  : '0 8px 20px rgba(0,0,0,0.1)',
                fontWeight: 600,
                padding: '16px 24px',
                border: themeMode === 'dark' ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(16,185,129,0.15)',
              },
            }}
          />
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

function App() {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ThemeContextProvider>
          <AppContent />
        </ThemeContextProvider>
      </HelmetProvider>
    </Provider>
  );
}

export default App;
