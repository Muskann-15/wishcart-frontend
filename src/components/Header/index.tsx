import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, Menu, MenuItem, IconButton, Badge } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchBar from '../SearchBar';
import { useUser } from '../../context/UserContext';
import { LOGIN_URL, REGISTER_URL } from '../../constants/routes';
import type { RootState } from '../../config/store';
import styles from './header.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = user?.wishlist?.length || 0;
  const userName = user?.name || '';
  const userEmail = user?.email || '';
  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    setShowSearchBar(location.pathname === '/shop');
  }, [location.pathname]);

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

  const handleIconClick = (iconName: string) => {
    if (iconName === 'Cart') {
      navigate('/cart');
    } else if (iconName === 'Search') {
      navigate('/search');
    } else if (iconName === 'Favorite') {
      navigate('/wishlist');
    }
  };

  return (
    <Box className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <Box className={styles.headerLeft}>
        <Link to="/" className={styles.logoLink}>
          <Typography variant="h5" component="span" className={styles.logoText}>Wishcart</Typography>
        </Link>
      </Box>
      <Box className={styles.headerNav}>
        <Link
          to="/shop?category=women"
          className={`${styles.navLink} ${location.search.includes('category=women') ? styles.activeLink : ''}`}
        >
          Women
        </Link>
        <Link
          to="/shop?category=men"
          className={`${styles.navLink} ${location.search.includes('category=men') ? styles.activeLink : ''}`}
        >
          Men
        </Link>
        <Link
          to="/shop?category=all"
          className={`${styles.navLink} ${location.search.includes('category=all')  ? styles.activeLink : ''}`}
        >
          Collection
        </Link>
        <Link
          to="/outlet"
          className={`${styles.navLink} ${location.pathname === '/outlet' ? styles.activeLink : ''}`}
        >
          Outlet
        </Link>
        <Link
          to="/shop?category=shopAll"
          className={`${styles.navLink} ${location.search.includes('category=shopAll')  ? styles.activeLink : ''}`}
        >
          Shop All
        </Link>
      </Box>

      {showSearchBar && (
        <Box className={styles.headerSearchBar}>
          <SearchBar />
        </Box>
      )}
      <Box className={styles.headerIcons}>
        {token ?
          <>
            <PhoneIcon className={styles.icon} onClick={() => handleIconClick('Phone')} />
            <Badge badgeContent={cartCount} color="primary">
              <ShoppingCartIcon className={styles.icon} onClick={() => handleIconClick('Cart')} />
            </Badge>
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
            <Badge badgeContent={wishlistCount} color="primary">
              <FavoriteBorderIcon className={styles.icon} onClick={() => handleIconClick('Favorite')} />
            </Badge>
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

export default Header;
