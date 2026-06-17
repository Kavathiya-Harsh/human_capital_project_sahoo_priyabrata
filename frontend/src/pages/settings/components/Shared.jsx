/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Box, Typography, Switch, Chip, Tooltip, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { FiMonitor, FiLogOut } from 'react-icons/fi';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

export const SectionHeader = ({ icon, title, subtitle, accentColor = '#10B981' }) => {
  return (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
    <Box
      sx={{
        width: 42, height: 42, borderRadius: '14px',
        background: `linear-gradient(135deg, ${accentColor}22, ${accentColor}44)`,
        border: `1px solid ${accentColor}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: accentColor, fontSize: 18,
        boxShadow: `0 0 16px ${accentColor}22`,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="h6" fontWeight="800" sx={{ letterSpacing: '-0.01em', lineHeight: 1.2 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  </Box>
  );
};

export const ToggleRow = ({ icon, title, subtitle, checked, onChange, accentColor = '#10B981' }) => {
  const { themeMode } = useSelector((s) => s.ui);
  const isDark = themeMode === 'dark';

  return (
    <Box
      sx={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        p: 2, borderRadius: '16px',
        background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
        border: '1px solid', 
        borderColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
        boxShadow: 'none',
        mb: 1.5, cursor: 'pointer',
        '&:hover': {
          background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
          borderColor: `${accentColor}33`,
          boxShadow: `0 0 0 1px ${accentColor}22`,
        },
        transition: 'all 0.2s ease',
      }}
      onClick={() => onChange()}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, minWidth: 0 }}>
        <Box sx={{
          color: accentColor, fontSize: 18, display: 'flex', flexShrink: 0,
          width: 34, height: 34, borderRadius: '10px',
          background: `${accentColor}18`,
          alignItems: 'center', justifyContent: 'center',
        }}>{icon}</Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" fontWeight="700" noWrap>{title}</Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{subtitle}</Typography>
          )}
        </Box>
      </Box>
      <Switch
        checked={checked}
        onChange={(e) => { e.stopPropagation(); onChange(); }}
        onClick={(e) => e.stopPropagation()}
        sx={{
          flexShrink: 0,
          '& .MuiSwitch-switchBase.Mui-checked': { color: accentColor },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            backgroundColor: accentColor,
          },
        }}
      />
    </Box>
  );
};

export const SessionCard = ({ device, location, time, current, isDark }) => (
  <Box
    sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      p: 2, borderRadius: '14px', mb: 1.5,
      background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
      border: '1px solid', 
      borderColor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
      boxShadow: 'none',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box
        sx={{
          width: 38, height: 38, borderRadius: '10px',
          background: current ? 'linear-gradient(135deg, #10B98122, #10B98144)' : 'rgba(0,0,0,0.05)',
          border: `1px solid ${current ? '#10B98144' : 'transparent'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: current ? '#10B981' : 'text.secondary', fontSize: 16,
        }}
      >
        <FiMonitor />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" fontWeight="700">{device}</Typography>
          {current && (
            <Chip label="Current" size="small" sx={{
              height: 18, fontSize: '0.65rem', fontWeight: 800,
              bgcolor: '#10B98122', color: '#10B981', border: '1px solid #10B98144',
            }} />
          )}
        </Box>
        <Typography variant="caption" color="text.secondary">
          {location} · {time}
        </Typography>
      </Box>
    </Box>
    {!current && (
      <Tooltip title="Revoke session">
        <IconButton size="small" sx={{ color: '#ef4444', '&:hover': { bgcolor: '#ef444414' } }}>
          <FiLogOut size={15} />
        </IconButton>
      </Tooltip>
    )}
  </Box>
);

const sparkData = [40, 55, 45, 60, 58, 72, 68, 80, 76, 90, 85, 95];
export const MiniSpark = ({ color = '#10B981' }) => (
  <ResponsiveContainer width="100%" height={40}>
    <LineChart data={sparkData.map((v, i) => ({ v, i }))}>
      <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

export const getSectionCardSx = (isDark) => ({
  p: 4, 
  borderRadius: '20px',
  boxShadow: isDark ? '0 10px 30px rgba(0,0,0,0.6)' : '0 4px 20px rgba(0,0,0,0.04)',
  bgcolor: isDark ? 'rgba(18,18,18,0.8)' : 'rgba(255,255,255,0.9)',
  backdropFilter: 'blur(24px) saturate(120%)',
  WebkitBackdropFilter: 'blur(24px) saturate(120%)',
  border: isDark ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(16,185,129,0.15)',
});

export const getTextFieldSx = () => {
  return {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      '& fieldset': { borderColor: 'rgba(16,185,129,0.2)' },
      '&:hover fieldset': { borderColor: 'rgba(16,185,129,0.4)' },
      '&.Mui-focused fieldset': { border: `1.5px solid #10B981` },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#10B981' },
  };
};
