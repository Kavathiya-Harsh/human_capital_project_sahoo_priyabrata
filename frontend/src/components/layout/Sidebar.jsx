import React from 'react';
import {
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Toolbar, Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHome, FiBarChart2, FiGlobe, FiSettings, FiUsers, FiDatabase, FiHexagon } from 'react-icons/fi';
import { setSidebarOpen } from '../../features/uiSlice';
import { motion } from 'framer-motion';

const drawerWidth = 264;

const menuItems = [
  { text: 'Dashboard',  icon: <FiHome size={20} />,     path: '/dashboard' },
  { text: 'Analytics',  icon: <FiBarChart2 size={20} />, path: '/analytics' },
  { text: 'Data Grid',  icon: <FiDatabase size={20} />,  path: '/data' },
  { text: 'Users',      icon: <FiUsers size={20} />,     path: '/users' },
  { text: 'Countries',  icon: <FiGlobe size={20} />,     path: '/countries' },
  { text: 'Settings',   icon: <FiSettings size={20} />,  path: '/settings' },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  const handleDrawerToggle = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  const drawer = (
    <Box sx={{ px: 2, py: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ mb: 1 }} />

      {/* ── Nav section label ── */}
      <Typography
        sx={{
          fontSize: '0.65rem',
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'text.secondary',
          px: 1.5,
          mb: 2.5,
          mt: 1,
        }}
      >
        Main Navigation
      </Typography>

      <List sx={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1.2 }}>
            <motion.div
              style={{ width: '100%' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ListItemButton
                component={NavLink}
                to={item.path}
                onClick={() => { if (window.innerWidth < 600) handleDrawerToggle(); }}
                sx={{
                  borderRadius: '12px',
                  py: 1.4,
                  px: 2.5,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',

                  /* default — clean flat */
                  bgcolor: 'transparent',
                  border: '1px solid transparent',
                  color: isDark ? '#94A3B8' : '#64748B',

                  '&.active': {
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    boxShadow: isDark 
                      ? '0 6px 20px rgba(16, 185, 129, 0.3)' 
                      : '0 6px 20px rgba(16, 185, 129, 0.4)',
                    color: '#ffffff',
                    border: 'none',
                    transform: 'translateY(-2px)',
                    '& .MuiListItemIcon-root': { color: '#ffffff' },
                    '& .MuiListItemText-primary': { color: '#ffffff', fontWeight: 800 },
                  },

                  '&:hover:not(.active)': {
                    bgcolor: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                    transform: 'translateX(6px)',
                    color: isDark ? '#F8FAFC' : '#0F172A',
                    '& .MuiListItemIcon-root': { color: isDark ? '#F8FAFC' : '#0F172A' },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 44,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        letterSpacing: '0.01em',
                        color: 'inherit',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {item.text}
                    </Typography>
                  }
                />
              </ListItemButton>
            </motion.div>
          </ListItem>
        ))}
      </List>

      {/* ── Footer branding ── */}
      <Box
        sx={{
          mx: 1,
          mb: 2,
          p: 2.5,
          borderRadius: '16px',
          background: isDark
            ? 'linear-gradient(145deg, rgba(16,185,129,0.08), rgba(0,0,0,0.2))'
            : 'linear-gradient(145deg, rgba(16,185,129,0.05), rgba(255,255,255,0.5))',
          border: isDark
            ? '1px solid rgba(16,185,129,0.1)'
            : '1px solid rgba(16,185,129,0.2)',
          boxShadow: isDark ? 'none' : '0 4px 15px rgba(0,0,0,0.02)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{ 
            p: 0.8, 
            borderRadius: '8px', 
            bgcolor: 'rgba(16,185,129,0.15)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <FiHexagon size={16} color="#10B981" />
          </Box>
          <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: '#10B981', letterSpacing: '0.02em' }}>
            System OK
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary', fontWeight: 600, lineHeight: 1.5, mt: 0.5 }}>
          v3.0.0 — Synced to global telemetry stream.
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop permanent drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
