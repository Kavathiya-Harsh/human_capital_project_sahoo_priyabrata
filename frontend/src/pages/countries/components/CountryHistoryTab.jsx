import React from 'react';
import { Box, Typography, Paper, Grid, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { FiActivity, FiTrendingUp, FiTrendingDown, FiAward } from 'react-icons/fi';

const CountryHistoryTab = ({ filteredCountries, leaderboardData }) => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  const cardShadow = isDark
    ? '4px 4px 10px #080b11, -4px -4px 10px #1e2535'
    : '4px 4px 10px #cad2dd, -4px -4px 10px #ffffff';

  const insetShadow = isDark
    ? 'inset 2px 2px 5px #080b11, inset -2px -2px 5px #1e2535'
    : 'inset 2px 2px 5px #cad2dd, inset -2px -2px 5px #ffffff';

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FiActivity style={{ color: '#ff7b00' }} /> Performance Matrices
        </Typography>
        <Grid container spacing={3}>
          <AnimatePresence mode="popLayout">
            {filteredCountries.map((country) => (
              <Grid item xs={12} sm={6} md={4} key={country.code}>
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: '24px',
                      boxShadow: cardShadow,
                      backgroundColor: 'background.paper',
                      border: '1px solid',
                      borderColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      boxSizing: 'border-box',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Avatar
                          sx={{
                            bgcolor: 'background.default',
                            color: 'primary.main',
                            width: 46,
                            height: 46,
                            fontWeight: '900',
                            fontSize: '0.95rem',
                            boxShadow: insetShadow,
                          }}
                        >
                          {country.code}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="850" sx={{ letterSpacing: '-0.01em' }}>
                            {country.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" fontWeight="700">
                            {country.region}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: '10px',
                          fontSize: '0.75rem',
                          fontWeight: '800',
                          bgcolor: country.status === 'Optimal' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                          color: country.status === 'Optimal' ? '#4caf50' : '#f44336',
                          border: '1px solid',
                          borderColor: country.status === 'Optimal' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                        }}
                      >
                        {country.status}
                      </Box>
                    </Box>

                    <Box sx={{ height: 45, width: '100%', my: 1.5 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={country.history.map((val, idx) => ({ id: idx, value: val }))}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={country.growth.startsWith('+') ? '#4caf50' : '#f44336'}
                            strokeWidth={2.5}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 1 }}>
                      <Box>
                        <Typography variant="caption" color="text.secondary" fontWeight="800">
                          HC Score
                        </Typography>
                        <Typography variant="h6" fontWeight="900" color="primary">
                          {country.score}%
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight="800">
                          Growth
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                          {country.growth.startsWith('+') ? (
                            <FiTrendingUp style={{ color: '#4caf50' }} />
                          ) : (
                            <FiTrendingDown style={{ color: '#f44336' }} />
                          )}
                          <Typography
                            variant="subtitle2"
                            fontWeight="900"
                            sx={{ color: country.growth.startsWith('+') ? '#4caf50' : '#f44336' }}
                          >
                            {country.growth}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mt: 2,
                        pt: 1.5,
                        borderTop: '1px solid',
                        borderColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" fontWeight="650">
                        Active Indicators: <strong>{country.activeIndicators}</strong>
                      </Typography>
                      <Typography variant="caption" color="text.secondary" fontWeight="650">
                        Trend: <strong>{country.trend}</strong>
                      </Typography>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="800" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FiAward style={{ color: '#ff7b00' }} /> Global HC Leaderboard
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
          }}
        >
          {leaderboardData.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center">
              No data to compare.
            </Typography>
          ) : (
            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={leaderboardData} layout="vertical" margin={{ left: 20, right: 30, top: 10, bottom: 10 }}>
                <XAxis type="number" domain={[50, 100]} hide />
                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={13} tickLine={false} axisLine={false} width={130} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1a233a' : 'rgba(255, 255, 255, 0.95)',
                    color: isDark ? '#ffffff' : '#000000',
                    border: 'none',
                    borderRadius: '12px',
                    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="score" fill="#ff7b00" radius={[0, 10, 10, 0]} barSize={22} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CountryHistoryTab;
