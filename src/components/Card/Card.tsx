/**
 * Переиспользуемый компонент карточки
 */

import { Card as MuiCard, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { ReactNode } from 'react';

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  children?: ReactNode;
  onClick?: () => void;
  sx?: object;
}

export const Card = ({ title, description, image, children, onClick, sx }: CardProps) => {
  return (
    <MuiCard
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': onClick ? {
          transform: 'translateY(-4px)',
          boxShadow: 4
        } : {},
        ...sx
      }}
      onClick={onClick}
    >
      {image && (
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
        />
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h3" gutterBottom>
          {title}
        </Typography>
        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
        {children}
      </CardContent>
    </MuiCard>
  );
};

