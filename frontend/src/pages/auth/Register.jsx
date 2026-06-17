import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/authSlice';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Box, Paper, Link, Typography, Alert } from '@mui/material';
import SEOMeta from '../../components/common/SEOMeta';
import { motion } from 'framer-motion';
import RegisterForm from '../../components/forms/RegisterForm';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegisterSubmit = async (values) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      const { token, user } = response.data.data;
      dispatch(setCredentials({ token, user }));
      toast.success('Registration successful! Welcome.');
      navigate('/dashboard');
    } catch (err) {
      const errMsg = err.response?.data?.message || 'Registration failed';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      <SEOMeta
        title="Create Account"
        description="Register a new account on Human Capital Analytics. Join the enterprise analytics platform."
        path="/register"
      />

      <Paper elevation={0} sx={{ p: { xs: 1.5, md: 2.5 }, borderRadius: 4, width: '100%', maxWidth: '100%', bgcolor: 'transparent' }}>
        <Box sx={{ mb: 3.2, textAlign: 'center' }}>
          <Typography
            component="h1"
            variant="h4"
            fontWeight="bold"
            color="primary"
            sx={{ letterSpacing: '-0.04em' }}
            gutterBottom
          >
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Join the platform to access enterprise analytics
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <RegisterForm onSubmit={handleRegisterSubmit} loading={loading} />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Link
            component={RouterLink}
            to="/login"
            variant="body2"
            color="primary"
            sx={{ fontWeight: 600, textDecoration: 'none' }}
          >
            Already have an account? Sign In
          </Link>
        </Box>
      </Paper>
    </motion.div>
  );
};

export default Register;
