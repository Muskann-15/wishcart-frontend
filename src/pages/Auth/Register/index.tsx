import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress, Alert } from '@mui/material';
import { registerUser } from '../../../services/authService';
import { LOGIN_URL } from '../../../constants/routes';
import styles from './register.module.scss';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await registerUser(name, email, password);
      if (response.success && response.token) {
        localStorage.setItem('jwtToken', response.token);
        localStorage.setItem('userId', response.user?.id || '');
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate(LOGIN_URL);
        }, 1500);
      } else {
        setError(response.message || 'An unknown error occurred during registration.');
      }
    } catch (err: unknown) {
      setError((err instanceof Error) ? err.message : 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className={styles.registerContainer}>
      <Box className={styles.registerCard}>
        <Typography variant="h4" component="h1" className={styles.title}>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className={styles.registerButton}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </form>
        <Typography variant="body2" className={styles.loginText}>
          Already have an account? <Link to={LOGIN_URL}>Login</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage; 