import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { FiGlobe } from 'react-icons/fi';

const CountryHeatmapTab = () => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  const cardShadow = isDark
    ? '4px 4px 10px #080b11, -4px -4px 10px #1e2535'
    : '4px 4px 10px #cad2dd, -4px -4px 10px #ffffff';

  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <FiGlobe style={{ color: '#ff7b00' }} /> Region activity Heatmap
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 4.5,
          borderRadius: '32px',
          boxShadow: cardShadow,
          backgroundColor: 'background.paper',
          border: '1px solid',
          borderColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
          height: 420,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg viewBox="0 0 1000 400" width="100%" height="100%" style={{ opacity: 0.25 }}>
          <path
            d="M150,120 L250,100 L280,150 L200,180 Z M500,80 L560,90 L520,130 L480,120 Z M700,100 L800,120 L820,160 L730,170 Z M280,220 L320,290 L260,280 Z M760,260 L840,280 L800,320 Z"
            fill="none"
            stroke={isDark ? '#ffffff' : '#000000'}
            strokeWidth="2"
            strokeDasharray="4,4"
          />
        </svg>

        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <svg viewBox="0 0 1000 400" width="100%" height="100%">
            {/* US pulse */}
            <circle cx="210" cy="130" r="8" fill="#ff7b00" />
            <circle cx="210" cy="130" r="20" fill="transparent" stroke="#ff7b00" strokeWidth="2">
              <animate attributeName="r" values="8;32;8" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite" />
            </circle>

            {/* Europe pulse */}
            <circle cx="520" cy="100" r="8" fill="#2196f3" />
            <circle cx="520" cy="100" r="20" fill="transparent" stroke="#2196f3" strokeWidth="2">
              <animate attributeName="r" values="8;32;8" dur="2.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="2.5s" repeatCount="indefinite" />
            </circle>

            {/* India pulse */}
            <circle cx="720" cy="150" r="8" fill="#4caf50" />
            <circle cx="720" cy="150" r="20" fill="transparent" stroke="#4caf50" strokeWidth="2">
              <animate attributeName="r" values="8;32;8" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="2.2s" repeatCount="indefinite" />
            </circle>

            {/* Australia pulse */}
            <circle cx="800" cy="300" r="8" fill="#e91e63" />
            <circle cx="800" cy="300" r="20" fill="transparent" stroke="#e91e63" strokeWidth="2">
              <animate attributeName="r" values="8;32;8" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="3.5s" repeatCount="indefinite" />
            </circle>

            {/* Brazil pulse */}
            <circle cx="290" cy="260" r="8" fill="#00bcd4" />
            <circle cx="290" cy="260" r="20" fill="transparent" stroke="#00bcd4" strokeWidth="2">
              <animate attributeName="r" values="8;32;8" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0;1" dur="2.8s" repeatCount="indefinite" />
            </circle>
          </svg>
        </Box>

        <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', p: 1.5, borderRadius: 3 }}>
          <Typography variant="body2" color="text.secondary" fontWeight="700">
            Map Projections: <strong>Mercator grid</strong>
          </Typography>
          <Typography variant="body2" color="primary.main" fontWeight="800">
            Live Telemetry: Active
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default CountryHeatmapTab;
