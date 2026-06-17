import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const AuthBackground = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#050505',
        p: { xs: 0, md: 0 }, // Edge-to-edge for split screen
      }}
    >
      {/* Subtle noise/grain texture overlay */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.03) 0%, transparent 80%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Grid lines overlay (very subtle) */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          zIndex: 0, pointerEvents: 'none',
        }}
      />

      {children}
    </Box>
  );
};

export default AuthBackground;
