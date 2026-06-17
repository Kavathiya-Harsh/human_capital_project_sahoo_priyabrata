import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Chip } from '@mui/material';
import { FiMenu, FiMoon, FiSun, FiLogOut, FiHexagon, FiBell } from 'react-icons/fi';
import { toggleSidebar, toggleTheme } from '../../features/uiSlice';
import { logout } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Topbar = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { themeMode } = useSelector((state) => state.ui);
  const { user }      = useSelector((state) => state.auth);
  const isDark = themeMode === 'dark';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        color: 'text.primary',
        backgroundColor: isDark ? 'rgba(5,5,5,0.8)' : 'rgba(245,245,245,0.8)',
        backdropFilter: 'blur(24px) saturate(180%)',
        borderBottom: isDark ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(16,185,129,0.15)',
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important', px: { xs: 2, sm: 3 }, gap: 1.5 }}>

        {/* Hamburger — mobile */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ display: { sm: 'none' }, mr: 0.5 }}
        >
          <FiMenu />
        </IconButton>

        {/* ── Brand ── */}
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            {/* Animated logo bubble */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  background: '#050505',
                  border: '2px solid #10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 15px rgba(16,185,129,0.3)',
                }}
              >
                <FiHexagon size={20} color="#10B981" />
              </Box>
            </motion.div>

            <Box>
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                  color: isDark ? '#fff' : '#0f172a',
                }}
              >
                HC System
              </Typography>
              <Typography
                sx={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  color: '#10B981',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  mt: 0.2,
                }}
              >
                Core Intelligence
              </Typography>
            </Box>
          </Box>

          {/* Live status chip */}
          <Chip
            label="● SECURE"
            size="small"
            sx={{
              display: { xs: 'none', lg: 'flex' },
              height: 22,
              fontSize: '0.6rem',
              fontWeight: 900,
              letterSpacing: '0.1em',
              bgcolor: 'rgba(16,185,129,0.1)',
              color: '#10B981',
              border: '1px solid rgba(16,185,129,0.2)',
              '& .MuiChip-label': { px: 1 },
            }}
          />
        </Box>

        {/* ── Right controls ── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>

          {/* User name */}
          <Typography
            variant="caption"
            sx={{
              display: { xs: 'none', md: 'block' },
              color: 'text.secondary',
              fontWeight: 700,
              letterSpacing: '0.02em',
            }}
          >
            {user?.name || 'Admin'}
          </Typography>

          {/* Notification bell */}
          <IconButton
            size="small"
            sx={{
              display: { xs: 'none', sm: 'flex' },
              width: 36,
              height: 36,
              borderRadius: '8px',
              bgcolor: isDark ? 'rgba(16,185,129,0.05)' : 'rgba(16,185,129,0.05)',
              border: isDark ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(16,185,129,0.15)',
              color: 'text.secondary',
            }}
          >
            <FiBell size={16} />
          </IconButton>

          {/* Theme toggle */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Box
              onClick={() => dispatch(toggleTheme())}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 36,
                height: 36,
                borderRadius: '8px',
                cursor: 'pointer',
                bgcolor: isDark ? 'rgba(16,185,129,0.05)' : 'rgba(16,185,129,0.05)',
                border: isDark ? '1px solid rgba(16,185,129,0.1)' : '1px solid rgba(16,185,129,0.15)',
                color: isDark ? '#10B981' : 'text.secondary',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: 'rgba(16,185,129,0.15)',
                },
              }}
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </Box>
          </motion.div>

          {/* Logout button */}
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              onClick={handleLogout}
              startIcon={<FiLogOut size={14} />}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                borderRadius: '8px',
                px: 2.5,
                py: 0.8,
                fontSize: '0.78rem',
                fontWeight: 800,
              }}
            >
              Logout
            </Button>
          </motion.div>

          {/* Mobile logout icon */}
          <IconButton
            color="error"
            onClick={handleLogout}
            sx={{ display: { xs: 'flex', sm: 'none' } }}
          >
            <FiLogOut />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
