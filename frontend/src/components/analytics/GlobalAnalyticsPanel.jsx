import React from 'react';
import { Paper, Typography, Box, useTheme, Grid, LinearProgress } from '@mui/material';
import { FiTrendingUp, FiServer, FiGlobe, FiCpu, FiCheckCircle, FiList, FiClock, FiDatabase, FiLayers } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const TOP_NATIONS = [
  { rank: '#1', country: 'United States', records: '154.2k', stability: 99.4, speed: '12 ms', trend: '+12.4%', color: '#3B82F6' },
  { rank: '#2', country: 'Germany', records: '42.1k', stability: 98.9, speed: '18 ms', trend: '+2.1%', color: '#A855F7' },
  { rank: '#3', country: 'India', records: '38.1k', stability: 99.8, speed: '9 ms', trend: '+18.7%', color: '#10B981' },
  { rank: '#4', country: 'United Kingdom', records: '28.1k', stability: 97.4, speed: '22 ms', trend: '+0.8%', color: '#F59E0B' },
  { rank: '#5', country: 'Canada', records: '12.4k', stability: 99.1, speed: '15 ms', trend: '+1.4%', color: '#EF4444' }
];

const EDGE_REGIONS = [
  { name: 'North America', gateway: 'AWS us-east-1', health: '99.8%', active: true },
  { name: 'Europe Gateway', gateway: 'GCP europe-west3', health: '98.9%', active: true },
  { name: 'Asia-Pacific', gateway: 'AWS ap-south-1', health: '99.9%', active: true },
  { name: 'Latin America', gateway: 'Azure brazil-south', health: '97.4%', active: false }
];

const RECENT_EVENTS = [
  { text: 'Matched 142 records (USA)', time: '2s ago' },
  { text: 'Aggregated CPI (Germany)', time: '15s ago' },
  { text: 'Calculated seasonal index', time: '1m ago' },
  { text: 'Cleared Redis caches', time: '3m ago' },
  { text: 'Optimized index query speed', time: '5m ago' }
];

const POOL_METRICS = [
  { label: 'Active Connections', value: '124 / 500', color: '#3B82F6' },
  { label: 'Avg Query Queue', value: '0.0 (Idle)', color: '#10B981' },
  { label: 'Thread Ingestion Load', value: '14.2%', progress: 14.2, color: '#A855F7' },
  { label: 'Replica Set Status', value: 'PRIMARY / OK', color: '#10B981' }
];

