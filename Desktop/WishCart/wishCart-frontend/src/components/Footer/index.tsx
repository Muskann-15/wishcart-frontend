import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./footer.module.scss";
import { FooterLinkList } from "../../constants/constants";

const Footer: React.FC = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <Box className={styles.section}>
        <Typography variant="h6" className={styles.title}>
          WishCart
        </Typography>
        <Typography variant="body2" className={styles.text}>
          Your one-stop shop for everything you love.
        </Typography>
      </Box>
      <Box className={styles.section}>
        <Typography variant="subtitle1" className={styles.subtitle}>
          Quick Links
        </Typography>
        <Box className={styles.links}>
          {FooterLinkList.map((section, index) => (
            <Link 
              key={index} 
              to={section.href} 
              className={styles.link}
            >
              {section.linkTitle}
            </Link>
          ))}
        </Box>
      </Box>
      <Box className={styles.section}>
        <Typography variant="caption" className={styles.copy}>
          © {new Date().getFullYear()} WishCart. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
