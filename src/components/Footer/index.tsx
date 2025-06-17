import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { SocialMediaLinks, CompanyLinks, ResourcesLinks, LegalLinks, CopyrightLegalLinks } from "../../constants/constants";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  const getSocialIcon = (name: string) => {
    switch (name) {
      case 'Twitter':
        return <TwitterIcon />;
      case 'Facebook':
        return <FacebookIcon />;
      case 'Instagram':
        return <InstagramIcon />;
      case 'LinkedIn':
        return <LinkedInIcon />;
      default:
        return null;
    }
  };

  return (
    <Box component="footer">
      <Box className={styles.footer}>
        <Box className={styles.brandInfo}>
          <Typography variant="h6" className={styles.title}>
            Wishcart
          </Typography>
          <Typography variant="body2" className={styles.text}>
            Creating amazing experiences for our
            customers since 2023.
          </Typography>
          <Box className={styles.socialIcons}>
            {SocialMediaLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {getSocialIcon(link.name)}
              </a>
            ))}
          </Box>
        </Box>

        <Box className={styles.section}>
          <Typography variant="subtitle1" className={styles.subtitle}>
            Company
          </Typography>
          <Box className={styles.links}>
            {CompanyLinks.map((link) => (
              <Link key={link.href} to={link.href} className={styles.link}>{link.text}</Link>
            ))}
          </Box>
        </Box>

        <Box className={styles.section}>
          <Typography variant="subtitle1" className={styles.subtitle}>
            Resources
          </Typography>
          <Box className={styles.links}>
            {ResourcesLinks.map((link) => (
              <Link key={link.href} to={link.href} className={styles.link}>{link.text}</Link>
            ))}
          </Box>
        </Box>

        <Box className={styles.section}>
          <Typography variant="subtitle1" className={styles.subtitle}>
            Legal
          </Typography>
          <Box className={styles.links}>
            {LegalLinks.map((link) => (
              <Link key={link.href} to={link.href} className={styles.link}>{link.text}</Link>
            ))}
          </Box>
        </Box>
      </Box>
      <Box className={styles.copyright}>
        <Typography variant="caption" className={styles.copy}>
          © {new Date().getFullYear()} Brand, Inc. All rights reserved.
        </Typography>
        <Box className={styles.legalLinks}>
          {CopyrightLegalLinks.map((link) => (
            <Link key={link.href} to={link.href} className={styles.legalLink}>{link.text}</Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
