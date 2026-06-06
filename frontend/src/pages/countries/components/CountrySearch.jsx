import React from 'react';
import { Paper, Grid, FormControl, Select, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import Input from '../../../components/ui/Input';

const CountrySearch = ({
  searchTerm,
  setSearchTerm,
  selectedRegion,
  setSelectedRegion,
  selectedStatus,
  setSelectedStatus,
  sortBy,
  setSortBy,
}) => {
  const { themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  const cardShadow = isDark
    ? '4px 4px 10px #080b11, -4px -4px 10px #1e2535'
    : '4px 4px 10px #cad2dd, -4px -4px 10px #ffffff';

  const selectShadow = isDark
    ? 'inset 2px 2px 5px #080c16, inset -2px -2px 5px #16223e'
    : 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff';

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 4,
        borderRadius: '20px',
        boxShadow: cardShadow,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <Input
            placeholder="Search territories by name or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4} md={2.6}>
          <FormControl
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                boxShadow: selectShadow,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              },
            }}
          >
            <Select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              displayEmpty
            >
              <MenuItem value="All">All Regions</MenuItem>
              <MenuItem value="Americas">Americas</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Asia Pacific">Asia Pacific</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={2.6}>
          <FormControl
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                boxShadow: selectShadow,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              },
            }}
          >
            <Select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              displayEmpty
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="Optimal">Optimal Status</MenuItem>
              <MenuItem value="Warning">Warning Status</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4} md={2.8}>
          <FormControl
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                boxShadow: selectShadow,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              },
            }}
          >
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              displayEmpty
            >
              <MenuItem value="score">Sort by HC Score</MenuItem>
              <MenuItem value="growth">Sort by Growth Rate</MenuItem>
              <MenuItem value="indicators">Sort by Telemetry Channels</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CountrySearch;
