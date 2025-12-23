/**
 * Компонент шапки сайта с навигацией
 */

import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useStore } from '../../store/useStore';
import { t } from '../../utils/i18n';

const navItems = [
  { labelKey: 'navHome', path: '/' },
  { labelKey: 'navFactChecker', path: '/fact-checker' },
  { labelKey: 'navAcademy', path: '/academy' },
  { labelKey: 'navGame', path: '/game' },
  { labelKey: 'navLibrary', path: '/library' },
  { labelKey: 'navAnalytics', path: '/analytics' },
  { labelKey: 'navProfile', path: '/profile' },
  { labelKey: 'navAdmin', path: '/admin' }
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, user, logout, language, setLanguage } = useStore();

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
          {t(language, 'appTitle')}
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
              {t(language, item.labelKey)}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mr: 2 }}>
          {user ? (
            <>
              <Typography variant="body2" sx={{ maxWidth: 160 }} noWrap>
                {user.name} ({user.role === 'admin' ? 'админ' : 'пользователь'})
              </Typography>
              <Button color="inherit" size="small" onClick={() => navigate('/profile')}>
                Профиль
              </Button>
              <Button color="inherit" size="small" onClick={logout}>
                Выйти
              </Button>
            </>
          ) : (
            <Button color="inherit" size="small" onClick={() => navigate('/profile')}>
              {t(language, 'authLoginRegister')}
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 1 }}>
          <Button
            size="small"
            color={language === 'kk' ? 'secondary' : 'inherit'}
            onClick={() => setLanguage('kk')}
          >
            Қаз
          </Button>
          <Button
            size="small"
            color={language === 'ru' ? 'secondary' : 'inherit'}
            onClick={() => setLanguage('ru')}
          >
            Рус
          </Button>
        </Box>

        <IconButton onClick={toggleTheme} color="inherit">
          {theme === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

