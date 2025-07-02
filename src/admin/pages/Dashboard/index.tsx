import { Box, Container, Typography } from '@mui/material'
import styles from '../../../pages/Home/home.module.scss';

export default function AdminDashboardPage() {
  return (
    <Box component="main" className={styles.main} sx={{ marginTop: "10%" }}>
      <Container maxWidth="md" className={styles.section} sx={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'none' }}>
        <Typography variant="h3" component="h1" className={styles.heading} sx={{ mb: 2, color: '#ff4d4d' }}>
          Admin Dashboard
        </Typography>
      </Container>
    </Box>
  )
}
