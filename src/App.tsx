/**
 * Главный компонент приложения
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useStore } from './store/useStore';
import { HomePage } from './pages/HomePage/HomePage';
import { FactCheckerPage } from './pages/FactCheckerPage/FactCheckerPage';
import { AcademyPage } from './pages/AcademyPage/AcademyPage';
import { GamePage } from './pages/GamePage/GamePage';
import { LibraryPage } from './pages/LibraryPage/LibraryPage';
import { AnalyticsPage } from './pages/AnalyticsPage/AnalyticsPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { AdminPage } from './pages/AdminPage/AdminPage';

function App() {
  const { theme: themeMode } = useStore();

  const theme = createTheme({
    palette: {
      mode: themeMode,
      primary: {
        main: '#667eea',
      },
      secondary: {
        main: '#764ba2',
      },
      background: {
        default: themeMode === 'dark' ? '#121212' : '#f5f5f5',
        paper: themeMode === 'dark' ? '#1e1e1e' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fact-checker" element={<FactCheckerPage />} />
          <Route path="/academy" element={<AcademyPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

