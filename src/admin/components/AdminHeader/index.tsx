import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { LOGIN_URL, REGISTER_URL } from '../../../constants/routes';
import { useUser } from '../../../context/UserContext';
import styles from './header.module.scss';

const AdminHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const userName = user?.name || '';
  const userEmail = user?.email || '';
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null)
    setAnchorEl(null);
    navigate(LOGIN_URL);
  };

  return (
    <Box className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Box className={styles.headerLeft}>
        <Link to="/" className={styles.logoLink}>
          <Typography variant="h5" component="span" className={styles.logoText}>Wishcart</Typography>
        </Link>
      </Box>
      <Box className={styles.headerIcons}>
        {token ?
          <>
            <IconButton
              aria-label="person-icon"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenuClick}
              sx={{ padding: 0 }}
            >
              <PersonIcon className={styles.icon} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleMenuClose}
              onClick={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem>
                <Typography variant="subtitle1">{userName}</Typography>
              </MenuItem>
              <MenuItem>
                <Typography variant="body2" color="text.secondary">{userEmail}</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </Menu>
          </>
          :
          <>
            <Link to={LOGIN_URL} className={styles.navLink}>Login</Link>
            <Link to={REGISTER_URL} className={styles.navLink}>Sign up</Link>
          </>
        }
      </Box>
    </Box>
  );
};

export default AdminHeader;
