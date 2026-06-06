import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import { FiMenu, FiMoon, FiSun, FiLogOut, FiActivity } from 'react-icons/fi';
import { toggleSidebar, toggleTheme } from '../../features/uiSlice';
import { logout } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { themeMode } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: 'background.paper',
        color: 'text.primary',
        borderBottom: 'none',
      }}
    >
      <Toolbar sx={{ minHeight: '70px !important' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <FiMenu />
        </IconButton>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <FiActivity size={24} color="#FF6038" />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.03em',
                background: `linear-gradient(45deg, #FF6038, #00E5FF)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Human Capital Analytics
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{ display: { xs: 'none', md: 'block' }, color: 'text.secondary' }}
          >
            {user?.name || 'Enterprise Admin'}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              bgcolor: 'background.default',
              borderRadius: '20px',
              p: 0.5,
              boxShadow:
                themeMode === 'dark'
                  ? 'inset 2px 2px 4px #0c0f16, inset -2px -2px 4px #1e2536'
                  : 'inset 2px 2px 4px #b8c1cf, inset -2px -2px 4px #ffffff',
            }}
          >
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              color={themeMode === 'light' ? 'primary' : 'inherit'}
              sx={{ width: 36, height: 36 }}
            >
              {themeMode === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </IconButton>
          </Box>

          <Button
            color="primary"
            variant="contained"
            size="medium"
            onClick={handleLogout}
            startIcon={<FiLogOut />}
            sx={{ borderRadius: '20px', px: 3, display: { xs: 'none', sm: 'flex' } }}
          >
            Logout
          </Button>

          {/* Mobile Logout Icon */}
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
