import React from 'react';
import { Box, Typography, Button, Paper, Link } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useLocation } from 'react-router-dom';

const PaymentFailed: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const errorCode = params.get('errorCode') || 'PAYMENT_DECLINED';
  const amount = params.get('amount') || '49.99';
  const date = params.get('date') || '09/07/2025';

  const handleTryAgain = () => {
    navigate('/cart');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffeaea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CancelIcon sx={{ fontSize: 56, color: '#ef4444', bgcolor: '#fee2e2', borderRadius: '50%', p: 1 }} />
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Payment Failed
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We couldn't process your payment. This could be due to insufficient funds, an expired card, or a network issue.<br />
          Please check your payment details and try again.
        </Typography>
        <Box sx={{ bgcolor: '#fee2e2', border: '1px solid #fecaca', borderRadius: 2, p: 2, mb: 3, textAlign: 'left' }}>
          <Typography variant="body2" color="text.secondary">Error Code:</Typography>
          <Typography variant="body2" fontWeight={600} color="error" sx={{ mb: 1 }}>{errorCode}</Typography>
          <Typography variant="body2" color="text.secondary">Attempted Amount:</Typography>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>${amount}</Typography>
          <Typography variant="body2" color="text.secondary">Date:</Typography>
          <Typography variant="body2" fontWeight={600}>{date}</Typography>
        </Box>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mb: 2, fontWeight: 600, py: 1 }}
          onClick={handleTryAgain}
          startIcon={<RefreshIcon />}
        >
          Try Again
        </Button>
        <Button
          variant="outlined"
          fullWidth
          sx={{ fontWeight: 600, py: 1 }}
          onClick={() => navigate('/')}
          startIcon={<ArrowBackIcon />}
        >
          Back to Home
        </Button>
        <Typography variant="body2" sx={{ mt: 3, color: 'gray' }}>
          Need help? Contact our support team at <Link href="mailto:support@example.com" color="primary">support@example.com</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default PaymentFailed; 