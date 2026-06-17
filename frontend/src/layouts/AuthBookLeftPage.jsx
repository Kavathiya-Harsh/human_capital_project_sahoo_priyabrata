import React from 'react';
import { Box, Typography } from '@mui/material';
import { FiHexagon, FiActivity, FiGlobe } from 'react-icons/fi';
import { motion } from 'framer-motion';

const features = [
  { icon: <FiActivity size={18} />, label: 'Real-Time Telemetry' },
  { icon: <FiHexagon size={18} />, label: 'Quantum Aggregation' },
  { icon: <FiGlobe size={18} />, label: 'Global Market Intel' },
];

const AuthBookLeftPage = () => {
  return (
    <Box
      sx={{
        flex: 1,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        p: { md: 6, lg: 8 },
        position: 'relative',
        overflow: 'hidden',
        borderRight: '1px solid rgba(16,185,129,0.1)',
        background: 'radial-gradient(circle at center, rgba(16,185,129,0.05) 0%, rgba(5,5,5,1) 70%)',
      }}
    >
      {/* ── Massive Emerald Glowing Orb ── */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 60%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Box sx={{ zIndex: 1, maxWidth: 500 }}>
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box sx={{
              width: 48, height: 48, borderRadius: '12px',
              background: '#050505',
              border: '2px solid #10B981',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(16,185,129,0.4)',
            }}>
              <FiHexagon size={24} color="#10B981" />
            </Box>
            <Typography variant="h6" fontWeight={800} sx={{ color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              HC System
            </Typography>
          </Box>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <Typography variant="h2" fontWeight={900} sx={{ color: '#fff', lineHeight: 1.1, mb: 3 }}>
            Initialize
            <br />
            <Box component="span" sx={{
              background: 'linear-gradient(90deg, #10B981, #00E5FF)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Core Intelligence
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ color: '#94A3B8', lineHeight: 1.8, mb: 6 }}>
            Access the high-frequency telemetry dashboard. Ensure your credentials are secure before initializing the global economic data stream.
          </Typography>
        </motion.div>

        {/* Features */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {features.map((f, idx) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + idx * 0.1 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  width: 32, height: 32, borderRadius: '8px',
                  background: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#10B981',
                }}>
                  {f.icon}
                </Box>
                <Typography variant="subtitle1" sx={{ color: '#F1F5F9', fontWeight: 600, letterSpacing: '0.02em' }}>
                  {f.label}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthBookLeftPage;
