import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../CustomButton';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Typography variant="h3" gutterBottom>Coming Soon</Typography>
      <CustomButton variant="contained" onClick={() => navigate('/')}>Go to Home</CustomButton>
    </Box>
  );
};

export default NotFoundPage;
