import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { Product } from '../../type/product';
import { formatPrice } from '../../utils/formatters';
import { PRODUCT_PAGE_URL } from '../../constants/routes';
import styles from './newArrivalsSection.module.scss';

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface NewArrivalsSectionProps {
  groupedProducts?: Product[];
}

const SampleNextArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={`${className} ${styles.carouselArrow}`}
      style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', right: '-25px' }}
      onClick={onClick}
    >
      <ArrowForwardIosIcon sx={{ color: '#333', fontSize: 20 }} />
    </Box>
  );
};

const SamplePrevArrow = (props: ArrowProps) => {
  const { className, style, onClick } = props;
  return (
    <Box
      className={`${className} ${styles.carouselArrow}`}
      style={{ ...style, display: 'flex', alignItems: 'center', justifyContent: 'center', left: '-25px' }}
      onClick={onClick}
    >
      <ArrowBackIosIcon sx={{ color: '#333', fontSize: 20 }} />
    </Box>
  );
};

const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({ groupedProducts }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(groupedProducts || []);
  }, [groupedProducts]);

  const handleProductClick = (product: Product & { _id?: string; productId?: string }) => {
    const id = product.id || product._id || product.productId;
    if (!id) {
      console.warn('No valid product ID found for navigation:', product);
      return;
    }
    navigate(`${PRODUCT_PAGE_URL}/${id}`, { state: { product, sectionTitle: 'Exclusive Buy from New Arrivals', sectionType: 'newArrivals' } });
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className={styles.newArrivalsSection}>
      <Typography variant="h4" component="h2" className={`${styles.sectionTitle} font-satoshi`}
        sx={{ marginBottom: '2%' }}>
        Explore New Arrivals
      </Typography>
      <Typography variant="body2" className={styles.sectionDescription} sx={{ marginBottom: '3%', maxWidth: '60%', marginLeft: '20%' }}>
        Just dropped! Explore the freshest styles, trending now and ready to elevate your wardrobe.
        Stay ahead of the style curve with our newest arrivals — featuring modern silhouettes,
        seasonal colors, and trend-forward designs tailored for every occasion.
      </Typography>
      <Box className={styles.productsCarouselContainer}>
        <Slider {...settings}>
          {products.map((product) => (
            <Box
              key={product.id}
              className={styles.productCard}
              onClick={() => handleProductClick(product)}
              sx={{ cursor: 'pointer' }}
            >
              <img src={product.imageUrl} alt={product.name} className={styles.productImage} />
              <Box className={styles.productInfo}>
                <Typography variant="body1" className={styles.productName}>
                  {product.name}
                </Typography>
                <Typography variant="body1" className={styles.productPrice}>
                  {formatPrice(product.price)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default NewArrivalsSection; 