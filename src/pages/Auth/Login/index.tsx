import React, { useState } from 'react';
import { Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService';
import styles from './login.module.scss';
import { REGISTER_URL } from '../../../constants/routes';
import { useUser } from '../../../context/UserContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useUser()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await loginUser(email, password);
      if (response.success && response.token) {
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('userId', response.user?.id || '');
        localStorage.setItem('userName', response.user?.name || '');
        localStorage.setItem('userEmail', response.user?.email || '');
        localStorage.setItem('accountType', response.user?.accountType || '');
        setUser(response.user)
        navigate('/');
      } else {
        setError(response.message || 'An unknown error occurred during login.');
      }
    } catch (err: unknown) {
      setError((err instanceof Error) ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.loginContainer}>
      <Box className={styles.loginCard}>
        <Typography variant="h4" component="h1" className={styles.title}>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.loginButton}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{color: 'white'}} /> : 'Login'}
          </Button>
        </form>
        <Typography variant="body2" className={styles.signupText}>
          Don't have an account? <Link to={REGISTER_URL}>Sign Up</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage; 