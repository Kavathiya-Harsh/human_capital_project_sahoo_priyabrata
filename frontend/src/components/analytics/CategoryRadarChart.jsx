import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

const CategoryRadarChart = ({ data, theme, isDark }) => {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%' }}>
      <Typography variant="subtitle2" fontWeight="900" sx={{ mb: 3, letterSpacing: '-0.01em', color: 'text.primary' }}>
        System Health & Load Index
      </Typography>
      <Box sx={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="65%" data={data}>
            <PolarGrid stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
            <PolarAngleAxis dataKey="subject" tick={{ fill: theme.palette.text.secondary, fontSize: 8, fontWeight: 700 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 7 }} />
            <Radar name="Active Cluster" dataKey="A" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.25} />
            <Radar name="Replica Nodes" dataKey="B" stroke="#A855F7" fill="#A855F7" fillOpacity={0.15} />
            <Legend wrapperStyle={{ fontSize: 9, fontWeight: 700 }} />
          </RadarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default CategoryRadarChart;
