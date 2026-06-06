import React, { useState, useEffect } from 'react';
import { Paper, Typography, Box, useTheme, Grid } from '@mui/material';
import { ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, RadialBarChart, RadialBar } from 'recharts';
import api from '../../services/api';
import { CardSkeleton } from '../loaders/SkeletonLoader';
import CategoryRadarChart from './CategoryRadarChart';

const RADAR_DATA = [
  { subject: 'Query Speed', A: 98, B: 85, fullMark: 100 },
  { subject: 'Ingestion Rate', A: 92, B: 75, fullMark: 100 },
  { subject: 'Cache Efficiency', A: 99, B: 90, fullMark: 100 },
  { subject: 'API Reliability', A: 100, B: 95, fullMark: 100 },
  { subject: 'Network Latency', A: 85, B: 60, fullMark: 100 },
];

const RADIAL_DATA = [
  { name: 'Index Match', value: 94, fill: '#3B82F6' },
  { name: 'Geo Cover', value: 88, fill: '#10B981' },
  { name: 'Query Hit', value: 99, fill: '#A855F7' }
];

const MoreAnalyticsCharts = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [loading, setLoading] = useState(true);
  const [indicatorData, setIndicatorData] = useState([]);
  const [composedData, setComposedData] = useState([]);

  useEffect(() => {
    const fetchMoreCharts = async () => {
      try {
        const [indRes, yrRes] = await Promise.all([
          api.get('/stats/top-indicators'),
          api.get('/stats/yearly-average')
        ]);

        // Map Pie chart: Top 5 indicators
        const mappedInd = (indRes.data.data || [])
          .slice(0, 5)
          .map(d => ({
            name: d._id ? (d._id.length > 25 ? d._id.substring(0, 22) + '...' : d._id) : 'General',
            value: d.recordCount
          }));

        // Map Composed chart: Year averages + simulated pipeline volume
        const mappedComp = (yrRes.data.data || [])
          .map((d, index) => ({
            year: String(d._id),
            value: Math.round(d.average * 100) / 100,
            volume: 15000 + (index * 4200)
          }))
          .sort((a, b) => a.year.localeCompare(b.year));

        setIndicatorData(mappedInd);
        setComposedData(mappedComp);
      } catch (err) {
        console.error('Error fetching supplementary charts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMoreCharts();
  }, []);

  const chartColors = ['#3B82F6', '#10B981', '#F59E0B', '#A855F7', '#EC4899'];

  if (loading) {
    return (
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}><CardSkeleton /></Grid>
        <Grid item xs={12} md={6}><CardSkeleton /></Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={4} sx={{ mb: 4 }}>
      {/* 1. Pie Chart - Top Indicators Ingestion Distribution */}
      <Grid item xs={12} sm={6} lg={2.7}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%' }}>
          <Typography variant="subtitle2" fontWeight="900" sx={{ mb: 3, letterSpacing: '-0.01em', color: 'text.primary' }}>
            Top Indicators Distribution
          </Typography>
          <Box sx={{ width: '100%', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={indicatorData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {indicatorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', background: theme.palette.background.paper, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* 2. Radar Chart - System Ingestion Capability */}
      <Grid item xs={12} sm={6} lg={2.7}>
        <CategoryRadarChart data={RADAR_DATA} theme={theme} isDark={isDark} />
      </Grid>

      {/* 3. Composed Chart - Volume vs Ingested Mean */}
      <Grid item xs={12} sm={6} lg={2.7}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%' }}>
          <Typography variant="subtitle2" fontWeight="900" sx={{ mb: 3, letterSpacing: '-0.01em', color: 'text.primary' }}>
            Mean Ingestion vs Ingested Volume
          </Typography>
          <Box sx={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <ComposedChart data={composedData} margin={{ top: 10, right: -5, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 9, fontWeight: 700 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 8 }} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: theme.palette.text.secondary, fontSize: 8 }} />
                <Tooltip contentStyle={{ borderRadius: '12px', background: theme.palette.background.paper, fontSize: 10 }} />
                <Bar yAxisId="left" dataKey="volume" fill="url(#compGrad)" radius={[4, 4, 0, 0]}>
                  <defs>
                    <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0.15} />
                    </linearGradient>
                  </defs>
                </Bar>
                <Line yAxisId="right" type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={2} dot={{ r: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>

      {/* 4. Radial Bar Chart - Pipeline Health Index */}
      <Grid item xs={12} sm={6} lg={3.9}>
        <Paper elevation={2} sx={{ p: 3, borderRadius: '24px', backgroundColor: 'background.paper', height: '100%' }}>
          <Typography variant="subtitle2" fontWeight="900" sx={{ mb: 3, letterSpacing: '-0.01em', color: 'text.primary' }}>
            Pipeline Health Index
          </Typography>
          <Box sx={{ width: '100%', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer>
              <RadialBarChart cx="35%" cy="50%" innerRadius="25%" outerRadius="95%" barSize={8} data={RADIAL_DATA}>
                <RadialBar minAngle={15} background clockWise dataKey="value" cornerRadius={4} />
                <Tooltip contentStyle={{ borderRadius: '12px', background: theme.palette.background.paper, fontSize: 10 }} />
                <Legend iconSize={6} layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: 8, fontWeight: 700 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MoreAnalyticsCharts;
