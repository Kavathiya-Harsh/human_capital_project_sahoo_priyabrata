import React from 'react';
import { Paper, Typography, Box, LinearProgress } from '@mui/material';
import { FiTrendingUp, FiServer, FiGlobe, FiCpu, FiCheckCircle, FiList, FiClock, FiDatabase, FiLayers } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const TOP_NATIONS = [
  { rank: '#1', country: 'United States',  records: '154.2k', stability: 99.4, speed: '12 ms', trend: '+12.4%', color: '#3B82F6' },
  { rank: '#2', country: 'Germany',        records: '42.1k',  stability: 98.9, speed: '18 ms', trend: '+2.1%',  color: '#A855F7' },
  { rank: '#3', country: 'India',          records: '38.1k',  stability: 99.8, speed: '9 ms',  trend: '+18.7%', color: '#10B981' },
  { rank: '#4', country: 'United Kingdom', records: '28.1k',  stability: 97.4, speed: '22 ms', trend: '+0.8%',  color: '#F59E0B' },
  { rank: '#5', country: 'Canada',         records: '12.4k',  stability: 99.1, speed: '15 ms', trend: '+1.4%',  color: '#EF4444' },
];

const EDGE_REGIONS = [
  { name: 'North America', gateway: 'AWS us-east-1',       health: '99.8%', active: true  },
  { name: 'Europe Gateway',gateway: 'GCP europe-west3',    health: '98.9%', active: true  },
  { name: 'Asia-Pacific',  gateway: 'AWS ap-south-1',      health: '99.9%', active: true  },
  { name: 'Latin America', gateway: 'Azure brazil-south',  health: '97.4%', active: false },
];

const RECENT_EVENTS = [
  { text: 'Matched 142 records (USA)',     time: '2s ago'  },
  { text: 'Aggregated CPI (Germany)',      time: '15s ago' },
  { text: 'Calculated seasonal index',     time: '1m ago'  },
  { text: 'Cleared Redis caches',          time: '3m ago'  },
  { text: 'Optimized index query speed',   time: '5m ago'  },
];

const POOL_METRICS = [
  { label: 'Active Connections',    value: '124 / 500',    color: '#3B82F6' },
  { label: 'Avg Query Queue',       value: '0.0 (Idle)',   color: '#10B981' },
  { label: 'Thread Ingestion Load', value: '14.2%', progress: 14.2, color: '#A855F7' },
  { label: 'Replica Set Status',    value: 'PRIMARY / OK', color: '#10B981' },
];

/* ─── shared card ─────────────────────────────────────────────────────────── */
const PanelCard = ({ icon: Icon, iconClass, title, children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      style={{ width: '100%', height: '100%' }}
    >
      <Paper
        elevation={2}
        sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%' }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 3 }}>
          <Icon size={18} className={iconClass} />
          <Typography
            variant="subtitle2"
            fontWeight={900}
            sx={{ letterSpacing: '-0.01em', color: 'text.primary', textTransform: 'uppercase' }}
          >
            {title}
          </Typography>
        </Box>
        {children}
      </Paper>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
const GlobalAnalyticsPanel = () => {
  const { themeMode } = useSelector((s) => s.ui);
  const isDark = themeMode === 'dark';

  const rowStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 24,
    marginBottom: 32,
    width: '100%',
    alignItems: 'stretch',
  };

  return (
    <div style={rowStyle}>
      {/* 1 ── Country Intel Rankings */}
      <PanelCard icon={FiGlobe} iconClass="text-blue-500" title="Country Rankings" delay={0}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {TOP_NATIONS.map((n, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                p: 1, borderRadius: '12px', gap: 1.5,
                bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: '1px solid', borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
                <Typography variant="caption" fontWeight={950} sx={{ color: n.color, width: 16 }}>{n.rank}</Typography>
                <Typography variant="caption" fontWeight={800} color="text.primary" noWrap>{n.country}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexShrink: 0 }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.62rem', fontWeight: 600 }}>{n.records}</Typography>
                <Typography variant="caption" fontWeight={900} color="success.main" sx={{ fontSize: '0.62rem' }}>{n.trend}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </PanelCard>

      {/* 2 ── Edge Cloud Gateways */}
      <PanelCard icon={FiServer} iconClass="text-purple-500" title="Edge Cloud Gateways" delay={0.07}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {EDGE_REGIONS.map((r, i) => (
            <Box
              key={i}
              sx={{
                p: 1, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: '1px solid', borderColor: 'divider',
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" fontWeight={800} color="text.primary" sx={{ fontSize: '0.72rem' }} noWrap>{r.name}</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.58rem', display: 'block' }} noWrap>{r.gateway}</Typography>
              </Box>
              <FiCheckCircle size={12} className={r.active ? 'text-emerald-500' : 'text-zinc-400'} />
            </Box>
          ))}
        </Box>
      </PanelCard>

      {/* 3 ── Pipeline Event Logs */}
      <PanelCard icon={FiList} iconClass="text-emerald-500" title="Pipeline Event Logs" delay={0.14}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {RECENT_EVENTS.map((ev, i) => (
            <Box
              key={i}
              sx={{
                p: 1, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1.5,
                border: '1px dashed', borderColor: 'divider',
              }}
            >
              <Typography variant="caption" color="text.primary" fontWeight={700} sx={{ fontSize: '0.62rem', fontFamily: 'monospace' }} noWrap>
                {ev.text}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.58rem', flexShrink: 0 }}>
                {ev.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </PanelCard>

      {/* 4 ── MongoDB Pool Telemetry */}
      <PanelCard icon={FiDatabase} iconClass="text-amber-500" title="MongoDB Pool Telemetry" delay={0.21}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {POOL_METRICS.map((m, i) => (
            <Box
              key={i}
              sx={{
                p: 1, borderRadius: '12px',
                bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
                border: '1px solid', borderColor: 'divider',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: m.progress ? 0.5 : 0 }}>
                <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ fontSize: '0.65rem' }}>{m.label}</Typography>
                <Typography variant="caption" fontWeight={900} sx={{ color: m.color, fontSize: '0.68rem' }}>{m.value}</Typography>
              </Box>
              {m.progress && (
                <LinearProgress
                  variant="determinate"
                  value={m.progress}
                  sx={{
                    height: 3, borderRadius: '2px', bgcolor: 'divider',
                    '& .MuiLinearProgress-bar': { bgcolor: m.color },
                  }}
                />
              )}
            </Box>
          ))}
        </Box>
      </PanelCard>
    </div>
  );
};

export default GlobalAnalyticsPanel;
