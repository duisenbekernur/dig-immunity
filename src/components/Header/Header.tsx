/**
 * Компонент шапки сайта с навигацией
 */

import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useStore } from '../../store/useStore';

const navItems = [
  { label: 'Главная', path: '/' },
  { label: 'Проверка новостей', path: '/fact-checker' },
  { label: 'Академия', path: '/academy' },
  { label: 'Игра', path: '/game' },
  { label: 'Библиотека', path: '/library' },
  { label: 'Аналитика', path: '/analytics' },
  { label: 'Профиль', path: '/profile' },
  { label: 'Админ', path: '/admin' }
];

export const Header = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useStore();

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 0,
            mr: 4,
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          🛡️ Digital Immunity
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? 'secondary.main' : 'inherit',
                fontWeight: location.pathname === item.path ? 'bold' : 'normal'
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <IconButton onClick={toggleTheme} color="inherit">
          {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

