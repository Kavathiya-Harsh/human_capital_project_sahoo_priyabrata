import React from 'react';
import { Paper, Typography, Box, Chip, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

/* ──────────────────────────────────────────────────────────────────────────
   Accent map: maps any color string → glow + gradient config.
────────────────────────────────────────────────────────────────────────── */
const ACCENT_MAP = {
  '#10b981': { glow: 'rgba(16,185,129,0.3)',   g1: '#10b981', g2: '#34d399' },
  '#8b5cf6': { glow: 'rgba(139,92,246,0.3)',   g1: '#8b5cf6', g2: '#a78bfa' },
  '#00e5ff': { glow: 'rgba(0,229,255,0.3)',    g1: '#00e5ff', g2: '#f472b6' },
  '#3b82f6': { glow: 'rgba(59,130,246,0.3)',    g1: '#3b82f6', g2: '#60a5fa' },
  '#2563eb': { glow: 'rgba(37,99,235,0.3)',     g1: '#3b82f6', g2: '#60a5fa' },
  '#2563EB': { glow: 'rgba(37,99,235,0.3)',     g1: '#3b82f6', g2: '#60a5fa' },
  '#06b6d4': { glow: 'rgba(6,182,212,0.3)',     g1: '#06b6d4', g2: '#22d3ee' },
  '#10b981': { glow: 'rgba(16,185,129,0.3)',    g1: '#10b981', g2: '#34d399' },
  '#22c55e': { glow: 'rgba(34,197,94,0.3)',     g1: '#10b981', g2: '#34d399' },
  '#22C55E': { glow: 'rgba(34,197,94,0.3)',     g1: '#10b981', g2: '#34d399' },
  '#f59e0b': { glow: 'rgba(245,158,11,0.3)',    g1: '#f59e0b', g2: '#fbbf24' },
  '#a855f7': { glow: 'rgba(168,85,247,0.3)',    g1: '#a855f7', g2: '#c084fc' },
  '#A855F7': { glow: 'rgba(168,85,247,0.3)',    g1: '#a855f7', g2: '#c084fc' },
  '#ef4444': { glow: 'rgba(239,68,68,0.3)',     g1: '#ef4444', g2: '#f87171' },
  '#FF6038': { glow: 'rgba(16,185,129,0.3)',    g1: '#10b981', g2: '#34d399' },
  '#FF6B35': { glow: 'rgba(0,229,255,0.3)',    g1: '#00e5ff', g2: '#f472b6' },
};
const getAccent = (c) =>
  ACCENT_MAP[c] || { glow: 'rgba(16,185,129,0.3)', g1: '#10b981', g2: '#34d399' };

/* ──────────────────────────────────────────────────────────────────────────
   StatCard — Premium glassmorphic card with gradient accents
────────────────────────────────────────────────────────────────────────── */
const StatCard = ({
  title,
  value,
  icon,
  color = '#10b981',
  trend,
  description,
  delay = 0,
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const accent = getAccent(color);
  const isPositive = trend === undefined || trend >= 0;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 240, damping: 22, delay }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          background: isDark
            ? 'rgba(15, 22, 41, 0.8)'
            : '#FFFFFF',
          backdropFilter: isDark ? 'blur(20px)' : 'none',
          border: isDark
            ? `1px solid ${accent.g1}18`
            : '1px solid rgba(16,185,129,0.08)',
          boxShadow: isDark
            ? `0 8px 32px rgba(0,0,0,0.4), 0 0 1px ${accent.g1}22`
            : '0 4px 24px rgba(16,185,129,0.06)',
          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            boxShadow: isDark
              ? `0 16px 48px rgba(0,0,0,0.5), 0 0 32px ${accent.glow}`
              : `0 12px 40px rgba(16,185,129,0.12)`,
            border: isDark ? `1px solid ${accent.g1}30` : `1px solid ${accent.g1}25`,
          },
          px: { xs: 2.5, sm: 3, md: 3.5 },
          py: { xs: 2.8, sm: 3, md: 3.5 },
          minHeight: 185,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Radial glow blob */}
        <Box sx={{
          position: 'absolute', top: -30, right: -30, width: 120, height: 120,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)`,
          pointerEvents: 'none', zIndex: 0, filter: 'blur(10px)', opacity: isDark ? 0.5 : 0.2,
        }} />

        {/* Bottom accent stripe */}
        <Box sx={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
          background: `linear-gradient(90deg, transparent, ${accent.g1}, ${accent.g2}, transparent)`,
          opacity: 0.7, borderRadius: '0 0 24px 24px',
        }} />

        {/* Title + icon row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', zIndex: 1 }}>
          <Typography sx={{
            fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: 'text.secondary', lineHeight: 1.3, flex: 1, pr: 1,
          }}>
            {title}
          </Typography>

          {/* Icon bubble */}
          <Box sx={{
            flexShrink: 0, width: 50, height: 50, borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isDark
              ? `linear-gradient(135deg, ${accent.g1}15, ${accent.g2}0A)`
              : `linear-gradient(135deg, ${accent.g1}12, ${accent.g2}08)`,
            border: `1px solid ${accent.g1}20`,
            transition: 'all 0.3s ease',
          }}>
            {React.isValidElement(icon)
              ? React.cloneElement(icon, { size: 22, color: accent.g1 })
              : icon}
          </Box>
        </Box>

        {/* Metric value */}
        <Box sx={{ zIndex: 1, mt: 2 }}>
          <Typography variant="h3" sx={{
            fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05,
            background: `linear-gradient(135deg, ${accent.g1}, ${accent.g2})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            fontSize: { xs: '1.9rem', md: '2.3rem' }, mb: 1,
          }}>
            {value}
          </Typography>

          {/* Trend badge */}
          {trend !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Box sx={{
                display: 'inline-flex', alignItems: 'center', gap: 0.4,
                px: 1, py: 0.3, borderRadius: '8px',
                background: isPositive ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                border: isPositive ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(239,68,68,0.2)',
              }}>
                {isPositive
                  ? <FiTrendingUp size={11} color="#10b981" />
                  : <FiTrendingDown size={11} color="#ef4444" />}
                <Typography component="span" sx={{
                  fontSize: '0.68rem', fontWeight: 800,
                  color: isPositive ? '#10b981' : '#ef4444', letterSpacing: '0.02em',
                }}>
                  {Math.abs(trend)}% vs last month
                </Typography>
              </Box>
            </Box>
          )}

          {description && (
            <Typography variant="body2" sx={{ mt: 0.8, fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.5 }}>
              {description}
            </Typography>
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default StatCard;
