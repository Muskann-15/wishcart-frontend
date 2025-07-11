import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState<{
    total: number;
    orderId: string;
    paymentId: string;
    paidAt?: string;
  } | null>(null);

  const formatDateTime = (iso: string): string => {
    const date = new Date(iso);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem('paymentSuccess');
    if (stored) {
      setPaymentDetails(JSON.parse(stored));
    }
  }, []);

  if (!paymentDetails) return <div>Loading...</div>;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#eafff2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 400, width: '100%', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <CheckCircleIcon sx={{ fontSize: 56, color: '#22c55e', bgcolor: '#d1fae5', borderRadius: '50%', p: 1 }} />
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Thank you for your purchase. Your payment has been processed successfully.
        </Typography>

        <Box sx={{ bgcolor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 2, p: 2, mb: 3, textAlign: 'left' }}>
          <Typography variant="body2" color="text.secondary">Razorpay Order ID:</Typography>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>{paymentDetails.orderId}</Typography>

          <Typography variant="body2" color="text.secondary">Amount:</Typography>
          <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>₹{paymentDetails.total}</Typography>

          <Typography variant="body2" color="text.secondary">Date & Time:</Typography>
          <Typography variant="body2" fontWeight={600}>
            {paymentDetails.paidAt ? formatDateTime(paymentDetails.paidAt) : 'N/A'}
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mb: 2, fontWeight: 600, py: 1 }}
          startIcon={<DownloadIcon />}
        >
          Download Receipt
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
      </Paper>
    </Box>
  );
};

export default PaymentSuccess;