/**
 * Компонент загрузки
 */

import { Box, CircularProgress, Typography } from '@mui/material';

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = "Загрузка..." }: LoadingProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: 2
      }}
    >
      <CircularProgress />
      {message && <Typography variant="body1">{message}</Typography>}
    </Box>
  );
};

