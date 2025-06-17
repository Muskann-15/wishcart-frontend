import React from 'react';
import { Button } from '@mui/material';
import styles from './customButton.module.scss';

interface CustomButtonProps {
  children: React.ReactNode;
  variant?: 'contained' | 'outlined';
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'error' | string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  variant = 'contained',
  onClick,
  color,
}) => {
  const buttonClass = variant === 'contained' ? styles.containedButton : styles.outlinedButton;
  const colorClass = color ? styles[`${color}Color`] : '';

  return (
    <Button
      variant={variant}
      className={`${styles.baseButton} ${buttonClass} ${colorClass}`}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton; 