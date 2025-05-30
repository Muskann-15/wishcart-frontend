import React from 'react';
import Slider from 'react-slick';
import { CategorySection, HeaderNavLink } from '../../components';
import { Box } from '@mui/material';
import styles from './home.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CarouselImages, CategorySectionProducts } from '../../constants/constants';

const CarouselSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  arrows: false,
};

const HomePage: React.FC = () => {
  return (
    <Box component="main" className={styles.main}>
      <HeaderNavLink />
      <Box className={styles.container}>
      <Slider {...CarouselSettings}>
        {CarouselImages.map((item, index) => (
          <Box key={index} className={styles.slide}>
            <img src={item.src} alt={`carousel-${index}`} style={{ maxHeight: '80%', width: '80%' }} />
          </Box>
        ))}
      </Slider>
      {CategorySectionProducts.map((section, index) => (
        <CategorySection key={index} title={section.title} products={section.products} />
      ))}
      </Box>
    </Box>
  );
};

export default HomePage;
