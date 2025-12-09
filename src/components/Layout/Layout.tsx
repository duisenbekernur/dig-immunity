/**
 * Основной layout компонент с навигацией
 */

import { ReactNode } from 'react';
import { Box, Container } from '@mui/material';
import { Header } from '../Header/Header';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Container maxWidth="xl" sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

