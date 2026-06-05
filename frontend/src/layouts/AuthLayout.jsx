import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Typography, ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FiDatabase } from 'react-icons/fi';
import AuthBackground from './AuthBackground';
import AuthBookLeftPage from './AuthBookLeftPage';

// Force dark MUI theme for form inputs inside the book card
const darkFormTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF6038' },
    secondary: { main: '#00E5FF' },
    background: { default: '#151A26', paper: '#151A26' },
    text: { primary: '#F1F5F9', secondary: '#94A3B8' },
  },
  typography: {
    fontFamily: '"Inter", "Poppins", sans-serif',
    button: { textTransform: 'none', fontWeight: 700 },
    h3: { fontWeight: 800, letterSpacing: '-0.03em' },
    h4: { fontWeight: 800, letterSpacing: '-0.02em' },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: 'rgba(255,255,255,0.04)',
          '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
          '&:hover fieldset': { borderColor: 'rgba(255,96,56,0.5) !important' },
          '&.Mui-focused fieldset': { borderColor: '#FF6038 !important' },
        },
        input: { color: '#F1F5F9', '&::placeholder': { color: '#64748B' } },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: '#64748B', '&.Mui-focused': { color: '#FF6038' } },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, padding: '14px 24px', fontWeight: 700, fontSize: '1rem' },
        contained: {
          background: 'linear-gradient(135deg, #FF6038 0%, #FF8A6C 100%)',
          boxShadow: '0 8px 24px rgba(255,96,56,0.25)',
          '&:hover': {
            background: 'linear-gradient(135deg, #FF6038 0%, #FF9A6C 100%)',
            boxShadow: '0 12px 32px rgba(255,96,56,0.4)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 10 },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { color: '#00E5FF' },
      },
    },
  },
});

const AuthLayout = () => {
  return (
    <AuthBackground>
      {/* ════════════════════════════════════════════════════════
          THE BOOK CARD
      ════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 960 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            borderRadius: 6,
            overflow: 'hidden',
            minHeight: { xs: 'auto', md: 570 },
            boxShadow: `
              0 50px 100px rgba(0,0,0,0.7),
              0 0 0 1px rgba(255,255,255,0.06),
              inset 0 1px 0 rgba(255,255,255,0.08)
            `,
          }}
        >
          {/* ── LEFT PAGE — Dark Branding ─────────────────────── */}
          <AuthBookLeftPage />

          {/* ── Book Spine ────────────────────────────────────── */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            width: '1px', flexShrink: 0,
            background: 'linear-gradient(to bottom, rgba(59,130,246,0.03), rgba(59,130,246,0.35) 30%, rgba(139,92,246,0.35) 70%, rgba(59,130,246,0.03))',
            position: 'relative', alignItems: 'center', justifyContent: 'center',
          }}>
            <Box sx={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
              boxShadow: '0 0 10px rgba(99,102,241,0.8)',
            }} />
          </Box>

          {/* ── RIGHT PAGE — Dark Form ─────────────────────────── */}
          <Box sx={{
            width: { xs: '100%', md: '440px', lg: '460px' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            py: { xs: 4, md: 5.5 },
            px: { xs: 3, md: 4.5 },
            background: 'linear-gradient(145deg, rgba(10,15,38,0.99) 0%, rgba(14,20,48,0.98) 100%)',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
            boxSizing: 'border-box',
          }}>
            {/* Right panel inner glow */}
            <Box sx={{
              position: 'absolute', top: -60, right: -60,
              width: 250, height: 250, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            {/* Mobile logo */}
            <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', gap: 1.5, mb: 4 }}>
              <Box sx={{
                width: 34, height: 34, borderRadius: 2,
                background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <FiDatabase size={16} color="#fff" />
              </Box>
              <Typography variant="body2" fontWeight={700} sx={{ color: '#fff' }}>
                Human Capital Analytics
              </Typography>
            </Box>

            {/* Inject dark theme into form */}
            <ThemeProvider theme={darkFormTheme}>
              <Outlet />
            </ThemeProvider>
          </Box>
        </Box>
      </motion.div>
    </AuthBackground>
  );
};

export default AuthLayout;
