import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import AuthBackground from './AuthBackground';
import AuthBookLeftPage from './AuthBookLeftPage';

// Force stark dark theme for forms on the right panel
const darkFormTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#10B981' }, // Emerald
    secondary: { main: '#00E5FF' }, // Cyan
    background: { default: '#050505', paper: '#050505' },
    text: { primary: '#F8FAFC', secondary: '#94A3B8' },
  },
  typography: {
    fontFamily: '"Inter", "Poppins", sans-serif',
    button: { textTransform: 'none', fontWeight: 800 },
    h3: { fontWeight: 900, letterSpacing: '-0.03em' },
    h4: { fontWeight: 900, letterSpacing: '-0.02em' },
  },
  shape: { borderRadius: 8 },
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
          borderRadius: 8,
          backgroundColor: '#0a0a0a',
          '& fieldset': { borderColor: '#1f1f1f' },
          '&:hover fieldset': { borderColor: '#333 !important' },
          '&.Mui-focused fieldset': { borderColor: '#10B981 !important' },
          transition: 'all 0.3s ease',
        },
        input: { color: '#F8FAFC', '&::placeholder': { color: '#475569' } },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { color: '#64748B', '&.Mui-focused': { color: '#10B981' } },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, padding: '14px 24px', fontWeight: 800, fontSize: '1rem' },
        contained: {
          background: 'linear-gradient(135deg, #10B981 0%, #00E5FF 100%)',
          color: '#050505',
          boxShadow: '0 4px 15px rgba(16,185,129,0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #34D399 0%, #22D3EE 100%)',
            boxShadow: '0 8px 25px rgba(16,185,129,0.5)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: { color: '#10B981' },
      },
    },
  },
});

const AuthLayout = () => {
  return (
    <AuthBackground>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          minHeight: '100vh',
          zIndex: 1,
        }}
      >
        {/* ── LEFT PANEL — Massive Glowing Aesthetics ─────────────────────── */}
        <AuthBookLeftPage />

        {/* ── RIGHT PANEL — Minimalist Form ─────────────────────────── */}
        <Box sx={{
          width: { xs: '100%', md: '500px', lg: '600px' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 4, md: 5.5 },
          px: { xs: 3, md: 8 },
          background: '#050505', // Solid Deep Black
          flexShrink: 0,
          position: 'relative',
        }}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ width: '100%', maxWidth: 400 }}
          >
            {/* Inject stark theme into form */}
            <ThemeProvider theme={darkFormTheme}>
              <Outlet />
            </ThemeProvider>
          </motion.div>
        </Box>
      </Box>
    </AuthBackground>
  );
};

export default AuthLayout;
