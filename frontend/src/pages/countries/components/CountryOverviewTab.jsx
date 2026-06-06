import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGlobe, FiTrendingUp, FiActivity, FiAward, FiCompass, FiCpu, FiLock } from 'react-icons/fi';

const CountryOverviewTab = ({ stats, liveTelemetryCount }) => {
  const navigate = useNavigate();
  const { themeMode, aiPrefs } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';
  const isRecommendationsEnabled = aiPrefs?.recommendations !== false;

  const cardShadow = isDark
    ? '4px 4px 10px #080b11, -4px -4px 10px #1e2535'
    : '4px 4px 10px #cad2dd, -4px -4px 10px #ffffff';

  const insetShadow = isDark
    ? 'inset 2px 2px 5px #080b11, inset -2px -2px 5px #1e2535'
    : 'inset 2px 2px 5px #cad2dd, inset -2px -2px 5px #ffffff';

  return (
    <>
      {/* KPI Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          {
            title: 'Territories Monitored',
            value: stats.total,
            icon: <FiGlobe size={26} />,
            subtitle: 'Active Global Feeds',
            color: '#2196f3',
          },
          {
            title: 'Global Avg HC Index',
            value: `${stats.avgScore}%`,
            icon: <FiAward size={26} />,
            subtitle: 'Target Threshold: 85%',
            color: '#ff7b00',
          },
          {
            title: 'Highest Performing',
            value: stats.highest.name,
            icon: <FiCompass size={26} />,
            subtitle: `Index Score: ${stats.highest.score}%`,
            color: '#4caf50',
          },
          {
            title: 'Fastest Growing',
            value: stats.fastest.name,
            icon: <FiTrendingUp size={26} />,
            subtitle: `Growth Vector: ${stats.fastest.growth}`,
            color: '#e91e63',
          },
          {
            title: 'Active Telemetries',
            value: liveTelemetryCount,
            icon: <FiActivity size={26} />,
            subtitle: 'Live Stream Signals',
            color: '#00bcd4',
            pulse: true,
          },
        ].map((kpi, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={idx}>
            <Paper
              elevation={0}
              sx={{
                p: 3.5,
                borderRadius: '28px',
                boxShadow: cardShadow,
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 180,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                <Typography sx={{ fontSize: '0.85rem', color: 'text.secondary', fontWeight: '850' }}>
                  {kpi.title}
                </Typography>
                <Avatar
                  sx={{
                    bgcolor: 'background.default',
                    color: kpi.color,
                    width: 48,
                    height: 48,
                    boxShadow: insetShadow,
                  }}
                >
                  {kpi.icon}
                </Avatar>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="950" sx={{ letterSpacing: '-0.02em', mb: 1, color: 'text.primary' }}>
                  {kpi.value}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {kpi.pulse && (
                    <Box
                      sx={{
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        bgcolor: '#4caf50',
                        boxShadow: '0 0 10px #4caf50',
                        animation: 'pulse 1.5s infinite',
                        '@keyframes pulse': {
                          '0%': { transform: 'scale(0.95)', opacity: 0.8 },
                          '50%': { transform: 'scale(1.3)', opacity: 1 },
                          '100%': { transform: 'scale(0.95)', opacity: 0.8 },
                        },
                      }}
                    />
                  )}
                  <Typography sx={{ fontSize: '0.8rem', color: 'text.secondary', fontWeight: '650' }}>
                    {kpi.subtitle}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Neural Recommendations Banner */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FiCpu style={{ color: '#ff7b00' }} /> Neural Recommendations
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: '32px',
            boxShadow: cardShadow,
            backgroundColor: 'background.paper',
            border: '1px solid',
            borderColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Grid container spacing={4}>
            {[
              {
                title: 'Growth Vector Spark',
                text: 'India is leading APAC region with a +4.2% HC growth rate, driven by a surge in active analytics indicators (+240 telemetry channels).',
                status: 'Optimal',
              },
              {
                title: 'Demographic Retraining Pivot',
                text: "Japan's HC index dipped slightly to 88.7% (-0.4%). Recommend targeting workforce retraining programs in technical regions.",
                status: 'Warning',
              },
              {
                title: 'Stability Core Check',
                text: 'Western Europe (Germany, France, UK) maintains an average index of 89.6% with low variance, showing high capital stability.',
                status: 'Optimal',
              },
            ].map((insight, index) => (
              <Grid
                item
                xs={12}
                md={4}
                key={index}
                sx={{
                  borderRight: { xs: 'none', md: index < 2 ? '1px solid' : 'none' },
                  borderColor: isDark ? 'rgba(255,255,255,0.04) !important' : 'rgba(0,0,0,0.03) !important',
                  pr: { xs: 0, md: index < 2 ? 4 : 0 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 120,
                }}
              >
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        bgcolor: insight.status === 'Optimal' ? '#4caf50' : '#f44336',
                        boxShadow: insight.status === 'Optimal' ? '0 0 8px #4caf50' : '0 0 8px #f44336',
                      }}
                    />
                    <Typography variant="subtitle1" fontWeight="900" color="primary">
                      {insight.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65, fontSize: '0.9rem' }}>
                    {insight.text}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {!isRecommendationsEnabled && (
            <Box
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: isDark ? 'rgba(21, 26, 38, 0.45)' : 'rgba(255, 255, 255, 0.45)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                px: 4,
                zIndex: 10,
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, #9c27b018, #9c27b033)',
                  border: '1px solid rgba(156, 39, 176, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9c27b0',
                  fontSize: 20,
                  boxShadow: '0 0 15px rgba(156, 39, 176, 0.1)',
                  flexShrink: 0,
                  animation: 'pulse 2s infinite',
                  '@keyframes pulse': {
                    '0%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' },
                    '100%': { transform: 'scale(1)' }
                  }
                }}
              >
                <FiLock />
              </Box>
              <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
                <Box>
                  <Typography variant="body2" fontWeight="800" sx={{ color: 'text.primary', mb: 0.5, fontSize: '0.88rem' }}>
                    Neural Recommendations Paused
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, lineHeight: 1.4, display: 'block', maxWidth: 450 }}>
                    Enable Smart Recommendations in your AI Settings to resume live demographic retraining analytics and index growth forecasts.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => navigate('/settings')}
                  sx={{
                    borderRadius: '12px',
                    py: 1,
                    px: 3,
                    fontWeight: 800,
                    fontSize: '0.75rem',
                    background: 'linear-gradient(135deg, #9c27b0, #ba68c8)',
                    boxShadow: '0 4px 12px rgba(156, 39, 176, 0.25)',
                    color: '#fff',
                    textTransform: 'none',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7b1fa2, #9c27b0)',
                      boxShadow: '0 6px 18px rgba(156, 39, 176, 0.35)',
                    },
                  }}
                >
                  Configure AI Settings
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default CountryOverviewTab;
