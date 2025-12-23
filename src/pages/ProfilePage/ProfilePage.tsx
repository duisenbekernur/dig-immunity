/**
 * Страница профиля пользователя
 */

import { useState } from 'react';
import { Box, Typography, Paper, Grid, LinearProgress, Chip, Card, CardContent, TextField, Button, Alert } from '@mui/material';
import { Layout } from '../../components/Layout/Layout';
import { useStore } from '../../store/useStore';
import { getPersonalizedRecommendations } from '../../mocks/recommendations';
import { videos } from '../../mocks/videos';
import { VideoCard } from '../../components/VideoCard/VideoCard';

export const ProfilePage = () => {
  const { user, register, login, logout } = useStore();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    if (!email.trim() || !password.trim() || (isRegisterMode && !name.trim())) {
      setError('Заполните все поля');
      return;
    }

    if (isRegisterMode) {
      const res = register(name.trim(), email.trim(), password.trim());
      if (!res.success) {
        setError(res.error || 'Ошибка регистрации');
      }
    } else {
      const res = login(email.trim(), password.trim());
      if (!res.success) {
        setError(res.error || 'Ошибка авторизации');
      }
    }
  };

  if (!user) {
    return (
      <Layout>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
            {isRegisterMode ? 'Регистрация' : 'Вход'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
            Для доступа к проверке новостей, игре и сохранению прогресса необходимо войти или зарегистрироваться.
          </Typography>

          <Paper sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {isRegisterMode && (
              <TextField
                label="Имя"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Пароль"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, mb: 1 }}
              onClick={handleSubmit}
            >
              {isRegisterMode ? 'Зарегистрироваться' : 'Войти'}
            </Button>

            <Button
              variant="text"
              fullWidth
              onClick={() => {
                setIsRegisterMode((prev) => !prev);
                setError(null);
              }}
            >
              {isRegisterMode ? 'У меня уже есть аккаунт' : 'Создать новый аккаунт'}
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Для входа как администратор используйте email <strong>admin@dig.kz</strong>.
            </Typography>
          </Paper>
        </Box>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <Typography>Пользователь не найден</Typography>
      </Layout>
    );
  }

  const watchedVideosData = user.watchedVideos.map(id => videos.find(v => v.id === id)).filter(Boolean);
  const recommendations = getPersonalizedRecommendations(user.digitalIQ, user.watchedVideos);

  const progressPercentage = (user.watchedVideos.length / videos.length) * 100;

  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Профиль
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
          <Button variant="outlined" color="inherit" onClick={logout}>
            Выйти
          </Button>
        </Box>

        <Grid container spacing={3}>
          {/* Основная информация */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {user.email}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  {user.digitalIQ}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Digital IQ
                </Typography>
              </Box>

              <Chip
                label={`Уровень: ${user.level}`}
                color={user.level === 'Expert' ? 'success' : user.level === 'Skilled' ? 'warning' : 'default'}
                sx={{ fontWeight: 'bold' }}
              />
            </Paper>

            {/* Статистика */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Статистика
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Просмотрено видео: {user.watchedVideos.length}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Пройдено тестов: {user.completedTests.length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Игровой счет: {user.gameScore}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Прогресс обучения */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Прогресс обучения
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Просмотрено видео
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.watchedVideos.length} / {videos.length}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={progressPercentage}
                  sx={{ height: 10, borderRadius: 1 }}
                />
              </Box>
            </Paper>

            {/* Пройденные видео */}
            {watchedVideosData.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                  Просмотренные видео
                </Typography>
                <Grid container spacing={2}>
                  {watchedVideosData.slice(0, 3).map((video) => (
                    video && (
                      <Grid item xs={12} sm={6} md={4} key={video.id}>
                        <VideoCard video={video} />
                      </Grid>
                    )
                  ))}
                </Grid>
              </Box>
            )}

            {/* Рекомендации */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Персональные рекомендации
              </Typography>
              <Grid container spacing={2}>
                {recommendations.map((rec) => (
                  <Grid item xs={12} sm={6} key={rec.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {rec.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {rec.description}
                        </Typography>
                        <Chip label={rec.reason} size="small" color="primary" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

