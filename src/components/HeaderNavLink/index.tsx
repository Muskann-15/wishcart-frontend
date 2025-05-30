import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import styles from './headerNaveLink.module.scss';
import { HeaderSectionDeals } from '../../constants/constants'

const HeaderNavLink: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/category?category=${category.toLowerCase()}`);
  };

  return (
    <Box className={styles.categoryRow} sx={{ justifyItems: 'center' }}>
      {HeaderSectionDeals.map((category, index) => (
        <Box
          key={index}
          className={styles.categoryItem}
          sx={{ justifyItems: 'center' }}
          onClick={() => handleCategoryClick(category.label)}
        >
          <img src={category.icon} alt={category.label} className={styles.icon} />
          <Typography className={styles.label}>{category.label}</Typography>
        </Box>
      ))}
    </Box>
  )
};

export default HeaderNavLink;