const GlobalAnalyticsPanel = () => {
  const theme = useTheme();
  const { themeMode, appearance } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';
  const isNeu = appearance?.neumorphism !== false;

  const getNeuShadow = () => isNeu ? (isDark ? 'inset 2px 2px 4px #0c0f16, inset -2px -2px 4px #1e2536' : 'inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #ffffff') : 'none';

  return (
    <Grid container spacing={4} sx={{ mb: 4 }}>
      {/* 1. Country Intel Ranking Card */}
      <Grid item xs={12} sm={6} lg={3.2}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3 }}>
            <FiGlobe size={18} className="text-blue-500" />
            <Typography variant="subtitle2" fontWeight="900" sx={{ letterSpacing: '-0.01em', color: 'text.primary', textTransform: 'uppercase' }}>
              Country Rankings
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {TOP_NATIONS.map((nation, idx) => (
              <Box key={idx} sx={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 1, borderRadius: '12px', 
                bgcolor: isNeu ? 'transparent' : (isDark ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.005)'), 
                border: isNeu ? 'none' : '1px solid', borderColor: isNeu ? 'transparent' : 'divider', gap: 1.5,
                boxShadow: getNeuShadow()
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                  <Typography variant="caption" fontWeight="950" sx={{ color: nation.color, width: 16 }}>{nation.rank}</Typography>
                  <Typography variant="caption" fontWeight="800" color="text.primary" noWrap>{nation.country}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.62rem', fontWeight: 600 }}>{nation.records}</Typography>
                  <Typography variant="caption" fontWeight="900" color="success.main" sx={{ fontSize: '0.62rem' }}>{nation.trend}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* 2. Region Router Stream Cards */}
      <Grid item xs={12} sm={6} lg={2.8}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3 }}>
            <FiServer size={18} className="text-purple-500" />
            <Typography variant="subtitle2" fontWeight="900" sx={{ letterSpacing: '-0.01em', color: 'text.primary', textTransform: 'uppercase' }}>
              Edge Cloud Gateways
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {EDGE_REGIONS.map((region, idx) => (
              <Box key={idx} sx={{ 
                p: 1, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                bgcolor: isNeu ? 'transparent' : (isDark ? 'rgba(255,255,255,0.005)' : 'rgba(0,0,0,0.002)'),
                border: isNeu ? 'none' : '1px solid', borderColor: isNeu ? 'transparent' : 'divider',
                boxShadow: getNeuShadow()
              }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="caption" fontWeight="800" color="text.primary" sx={{ fontSize: '0.72rem' }} noWrap>{region.name}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.58rem', display: 'block' }} noWrap>{region.gateway}</Typography>
                </Box>
                <FiCheckCircle size={10} className={region.active ? 'text-emerald-500' : 'text-zinc-400'} />
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* 3. Live Pipeline Ingestion Logs */}
      <Grid item xs={12} sm={6} lg={3.2}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3 }}>
            <FiList size={18} className="text-emerald-500" />
            <Typography variant="subtitle2" fontWeight="900" sx={{ letterSpacing: '-0.01em', color: 'text.primary', textTransform: 'uppercase' }}>
              Pipeline Event Logs
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {RECENT_EVENTS.map((event, idx) => (
              <Box key={idx} sx={{ 
                p: 1, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5,
                border: isNeu ? 'none' : '1px dashed', borderColor: isNeu ? 'transparent' : 'divider',
                bgcolor: isNeu ? 'transparent' : 'transparent',
                boxShadow: getNeuShadow()
              }}>
                <Typography variant="caption" color="text.primary" fontWeight="700" sx={{ fontSize: '0.62rem', fontFamily: 'monospace' }} noWrap>{event.text}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.58rem', flexShrink: 0 }}>{event.time}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>

      {/* 4. MongoDB Pool Telemetry */}
      <Grid item xs={12} sm={6} lg={2.8}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%' }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3 }}>
            <FiDatabase size={18} className="text-amber-500" />
            <Typography variant="subtitle2" fontWeight="900" sx={{ letterSpacing: '-0.01em', color: 'text.primary', textTransform: 'uppercase' }}>
              MongoDB Pool Telemetry
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {POOL_METRICS.map((metric, idx) => (
              <Box key={idx} sx={{ 
                p: 1, borderRadius: '12px', 
                bgcolor: isNeu ? 'transparent' : (isDark ? 'rgba(255,255,255,0.005)' : 'rgba(0,0,0,0.002)'),
                border: isNeu ? 'none' : '1px solid', borderColor: isNeu ? 'transparent' : 'divider',
                boxShadow: getNeuShadow()
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: metric.progress ? 0.5 : 0 }}>
                  <Typography variant="caption" color="text.secondary" fontWeight="700" sx={{ fontSize: '0.65rem' }}>{metric.label}</Typography>
                  <Typography variant="caption" fontWeight="900" sx={{ color: metric.color, fontSize: '0.68rem' }}>{metric.value}</Typography>
                </Box>
                {metric.progress && (
                  <LinearProgress variant="determinate" value={metric.progress} sx={{ height: 2.5, borderRadius: '1.25px', bgcolor: 'divider', '& .MuiLinearProgress-bar': { bgcolor: metric.color } }} />
                )}
              </Box>
            ))}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default GlobalAnalyticsPanel;
