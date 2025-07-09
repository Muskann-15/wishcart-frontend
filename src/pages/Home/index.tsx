import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useDispatch } from 'react-redux';
import { fetchBestSellers, fetchNewArrivals } from '../../services/productService';
import type { Product } from '../../type/product';
import { AppLoader, BestSellersSection, ContactUsSection, CustomButton, EverydayCollectionSection, NewArrivalsSection, NewsletterSection } from '../../components';
import { statistics } from '../../constants/statistics';
import { updateLoadingValue } from '../../redux/userData/userSlice';
import styles from './home.module.scss';
import { fetchUserDetail } from '../../redux/userData/userApi';
import type { AppDispatch } from '../../config/store';

const MotionBox = motion(Box);

const genderCardVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    zIndex: 1,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const genderImageVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.3, ease: "easeInOut" } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const arrowVariants = {
  fadeInOut: {
    opacity: [0, 1, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const HomePage: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();

  useEffect(() => {
    getProductsData();
    dispatch(fetchUserDetail())
  }, []);

  const getProductsData = async () => {
    dispatch(updateLoadingValue(true))
    try {
      const fetchedBestSellersResponse = await fetchBestSellers();
      setBestSellers(fetchedBestSellersResponse.data);

      const fetchedNewArrivalsResponse = await fetchNewArrivals();
      setNewArrivals(fetchedNewArrivalsResponse.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionClick = (sectionName: string) => {
    navigate(`/shop?category=${sectionName.toLowerCase()}`);
  };

  if (loading) {
    return (<AppLoader />);
  }

  return (
    <Box component="main" className={styles.main}>
      <motion.div
        variants={itemVariants}
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Box className={`${styles.bannerSection} cream-gradient-bg`} sx={{ position: 'relative', overflow: 'hidden' }}>
          <Box
            className={styles.animateFloat}
            sx={{
              position: 'absolute',
              top: '80px',
              left: '40px',
              width: '128px',
              height: '128px',
              backgroundColor: 'rgba(220, 38, 127, 0.1)',
              borderRadius: '50%'
            }}
          />
          <Box
            className="absolute bottom-20 right-10 w-24 h-24 bg-purple-500/10 rounded-full animate-float"
            sx={{
              top: '78px',
              position: 'absolute',
              right: '0px',
              width: '96px',
              height: '96px',
              backgroundColor: 'rgba(168, 85, 247, 0.1)',
              borderRadius: '50%',
              animationDelay: '1s'
            }}
          />
          <Box
            className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full animate-float"
            sx={{
              position: 'absolute',
              top: '77%',
              left: '15%',
              width: '128px',
              height: '128px',
              backgroundColor: 'rgba(220, 38, 127, 0.1)',
              borderRadius: '50%'
            }}
          />
          <Box
            className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-500/10 rounded-full animate-float"
            sx={{
              position: 'absolute',
              top: '54%',
              left: '35%',
              width: '64px',
              height: '64px',
              backgroundColor: 'rgba(236, 72, 153, 0.1)',
              borderRadius: '50%',
              animationDelay: '2s'
            }}
          />
          <Box
            className="absolute top-1/3 right-1/3 w-20 h-20 bg-primary rounded-full animate-glow"
            sx={{
              position: 'absolute',
              top: '16%',
              right: '55%',
              width: '80px',
              height: '80px',
              backgroundColor: 'hsl(346, 77%, 49.8%)',
              borderRadius: '50%',
              boxShadow: 'rgba(255, 20, 87, 0.6) 0px 0px 39.9879px 0px'
            }}
          />
          <Box
            className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-purple-500 rounded-full animate-float"
            sx={{
              position: 'absolute',
              bottom: '5%',
              left: '46%',
              width: '64px',
              height: '64px',
              backgroundColor: 'hsl(346, 77%, 49.8%)',
              borderRadius: '50%',
              boxShadow: 'rgba(255, 20, 87, 0.6) 0px 0px 39.9879px 0px'
            }}
          />

          <Box className={styles.bannerContent} sx={{ position: 'relative', zIndex: 10, marginTop: '4%', marginBottom: '2%' }}>
            <Typography variant="h2" component="h1" className={styles.bannerTitle}>
              Discover Your <span className={styles.perfectStyle}>Perfect Style</span>
            </Typography>
            <Typography variant="body1" className={styles.bannerText} sx={{ marginTop: '5%' }}>
              Explore our curated collection of premium
              products designed for your lifestyle.
            </Typography>
            <Box className={styles.bannerButtons} sx={{ marginTop: '5%' }}>
              <CustomButton variant="contained" onClick={() => navigate('/shop')}>Shop Now</CustomButton>
              <CustomButton variant="outlined" onClick={() => navigate('/shop')}>View Collections</CustomButton>
            </Box>
            <Box sx={{
              display: 'flex',
              gap: '40px',
              paddingTop: '35px',
              textAlign: 'center',
              justifyContent: 'flex-start',
              width: '100%',
            }}>
              {statistics.map((stat, index) => (
                <Box key={index}>
                  <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', color: '#333', fontFamily: 'Playfair Display, serif' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'gray' }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <motion.div
            variants={arrowVariants}
            animate="fadeInOut"
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '50px',
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Box className={styles.arrowCircle} sx={{ marginTop: '20px' }}>
              <ArrowDownwardIcon sx={{ fontSize: 30, color: 'black' }} />
            </Box>
          </motion.div>
          <Box className={styles.bannerImagePlaceholder} sx={{ position: 'relative', zIndex: 5 }}>
            <img src="https://themewagon.github.io/majestic-2/v1.0.0/assets/img/gallery/summer.png" alt="Summer Collection" className={styles.bannerImage} />
          </Box>
        </Box>
      </motion.div>

      {/* For Her and For Him Section */}
      <Box className={styles.genderSection}>
        <Box sx={{ width: '100%', justifyItems: 'flex-end' }}>
          <MotionBox
            className={styles.genderCard}
            variants={genderCardVariants}
            initial="initial"
            whileHover="hover"
            onClick={() => handleSectionClick('women')}
          >
            <motion.img
              src="https://themewagon.github.io/majestic-2/v1.0.0/assets/img/gallery/her.png"
              alt="For Her"
              className={styles.genderImage}
              variants={genderImageVariants}
              initial="initial"
              whileHover="hover"
            />
            <Typography variant="h3" className={styles.genderTitle}>For Her</Typography>
          </MotionBox>
        </Box>

        <Box sx={{ width: '100%' }}>
          <MotionBox
            className={styles.genderCard}
            variants={genderCardVariants}
            initial="initial"
            whileHover="hover"
            onClick={() => handleSectionClick('men')}
          >
            <motion.img
              src="https://themewagon.github.io/majestic-2/v1.0.0/assets/img/gallery/him.png"
              alt="For Him"
              className={styles.genderImage}
              variants={genderImageVariants}
              initial="initial"
              whileHover="hover"
            />
            <Typography variant="h3" className={styles.genderTitle}>For Him</Typography>
          </MotionBox>
        </Box>
      </Box>

      <Box sx={{ maxWidth: '100%' }} onClick={() => navigate('/shop')}>
        <img src="https://littleboxindia.com/cdn/shop/files/Pick_your_design_web.gif?v=1743792876" alt="Summer Collection" style={{ width: '100%', cursor: 'pointer' }} />
      </Box>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={styles.container}
      >
        {/* Best Sellers Section */}
        <motion.div variants={itemVariants}>
          <BestSellersSection groupedProducts={bestSellers} />
        </motion.div>

        {/* Everyday Collection Section */}
        <motion.div
          variants={itemVariants}
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <EverydayCollectionSection />
        </motion.div>

        {/* New Arrivals Section */}
        <motion.div
          variants={itemVariants}
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover="hover"
        >
          <NewArrivalsSection groupedProducts={newArrivals} />
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          variants={itemVariants}
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 100
          }}
        >
          <NewsletterSection />
        </motion.div>

        {/* Contact Us Section */}
        <motion.div
          variants={itemVariants}
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ContactUsSection />
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default HomePage;
