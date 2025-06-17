import { BeatLoader } from "react-spinners";
import { Container } from "@mui/material";
import styles from './loder.module.scss';

export const AppLoader = () => {
  return (
    <Container maxWidth='xl' className={styles.container} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <BeatLoader color="#ff4d4d" size={32} />
    </Container>
  )
}