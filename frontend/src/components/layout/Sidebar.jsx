import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHome, FiBarChart2, FiGlobe, FiSettings, FiUsers, FiDatabase } from 'react-icons/fi';
import { setSidebarOpen } from '../../features/uiSlice';
import { motion } from 'framer-motion';

const drawerWidth = 260; // Slightly wider for elegance

const menuItems = [
  { text: 'Dashboard', icon: <FiHome />, path: '/dashboard' },
  { text: 'Analytics', icon: <FiBarChart2 />, path: '/analytics' },
  { text: 'Data Grid', icon: <FiDatabase />, path: '/data' },
  { text: 'Users', icon: <FiUsers />, path: '/users' },
  { text: 'Countries', icon: <FiGlobe />, path: '/countries' },
  { text: 'Settings', icon: <FiSettings />, path: '/settings' },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { sidebarOpen, themeMode } = useSelector((state) => state.ui);
  const isDark = themeMode === 'dark';

  const handleDrawerToggle = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  const activeShadow = isDark
    ? 'inset 4px 4px 8px #0c0f16, inset -4px -4px 8px #1e2536'
    : 'inset 4px 4px 8px #b8c1cf, inset -4px -4px 8px #ffffff';

  const drawer = (
    <Box sx={{ px: 2 }}>
      <Toolbar sx={{ mb: 2 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 2 }}>
            <ListItemButton
              component={NavLink}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 600) handleDrawerToggle();
              }}
              sx={{
                borderRadius: 3,
                py: 1.5,
                transition: 'all 0.3s ease',
                '&.active': {
                  bgcolor: 'transparent',
                  boxShadow: activeShadow, // Pressed neumorphic effect
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': { color: 'primary.main' },
                },
                '&:hover:not(.active)': {
                  bgcolor: 'transparent',
                  transform: 'translateY(-2px)',
                  boxShadow: isDark
                    ? '4px 4px 8px #0c0f16, -4px -4px 8px #1e2536'
                    : '4px 4px 8px #b8c1cf, -4px -4px 8px #ffffff',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'text.secondary', minWidth: 46 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'inherit' }}>
                    {item.text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
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
