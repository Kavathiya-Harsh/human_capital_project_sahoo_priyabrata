import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Chip } from '@mui/material';
import SEOMeta from '../../components/common/SEOMeta';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { FiInfo, FiActivity, FiMonitor, FiZap, FiShield } from 'react-icons/fi';
import { MiniSpark, getSectionCardSx } from './components/Shared';

import ProfileSettings from './components/ProfileSettings';
import AppearanceSettings from './components/AppearanceSettings';
import NotificationSettings from './components/NotificationSettings';
import AISettings from './components/AISettings';
import HelpOverview from './components/HelpOverview';
import DangerZoneSettings from './components/DangerZoneSettings';

const Settings = () => {
  const { themeMode, appearance } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';
  const sectionCard = getSectionCardSx(isDark);

  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <SEOMeta
        title="Settings & Preferences"
        description="Manage your Human Capital Analytics enterprise account preferences, security, AI settings, and notifications."
        path="/settings"
      />

      {/* ─── PAGE HEADER ─── */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="900" color="primary" sx={{ letterSpacing: '-0.02em', mb: 0.5 }}>
            Account Settings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your enterprise profile, security, preferences & AI configuration.
          </Typography>
        </Box>
        <Button
          variant="outlined"
          color="info"
          startIcon={<FiInfo />}
          onClick={() => setHelpOpen(!helpOpen)}
          sx={{
            borderRadius: '24px', px: 3, fontWeight: 800,
            border: '1px solid',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: 'none',
            }
          }}
        >
          {helpOpen ? 'Close Help' : 'Help & Info'}
        </Button>
      </Box>

      {/* ─── ACCOUNT ANALYTICS KPI STRIP ─── */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: 4,
          mb: 5,
          width: '100%',
        }}
      >
        {[
          { label: 'API Calls Today', value: '1,284', delta: '+12%', color: '#2196f3', icon: <FiActivity /> },
          { label: 'Active Sessions', value: '3', delta: 'Devices', color: '#4caf50', icon: <FiMonitor /> },
          { label: 'Login Streak', value: '14 days', delta: 'Consistent', color: '#ff7b00', icon: <FiZap /> },
          { label: 'Security Score', value: '87/100', delta: 'Strong', color: '#9c27b0', icon: <FiShield /> },
        ].map((kpi, i) => (
          <Paper
            key={i}
            elevation={0}
            component={motion.div}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            sx={{
              ...sectionCard,
              p: 5,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 1.5,
              minHeight: 230,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography color="text.secondary" fontWeight="800" sx={{ fontSize: '0.9rem' }}>
                {kpi.label}
              </Typography>
              <Box sx={{
                width: 54, height: 54, borderRadius: '16px',
                background: `${kpi.color}18`, color: kpi.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                boxShadow: 'none',
              }}>
                {kpi.icon}
              </Box>
            </Box>
            <Typography variant="h3" fontWeight="950" sx={{ letterSpacing: '-0.03em', lineHeight: 1 }}>
              {kpi.value}
            </Typography>
            <Box sx={{ height: 60 }}>
              <MiniSpark color={kpi.color} />
            </Box>
            <Chip label={kpi.delta} size="small" sx={{
              alignSelf: 'flex-start', height: 26, fontSize: '0.78rem', fontWeight: 800,
              bgcolor: `${kpi.color}18`, color: kpi.color, border: `1px solid ${kpi.color}33`,
              boxShadow: 'none',
              px: 1,
            }} />
          </Paper>
        ))}
      </Box>

      {/* ─── LEFT: PROFILE MANAGEMENT & RIGHT: SECURITY & PRIVACY ─── */}
      <ProfileSettings />

      {/* ─── 3-COLUMN PREFERENCE CARDS ROW ─── */}
      <Grid container spacing={8} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <AppearanceSettings />
        </Grid>
        <Grid item xs={12} md={4}>
          <NotificationSettings />
        </Grid>
        <Grid item xs={12} md={4}>
          <AISettings />
        </Grid>
      </Grid>

      {/* ─── ABOUT & HELP (FULL WIDTH) ─── */}
      {helpOpen && <HelpOverview />}

      {/* ─── DANGER ZONE (FULL WIDTH) ─── */}
      <DangerZoneSettings />

    </motion.div>
  );
};

export default Settings;
